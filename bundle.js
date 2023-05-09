(()=>{var e={426:(e,t,n)=>{"use strict";n.d(t,{Z:()=>s});var r=n(81),o=n.n(r),i=n(645),a=n.n(i)()(o());a.push([e.id,"html,\nbody {\n    height: 100%;\n    width: 100%;\n    font-family: 'Roboto', sans-serif;\n}\n\n@media (min-width: 1200px) {\n    .container{\n        max-width: 1500px;\n    }\n}\n\n.container {\n    padding: 20px;\n}\n\n#text_content {\n    width: 100%;\n    height: 100%;\n}\n\n#generate_step_1, #generate_step_2 {\n    display: none;\n    opacity: 0;\n}\n\n#generate_step_2 li {\n    font-weight: bolder;\n    font-size: large;\n}\n\n.generated_command_copy_button {\n    transition: opacity 0.3s;\n}\n\n.generated_command_copy_button:hover {\n    opacity: 0.5;\n    cursor: pointer;\n    transition: opacity 0.3s;\n}\n\n.generated_command_copy_button_icon {\n    color: black;\n    max-width: 20px;\n    transition: opacity 0.3s;\n}\n\n.move-in-animation {\n    display: block !important;\n    opacity: 0;\n    transform: translateY(-10px);\n    animation-name: slide-in;\n    animation-duration: 0.5s;\n    animation-fill-mode: forwards;\n}\n\n.move-out-animation {\n    opacity: 0;\n    transform: translateY(0px);\n    animation-name: slide-out;\n    animation-duration: 0.5s;\n    animation-fill-mode: forwards;\n}\n\n@keyframes slide-in {\n    0% {\n        opacity: 0;\n        transform: translateY(-10px);\n    }\n\n    100% {\n        opacity: 1;\n        transform: translateY(0);\n    }\n}\n\n@keyframes slide-out {\n    0% {\n        opacity: 1;\n        transform: translateY(0);\n    }\n\n    100% {\n        opacity: 0;\n        transform: translateY(-10px);\n    }\n}\n",""]);const s=a},645:e=>{"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",r=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),r&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),r&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,r,o,i){"string"==typeof e&&(e=[[null,e,void 0]]);var a={};if(r)for(var s=0;s<this.length;s++){var c=this[s][0];null!=c&&(a[c]=!0)}for(var u=0;u<e.length;u++){var l=[].concat(e[u]);r&&a[l[0]]||(void 0!==i&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=i),n&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=n):l[2]=n),o&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=o):l[4]="".concat(o)),t.push(l))}},t}},81:e=>{"use strict";e.exports=function(e){return e[1]}},654:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>v});var r=n(379),o=n.n(r),i=n(795),a=n.n(i),s=n(569),c=n.n(s),u=n(565),l=n.n(u),p=n(216),d=n.n(p),f=n(589),h=n.n(f),m=n(426),w={};w.styleTagTransform=h(),w.setAttributes=l(),w.insert=c().bind(null,"head"),w.domAPI=a(),w.insertStyleElement=d(),o()(m.Z,w);const v=m.Z&&m.Z.locals?m.Z.locals:void 0},379:e=>{"use strict";var t=[];function n(e){for(var n=-1,r=0;r<t.length;r++)if(t[r].identifier===e){n=r;break}return n}function r(e,r){for(var i={},a=[],s=0;s<e.length;s++){var c=e[s],u=r.base?c[0]+r.base:c[0],l=i[u]||0,p="".concat(u," ").concat(l);i[u]=l+1;var d=n(p),f={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==d)t[d].references++,t[d].updater(f);else{var h=o(f,r);r.byIndex=s,t.splice(s,0,{identifier:p,updater:h,references:1})}a.push(p)}return a}function o(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,o){var i=r(e=e||[],o=o||{});return function(e){e=e||[];for(var a=0;a<i.length;a++){var s=n(i[a]);t[s].references--}for(var c=r(e,o),u=0;u<i.length;u++){var l=n(i[u]);0===t[l].references&&(t[l].updater(),t.splice(l,1))}i=c}}},569:e=>{"use strict";var t={};e.exports=function(e,n){var r=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},216:e=>{"use strict";e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},565:(e,t,n)=>{"use strict";e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},795:e=>{"use strict";e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var r="";n.supports&&(r+="@supports (".concat(n.supports,") {")),n.media&&(r+="@media ".concat(n.media," {"));var o=void 0!==n.layer;o&&(r+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),r+=n.css,o&&(r+="}"),n.media&&(r+="}"),n.supports&&(r+="}");var i=n.sourceMap;i&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),t.styleTagTransform(r,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},589:e=>{"use strict";e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}},869:(e,t,n)=>{"use strict";n.r(t);const r=n.p+"e16a75a1c65052b50ba7.png";var o=function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{c(r.next(e))}catch(e){i(e)}}function s(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}c((r=r.apply(e,t||[])).next())}))},i=function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(s){return function(c){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;i&&(i=0,s[0]&&(a=0)),a;)try{if(n=1,r&&(o=2&s[0]?r.return:s[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,s[1])).done)return o;switch(r=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:case 1:o=s;break;case 4:return a.label++,{value:s[1],done:!1};case 5:a.label++,r=s[1],s=[0];continue;case 7:s=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==s[0]&&2!==s[0])){a=0;continue}if(3===s[0]&&(!o||s[1]>o[0]&&s[1]<o[3])){a.label=s[1];break}if(6===s[0]&&a.label<o[1]){a.label=o[1],o=s;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(s);break}o[2]&&a.ops.pop(),a.trys.pop();continue}s=t.call(e,a)}catch(e){s=[6,e],r=0}finally{n=o=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,c])}}},a=function(){function e(e,t){this._char=e,this._dots=t}return Object.defineProperty(e.prototype,"letter",{get:function(){return this._char},set:function(e){this._char=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"dots",{get:function(){return this._dots},set:function(e){this._dots=e},enumerable:!1,configurable:!0}),e}(),s=function(){function e(e){this._allChars=[new a("A",5),new a("B",5),new a("C",5),new a("D",5),new a("E",5),new a("F",5),new a("G",5),new a("H",5),new a("I",3),new a("J",5),new a("K",5),new a("L",5),new a("M",5),new a("N",5),new a("O",5),new a("P",5),new a("Q",5),new a("R",5),new a("S",5),new a("T",5),new a("U",5),new a("V",5),new a("W",5),new a("X",5),new a("Y",5),new a("Z",5),new a("a",5),new a("b",5),new a("c",5),new a("d",5),new a("e",5),new a("f",4),new a("g",5),new a("h",5),new a("i",1),new a("j",5),new a("k",4),new a("l",2),new a("m",5),new a("n",5),new a("o",5),new a("p",5),new a("q",5),new a("r",5),new a("s",5),new a("t",3),new a("u",5),new a("v",5),new a("w",5),new a("x",5),new a("y",5),new a("z",5),new a("0",5),new a("1",5),new a("2",5),new a("3",5),new a("4",5),new a("5",5),new a("6",5),new a("7",5),new a("8",5),new a("9",5),new a("!",1),new a("@",6),new a("#",5),new a("$",5),new a("£",5),new a("%",5),new a("^",5),new a("&",5),new a("*",3),new a("(",3),new a(")",3),new a("_",5),new a("-",5),new a("+",5),new a("=",5),new a("~",6),new a("[",3),new a("]",3),new a("{",3),new a("}",3),new a("|",1),new a('"',3),new a(":",1),new a(";",1),new a("'",1),new a('"',3),new a(",",1),new a(".",1),new a("<",4),new a(">",4),new a(".",1),new a("?",5),new a("/",5),new a(" ",3),new a("`",2),new a("“",4),new a("”",4)],this._text=e}return e.prototype.calculateLetters=function(e){for(var t,n=0,r=[],o="",i=function(i){var s=a._allChars.find((function(t){return t.letter==e.charAt(i)}));if(!s)return{value:void 0};n+=s.dots,o=e.substring(0,i),n+o.length+4>=114&&(r.push({word:o,value:n+o.length+4}),e=e.substring(i),i=n=0),t=i},a=this,s=0;s<e.length;s++){var c=i(s);if(s=t,"object"==typeof c)return c.value}return r.push({word:e,value:n+o.length+4}),r},e.prototype.getLines=function(){var e,t=[],n=[],r=0,o=[];e=this._text.split(/\s+/);for(var i=0;i<e.length;i++){n=this.calculateLetters(e[i]);for(var a=0;a<n.length;a++)((r+=n[a].value)>114||i==e.length-1)&&(r=n[a].value,o.push(t.join(" ")),t=[]),t.push(n[a].word)}return o.push(t.join(" ")),o.filter((function(e){return""!=e}))},e}();new(function(){function e(){this._GLOBALS={text_content:document.querySelector("#text_content"),dots_count:document.querySelector("#dots_count"),lines_count:document.querySelector("#lines_count"),pages_count:document.querySelector("#pages_count"),books_count:document.querySelector("#books_count"),submit_btn:document.querySelector("#submit_btn"),progress_bar:document.querySelector("#generate_step_1"),generate_step_2:document.querySelector("#generate_step_2"),create_command_progress_bar:document.querySelector("#create_command_progress_bar"),author:document.querySelector("#author"),title:document.querySelector("#title")},this._lines=[],this.createEventListeners()}return e.prototype.getStats=function(){this._lines=new s(this._GLOBALS.text_content.value).getLines();var e=this._GLOBALS.text_content.value.length,t=this._lines.length,n=Math.ceil(this._lines.length/14),r=Math.ceil(n/100);return[this._lines,e,t,n,r]},e.prototype.updateStats=function(){var e=this.getStats();this._GLOBALS.dots_count.innerHTML=e[1].toString(),this._GLOBALS.lines_count.innerHTML=e[2].toString(),this._GLOBALS.pages_count.innerHTML=e[3].toString(),this._GLOBALS.books_count.innerHTML=e[4].toString()},e.prototype.resetProgressBar=function(){if(this._GLOBALS.progress_bar.classList.contains("move-in-animation")){var e=this._GLOBALS.create_command_progress_bar;e.innerText="Generating...",e.classList.remove("bg-success"),this._GLOBALS.generate_step_2.classList.add("move-out-animation")}},e.prototype.createCommandElements=function(){return o(this,void 0,void 0,(function(){var e,t,n,o,a,s;return i(this,(function(i){switch(i.label){case 0:return e=function(e,t){var n=document.createElement("li"),o=document.createElement("div");o.classList.add("input-group","mb-3","mt-3");var i=document.createElement("div");i.classList.add("input-group-prepend");var a=document.createElement("img");a.setAttribute("src",r),a.setAttribute("class","generated_command_copy_button_icon");var s=document.createElement("input");s.setAttribute("type","text"),s.classList.add("form-control"),s.value=e;var c=document.createElement("span");return c.classList.add("input-group-text","generated_command_copy_button"),c.addEventListener("click",(function(){return t(s)})),c.appendChild(a),i.appendChild(c),o.appendChild(i),o.appendChild(s),n.appendChild(o),n},t=function(e,t,n){if(n||2===arguments.length)for(var r,o=0,i=t.length;o<i;o++)!r&&o in t||(r||(r=Array.prototype.slice.call(t,0,o)),r[o]=t[o]);return e.concat(r||Array.prototype.slice.call(t))}([],this._lines,!0),n=0,o=0,this._GLOBALS.generate_step_2.innerHTML="",[4,new Promise((function(e){return setTimeout(e,500)}))];case 1:for(i.sent(),a=0;a<=this._lines.length;a++)1400!=++n&&a!=this._lines.length||(s=this.createCommand(t.splice(0,n),""==this._GLOBALS.author.value?"Author":this._GLOBALS.author.value,"".concat(""==this._GLOBALS.title.value?"Book":this._GLOBALS.title.value," [").concat(o,"]")),n=0,this._GLOBALS.generate_step_2.appendChild(e(s,(function(e){e.select(),e.setSelectionRange(0,99999),navigator.clipboard.writeText(e.value)}))),o++);return[2]}}))}))},e.prototype.createEventListeners=function(){var e=this;this.updateStats(),this._GLOBALS.text_content.addEventListener("keyup",(function(t){e.updateStats()})),this._GLOBALS.submit_btn.addEventListener("click",(function(t){return o(e,void 0,void 0,(function(){var e,n=this;return i(this,(function(r){return this.resetProgressBar(),t.target.setAttribute("disabled","true"),this._GLOBALS.progress_bar.classList.add("move-in-animation"),e=function(){return o(n,void 0,void 0,(function(){var e;return i(this,(function(n){switch(n.label){case 0:return(e=this._GLOBALS.create_command_progress_bar).classList.add("progress-bar-animated"),e.style.width="".concat(100,"%"),[4,this.createCommandElements()];case 1:return n.sent(),e.innerText="Done!",e.classList.remove("progress-bar-animated"),e.classList.add("bg-success"),t.target.removeAttribute("disabled"),this._GLOBALS.generate_step_2.classList.remove("move-out-animation"),this._GLOBALS.generate_step_2.classList.add("move-in-animation"),[2]}}))}))},e(),[2]}))}))}))},e.prototype.createCommand=function(e,t,n){var r="",o=e.map((function(e,t){if(r+=e+" ",(t+1)%14==0){var n='\'{"text":"'.concat(r,"\"}'");return r="",n}return null})).filter((function(e){return null!==e}));if(r.length>0){var i='\'{"text":"'.concat(r,"\"}'");o.push(i)}var a={id:"minecraft:written_book",author:t,title:n,pages:o};return"/give @p ".concat(a.id,"{pages:[").concat(a.pages,'], title: "').concat(a.title,'", author: "').concat(a.author,'"}').replace(/\\/g,"")},e}())}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={id:r,exports:{}};return e[r](i,i.exports,n),i.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;n.g.importScripts&&(e=n.g.location+"");var t=n.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");if(r.length)for(var o=r.length-1;o>-1&&!e;)e=r[o--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=e})(),n.nc=void 0,n(654),n(869)})();