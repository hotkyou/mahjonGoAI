document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.querySelector(".start");
  startButton.addEventListener("click", handleStartClick);

  function handleStartClick() {
    console.log("start");
    handleShoupaiDisplayed();
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
      const main = document.querySelector('.defen .main');
      const xiajia = document.querySelector('.defen .xiajia');
      const duimian = document.querySelector('.defen .duimian');
      const shangjia = document.querySelector('.defen .shangjia');

      //鳴き牌
      const mainNaki = document.querySelectorAll('.shoupai.main .fulou .pai');
      const xiajiaNaki = document.querySelectorAll('.shoupai.xiajia .fulou .pai');
      const duimianNaki = document.querySelectorAll('.shoupai.duimian .fulou .pai');
      const shangjiaNaki = document.querySelectorAll('.shoupai.shangjia .fulou .pai');

      //捨て牌
      const mainDiscard = document.querySelectorAll('.he.main .dapai .pai');
      const xiajiaDiscard = document.querySelectorAll('.he.xiajia .dapai .pai');
      const duimianDiscard = document.querySelectorAll('.he.duimian .dapai .pai');
      const shangjiaDiscard = document.querySelectorAll('.he.shangjia .dapai .pai');

      //リーチ
      const mainReach = document.querySelector('.he.main .lizhi .chouma.hide');
      const xiajiaReach = document.querySelector('.he.xiajia .lizhi .chouma.hide');
      const duimianReach = document.querySelector('.he.duimian .lizhi .chouma.hide');
      const shangjiaReach = document.querySelector('.he.shangjia .lizhi .chouma.hide');

      const dataPaiValues = [];
      const doraValues = [];
      const mainNakiValues = [];
      const rightNakiValues = [];
      const straightNakiValues = [];
      const leftNakiValues = [];
      const maindiscardValues = [];
      const leftdiscardValues = [];
      const rightdiscardValues = [];
      const straightdiscardValues = [];
      const reachValues = [0, 0, 0, 0];

      //鳴き牌

      mainNaki.forEach((mainNakiElement) => {
        //console.log(mainNakiElement.getAttribute('data-pai'));
        mainNakiElements = mainNakiElement.getAttribute('data-pai');
        mainNakiValues.push(mainNakiElements);
      });

      xiajiaNaki.forEach((xiajiaNakiElement) => {
        //console.log(xiajiaNakiElement.getAttribute('data-pai'));
        xiajiaNakiElements = xiajiaNakiElement.getAttribute('data-pai');
        rightNakiValues.push(xiajiaNakiElements);
      });

      duimianNaki.forEach((duimianNakiElement) => {
        //console.log(duimianNakiElement.getAttribute('data-pai'));
        duimianNakiElements = duimianNakiElement.getAttribute('data-pai');
        straightNakiValues.push(duimianNakiElements);
      });

      shangjiaNaki.forEach((shangjiaNakiElement) => {
        //console.log(shangjiaNakiElement.getAttribute('data-pai'));
        shangjiaNakiElements = shangjiaNakiElement.getAttribute('data-pai');
        leftNakiValues.push(shangjiaNakiElements);
      });

      //捨て牌
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
      if (!mainReach) {
        reachValues[0] = 1;
      } else if (mainReach) {
        reachValues[0] = 0;
      }
      if (!xiajiaReach) {
        reachValues[1] = 1;
      } else if (xiajiaReach) {
        reachValues[1] = 0;
      }
      if (!duimianReach) {
        reachValues[2] = 1;
      } else if (duimianReach) {
        reachValues[2] = 0;
      }
      if (!shangjiaReach) {
        reachValues[3] = 1;
      } else if (shangjiaReach) {
        reachValues[3] = 0;
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

      //自風
      var mykaze;
      if (main != null) {
        mykaze = main.textContent.trim().split(':')[0].trim();
        console.log(mykaze);
      }

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


      const data = {
        dataPai: dataPaiValues,
        reach: reachValues,
        dora: doraValues,
        kaze: bakaze,
        mykaze: mykaze,
        changbang: changban,
        lizhibang: lizhiban,
        naki: [
          {
            me: mainNakiValues,
            right: rightNakiValues,
            straight: straightNakiValues,
            left: leftNakiValues
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
        score: [parseInt(mainScore), parseInt(xiajiaScore), parseInt(duimianScore), parseInt(shangjiaScore)],
        tiles: tile,

      };
      console.log(data);
      console.log("----------------------");

      const csrftoken = document.querySelector(
        "[name=csrfmiddlewaretoken]"
      ).value;

        fetch("/mahjongAPI", {
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
          })
          .catch((error) => console.error("リクエスト失敗", error));
      }
    //}
    ,1000);
  }
});
