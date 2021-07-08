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
