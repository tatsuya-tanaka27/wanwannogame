//canvasの設定（せってい）
let canvas = document.getElementById( 'canvas' );
canvas.width = 640;		//canvasの横幅（よこはば）
canvas.height = 544;	//canvasの縦幅（たてはば）
 
//コンテキストを取得（しゅとく）
let ctx = canvas.getContext( '2d' );

//音楽再生フラグ
let musicFlg = false;

//ゲームクリアフラグ
let gameClearFlg = false;

//いぬのオブジェクトを作成
let inu = createObject('inu32');
inu.x = 0;
inu.y = 0;

//ねこのオブジェクトを作成
let neko = createObject('neko32');
neko.x = 448;
neko.y = 384;

//うんち１のオブジェクトを作成
let unchi1 = createObject('unchi32');
unchi1.x = 224;
unchi1.y = 320;

//うんち２のオブジェクトを作成
let unchi2 = createObject('unchi32');
unchi2.x = 352;
unchi2.y = 288;
 
//マップチップのImageオブジェクトを作る
let michi = new Image();
michi.src = 'img/michi32.png';
let kusa = new Image();
kusa.src = 'img/kusa32.png';
 
//キーボードのオブジェクトを作成
let key = new Object();
key.up = false;
key.down = false;
key.right = false;
key.left = false;
key.push = '';
 
//マップの作成（さくせい）
let map = [
	[0, 0, 1, 0, 1, 0, 0, 0 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,0],
	[0, 1, 0, 0, 0, 1, 1, 1 ,0 ,1 ,0 ,1 ,1 ,0 ,1 ,1 ,1 ,0 ,1 ,0],
	[0, 0, 1, 1, 0, 0, 0, 1 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,0],
	[1, 0, 1, 0, 1, 1, 0, 0 ,0 ,1 ,1 ,1 ,1 ,1 ,0 ,0 ,1 ,0 ,1 ,0],
	[0, 0, 0, 0, 0, 1, 1, 1 ,0 ,1 ,0 ,0 ,0 ,0 ,1 ,1 ,0 ,1 ,1 ,0],
	[0, 1, 1, 1, 0, 0, 0, 0 ,0 ,1 ,0 ,1 ,1 ,0 ,0 ,1 ,0 ,0 ,0 ,0],
	[0, 1, 1, 1, 0, 1, 1, 1 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,1 ,1 ,1 ,0],
	[0, 0, 0, 1, 0, 0, 0, 0 ,1 ,0 ,0 ,1 ,0 ,1 ,1 ,0 ,0 ,0 ,1 ,0],
	[1, 1, 0, 1, 1, 1, 1, 1 ,1 ,0 ,1 ,1 ,0 ,0 ,1 ,1 ,1 ,0 ,1 ,0],
	[1, 0, 0, 0, 0, 0, 1, 1 ,0 ,0 ,0 ,0 ,1 ,0 ,1 ,1 ,0 ,0 ,1 ,0],
	[1, 0, 1, 1, 1, 0, 0, 0 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,1 ,1 ,0 ,0],
	[1, 0, 1, 0, 1, 1, 1, 0 ,1 ,0 ,1 ,1 ,0 ,1 ,1 ,0 ,0 ,0 ,0 ,1],
	[0, 0, 1, 0, 0, 0, 0, 0 ,1 ,0 ,0 ,1 ,0 ,1 ,0 ,1 ,1 ,1 ,0 ,0],
	[0, 1, 1, 1, 0, 1, 0, 1 ,0 ,0 ,1 ,1 ,0 ,1 ,0 ,1 ,1 ,0 ,1 ,0],
	[0, 0, 0, 1, 0, 1, 0, 0 ,0 ,0 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,0],
	[1, 1, 0, 1, 0, 1, 0, 1 ,1 ,0 ,0 ,1 ,0 ,1 ,1 ,0 ,1 ,1 ,1 ,0],
	[1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0]
]

let audio = document.getElementById("audio");//通常曲
let audio_end = document.getElementById("audio_end");//エンディング曲

