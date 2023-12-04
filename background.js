// 拡張機能実行中は常に実行される

// content.jsからopen_popupというメッセージを受取ったら、popup.htmlを開く
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if(message.action === "open_popup") {
    // 現在のウィンドウ情報を取得
    chrome.windows.getCurrent({populate: true}, function(window) {
      const width = 670; // ポップアップの幅
      const height = 878; // ポップアップの高さ

      // 現在のウィンドウに基づいてポップアップの位置を計算
      const left = window.left + (window.width / 2) - (width / 2);
      const top = window.top + (window.height / 2) - (height / 2);

      chrome.windows.create({
        url: chrome.runtime.getURL("popup.html"),
        type: "popup",
        width: width,
        height: height,
        left: Math.round(left),
        top: Math.round(top)
      });
    });
  }
});


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if(message.action === "sendValue") {
    // 全てのタブにメッセージを送信
    // chrome.runtime.sendMessage({action: "insertValue", value: message.value})

    chrome.tabs.query({}, function(tabs) {
      tabs.forEach(function(tab) {
        if (tab.url.includes("https://chat.openai.com/")) {
          chrome.tabs.sendMessage(tab.id, {action: "insertValue", value: message.value}, function(response) {
            if (chrome.runtime.lastError) {
              console.log("Error sending message to tab:", tab.id, chrome.runtime.lastError.message);
            }
          });
        }
      });
    });
  }
  return true;
});
