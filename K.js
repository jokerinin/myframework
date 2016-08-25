
        ;(function(){
            var version = '1.0.0',
                    KQ = function(selector){
                        return new KQ.fn.init(selector)
                    };
            KQ.fn = KQ.prototype = {
                elem : "",
                version : version,
                    constructor: KQ,
                eq : function(num){
                    for(var i=0,len=this.elem.length;i<len;i++){
                        this[i] = this.elem[i];
                    }
                    this.elem = this[num]
                    return this;
                },
                remove : function(em){
                    var temp = this.elem.querySelector(em);
                    this.elem.removeChild(temp);
                },
                child : function(){
                    this.elem = this.elem.children;
                    return this;
                },
                pre : function(){
                    while(this.elem.previousSibling.nodeType != 1){
                        this.elem = this.elem.previousSibling;
                    }
                    this.elem = this.elem.previousSibling;
                    return this;
                },
                has : function(em){
                    this.elem =this.elem.querySelectorAll(em);
                    return this;
                },
                sub : function(){
                    while(this.elem.nextSibling.nodeType != 1){
                        this.elem = this.elem.nextSibling;
                    }
                    this.elem = this.elem.nextSibling;
                    return this;
                },
                setSize : function(){
                    this.elem.style.color = 'yellow';
                    return this;
                },
                parent : function(){
                    this.elem = this.elem.parentNode;
                    return this;
                },
                css : function(json){
                    if(typeof(json)=="object") {
                        for (var i in json) {
                            var nature = rotateName(i);
                            this.elem.style[nature] = json[i];
                        }
                        return this;
                    }else if(typeof(json)=="string"){
                        var nature = rotateName(json);
                        return this.elem.style[nature];
                    }
                    function rotateName(temp){
                       return temp.replace(/-(\w{1})/,function(){return arguments[1].toUpperCase()})
                    }
                },
                attr : function(temp){
                    if(typeof(temp)=="object"){
                        for(var i in temp){
                            this.elem.setAttribute(i,temp[i]);
                        }
                        return this;
                    }else{
                        return this.elem.getAttribute(temp);
                    }
                }

            };

            KQ.fn.init = function(selector){
                if(!selector){
                    return this;
                }else{
                    var em = document.querySelectorAll(selector);
                    if (selector.match(/#\w+/)) {
                        this.elem = em[0];
                        this.length = em.length;
                    } else {
                        this.elem = em;
                    }


                    return this;
                };
            };
            KQ.extend = KQ.fn.extend = function(){

            };
            KQ.fn.init.prototype = KQ.fn;
            window.K = window.KQ = KQ;
        })(window);
        var Ktemp = K(".name");