//グローバル変数
let slideArray = document.getElementsByClassName("hidden_img");//スライドショーで使用する画像の配列
let slideStartFlg = true;//スライドショー開始フラグ
let slideImg = document.getElementById("slide-img");//スライドショーの画像
let slideImgMessage = document.getElementById("slide-img-message");//スライドショーの画像のメッセージ
let slideNum = 0;//スライドショー配列の添え字
let timerId = "";//タイマーID
let slideControll = document.getElementById("slide-controll");//スライドショーの黒点リスト
let kurotenNum = 0;//スライドショーの黒点の番号
let kurotenHTML = "";//スライドショーの黒点のHTML

//スライドショー下の黒点を画像のリスト分作成する
Array.prototype.forEach.call(slideArray, function (slideValue) {
    kurotenHTML += "<li id='kuroten" + kurotenNum + "' onclick='slideMove(" + kurotenNum + ")'></li>";
    kurotenNum++;
    if (kurotenNum == slideArray.length) {
        slideControll.innerHTML = kurotenHTML;
    }
})


//開始処理がオンであればスライド処理開始
function slide() {
    slideCommon();
    slideNum++;
    if (slideNum == slideArray.length) {
        slideNum = 0;
    }
    timerId = setTimeout(function (){slide()}, 2000);

}

//指定された秒おきにスライド処理を実行
timerId = setTimeout(function () { slide() }, 1);

//スライド移動左
function moveLeft() {
    slideCommon();
    slideNum--;
    if (slideNum < 0) {
        slideNum = slideArray.length - 1;
    }
    timerId = setTimeout(function (){slide()}, 2000);
}

//スライド移動右
function moveRight() {
    slideCommon();
    slideNum++;
    if (slideNum == slideArray.length) {
        slideNum = 0;
    }
    timerId = setTimeout(function (){slide()}, 2000);
}

//スライド移動
function slideMove(num) {
    clearTimeout(timerId);
    slideNum = num;
    let val = slideArray[slideNum];
    let slidePath = val.getAttribute('src');
    slideImg.setAttribute("src", slidePath);
    slideImgMessage.innerHTML = val.alt;
    for (let slideLoopNum = 0; slideLoopNum < slideArray.length; slideLoopNum++){
        if (slideLoopNum == slideNum) {
            document.getElementById("kuroten" + slideLoopNum).style.opacity = 0.3;
        } else {
            document.getElementById("kuroten" + slideLoopNum).style.opacity = 1.0;
        }
    }
    timerId = setTimeout(function (){slide()}, 2000);
}

//スライド処理の共通処理
function slideCommon() {
    clearTimeout(timerId);
    let val = slideArray[slideNum];
    let slidePath = val.getAttribute('src');
    slideImg.setAttribute("src", slidePath);
    slideImgMessage.innerHTML = val.alt;
    for (let slideLoopNum = 0; slideLoopNum < slideArray.length; slideLoopNum++){
        if (slideLoopNum == slideNum) {
            document.getElementById("kuroten" + slideLoopNum).style.opacity = 0.3;
        } else {
            document.getElementById("kuroten" + slideLoopNum).style.opacity = 1.0;
        }
    }
}

            