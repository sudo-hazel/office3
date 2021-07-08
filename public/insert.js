function getTempClone(id) {
  return document.getElementById("patient-template").content.cloneNode(true);
}

function pNameToElm(name, id) {
  let clone = getTempClone();
  clone = addElm(clone, "ptt");
  console.log(clone);
  clone.id = id;
  clone.getElementsByClassName("pt-name")[0].value = name;
  return clone;
}
function addElm(elm, id) {
  document.getElementById("mainbody").appendChild(elm);
  return document.getElementById(id);
}
function newPt(changeEvent) {
  let name = changeEvent.target.value;
  let id = "pt-" + btoa(name + Date.now());
  let ret = pNameToElm(name, id);
  changeEvent.target.value = "";
  window.WS.send(["new-pt", { id: id, name: name }]);
  return ret;
}
