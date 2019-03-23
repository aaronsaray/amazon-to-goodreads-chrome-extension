chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.text === "search_for_isbn") {
    let resp = null;
    let t = document.querySelector("#productDetailsTable");
    if (t) {
      let i = t.innerHTML.match(/\d{3}\-\d{9,}/);
      if (i.length) {
        resp = i;
      }
    }
    sendResponse(resp);
  }
});
