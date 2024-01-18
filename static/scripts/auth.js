document.addEventListener('DOMContentLoaded', () => {
    const webcam = document.getElementById('webcam');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const textwrapper = document.getElementById('textwrapper');
    let str = {};
    let count = 0;
    const Itext = "「い」の顔をしてください";
    const Utext = "「う」の顔をしてください";
    const Etext = "「え」の顔をしてください";
    const Otext = "「お」の顔をしてください";

    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            webcam.srcObject = stream;

            function captureAndSend() {
                // キャンバスのサイズをビデオのサイズに合わせる
                canvas.width = webcam.videoWidth;
                canvas.height = webcam.videoHeight;

                // キャンバスにビデオフレームを描画
                context.drawImage(webcam, 0, 0, canvas.width, canvas.height);

                // キャンバスから画像データを取得
                canvas.toBlob((blob) => {
                    const formData = new FormData();
                    formData.append('faceimage', blob);

                    fetch('http://127.0.0.1:8001/detectmouth', {
                        method: 'POST',
                        body: formData,
                    })
                    .then(response => response.json())
                    .then(data => str = data)
                    .catch(error => console.error('Error:', error));
                }, 'image/jpeg');
                if (str["face_landmarks"] != false) {
                    console.log(count);
                    console.log(str["face_landmarks"]);
                    switch (str["face_landmarks"]) {
                        case "A":
                            if (count == 0) {
                                count += 1;
                                textwrapper.innerHTML = Itext;
                            }
                            break;
                        case "I":
                            if (count == 1) {
                                count += 1;
                                textwrapper.innerHTML = Utext;
                            }
                            break;
                        case "U":
                            if (count == 2) {
                                count += 1;
                                textwrapper.innerHTML = Etext;
                            }
                            break;
                        case "E":
                            if (count == 3) {
                                count += 1;
                                textwrapper.innerHTML = Otext;
                            }
                            break;
                        case "O":
                            if (count == 4) {
                                count += 1;
                                textwrapper.innerHTML = "終了！お疲れ様でした";
                                window.location.href = "/mypage"
                            }
                            break;
                    }
                } else {

                }
            }

            // 最初のキャプチャ
            captureAndSend();

            // 5秒ごとにキャプチャ
            setInterval(captureAndSend, 1000);
        })
        .catch(error => console.error('Error accessing webcam:', error));
});
