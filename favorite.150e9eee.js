function e(e,t,r,n){Object.defineProperty(e,t,{get:r,set:n,enumerable:!0,configurable:!0})}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},n={},s=t.parcelRequirec88a;null==s&&((s=function(e){if(e in r)return r[e].exports;if(e in n){var t=n[e];delete n[e];var s={id:e,exports:{}};return r[e]=s,t.call(s.exports,s,s.exports),s.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){n[e]=t},t.parcelRequirec88a=s),s.register("kyEFX",(function(t,r){var n,s;e(t.exports,"register",(function(){return n}),(function(e){return n=e})),e(t.exports,"resolve",(function(){return s}),(function(e){return s=e}));var a={};n=function(e){for(var t=Object.keys(e),r=0;r<t.length;r++)a[t[r]]=e[t[r]]},s=function(e){var t=a[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),s("kyEFX").register(JSON.parse('{"bTGq4":"favorite.150e9eee.js","kqMTO":"icon.a66ccba6.svg"}'));const a=document.querySelector(".btn-search"),i=document.querySelector(".input-text");a.addEventListener("click",(function(){document.documentElement.clientWidth<768&&(i.classList.toggle("mob-input"),a.style.position="absolute",a.style.top="6px",a.style.left="14px")})),i.classList.contains("mob-input")||(a.style.position="");const o=document.querySelector(".switch__input");function l(e){return localStorage.setItem("mode",e)}o.addEventListener("click",(function(e){console.log(e.currentTarget),e.currentTarget.checked?(document.documentElement.classList.add("dark"),document.documentElement.classList.remove("light"),l("dark")):(o.classList.remove("dark_null"),document.documentElement.classList.remove("dark"),document.documentElement.classList.add("light"),l("light"))})),function(){const e=localStorage.getItem("mode");null===e&&l("light");"light"===e&&(o.checked=!1);"dark"===e&&(document.documentElement.classList.add("dark"),document.documentElement.classList.remove("light"),o.classList.add("dark_null"),o.checked=!0)}();const c=window.location.pathname,d=document.getElementById("home-link"),u=document.getElementById("favorite-link"),m=document.getElementById("read-link");c.includes("/index.html")?d.classList.add("current"):c.includes("/favorite.html")?u.classList.add("current"):c.includes("/read.html")&&m.classList.add("current"),console.log(c);const f=document.querySelector(".gallery"),g=document.querySelector(".errorRequest");var p;p=new URL(s("kyEFX").resolve("kqMTO"),import.meta.url).toString();const v=new URL(p),h=JSON.parse(localStorage.getItem("favoriteNews"));!function(){if(!Boolean(h))return void g.classList.remove("visually-hidden");let e="";e=h.map((({id:e,section:t,imgUrl:r,title:n,abstract:s,newDateStr:a,url:i})=>`<li class="card js-card-item" data-target-id=${e}>\n        <div class="wrap-image">\n          <img\n            src="${r}"\n            alt="photo"\n            class="wrap-image__photo"\n          />\n          <p class="wrap-image__text">${t}</p>\n          <button type="button"  class="wrap-image__btn js-is-favorite">\n            <span class="wrap-image__btn-text js-is-favorite">Remove from favorite</span>\n              <svg class="js-is-favorite fill-heard" width="16" height="16">\n                <use class="js-is-favorite" href ='${v}#icon-heart'></use>\n              </svg>\n          </button>\n        \n        </div>\n            <h2 class="card__title">${n}</h2>\n            <p class="card__description">${s.length>112?s.slice(0,113)+"...":s}</p>\n            <div class="wrap-info">\n                <p class="wrap-info__time">${a}</p>\n                <a href="${i}" class="wrap-info__link">Read more</a>\n            </div>\n      </li>`)).join(""),f.insertAdjacentHTML("beforeend",e)}();const _="favoriteNews",y=document.querySelector(".gallery"),w=document.querySelector(".errorRequest");y.addEventListener("click",(function(e){if(e.target.classList.contains("js-is-favorite")){!function(e){const t=document.querySelector(`li[data-target-id='${e}'] span.js-is-favorite`),r=document.querySelector(`li[data-target-id='${e}'] button.js-is-favorite`),n=document.querySelector(`li[data-target-id='${e}'] svg.js-is-favorite`),s=document.querySelector(`li[data-target-id='${e}'] use.js-is-favorite`),a=document.querySelector(`li[data-target-id='${e}']`);let i=JSON.parse(localStorage.getItem(_));const o=i.findIndex((t=>Number(t.id)===Number(e)));i.splice(o,1),localStorage.setItem(_,JSON.stringify(i)),i=JSON.parse(localStorage.getItem(_)),0===i.length&&(localStorage.removeItem(_),w.classList.remove("visually-hidden"));t.classList.replace("js-is-favorite","js-tartet-favorite"),r.classList.replace("js-is-favorite","js-tartet-favorite"),n.classList.replace("js-is-favorite","js-tartet-favorite"),s.classList.replace("js-is-favorite","js-tartet-favorite"),a.remove()}(e.target.closest(".js-card-item").dataset.targetId)}}));const b=JSON.parse(localStorage.getItem("favoriteNews")),S=document.querySelector(".gallery"),L=document.querySelector(".errorRequest");document.querySelector(".search-form").addEventListener("submit",(function(e){e.preventDefault();const t=e.currentTarget.elements.searchQuery.value.trim();let r="";r=b.map((({id:e,section:r,imgUrl:n,title:s,abstract:a,newDateStr:i,url:o})=>{if(s.toLowerCase().includes(t.toLowerCase()))return`<li class="card js-card-item" data-target-id=${e}>\n            <div class="wrap-image">\n              <img\n                src="${n}"\n                alt="photo"\n                class="wrap-image__photo"\n              />\n              <p class="wrap-image__text">${r}</p>\n              <button type="button"  class="wrap-image__btn js-is-favorite">\n                <span class="wrap-image__btn-text js-is-favorite">Remove from favorite</span>\n                  <svg class="js-is-favorite fill-heard" width="16" height="16">\n                    <use class="js-is-favorite" href ='${v}#icon-heart'></use>\n                  </svg>\n              </button>\n            \n            </div>\n                <h2 class="card__title">${s}</h2>\n                <p class="card__description">${a.length>112?a.slice(0,113)+"...":a}</p>\n                <div class="wrap-info">\n                    <p class="wrap-info__time">${i}</p>\n                    <a href="${o}" class="wrap-info__link">Read more</a>\n                </div>\n          </li>`})).join(""),Boolean(r)||L.classList.remove("visually-hidden");S.innerHTML=r}));
//# sourceMappingURL=favorite.150e9eee.js.map