//初期状態は音楽停止
audio.pause();
audio_end.pause();
 
//メインループ
function main() {

	//ゲームクリアフラグがオフの場合にメイン処理を実行
	if (!gameClearFlg) {

		//  キャラが分身して移動しているように見えないようにするための対策
		ctx.fillStyle = "rgb( 240, 221, 182 )"; //キャラ移動した時に塗（ぬ）りつぶす色を指定（してい） 
		ctx.fillRect(0, 0, 640, 544); //塗（ぬ）りつぶす
 
		//キャンバス領域の上限に達するまで、マップチップを配置する
		for (let y=0; y<map.length; y++) {
			for (let x=0; x<map[y].length; x++) {
				if ( map[y][x] === 0 ) ctx.drawImage( michi, 0, 0, 32, 32, 32*x, 32*y, 32, 32 );
				if ( map[y][x] === 1 ) ctx.drawImage( kusa, 0, 0, 32, 32, 32*x, 32*y, 32, 32 );
			}
		}
 
		//キャラクターをキャンバスに描画
		ctx.drawImage(inu.img, inu.x, inu.y);
		ctx.drawImage(neko.img, neko.x, neko.y);
		ctx.drawImage(unchi1.img, unchi1.x, unchi1.y);
		ctx.drawImage(unchi2.img, unchi2.x, unchi2.y );
 
		//キーを押下した時と押下していない時のイベントに関数をバインド
		addEventListener("keydown", keydownfunc, false);
		addEventListener("keyup", keyupfunc, false);
 
		//方向キーが押されている場合（ばあい）は、いぬが移動する
		if ( inu.move === 0 ) {
			//左キー
			if ( key.left === true ) {
				let x = inu.x/32;
				let y = inu.y/32;
				x--;
				//終了判定がtrueでなければキャラクター移動値を設定
				if(!endJudge(x,y)){
					if ( map[y][x] === 0 ) {
						inu.move = 32;
						key.push = 'left';
					}
				}
			}
			//上キー
			if ( key.up === true ) {
				let x = inu.x/32;
				let y = inu.y/32;
				if ( y > 0) {
					y--;
					//終了判定がtrueでなければキャラクター移動値を設定
					if (!endJudge(x, y)) {
						if (map[y][x] === 0) {
							inu.move = 32;
							key.push = 'up';
						}
					}
				}
			}
			//右キー
			if ( key.right === true ) {
				let x = inu.x/32;
				let y = inu.y/32;
				x++;
				//終了判定がtrueでなければキャラクター移動値を設定
				if (map[y][x] === 0) {
					if (!endJudge(x, y)) {
						inu.move = 32;
						key.push = 'right';
					}
				}
			}
			//下キー
			if ( key.down === true ) {
				let x = inu.x/32;
				let y = inu.y / 32;
				y++;
				if ( y < 17 ) {
					if (map[y][x] === 0) {
						//終了判定がtrueでなければキャラクター移動値を設定
						if (!endJudge(x, y)) {
							inu.move = 32;
							key.push = 'down';
						}
					}
				}
			}
		}
 
		//いぬの移動値が0より大きい場合は、4pxずつ移動（いどう）を続ける（ゆるやかに移動してるように見せるため）
		if (inu.move > 0) {
			inu.move -= 4;
			if ( key.push === 'left' ) inu.x -= 4;
			if ( key.push === 'up' ) inu.y -= 4;
			if ( key.push === 'right' ) inu.x += 4;
			if ( key.push === 'down' ) inu.y += 4;
		}

		//各ブラウザでアニメーションが動くように設定
		let requestAnimationFrame = window.requestAnimationFrame || 
	　　　　　　　　　　　　　　　　　　　window.mozRequestAnimationFrame ||
　　	　　　　　　　　　　　　　　　　　window.webkitRequestAnimationFrame || 
　　　　	　　　　　　　　　　　　　　　window.msRequestAnimationFrame;
 
		//ブラウザ描画開始前にアニメーション描画設定処理を発動する
		window.requestAnimationFrame(main);	
	}
}

