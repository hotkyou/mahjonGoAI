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

      const bingpaiElement = document.querySelector(".bingpai");
      const paiElements = bingpaiElement.querySelectorAll(".pai");
      const doraElement = document.querySelector(".baopai");
      const doraElements = doraElement.querySelectorAll(".pai");
      const tileElement = document.querySelector('span.paishu');
      const tile = tileElement.textContent;
      const bakaze = document.querySelector('.jushu').textContent;
      const changban = document.querySelector('span.changbang').textContent;
      const lizhiban = document.querySelector('span.lizhibang').textContent;

      //点数状況
      const main = document.querySelector('.defen .main.lunban');
      const xiajia = document.querySelector('.defen .xiajia');
      const duimian = document.querySelector('.defen .duimian');
      const shangjia = document.querySelector('.defen .shangjia');

      //捨て牌
      const mainDiscard = document.querySelectorAll('.he.main .dapai .pai');
      const xiajiaDiscard = document.querySelectorAll('.he.xiajia .dapai .pai');
      const duimianDiscard = document.querySelectorAll('.he.duimian .dapai .pai');
      const shangjiaDiscard = document.querySelectorAll('.he.shangjia .dapai .pai');

      //リーチ
      const mainReach = document.querySelector('.he.main .lizhi .chouma');
      const xiajiaReach = document.querySelector('.he.xiajia .lizhi .chouma');
      const duimianReach = document.querySelector('.he.duimian .lizhi .chouma');
      const shangjiaReach = document.querySelector('.he.shangjia .lizhi .chouma');

      const dataPaiValues = [];
      const doraValues = [];
      const maindiscardValues = [];
      const leftdiscardValues = [];
      const rightdiscardValues = [];
      const straightdiscardValues = [];
      const reachValues = [0, 0, 0, 0];

      mainDiscard.forEach((mainDiscardElement) => {
        mainDiscardElements = mainDiscardElement.getAttribute('data-pai');
        maindiscardValues.push(mainDiscardElements);
      });

      xiajiaDiscard.forEach((xiajiaDiscardElement) => {
        xiajiaDiscardElements = xiajiaDiscardElement.getAttribute('data-pai');
        rightdiscardValues.push(xiajiaDiscardElements);
      });

      duimianDiscard.forEach((duimianDiscardElement) => {
        duimianDiscardElements = duimianDiscardElement.getAttribute('data-pai');
        straightdiscardValues.push(duimianDiscardElements);
      });

      shangjiaDiscard.forEach((shangjiaDiscardElement) => {
        shangjiaDiscardElements = shangjiaDiscardElement.getAttribute('data-pai');
        leftdiscardValues.push(shangjiaDiscardElements);
      });

      //リーチ
      if (mainReach == 'chouma') {
        reachValues[0] = 1;
      }
      if (xiajiaReach == 'chouma') {
        reachValues[1] = 1;
      }
      if (duimianReach == 'chouma') {
        reachValues[2] = 1;
      }
      if (shangjiaReach == 'chouma') {
        reachValues[3] = 1;
      }

      paiElements.forEach((paiElement) => {
        let dataPaiValue = paiElement.getAttribute("data-pai");
        if (dataPaiValue == "m0") {
          dataPaiValue = "m5";
        } else if (dataPaiValue == "p0") {
          dataPaiValue = "p5";
        } else if (dataPaiValue == "s0") {
          dataPaiValue = "s5";
        }
        dataPaiValues.push(dataPaiValue);
      });

      //ドラ
      doraElements.forEach((doraElement) => {
        if (doraElement.getAttribute("data-pai") != "_") {
          let doraValue = doraElement.getAttribute("data-pai");
          doraValues.push(doraValue);
        }
      });

      var mainScore;
      var xiajiaScore;
      var duimianScore;
      var shangjiaScore;
      if (main && xiajia && duimian && shangjia != null) {
        mainScore = main.textContent.trim().split(':')[1].trim().replace(',', '');;
        xiajiaScore = xiajia.textContent.trim().split(':')[1].trim().replace(',', '');;
        duimianScore = duimian.textContent.trim().split(':')[1].trim().replace(',', '');;
        shangjiaScore = shangjia.textContent.trim().split(':')[1].trim().replace(',', '');;
      }


      if (dataPaiValues.length == 14) {
        //console.log(dataPaiValues);
        const data = {
          dataPai: dataPaiValues,
          reach: reachValues,
          dora: doraValues,
          kaze: bakaze,
          changbang: changban,
          lizhibang: lizhiban,
          naki: [
            {
              me: [],
              right: [],
              straight: [],
              left: []
            }
          ],
          discard: [
            {
              me: maindiscardValues,
              right: rightdiscardValues,
              straight: straightdiscardValues,
              left: leftdiscardValues
            }
          ],
          score: [
            {
              me: mainScore,
              right: xiajiaScore,
              straight: duimianScore,
              left: shangjiaScore
            }
          ],
          tiles: tile

        };
      console.log(data);

      console.log("----------------------");
      // const bingpaiElement = document.querySelector(".bingpai");
      // const paiElements = bingpaiElement.querySelectorAll(".pai");
      // const dataPaiValues = [];

      // paiElements.forEach((paiElement) => {
      //   let dataPaiValue = paiElement.getAttribute("data-pai");
      //   if (dataPaiValue == "m0") {
      //     dataPaiValue = "m5";
      //   } else if (dataPaiValue == "p0") {
      //     dataPaiValue = "p5";
      //   } else if (dataPaiValue == "s0") {
      //     dataPaiValue = "s5";
      //   }
      //   dataPaiValues.push(dataPaiValue);
      // });

      // if (dataPaiValues.length == 14) {
      //   console.log(dataPaiValues);
      //   const data = { dataPai: dataPaiValues };
      //   const csrftoken = document.querySelector(
      //     "[name=csrfmiddlewaretoken]"
      //   ).value;
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
