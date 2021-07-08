let wsWaitInit = () => {
  function packager(ptId) {
    console.log(this);
    window.WS.send([
      "type-sync",
      { id: ptId, value: this.value, classes: String(this.classList) }
    ]);
  }
  function noTab(event) {
    if (event.key === "Tab") {
      event.preventDefault();
    }
  }
  function clickTextEventHandler(event, pt) {
    let elm = event.target;
    let changeHandle = packager.bind(elm, pt.id);
    elm.addEventListener("input", changeHandle);
    elm.addEventListener("keydown", noTab);
    elm.addEventListener(
      "blur",
      () => {
        elm.removeEventListener("input", changeHandle);
        elm.removeEventListener("keydown", noTab);
      },
      { once: true }
    );
  }
  document.getElementById("main").addEventListener("click", (ev) => {
    let pt = ev.path.find((v) => v.classList?.contains("patient"));
    if (ev.target.tagName === "INPUT" && pt && pt.id && pt.id !== "set") {
      if (ev.target.type === "text") {
        clickTextEventHandler(ev, pt);
      }
    }
  });
};
