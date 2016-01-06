(function() {
    var global = (function() {
            return this || (0, eval)('this');
        }()),
        slice = Array.prototype.slice,
        enumerables = ['hasOwnProperty', 'valueOf', 'isPrototypeOf',
            'propertyIsEnumerable', 'toLocaleString', 'toString', 'constructor'
        ],
        noArgs = [],
        TemplateClass = function() {},
        chain = function(object) {
            TemplateClass.prototype = object;
            var result = new TemplateClass();
            TemplateClass.prototype = null;
            return result;
        },
        apply = function(object, config) {
            if (object && config && typeof config === 'object') {
                var i, j, k;

                for (i in config) {
                    object[i] = config[i];
                }
                if (enumerables) {
                    for (j = enumerables.length; j--;) {
                        k = enumerables[j];
                        if (config.hasOwnProperty(k)) {
                            object[k] = config[k];
                        }
                    }
                }
            }
        };
    var Base = function() {};
    apply(Base, {
        $isClass: true,
        extend: function(SuperClass) {
            var superPrototype = SuperClass.prototype,
                basePrototype, prototype, name;

            prototype = this.prototype = chain(superPrototype);
            this.superclass = prototype.superclass = superPrototype;

            if (!SuperClass.$isClass) {
                basePrototype = Base.prototype;
                for (name in basePrototype) {
                    if (name in prototype) {
                        prototype[name] = basePrototype[name];
                    }
                }
            }
        },
        addStatics: function(members) {
            var member, name;
            for (name in members) {
                if (members.hasOwnProperty(name)) {
                    member = members[name];
                    this[name] = member;
                }
            }
            return this;
        },
        addMembers: function(members) {
            var prototype = this.prototype,
                names = [],
                i, ln, name, member;

            for (name in members) {
                names.push(name);
            }

            if (enumerables) {
                names.push.apply(names, enumerables);
            }

            for (i = 0, ln = names.length; i < ln; i++) {
                name = names[i];

                if (members.hasOwnProperty(name)) {
                    member = members[name];

                    if (typeof member == 'function' && !member.$isClass) {
                        member.$owner = this;
                        member.$name = name;
                    }

                    prototype[name] = member;
                }
            }

            return this;
        },
        implement: function() {
            this.addMembers.apply(this, arguments);
        }
    });
    apply(Base.prototype, {
        $isInstance: true,
        callParent: function(args) {
            var method,
                superMethod = (method = this.callParent.caller) &&
                (method = method.$owner ? method : method.caller) &&
                method.$owner.superclass[method.$name];

            return superMethod.apply(this, args ? slice.call(args, 0) : noArgs);
        },
        constructor: function() {
            return this;
        }
    });
    var makeCtor = function() {
        function constructor() {
            return this.constructor.apply(this, arguments) || null;
        }
        return constructor;
    };
    var extend = function(newClass, newClassExtend) {
        var basePrototype = Base.prototype,
            SuperClass, superPrototype, name;

        if (newClassExtend && newClassExtend !== Object) {
            SuperClass = newClassExtend;
        } else {
            SuperClass = Base;
        }

        superPrototype = SuperClass.prototype;

        if (!SuperClass.$isClass) {
            for (name in basePrototype) {
                if (!superPrototype[name]) {
                    superPrototype[name] = basePrototype[name];
                }
            }
        }
        newClass.extend(SuperClass);
    };
    var Klass = {
        define: function(newClassExtend, overrides) {
            var newClass, name;

            if (!newClassExtend && !overrides) {
                newClassExtend = Base;
                overrides = {};
            } else if (!overrides) {
                overrides = newClassExtend;
                newClassExtend = Base;
            }
            newClass = makeCtor();
            for (name in Base) {
                newClass[name] = Base[name];
            }
            if (overrides.statics) {
                newClass.addStatics(overrides.statics);
                delete overrides.statics;
            }
            extend(newClass, newClassExtend);
            newClass.addMembers(overrides);

            return newClass;
        }
    };
    if (typeof module === 'object' && module && typeof module.exports ===
        'object') {
        module.exports = Klass;
    } else if (typeof define === 'function') {
        define('klass', [], function() {
            return Klass;
        });
    }
    if (typeof global === 'object' && typeof global.document === 'object') {
        global.Klass = Klass;
    }
}());