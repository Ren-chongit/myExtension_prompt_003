document.addEventListener('DOMContentLoaded', function() {
  const programButton = document.getElementById('programButton');
  const extensionsButton = document.getElementById('extensionsButton');
  const webDesignerButton = document.getElementById('webDesignerButton');
  const textArea = document.getElementById('defaultText');
  const normalButton = document.getElementById('normalButton');

  // JSONデータを読み込む
  fetch('instructions.json')
    .then(response => response.json())
    .then(data => {
      // デフォルトのテキストを設定
      setText(data.programMessage);
      // programButtonにactiveクラスを追加
      programButton.classList.add('active');
      extensionsButton.classList.remove('active');
      webDesignerButton.classList.remove('active');

      // Program ボタンがクリックされたら programMessage を設定
      programButton.addEventListener('click', () => {
        setText(data.programMessage);
        programButton.classList.add('active');
        extensionsButton.classList.remove('active');
        webDesignerButton.classList.remove('active');
      });

      // Extensions ボタンがクリックされたら extensionsMessage を設定
      extensionsButton.addEventListener('click', () => {
        setText(data.extensionsMessage);
        extensionsButton.classList.add('active');
        programButton.classList.remove('active');
        webDesignerButton.classList.remove('active');
      });

      // WebDesigner ボタンがクリックされたら webDesignerMessage を設定
      webDesignerButton.addEventListener('click', () => {
        setText(data.webDesignerMessage);
        webDesignerButton.classList.add('active');
        programButton.classList.remove('active');
        extensionsButton.classList.remove('active');
      });
      // normalButtonがクリックされたら normalMessage を設定
      normalButton.addEventListener('click', () => {
        setText(data.normalMessage);
        normalButton.classList.add('active');
        programButton.classList.remove('active');
        extensionsButton.classList.remove('active');
        webDesignerButton.classList.remove('active');
      });
      // ボタンを追加する場合はここに追加
    })
    .catch(error => console.error('Error:', error));

  // テキストエリアにテキストを設定する関数
  function setText(message) {
    let messageText = '';
    messageText += '# 質問：\n' + message.質問.join('\n') + '\n\n\n';
    messageText += '# 指示：\n' + message.指示.join('\n') + '\n\n';
    messageText += '# 回答例：\n' + message.回答例.join('\n');
    textArea.textContent = messageText;
  }
});

// 下記のコードは、質問内容欄に質問内容を自動で入れるためのもの
document.addEventListener('DOMContentLoaded', function() {
  var submitButton = document.getElementById('submitQuestion');
  submitButton.addEventListener('click', function() {
      var questionText = document.getElementById('questionText').value;
      replaceQuestionText(questionText);
  });
});

// 1. 質問内容欄のテキストエリアの値を取得
function replaceQuestionText(newText) {
  var textArea = document.getElementById('defaultText');
  var currentText = textArea.value;
  var updatedText = currentText.replace("ここに質問内容が自動で入ります。上記の質問内容欄を入力して決定を押してください。", newText);
  textArea.value = updatedText;
}

// 1. ボタンがクリックされたら、テキストエリアの値を取得
document.addEventListener('DOMContentLoaded', function() {
    var sendButton = document.getElementById('sendButton');
    sendButton.addEventListener('click', function() {
      var valueToSend = document.getElementById('defaultText').value;
      // background.jsにsendValueというメッセージを送信
      chrome.runtime.sendMessage({action: "sendValue", value: valueToSend});
      // メッセージ送信後すぐにウィンドウを閉じる
      setTimeout(function() {
        window.close();
      }, 500);
    });
});
