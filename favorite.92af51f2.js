!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},r={},n=e.parcelRequirec88a;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in r){var n=r[e];delete r[e];var o={id:e,exports:{}};return t[e]=o,n.call(o.exports,o,o.exports),o.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){r[e]=t},e.parcelRequirec88a=n),n("5cZWW"),n("4fDmg"),n("1ldjK"),n("6n1nm");var o=n("7vGu6"),i=n("9HPth");const a="favoriteNews",d=document.querySelector(".gallery"),l=document.querySelector(".errorRequest");window.addEventListener("load",(()=>{!function(e){const t=(0,o.loadLS)(e);if(!t)return;l.classList.add("visually-hidden"),d.classList.remove("visually-hidden"),d.innerHTML=t.map(i.createCard).join(""),Array.from(document.querySelectorAll(".card")).forEach((e=>{e.classList.add("inFavorite"),e.querySelector(".favorite-description").textContent="Remove from favorite"}))}(a)})),d.addEventListener("click",(function(e){if(e.target.classList.contains("js-tartet-favorite")){const t=e.target.closest(".js-card-item"),r=t.dataset.targetId,n=(0,o.loadLS)(a),i=n.findIndex((e=>e.id===r));n.splice(i,1),(0,o.saveLS)(a,n),n.length||((0,o.removeLS)(a),l.classList.remove("visually-hidden"),d.classList.add("visually-hidden")),t.remove()}}))}();
//# sourceMappingURL=favorite.92af51f2.js.map
