!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},r={},n=e.parcelRequirec88a;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in r){var n=r[e];delete r[e];var o={id:e,exports:{}};return t[e]=o,n.call(o.exports,o,o.exports),o.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){r[e]=t},e.parcelRequirec88a=n),n("4fDmg"),n("1ldjK"),n("6n1nm");var o=n("gEqtN"),i=n("7vGu6");const a="favoritNews",d=document.querySelector(".gallery"),l=document.querySelector(".errorRequest");window.addEventListener("load",(()=>{!function(e){const t=(0,i.loadLS)(e);if(!t)return;l.classList.add("visually-hidden"),d.classList.remove("visually-hidden"),d.innerHTML=t.map(o.createCard).join(""),Array.from(document.querySelectorAll("#cardNews")).forEach((e=>{e.classList.add("inFavorite"),e.querySelector("#favorit-txt").textContent="Remove from favorite"}))}(a)})),d.addEventListener("click",(function(e){if(e.target.classList.contains("js-tartet-favorite")){const t=e.target.closest(".js-card-item"),r=t.dataset.targetId,n=(0,i.loadLS)(a),o=n.findIndex((e=>e.id===r));n.splice(o,1),(0,i.saveLS)(a,n),n.length||((0,i.removeLS)(a),l.classList.remove("visually-hidden"),d.classList.add("visually-hidden")),t.remove()}}))}();
//# sourceMappingURL=favorite.bdfb3d14.js.map