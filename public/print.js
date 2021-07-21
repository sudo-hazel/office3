/* global pNameToElm*/
function print(copied) {
  [".time", ".room", ".dr", ".remove"].forEach(selector => {
    document
      .getElementById("patient-template")
      .content.querySelectorAll(selector)
      .forEach(e => {
        e.parentNode.removeChild(e);
      });
  });
  [".time", ".room", ".dr", ".EX",".remove"].forEach(selector => {
    document.querySelectorAll(selector).forEach(e => {
      e.parentNode.removeChild(e);
    });
  });
  Array.from(document.styleSheets[0].rules).forEach((rule, index) => {
    if (rule.selectorText == "th.apt-timet") {
      console.log(rule.style.setProperty("width", "20%"));
    }
  });
  for (let i = 0; i < copied.length; i++) {
    let id = "pt-" + i;
    pNameToElm(copied[i][1], id);
    let e = document.getElementById(id);
    e.getElementsByClassName("pt-type")[0].value = copied[i][2];
    e.getElementsByClassName("apt-time")[0].value = copied[i][0];
  }
  navigator.clipboard.writeText("");
}
/* TamperMonkey 

// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://rapid08.acomhealth.com/95ZON8867/
// @icon         https://www.google.com/s2/favicons?domain=acomhealth.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let r=Array.from(document.getElementsByClassName("ext-evt-bd"))
  .map(e => e.textContent)
  .filter(e => !e.includes("  Adjustment"))
  .filter(e => !e.includes("  Jtech"))
  .filter(e => !e.includes("  Lunch"))
  .filter(e => !e.includes("  Payment"))
  .filter(e => !e.includes("  Spot Checks"))
  .filter(e => !e.includes("  Make up visit"))
  .filter(e => !e.includes("  Financials Only-Already reviewed results"))
  .filter(e => !e.includes("  Shock Wave"))
  .map(e => e.replace(/  +/, "|"))
  .map(e => e.trim())
  .map(e => e.replace(/(?<=\d\d..) /, "|"))
  .map(e => e.split("|"))
  .map(e => {
    e[0] = e[0].replace("am", " AM");
    return e;
  })
  .map(e => {
    e[0] = e[0].replace("pm", " PM");
    return e;
  });
function compare(d1,d2){
//+ if d1>d2(after)

    if(d1.includes("12:")){d1.includes("P")?d1=d1.replace("P", "A"):d1=d1.replace("A", "P")}
    if(d2.includes("12:")){d2.includes("P")?d2=d2.replace("P", "A"):d2=d2.replace("A", "P")}
    if(d1[d1.length-2]!=d2[d2.length-2]){if (d1[d1.length-2]=='P'){return 1}; return -1;}
    d1=Number(d1.replace(":","").replace(/ ../,""));
    d2=Number(d2.replace(":","").replace(/ ../,""));
    if (d1>d2){return 1}
    if (d2>d1){return -1}
    return 0;

}
navigator.clipboard.writeText((JSON.stringify(r.sort((e,b)=>{return compare(e[0],b[0])}))))
alert("Copied!")
})();  

*/