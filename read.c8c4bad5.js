function e(e,t,n,r){Object.defineProperty(e,t,{get:n,set:r,enumerable:!0,configurable:!0})}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},a=t.parcelRequirec88a;null==a&&((a=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var a={id:e,exports:{}};return n[e]=a,t.call(a.exports,a,a.exports),a.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){r[e]=t},t.parcelRequirec88a=a),a.register("kyEFX",(function(t,n){var r,a;e(t.exports,"register",(function(){return r}),(function(e){return r=e})),e(t.exports,"resolve",(function(){return a}),(function(e){return a=e}));var o={};r=function(e){for(var t=Object.keys(e),n=0;n<t.length;n++)o[t[n]]=e[t[n]]},a=function(e){var t=o[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),a("kyEFX").register(JSON.parse('{"2zqmF":"read.c8c4bad5.js","kqMTO":"icon.a66ccba6.svg","j7NJQ":"favorite.3b4140f0.js"}')),a("iNfi8"),a("6m6bG"),a("dvsPb"),a("dvsPb"),a("c4a1C");var o=a("2ltYP"),i=a("h5mQC"),s=a("idTct");const d="readNews",l="favoriteNews",c=document.querySelector(".date-block"),u=document.querySelector(".errorRequest");var f;f=new URL(a("kyEFX").resolve("kqMTO"),import.meta.url).toString();const g=new URL(f);window.addEventListener("load",(()=>{!function(e){let t=(0,i.loadLS)(e),n="0000/00/00";if(!t)return;o.arrLastData.length=0,o.arrLastData.push(...t),u.classList.add("visually-hidden"),c.classList.remove("visually-hidden"),n=t[0].readDate,t.push({readDate:"0"});const r=[];t.forEach((e=>{if(n!==e.readDate){const t=document.createElement("div");t.innerHTML=`<span class="btn-span">${n}</span>\n                                    <svg class="icon-down-read-pg icon-rotate" width="15" height="15">\n                                         <use href="${g}#icon-arrow-down"></use>\n                                    </svg>`,c.append(t);const a=document.createElement("UL");t.classList.add("date-title"),a.classList.add("gallery"),a.classList.add("visually-hidden"),a.innerHTML=r.map(s.createCard).join(""),c.append(a),n=e.readDate,r.length=0}r.push(e)})),(0,s.checkFavorites)(l),t.pop(),(0,i.loadLS)(d,t)}(d)}));document.querySelector("#readNews").addEventListener("click",s.togleFaforite);document.getElementById("readNews").addEventListener("click",(function(e){e.target.classList.contains("date-title")&&(e.target.nextSibling.classList.toggle("visually-hidden"),e.target.classList.toggle("rotate"))}));
//# sourceMappingURL=read.c8c4bad5.js.map