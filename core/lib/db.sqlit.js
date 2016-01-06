function sqlite(database,version,note,size){
	var db=openDatabase(database,version,note,size);

	function make_field(field){
		var data=[];
		for(var key in field){
			var pKey = key == "id" ? " primary key" : "";//设置ID主键
			data.push("'"+key+"'"+" "+field[key] + pKey);
		}
		return "("+data.join(",")+")";
	}
	
	function make_insert(kv){
		var k=[];
		var v=[];
		var tmp={};
		for(var key in kv){
			k.push(key);
			if(kv[key] == null){
				v.push(kv[key]+"");
			}else if(typeof(kv[key]) == "string" && kv[key].indexOf("datetime") >= 0){
				v.push(kv[key]+"");
			}else{
				v.push("'"+kv[key]+"'");
			}
		}
		tmp.key=k.join(",");
		tmp.value=v.join(",");
		return tmp;
	}
	
	function make_update(kv){
		var data=[];
		for(var key in kv){data.push(key+"='"+kv[key]+"'");}
		return data.join(",");
	}
	
	var r={};
	r.query=function(sql,callback){
		var object=this;
		db.transaction(function(tx){tx.executeSql(sql,[],cb);});
		function cb(tx,rs){
			if(callback){
				rs.sql=sql;
				callback.call(object,rs);
			}
		}
	};
	
	r.ctSql=function(sql,callback){
		var object=this;
		object.query(sql,callback);
	};
	
	r.ct=function(table,field,callback){
		var object=this;
		var sql="create table "+table+make_field(field);
		object.query(sql,callback);
	};
	
	r.rt=function(ot,nt,callback){
		var object=this;
		var sql="alter table "+ot+" rename to "+nt;
		object.query(sql,callback);
	};
	
	r.dt=function(table,callback){
		var object=this;
		var sql="drop table if exists "+table;
		object.query(sql,callback);
	};
	
	/**
	 * 获取最大的主键值
	 * 
	 * table 表名
	 * id 字段名
	 */
	r.getMaxId=function(table,id,callback){
		var object=this;
		var sql="select max("+id+") as maxId from "+table;
		object.get(sql,callback);
	};
	
	r.gt=function(callback){
		var object=this;
		var sql="select name from sqlite_master where type='table' and sql<>'' and name not in ('__WebKitDatabaseInfoTable__','sqlite_autoindex___WebKitDatabaseInfoTable___1','sqlite_sequence','sqlite_stat1','sqlite_stat2','sqlite_stat3')";
		object.query(sql,cb);
		function cb(rs){
			var list=[];
			for(var i=0;i<rs.rows.length;i++){list.push(rs.rows.item(i).name);}
			callback.call(object,list);
		}
	};
	
	r.gts=function(table,callback){
		var object=this;
		var sql="select sql from sqlite_master where type='table' and name='"+table+"'";
		object.query(sql,cb);
		function cb(rs){
			callback.call(object,rs.rows.item(0).sql);
		}
	};
	
	r.insert=function(table,kv,callback){
		var object=this;
		var tmp=make_insert(kv);
		var sql="insert into "+table+"("+tmp.key+") values("+tmp.value+")";
		console.log(sql);
		object.query(sql,callback);
	};
	
	r.insertSQL=function(sql,callback){
		var object=this;
		object.query(sql,callback);
	};
	
	r.update=function(table,kv,id,callback){
		var object=this;
		var tmp=make_update(kv);
		var sql="update "+table+" set "+tmp+" where id="+id;
		
		object.query(sql,callback);
	};
	
	r.updateSQL=function(sql,callback){
		var object=this;
		console.log(sql	);
		object.query(sql,callback);
	};
	
	r.delete=function(table,id,callback){
		var object=this;
		var sql="delete from "+table+" where id in ("+id+")";
		object.query(sql,callback);
	};
	
	r.deleteSQL=function(sql,callback){
		var object=this;
		object.query(sql,callback);
	};
	
	//查询单个对象
	r.get=function(sql,callback){
		var object=this;
		object.query(sql,cb);
		function cb(rs){
			var obj = rs.rows.length > 0 ? rs.rows.item(0) : null;
			callback.call(object,obj);
		}
	};
	
	r.gv=function(callback){
		var object=this;
		var sql="select sqlite_version(*) as version";
		object.query(sql,cb);
		function cb(rs){
			callback.call(object,rs.rows.item(0).version);
		}
	};

	r.af=function(table,field,type,callback){
		var object=this;
		var sql="alter table "+table+" add column '"+field+"' "+type;
		object.query(sql,callback);
	};

	r.gf=function(table,callback){
		var object=this;
		object.gts(table,cb);
		function cb(sql){
			var reg=sql.match(/\(.*\)/);
			reg=reg[0].slice(1,reg[0].length-1).split(",");
			var list=[];
			for(var i=0;i<reg.length;i++){
				var tmp=reg[i].split(" ");
				tmp=tmp[0].replace('"','').replace("'","");
				if(tmp!=""){list.push(tmp);}
			}
			callback.call(object,list);
		}
	};
	return r;
}

(function (){
	if (typeof window.$sqlite !== 'undefined') {
		window._a = window.$sqlite;
	}
	window.$sqlite = {};
	
	$sqlite.db = new sqlite("ecmDb","1.1","ecmDb 1.1",500000);
})();

