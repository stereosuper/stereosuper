!function(a,b){"function"==typeof define&&define.amd?define(b):"object"==typeof exports?module.exports=b():a.objectFitPolyfill=b()}(this,function(){"use strict";if("objectFit"in document.documentElement.style==!1){var a=function(a){var b=window.getComputedStyle(a,null),c=b.getPropertyValue("position"),d=b.getPropertyValue("overflow"),e=b.getPropertyValue("display");c&&"static"!==c||(a.style.position="relative"),"hidden"!==d&&(a.style.overflow="hidden"),e&&"inline"!==e||(a.style.display="block"),0===a.clientHeight&&(a.style.height="100%"),a.className=a.className+" object-fit-polyfill"},b=function(a){var b=window.getComputedStyle(a,null),c={"max-width":"none","max-height":"none","min-width":"0px","min-height":"0px"};for(var d in c){var e=b.getPropertyValue(d);e!==c[d]&&(a.style[d]=c[d])}},c=function(a,b,c){c=c.split(" ");var d,e,f,g,h;if("x"===a)d=c[0],e=c[1],f="left",g="right",h=b.clientWidth;else{if("y"!==a)return;d=c[1],e=c[0],f="top",g="bottom",h=b.clientHeight}return d===f||e===f?void(b.style[f]="0"):d===g||e===g?void(b.style[g]="0"):"center"===d||"50%"===d?(b.style[f]="50%",void(b.style["margin-"+f]=h/-2+"px")):d.indexOf("%")>=0?(d=parseInt(d),void(d<50?(b.style[f]=d+"%",b.style["margin-"+f]=h*(d/-100)+"px"):(d=100-d,b.style[g]=d+"%",b.style["margin-"+g]=h*(d/-100)+"px"))):void(b.style[f]=d)},d=function(d){var e=d.dataset?d.dataset.objectFit:d.getAttribute("data-object-fit"),f=d.dataset?d.dataset.objectPosition:d.getAttribute("data-object-position");e=e||"cover",f=f||"50% 50%";var g=d.parentNode;a(g),b(d),d.style.position="absolute",d.style.height="100%",d.style.width="auto","scale-down"===e&&(d.style.height="auto",d.clientWidth<g.clientWidth&&d.clientHeight<g.clientHeight?(c("x",d,f),c("y",d,f)):(e="contain",d.style.height="100%")),"none"===e?(d.style.width="auto",d.style.height="auto",c("x",d,f),c("y",d,f)):"cover"===e&&d.clientWidth>g.clientWidth||"contain"===e&&d.clientWidth<g.clientWidth?(d.style.top="0",d.style.marginTop="0",c("x",d,f)):"scale-down"!==e&&(d.style.width="100%",d.style.height="auto",d.style.left="0",d.style.marginLeft="0",c("y",d,f))},e=function(){for(var a=document.querySelectorAll("[data-object-fit]"),b=0;b<a.length;b++){var c=a[b].nodeName.toLowerCase();"img"===c?a[b].complete?d(a[b]):a[b].addEventListener("load",function(){d(this)}):"video"===c&&(a[b].readyState>0?d(a[b]):a[b].addEventListener("loadedmetadata",function(){d(this)}))}};return document.addEventListener("DOMContentLoaded",function(){e()}),window.addEventListener("resize",function(){e()}),e}});
