
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
        ajax : function(temp) {
            for (var i in temp) {
                switch (i) {
                    case "type":
                        var type = temp[i];
                        break;
                    case "data":
                        var data = temp[i];
                        break;
                    case "url":
                        var url = temp[i];
                        break;
                    case "async":
                        var async = temp[i];
                        break;
                    case  "success":
                        var fn = temp[i];
                        break;
                    case  "error":
                        var erfn = temp[i];
                        break;
                    default:
                        break;
                }
            }
            var xmlHttp;
            function createxmlHttpRequest() {
                if (window.ActiveXObject) {
                    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
                } else if (window.XMLHttpRequest) {
                    xmlHttp = new XMLHttpRequest();
                }
            }
            if(type ==="get"){
                createxmlHttpRequest();
                if(async!=undefined){
                    xmlHttp.open("GET",url,async);
                }else{
                    xmlHttp.open("GET",url);
                }
                xmlHttp.send(data);
                xmlHttp.onreadystatechange = function() {
                    if ((xmlHttp.readyState == 4) && (xmlHttp.status == 200)) {
                        fn(xmlHttp.responseText);
                    } else {
                        erfn();
                    }
                }
            }else if(type ==="post"){
                createxmlHttpRequest();
                xmlHttp.open("POST",url,async);
                xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                xmlHttp.send(data);
                xmlHttp.onreadystatechange = function() {
                    if ((xmlHttp.readyState == 4) && (xmlHttp.status == 200)) {
                        fn(xmlHttp.responseText)
                    } else {
                        erfn();
                    }
                }
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
        },
        on : function(temp,fn){
            if(this.elem.attachEvent){
                this.elem.attachEvent("on"+temp,fn);
            }else if(this.elem.addEventListener){
                this.elem.addEventListener(temp,fn,false);
            };
            return this;
        },
        un : function(temp,fn){
            if(this.elem.attachEvent){
                this.elem.detachEvent("on"+temp,fn);
            }else if(this.elem.addEventListener){
                this.elem.removeEventListener(temp,fn,false);
            };
        },
        controller: function(fn){
            var $scope = {};
            console.log(this.elem.children)
            for(var i= 0,len=this.elem.children.length;i<len;i++){
                var temp = this.elem.children[i];
                var name =temp.getAttribute("model");
                var that = this;
                if(name){
                    (function(i) {
                        temp.onchange = function () {
                            $scope[name] = that.elem.children[i].value;
                            fn($scope);
                        }
                        fn($scope);
                        if($scope[name]) {
                            that.elem.children[i].value = $scope[name];
                            temp.setAttribute('model',$scope[name]);
                        }
                    })(i)
                }
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

