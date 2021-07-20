function cellsToJSON() {
  let transfer = Array.from(document.getElementsByTagName("INPUT")).map(
    e => e.value
  );
  let html = Array.from(document.getElementsByClassName("patient"))
    .slice(1)
    .map(e => e.outerHTML);
  return { transfer, html };
}
function JSONToCells(json) {
  let anch = document.getElementById("mainbody");
  json.html.forEach(htm => {
    anch.insertAdjacentHTML("beforeend", htm);
  });

  Array.from(document.getElementsByTagName("INPUT")).forEach((elm, i) => {
    elm.value = json.transfer[i];
  });
}
