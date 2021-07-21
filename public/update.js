/* global pNameToElm*/
function timeDatalist() {
  document.getElementById("timeListTime").value = new Date().toLocaleString(
    "en-US",
    {
      hour: "numeric",
      minute: "numeric",
      hour12: true
    }
  );
}
function updateTimeDatalist() {
  timeDatalist();
  setInterval(timeDatalist, 60000);
}
function print(copied) {
  [".time", ".room", ".dr", ".remove"].forEach(selector => {
    document
      .getElementById("patient-template")
      .content.querySelectorAll(selector)
      .forEach(e => {
        e.parentNode.removeChild(e);
      });
  });
  [(".time", ".room", ".dr", ".EX")].forEach(selector => {
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
    //used before defined. Should be fine...
    pNameToElm(copied[i][1], id);
    let e = document.getElementById(id);
    e.getElementsByClassName("pt-type")[0].value = copied[i][2];
    e.getElementsByClassName("apt-time")[0].value = copied[i][0];
  }
}