//ページと依存（いぞん）している全てのデータが読み込まれたら、メインループ開始
addEventListener('load', main(), false);

//もどるボタン押下したら、わんわんのげーむ画面に戻る
function back() {
	location.href = "../index.html";
}

//BGM制御
function bgm() {
	if (musicFlg) {
		audio.pause();
		audio_end.pause();
		musicFlg = false;
	} else {
		audio.currentTime = 0;
		audio.play();
		audio_end.pause();
		musicFlg = true;
	}
}
 
//キーボードが押されたときに呼び出される関数（かんすう）
function keydownfunc( event ) {
	let key_code = event.keyCode;
	if( key_code === 37 ) key.left = true;
	if( key_code === 38 ) key.up = true;
	if( key_code === 39 ) key.right = true;
	if( key_code === 40 ) key.down = true;
	event.preventDefault();		//方向キーでブラウザがスクロールしないようにする
}
 
//キーボードが放（はな）されたときに呼び出される関数
function keyupfunc( event ) {
	let key_code = event.keyCode;
	if( key_code === 37 ) key.left = false;
	if( key_code === 38 ) key.up = false;
	if( key_code === 39 ) key.right = false;
	if( key_code === 40 ) key.down = false;
}

//ゲーム終了判定処理
function endJudge(inu_x,inu_y) {

	//ゲーム終了判定
	if (inu_x == neko.x / 32 && inu_y == neko.y / 32) {
		//いぬの移動先がねこの座標だった場合はゲームクリアとし、エンディング処理を実行する
		end();
	} else if ((inu_x == unchi1.x / 32 && inu_y == unchi1.y / 32)
		|| (inu_x == unchi2.x / 32 && inu_y == unchi2.y / 32)) {
		//いぬの移動先がうんちの座標だった場合はゲームオーバー
		inu.img.src = 'img/funyafunya32.png'; // 一時的にふにゃふにゃの画像になる
		// 0.03秒後にアラート表示して、初期化処理する
		setTimeout(function () {
			alert("ぎゃー！うんちふんじゃった！くさすぎるから、すたーとからやりなおしだわん！");
			clear(); // 初期化
			return true; // ゲーム終了
		}, 30);
	} else {
		//上記以外はゲーム続行
		return false;
	}
	
}

//初期化
function clear() {
	inu.img.src = 'img/inu32.png';
	inu.x = 0;
	inu.y = 0;
	inu.move = 0;
	neko.img.src = 'img/neko32.png';
	key.up = false;
	key.down = false;
	key.right = false;
	key.left = false;
	key.push = '';
}

//キャラクターオブジェクト作成
function createObject(fileName) {
	let obj = new Object();
	obj.img = new Image();
	obj.img.src = 'img/' + fileName + '.png';
	obj.x = 0;
	obj.y = 0;
	obj.move = 0;
	return obj;
}

//エンディング処理
function end() {

	//ゲームクリア用の画像を表示する
	inu.img.src = 'img/inu_kirakira32.png';
	neko.img.src = 'img/neko_kirakira32.png';

	// 0.03秒後にエンディング処理実行（エンディング用画像の描画が終わってから）
	setTimeout(function () {
		
		// 0.03秒後にアラート表示して、初期化処理する
		setTimeout(function () {
			alert("やったー！にゃんにゃんにやっとあえたわん！ごーるだわん！");
			clear(); // 初期化
			return true;// ゲーム終了
		}, 30);

		//ゲームクリアフラグをオン
		gameClearFlg = true;

		//エンディング用の画面をオーバーレイする
		$("#overlay_end, #overlayWindow_end").fadeIn();

		//１秒後にBGM変更処理を行う
		setTimeout(function () {

			//音楽再生フラグがオンであれば、エンディング用のBGMを再生
			if (musicFlg) {
				audio.pause();
				audio_end.play();
			}

			//５秒後にタイトル画面に戻る
			setTimeout(function () {
				location.href = "../index.html";
			}, 5000);

		}, 1250);

	}, 30);
	
}