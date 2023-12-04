// 特定のページでのみ実行する。今回はchatGPTのページで実行する

window.onload = function() {
  // クラス名がpt-2の要素を取得
  var elements = document.getElementsByClassName("pt-2");
  // 要素の次の要素を追加
  elements[0].insertAdjacentHTML(
    "afterend",
    "<div class='pt-x' style='font-size:17px; color: #fff; background: linear-gradient(45deg, rgb(72, 59, 251), #00FFFF); padding: 10px 12px; margin: 10px 0; cursor: pointer;'>Frequent Messages</div>"
  );
  // 上記class名のpt-xをクリックしたときの処理
  document.getElementsByClassName("pt-x")[0].onclick = function() {
    // background.jsにopen_popupというメッセージを送信
    chrome.runtime.sendMessage({ action: "open_popup" });
  };

}
//
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if(message.action === "insertValue") {
    document.getElementById("prompt-textarea").value = message.value; // 値をテキストエリアに挿入

    // プロンプト入力欄の要素を選択
    var promptInput = document.getElementById('prompt-textarea');
    // テキスト入力イベントを有効化
    promptInput.dispatchEvent(new Event('input', { bubbles: true }));

    // 「Send」ボタンを選択してクリックイベントを発生
    // var sendButton = document.querySelector('button.send-button-selector');
    // sendButton.click();
  }
});

