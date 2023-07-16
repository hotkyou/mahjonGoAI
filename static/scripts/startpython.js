document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.querySelector(".start");
  startButton.addEventListener("click", handleStartClick);

  const elements = getElements();
  const {
    modal,
    controlButton,
    greenButton,
    yellowButton,
    redButton,
    modalImage,
    charts,
    rightChart,
    centerChart,
    leftChart,
  } = elements;
  controlButton.style.display = "block";
  let modalToggle = false;

  function handleStartClick() {
    console.log("start");

    greenButton.addEventListener("click", modalChangeSize);

    toggleModal();
    controlButton.addEventListener("click", toggleModal);
    yellowButton.addEventListener("click", toggleModal);
    redButton.addEventListener("click", toggleModal);

    handleShoupaiDisplayed();
  }

  function modalChangeSize() {
    if (modalToggle) {
      modalToggle = false;
      modalContent.style.color = "";
      modal.style.width = "";
      modal.style.height = "";
      modal.style.maxWidth = "";
      modal.style.top = "";
      modal.style.left = "";
      modal.style.position = "";
      modal.style.backgroundColor = "";
      charts.style.display = "";
    } else {
      modalToggle = true;
      modalContent.style.color = "white";
      modal.style.width = "100%";
      modal.style.height = "100%";
      modal.style.maxWidth = "80%";
      modal.style.top = "0";
      modal.style.left = "0";
      modal.style.position = "fixed";
      modal.style.backgroundColor = "rgba(0,0,0,0.5)";
      charts.style.display = "flex";
      createGraph("a");
      createGraph("b");
      createGraph("c");
      charts.style.display = "flex";
    }
  }

  function getElements() {
    return {
      modal: document.getElementById("modal"),
      controlButton: document.getElementById("controlButton"),
      greenButton: document.getElementById("greenButton"),
      yellowButton: document.getElementById("yellowButton"),
      redButton: document.getElementById("redButton"),
      modalImage: document.getElementById("modalImage"),
      charts: document.getElementById("charts"),
      rightChart: document.getElementById("rightChart"),
      centerChart: document.getElementById("centerChart"),
      leftChart: document.getElementById("leftChart"),
    };
  }

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

  function createGraph(data) {
    if (data == "a") {
      const donutChartData = [
        {
          values: randomPercentSplit(),
          labels: ["A", "B", "C", "D"],
          type: "pie",
          hole: 0.5,
          hoverinfo: "label+percent",
          marker: {
            colors: ["#FF6384", "#36A2EB", "#FFCE56"],
          },
        },
      ];

      const donutChartLayout = {
        title: "順位予想",
        font: { color: "white" },
        showlegend: true,
        textinfo: "label+percent",
        textposition: "inside",
        paper_bgcolor: "transparent",
        plot_bgcolor: "transparent",
      };

      // ドーナツチャートを描画
      Plotly.newPlot(leftChart, donutChartData, donutChartLayout);
    } else if (data == "b") {
      const donutChartData = [
        {
          values: randomPercentSplit(),
          labels: ["天和", "大四喜", "九連宝燈", "国士無双"],
          type: "pie",
          hole: 0.5,
          hoverinfo: "label+percent",
          marker: {
            colors: ["#FF6384", "#36A2EB", "#FFCE56"],
          },
        },
      ];

      const donutChartLayout = {
        title: "上がり役予測",
        font: { color: "white" },
        showlegend: true,
        textinfo: "label+percent",
        textposition: "inside",
        paper_bgcolor: "transparent",
        plot_bgcolor: "transparent",
      };

      // ドーナツチャートを描画
      Plotly.newPlot(centerChart, donutChartData, donutChartLayout);
    } else {
      const donutChartData = [
        {
          values: randomPercentSplit(),
          labels: ["白", "發", "中", "東"],
          type: "pie",
          hole: 0.5,
          hoverinfo: "label+percent",
          marker: {
            colors: ["#FF6384", "#36A2EB", "#FFCE56"],
          },
        },
      ];

      const donutChartLayout = {
        title: "予測結果%",
        font: { color: "white" },
        showlegend: true,
        textinfo: "label+percent",
        textposition: "inside",
        paper_bgcolor: "transparent",
        plot_bgcolor: "transparent",
      };

      // ドーナツチャートを描画
      Plotly.newPlot(rightChart, donutChartData, donutChartLayout);
    }
  }

  function randomPercentSplit() {
    // パーセント値をランダムに生成する関数
    function randomPercent() {
      return Math.random() * 100;
    }
  
    // パーセント値をランダムに生成し、合計が100になるように制御する
    let percentages = [];
    for (let i = 0; i < 3; i++) {
      percentages.push(randomPercent());
    }
  
    // 4つ目のパーセント値は100から前の3つの合計を引いたもの
    percentages.push(100 - percentages.reduce((sum, value) => sum + value, 0));
  
    // 生成された四頭分のパーセント値を返す
    return percentages;
  }
});
