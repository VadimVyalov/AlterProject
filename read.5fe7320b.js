var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},a={},n=e.parcelRequirec88a;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in a){var n=a[e];delete a[e];var r={id:e,exports:{}};return t[e]=r,n.call(r.exports,r,r.exports),r.exports}var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,t){a[e]=t},e.parcelRequirec88a=n),n("iNfi8"),n("6m6bG"),n("dvsPb"),n("dvsPb"),n("c4a1C");var r=n("2ltYP"),s=n("h5mQC"),d=n("idTct");const i="readNews",o="favoriteNews",l=document.querySelector(".date-block"),c=document.querySelector(".errorRequest");window.addEventListener("load",(()=>{!function(e){let t=(0,s.loadLS)(e),a="0000/00/00";if(!t)return;r.arrLastData.length=0,r.arrLastData.push(...t),c.classList.add("visually-hidden"),l.classList.remove("visually-hidden"),a=t[0].readDate,t.push({readDate:"0"});const n=[];t.forEach((e=>{if(a!==e.readDate){const t=document.createElement("div");t.innerHTML=`<span class="btn-span">${a}</span>\n                                    <svg class="icon-down-read-pg icon-rotate" width="15" height="15">\n                                         <use href="${d.icon}#icon-arrow-down"></use>\n                                    </svg>`,l.append(t);const r=document.createElement("UL");t.classList.add("date-title"),r.classList.add("gallery"),r.classList.add("visually-hidden"),r.innerHTML=n.map(d.createCard).join(""),l.append(r),a=e.readDate,n.length=0}n.push(e)})),(0,d.checkFavorites)(o),t.pop(),(0,s.loadLS)(i,t)}(i)}));document.querySelector("#readNews").addEventListener("click",d.togleFaforite);document.getElementById("readNews").addEventListener("click",(function(e){e.target.classList.contains("date-title")&&(e.target.nextSibling.classList.toggle("visually-hidden"),e.target.classList.toggle("rotate"))}));
//# sourceMappingURL=read.5fe7320b.js.map