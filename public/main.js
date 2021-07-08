/* global addElm, getTempClone, newPt, updateTimeDatalist, timeDatalist, wsWaitInit*/
function setRow() {
  let elm = getTempClone();
  elm = addElm(elm, "ptt");
  elm.id = "set";
  let ptNameElm = elm.getElementsByClassName("pt-name")[0];
  Array.from(elm.getElementsByTagName("input"))
    .slice(1)
    .forEach((input) => {
      input.disabled = true;
      console.log(input);
    });
  ptNameElm.addEventListener("change", newPt);
}
function ready(callback) {
  // in case the document is already rendered
  if (document.readyState !== "loading") callback();
  // modern browsers
  else {
    document.addEventListener("DOMContentLoaded", callback);
  }
}
timeDatalist();
setTimeout(updateTimeDatalist, (60 - new Date().getSeconds()) * 1000);
ready(setRow);
ready(wsWaitInit);
