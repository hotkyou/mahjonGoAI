document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.querySelector(".start");
  startButton.addEventListener("click", function () {
    console.log("start");

		const modal = document.getElementById("modal");
    const controlButton = document.getElementById("controlButton");
		const modalImage = document.getElementById("modalImage");
		controlButton.style.display = "block";

    // モーダルウィンドウの開閉を制御する関数
    function toggleModal() {
      if (modal.style.display === "block") {
        modal.style.display = "none";
        controlButton.textContent = "開く";
      } else {
				modalImage.src = "static/images/pai.gif";
        modal.style.display = "block";
        controlButton.textContent = "閉じる";
      }
    }
		toggleModal();

    // ボタンのクリックイベントでモーダルウィンドウの開閉を制御する
    controlButton.addEventListener("click", toggleModal);

    const shoupaiElement = document.querySelector(".shoupai");
    handleShoupaiDisplayed();

    function handleShoupaiDisplayed() {
      // 表示された時の処理をここに記述する
      console.log("要素が表示されました");
      setInterval(function () {
        // 5秒ごとに実行したい処理をここに記述する
        console.log("----------------------");
        const bingpaiElement = document.querySelector(".bingpai");
        const paiElements = bingpaiElement.querySelectorAll(".pai");
        const dataPaiValues = [];

        paiElements.forEach((paiElement) => {
          const dataPaiValue = paiElement.getAttribute("data-pai");
          dataPaiValues.push(dataPaiValue);
        });

        if (dataPaiValues.length == 14) {
					console.log(dataPaiValues);
          const data = { dataPai: dataPaiValues };
          const csrftoken = document.querySelector(
            "[name=csrfmiddlewaretoken]"
          ).value;

          fetch("/agentJS", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "X-CSRFToken": csrftoken,
            },
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((result) => {
              console.log(result);
							modalImage.src = "static/images/"+ result["result"] + ".gif";
            })
            .catch((error) => console.error("リクエスト失敗", error));
        }
      }, 1000);
    }
  });
});
