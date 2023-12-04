manifest.jsonで構成管理

 - popup.html
 - background.js
 - content.js

1.chatGPTを開くと
　content.jsに記載があるようにhtmlを追加する（Frequent Messagesボタン）
　※background.jsも実行されてるが、開いた時点ではなにもしない。

2.chatGPT内のFrequent Messagesをクリックすると
　content.jsから"open-popup"をbackground.jsに渡し、（action: "open_popup"）
　open-popopを受取ったbackground.jsはpopup.htmlを開く。

3.popup.html内のsendをクリックすると
　popup.jsからbackground.jsに"defaultText"（テキストエリア内のテキスト）を送信(action: "sendValue")
　送信後、popup.htmlを閉じる。
　sendValueを受取ったbackground.jsは全てのタブにdefaultTxtを送信(action: "insertValue")

4.insertValue（defaultTxt内包）を受取ったcontnt.jsはchatGPTのプロンプト入力欄にdefaultTexTを設置。
