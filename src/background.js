chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostSuffix: "amazon.com" }
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});

chrome.pageAction.onClicked.addListener(function(tab) {
  chrome.tabs.sendMessage(
    tab.id,
    {
      text: "search_for_isbn"
    },
    function(isbn) {
      if (isbn) {
        chrome.tabs.create({
          url: "https://www.goodreads.com/search?q=" + isbn
        });
      } else {
        alert("None ISBN found.");
      }
    }
  );
});
