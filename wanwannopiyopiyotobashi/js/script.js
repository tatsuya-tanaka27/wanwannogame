const hiyoko = document.getElementById("hiyoko");
const lebel = document.getElementById("lebel");
const tokuten = document.getElementById("tokuten");
const genki = document.getElementById("genki");
const inu = document.getElementById("inu");
const mori = document.getElementById("mori");
const saikou = document.getElementById("saikou");
let x, y; // ひよこの初期位置
let dx = 10; // ひよこの横移動距離
let dy = 10; // ひよこの縦移動距離
let rx = 800; // わんわんの初期位置
let ten = 0; // 得点
let maxTen = 0; // 最高得点
let speed; // ひよこの速さ
let flag = false; // スピードアップフラグ
let zan = 3; // 残りげんき
let TimeID; // タイマーイベントのID
let musicFlg = false; //音楽再生フラグ
let moriOffset = $("#mori").offset();//森の位置

//初期状態は音楽停止
audio.pause();

// ひよこ移動
function move() {
	if (lebel.value == "100") {
		maxTen = Number(document.getElementById("syokyuu").value);
	} else if (lebel.value == "70") {
		maxTen = Number(document.getElementById("tyukyuu").value);
	} else {
		maxTen = Number(document.getElementById("jyoukyuu").value);
    }
    
	saikou.value = maxTen; // 画面に表示する最高得点

	// タイマーイベントのID取得
	TimeID = setTimeout(move, speed);

	// ひよこの移動先を設定（xもyもプラスされているので、最初は右下に移動する）
	x += dx;
	y += dy;

	// 横の壁に当たったら、逆方向に動く（符号を反転）
	if (x <= moriOffset.left || x + 10 >= moriOffset.left + 550 - 80) {
		dx = -dx;
	}

	// 縦の壁に当たったら、逆方向に動く（符号を反転）
	if (y <= 10) {
		dy = -dy;
	}

	// わんわんに当たった場合
	// わんわんx座標の-10から+50で判定範囲を広めに取っているのは両横の角に当たっても判定させたいため
	// y == 400 はわんわんのy座標の位置
	if (rx - 20 <= x && x <= rx + 120 && (y + 10 >= 380 && y + 10 <= 400)) {
		// 縦の動きを反転
		dy = -dy;

		// 得点を追加
		ten += 10;

		// 100で割り切れる点数の時のみにスピードをあげる
		if (ten % 100 == 10) {
			flag = true; //スピードアップ後得点したら次のスピードアップ準備
		}
	}

	// 一番下の壁に当たった場合
	if (y >= 500) {
		// 残りげんきを減らす
		zan -= 1;

		// 残りげんきがなくなった場合はゲームオーバーにして、ステータス初期化
		if (zan == 0) {
			// ゲームオーバーのアラート
			alert(ten + "点\ngame over");

			// 得点が最高得点を上回っていた場合にアラート出して、画面表示の最高得点も更新する
			if (ten > maxTen) {
				let kyuu = ""; // 画面表示の級

				// 画面表示の級を設定
				if (lebel.value == "100") {
					kyuu = "初級";
				} else if (lebel.value == "70") {
					kyuu = "中級";
				} else {
					kyuu = "上級";
				}

				alert(kyuu + "の最高点が" +	maxTen + "点から" +	ten + "点になりました。");

				// 画面表示の最高得点を更新
				saikou.value = ten;

				// 難易度別の最高得点を更新
				if (lebel.value == "100") {
					document.getElementById("syokyuu").value = ten;
				} else if (lebel.value == "70") {
					document.getElementById("tyukyuu").value = ten;
				} else {
					document.getElementById("jyoukyuu").value = ten;
				}
			}

			// ステータス初期化
			ten = 0;
			zan = 3;
		}

		// ひよこの動きを止める
		clearTimeout(TimeID);
	}

	// ひよこを移動
	hiyoko.style.left = x + "px";
	hiyoko.style.top = y + "px";

	// 得点を画面に表示
	tokuten.value = ten;

	// 残りげんきを画面に表示
	genki.value = zan;

	// 得点が100で割り切れて、800点以下で、フラグがオンになっていて、スピードが30より多い場合
	// スピードが30より多くないといけないのは、スピードの設定値がマイナスになってしまうため
	if (ten % 100 == 0 && ten <= 800 && flag == true && speed > 30) {
		speed -= 10; // スピードアップ
		flag = false; // フラグをオフ
	}
}

// わんわんイベント
function inuMove(event) {
	// マウスのX座標を取得して、30px（わんわんの４分の１の大きさ）マイナスする
	rx = event.clientX - 30;
	moriOffset = $("#mori").offset();

	// moriの範囲内にいる場合のみ、マウスが動いたらわんわんのX座標を変更する
	if (moriOffset.left <= rx + 20 && rx <= moriOffset.left + 550 - 90) {
		inu.style.left = rx + "px";
	}
}

// bodyの上でマウスが動いたらわんわんイベント発動
document.getElementById("mori").onmousemove = function (event) {
	inuMove(event);
};

// onchangeイベントが発生した時の処理を記述する
document.getElementById("lebel").onchange = function () {
	if (lebel.value == "100") {
		maxTen = Number(document.getElementById("syokyuu").value);
	} else if (lebel.value == "70") {
		maxTen = Number(document.getElementById("tyukyuu").value);
	} else {
		maxTen = Number(document.getElementById("jyoukyuu").value);
	}
	saikou.value = maxTen; // 画面に表示する最高得点
};

// わんわんがクリックされたら、ひよこ移動イベント開始
inu.onclick = function () {
	moriOffset = $("#mori").offset();
	// ひよこの初期位置や速さを設定
	x = Math.floor(Math.random() * 40) * 10 + 50 + moriOffset.left;
	y = Math.floor(Math.random() * 10) * 10 + 10;
	speed = document.getElementById("lebel").value;
	move();
};

//もどるボタン
function back() {
	location.href = "../index.html";
}

//BGM制御
function bgm() {
	if (musicFlg) {
		audio.pause();
		musicFlg = false;
	} else {
		audio.currentTime = 0;
		audio.play();
		musicFlg = true;
	}
}