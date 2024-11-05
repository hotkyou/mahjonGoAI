export default class PickTiles{
  constructor(){
    this.bingpaiElement = document.querySelector(".bingpai");
    this.nakiButton = document.querySelector(".player-button");
    this.doraElement = document.querySelector(".baopai");
    this.tileElement = document.querySelector('span.paishu');
    this.inowElement = document.querySelector(".defen .main.lunban");
  }
  handleShoupaiDisplayed(){
    const paiElements = this.bingpaiElement.querySelectorAll(".pai");
    const nakinaki = this.nakiButton.querySelectorAll("span.button");
    const doraElements = this.doraElement.querySelectorAll(".pai");
    const tile = this.tileElement.textContent;

    const allDataPai = Array.from(paiElements).map(element => element.getAttribute("data-pai"));
    // imgタグ取得
    const onePai = this.bingpaiElement.querySelectorAll(".pai");

    console.log("11", this.inowElement);

    if(this.inowElement){
      if(onePai.length > 0 ){
        const random =Math.floor(Math.random() * allDataPai.length);
        onePai[random].click()
      }
    }
  }
}