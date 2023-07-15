document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.querySelector(".start");
  startButton.addEventListener("click", function () {
    console.log("start");

    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modalContent");
    const controlButton = document.getElementById("controlButton");
    const greenButton = document.getElementById("greenButton");
    const yellowButton = document.getElementById("yellowButton");
    const redButton = document.getElementById("redButton");
    const modalImage = document.getElementById("modalImage");
    controlButton.style.display = "block";

    let modalToggle = false;

    function modalChangeSize() {
      if (modalToggle) {
        modalToggle = false;
        modalContent.style.color = ""
        modal.style.width = "";
        modal.style.height = "";
        modal.style.maxWidth = "";
        modal.style.top = "";
        modal.style.left = "";
        modal.style.position = "";
        modal.style.backgroundColor = "";

      } else {
        modalToggle = true;
        modalContent.style.color = "white"
        modal.style.width = "100%";
        modal.style.height = "100%";
        modal.style.maxWidth = "80%";
        modal.style.top = "0";
        modal.style.left = "0";
        modal.style.position = "fixed";
        modal.style.backgroundColor = "rgba(0,0,0,0.5)";
      }
    }
    greenButton.addEventListener("click", modalChangeSize);

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
    controlButton.addEventListener("click", toggleModal);
    yellowButton.addEventListener("click", toggleModal);
    redButton.addEventListener("click", toggleModal);

    handleShoupaiDisplayed();
    function handleShoupaiDisplayed() {
      setInterval(function () {
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
              modalImage.src = "static/images/" + result.result + ".gif";
            })
            .catch((error) => console.error("リクエスト失敗", error));
        }
      }, 1000);
    }
  });
});
