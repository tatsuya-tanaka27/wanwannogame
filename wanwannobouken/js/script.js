//canvasの設定（せってい）
let canvas = document.getElementById( 'canvas' );
canvas.width = 640;		//canvasの横幅（よこはば）
canvas.height = 544;	//canvasの縦幅（たてはば）
 
//コンテキストを取得（しゅとく）
let ctx = canvas.getContext('2d');

//定数作成
const directionArray = [0, 1, 2, 3, 4]; //移動方向 0：なし 1：左 2：上 3：右 4：下
const moveTypeArray = [0, 1, 2, 3, 4]; //移動タイプ 0：なし 1：プレイヤー 2：固定移動 3：ランダム移動 4：追跡移動
const coalMessage = "やったー！にゃんにゃんにやっとあえたわん！ごーるだわん！";
const unchiMessage = "ぎゃー！うんちふんじゃった！くさすぎるから、すたーとからやりなおしだわん！";
const norainuMessage = "きゃん！のらいぬにこうげきされちゃった！すたーとからやりなおしだわん！";

//グローバル変数
let moveFlg = false; //全キャラクターの移動フラグ
let musicFlg = false; // 音楽再生フラグ
let gameOverExeFlg = false;//ゲームオーバー処理実行フラグ
let gameClearFlg = false;//ゲームクリアフラグ

//キャラクターのオブジェクトを作成
let inu = createObject('inu32', 'inu', 0, 0, directionArray[0], moveTypeArray[1]);
let neko = createObject('neko32', 'neko', 448, 384, directionArray[0], moveTypeArray[0]);
let unchi1 = createObject('unchi32', 'unchi1', 224, 320, directionArray[0], moveTypeArray[0]);
let unchi2 = createObject('unchi32', 'unchi2', 352, 288, directionArray[0], moveTypeArray[0]);
let norainu_navy = createObject('norainu_navy32', 'norainu_navy', 128, 128, directionArray[1], moveTypeArray[2]);
let norainu_purple = createObject('norainu_purple32', 'norainu_purple', 544, 96, directionArray[0], moveTypeArray[3]);
let norainu_green = createObject('norainu_green32', 'norainu_green', 416, 320, directionArray[2], moveTypeArray[2]);
let enemyObjectArray = [norainu_navy, norainu_purple, norainu_green];
 
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
		for (let y = 0; y < map.length; y++) {
			for (let x = 0; x < map[y].length; x++) {
				if (map[y][x] === 0) ctx.drawImage(michi, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);
				if (map[y][x] === 1) ctx.drawImage(kusa, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);
			}
		}
 
		//キャラクターをキャンバスに描画
		ctx.drawImage(inu.img, inu.x, inu.y);
		ctx.drawImage(neko.img, neko.x, neko.y);
		ctx.drawImage(unchi1.img, unchi1.x, unchi1.y);
		ctx.drawImage(unchi2.img, unchi2.x, unchi2.y);
		ctx.drawImage(norainu_navy.img, norainu_navy.x, norainu_navy.y);
		ctx.drawImage(norainu_purple.img, norainu_purple.x, norainu_purple.y);
		ctx.drawImage(norainu_green.img, norainu_green.x, norainu_green.y);
 
		//キーを押下した時と押下していない時のイベントに関数をバインド
		addEventListener("keydown", keydownfunc, false);
		addEventListener("keyup", keyupfunc, false);
 
		//いぬの移動
		move(inu);
		move(norainu_navy);
		move(norainu_purple);
		move(norainu_green);
 
		//ブラウザ描画開始前にアニメーション描画設定処理を発動する
		requestAnimationFrame(main);
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

//初期化
function clear() {

	//キー設定値の初期化
	key.up = false;
	key.down = false;
	key.right = false;
	key.left = false;
	key.push = '';

	//移動フラグ初期化
	moveFlg = false;

	//いぬの初期化
	inu.img.src = 'img/inu32.png';
	inu.x = 0;
	inu.y = 0;
	inu.direction = directionArray[0];
	inu.move = 0;

	//ねこの初期化
	neko.img.src = 'img/neko32.png';
	
    //のらいぬの初期化
	norainu_navy.x = 128;
	norainu_navy.y = 128;
	norainu_navy.direction = directionArray[1];
	norainu_navy.move = 0;
	norainu_purple.x = 544;
	norainu_purple.y = 96;
	norainu_purple.direction = directionArray[0];
	norainu_purple.move = 0;
	norainu_green.x = 416;
	norainu_green.y = 320;
	norainu_green.direction = directionArray[2];
	norainu_green.move = 0;

	//ゲームオーバー処理実行フラグをオンにする
	gameOverExeFlg = false;
}

//キャラクターオブジェクト作成
function createObject(fileName, objName, x, y, direction, moveType) {
	let obj = new Object();
	obj.img = new Image();
	obj.img.src = 'img/' + fileName + '.png'; //画像ファイル名
	obj.objName = objName; //キャラクター名
	obj.x = x; //横位置の座標
	obj.y = y; //縦位置の座標
	obj.direction = direction; //移動方向 0：なし 1：左 2：上 3：右 4：下
	obj.moveType = moveType; //移動タイプ 0：なし 1：プレイヤー 2：固定移動 3：ランダム移動 4：追跡移動
	obj.move = 0; //移動値
	return obj;
}

//キャラクターオブジェクトの移動
function move(obj) {

	//方向キーが押されている場合（ばあい）は、キャラクターオブジェクトが移動する
	if (obj.move === 0) {

		//方向キーが押下されたらいぬを動かし、移動フラグをオンにする。
		if (obj.objName == 'inu') {
			if (key.left === true) {
				obj.direction = directionArray[1];
				moveFlg = true;
			} else if (key.up === true) {
				obj.direction = directionArray[2];
				moveFlg = true;
			} else if (key.right === true) {
				obj.direction = directionArray[3];
				moveFlg = true;
			} else if (key.down === true) {
				obj.direction = directionArray[4];
				moveFlg = true;
			} else {
				obj.direction = directionArray[0];
				moveFlg = false;
			}
		}

		//移動フラグがオンだった場合は全キャラクターの移動設定開始
		if (moveFlg) {
			
			//移動タイプがランダムだった場合は、ランダムな方向に移動設定する
			if (obj.moveType == moveTypeArray[3]) {

				//切り上げのランダム数値を取得して、４以内の数字で整数化
				let randomNam = Math.random();
				randomNam = Math.round(randomNam * 4);

				//ランダム数値に対応した方向を設定
				if (randomNam == directionArray[1]) {
					obj.direction = directionArray[1]; //左
				} else if (randomNam == directionArray[2]) {
					obj.direction = directionArray[2]; //上
				} else if (randomNam == directionArray[3]) {
					obj.direction = directionArray[3]; //右
				} else if (randomNam == directionArray[4]) {
					obj.direction = directionArray[4]; //下
				} else {
					obj.direction = directionArray[0]; //なし
				}	
			}

			//左移動
			if ( obj.direction == directionArray[1] ) {
				let x = obj.x/32;
				let y = obj.y/32;
				x--;
				//終了判定がtrueでなければキャラクター移動値を設定
				if(!endJudge(x, y, obj)){
					if ( map[y][x] === 0 ) {
						obj.move = 32;
						//いぬだった場合は方向キーのコード値を設定
						if (obj.objName == 'inu') {

							//移動先がのらいぬがいる座標だった場合はゲームオーバー
							for (let loopNum = 0; loopNum < enemyObjectArray.length; loopNum++){
								if ((x === norainu_navy.x / 32 && y === norainu_navy.y / 32)
									|| (x === norainu_purple.x / 32 && y === norainu_purple.y / 32)
									|| (x === norainu_green.x / 32 && y === norainu_green.y / 32)) {
									//いぬの移動先がのらいぬの座標だった場合はゲームオーバー
									obj.move = 0;
									return gameOver(norainuMessage);
								}
							}

							//移動先にのらいぬがいなければ、キーコード設定
							key.push = 'left';

						} else {
							if (inu.x / 32 === x && inu.y / 32 === y) {
								//のらいぬの移動先がいぬの座標だった場合はゲームオーバー
								obj.move = 0;
								return gameOver(norainuMessage);
							} else if (inu.x / 32 === obj.x / 32 && inu.y / 32 === obj.y / 32) {
								//いぬとのらいぬの移動先が同じ座標だった場合はゲームオーバー
								obj.move = 0;
								return gameOver(norainuMessage);
							}
						}
					} else {
						//移動タイプが固定の場合は逆方向に設定する
						if (obj.moveType == moveTypeArray[2]) {
							obj.direction = directionArray[3];
						}
					}
				}
			}
			//上移動
			if ( obj.direction == directionArray[2] ) {
				let x = obj.x/32;
				let y = obj.y/32;
				if ( y > 0) {
					y--;
					//終了判定がtrueでなければキャラクター移動値を設定
					if (!endJudge(x, y, obj)) {
						if (map[y][x] === 0) {
							obj.move = 32;
							//いぬだった場合は方向キーのコード値を設定
							if (obj.objName == 'inu') {

								//移動先がのらいぬがいる座標だった場合はゲームオーバー
								for (let loopNum = 0; loopNum < enemyObjectArray.length; loopNum++){
									if ((x === norainu_navy.x / 32 && y === norainu_navy.y / 32)
										|| (x === norainu_purple.x / 32 && y === norainu_purple.y / 32)
										|| (x === norainu_green.x / 32 && y === norainu_green.y / 32)) {
										//いぬの移動先がのらいぬの座標だった場合はゲームオーバー
										obj.move = 0;
										return gameOver(norainuMessage);
									}
								}

								//移動先にのらいぬがいなければ、キーコード設定
								key.push = 'up';

							} else {
								if (inu.x / 32 === x && inu.y / 32 === y) {
									//のらいぬの移動先がいぬの座標だった場合はゲームオーバー
									obj.move = 0;
									return gameOver(norainuMessage);
								} else if (inu.x / 32 === obj.x / 32 && inu.y / 32 === obj.y / 32) {
									//いぬとのらいぬの移動先が同じ座標だった場合はゲームオーバー
									obj.move = 0;
									return gameOver(norainuMessage);
								}
							}
						} else {
							//移動タイプが固定の場合は逆方向に設定する
							if (obj.moveType == moveTypeArray[2]) {
								obj.direction = directionArray[4];
							}
						}
					}
				}
			}
			//右移動
			if ( obj.direction == directionArray[3] ) {
				let x = obj.x/32;
				let y = obj.y/32;
				x++;			
				if (map[y][x] === 0) {
					//終了判定がtrueでなければキャラクター移動値を設定
					if (!endJudge(x, y, obj)) {
						obj.move = 32;
						//いぬだった場合は方向キーのコード値を設定
						if (obj.objName == 'inu') {

							//移動先がのらいぬがいる座標だった場合はゲームオーバー
							for (let loopNum = 0; loopNum < enemyObjectArray.length; loopNum++){
								if ((x === norainu_navy.x / 32 && y === norainu_navy.y / 32)
									|| (x === norainu_purple.x / 32 && y === norainu_purple.y / 32)
									|| (x === norainu_green.x / 32 && y === norainu_green.y / 32)) {
									//いぬの移動先がのらいぬの座標だった場合はゲームオーバー
									obj.move = 0;
									return gameOver(norainuMessage);
								}
							}

							//移動先にのらいぬがいなければ、キーコード設定
							key.push = 'right';
							
						} else {
							if (inu.x / 32 === x && inu.y / 32 === y) {
								//のらいぬの移動先がいぬの座標だった場合はゲームオーバー
								obj.move = 0;
								return gameOver(norainuMessage);
							} else if (inu.x / 32 === obj.x / 32 && inu.y / 32 === obj.y / 32) {
								//いぬとのらいぬの移動先が同じ座標だった場合はゲームオーバー
								obj.move = 0;
								return gameOver(norainuMessage);
							}
						}
					}
				} else {
					//移動タイプが固定の場合は逆方向に設定する
					if (obj.moveType == moveTypeArray[2]) {
						obj.direction = directionArray[1];
					}
				}
			}
			//下移動
			if ( obj.direction == directionArray[4] ) {
				let x = obj.x/32;
				let y = obj.y/32;
				y++;
				if ( y < 17 ) {
					if (map[y][x] === 0) {
						//終了判定がtrueでなければキャラクター移動値を設定
						if (!endJudge(x, y, obj)) {
							obj.move = 32;
							//いぬだった場合は方向キーのコード値を設定
							if (obj.objName == 'inu') {

								//移動先がのらいぬがいる座標だった場合はゲームオーバー
								for (let loopNum = 0; loopNum < enemyObjectArray.length; loopNum++){
									if ((x === norainu_navy.x / 32 && y === norainu_navy.y / 32)
										|| (x === norainu_purple.x / 32 && y === norainu_purple.y / 32)
										|| (x === norainu_green.x / 32 && y === norainu_green.y / 32)) {
										//いぬの移動先がのらいぬの座標だった場合はゲームオーバー
										return gameOver(norainuMessage);
									}
								}

								//移動先にのらいぬがいなければ、キーコード設定
								key.push = 'down';

							}
						} else {
							if (inu.x / 32 === x && inu.y / 32 === y) {
								//のらいぬの移動先がいぬの座標だった場合はゲームオーバー
								obj.move = 0;
								return gameOver(norainuMessage);
							} else if (inu.x / 32 === obj.x / 32 && inu.y / 32 === obj.y / 32) {
								//いぬとのらいぬの移動先が同じ座標だった場合はゲームオーバー
								obj.move = 0;
								return gameOver(norainuMessage);
							}
						}
					} else {
						//移動タイプが固定の場合は逆方向に設定する
						if (obj.moveType == moveTypeArray[2]) {
							obj.direction = directionArray[2];
						}
					}
				}
			}
		}
	}

	//移動値が０より上であれば、移動値を設定
	if (obj.move > 0) {

		//移動値を4pxずつ進ませる（なめらかに移動しているように見せるため）
		obj.move -= 4;

		//いぬだった場合は方向キーに対応した移動値を設定する
		if(obj.objName == 'inu'){
			if ( key.push === 'left' ) obj.x -= 4; //左
			if ( key.push === 'up' ) obj.y -= 4; //上
			if ( key.push === 'right' ) obj.x += 4; //右
			if (key.push === 'down') obj.y += 4; //下
		} else {
			//敵の動き
			enemyMove(obj);
			endJudge(obj.x / 32, obj.y / 32, obj);
		}
	}
}

//敵の動き
function enemyMove(obj) {

	//設定された方向に4px分移動する
	if (obj.direction == directionArray[1]) {
		//左
		obj.x -= 4;
	} else if (obj.direction == directionArray[2]) {
		//上
		obj.y -= 4;
	} else if (obj.direction == directionArray[3]) {
		//右
		obj.x += 4;
	} else if (obj.direction == directionArray[4]) {
		//下
		obj.y += 4;
	} else {
		return "";
	}
	
}

//ゲーム終了判定処理
function endJudge(x, y, obj) {

	// 処理対象がいぬの場合だけ、いぬ用の判定処理を行う
	if (obj.objName == 'inu') {

		//いぬの移動先の座標を設定
		inu_x = x;
		inu_y = y;

		//ゲーム終了判定
		if (inu_x == neko.x / 32 && inu_y == neko.y / 32) {
			//いぬの移動先がねこの座標だった場合はゲームクリアとし、エンディング処理を実行する
			end();
		} else if ((inu_x == unchi1.x / 32 && inu_y == unchi1.y / 32)
			|| (inu_x == unchi2.x / 32 && inu_y == unchi2.y / 32)) {
			//いぬの移動先がうんちの座標だった場合はゲームオーバー
			return gameOver(unchiMessage);
		} else if ((inu_x === norainu_navy.x / 32 && inu_y === norainu_navy.y / 32)
			|| (inu_x === norainu_purple.x / 32 && inu_y === norainu_purple.y / 32)
			|| (inu_x === norainu_green.x / 32 && inu_y === norainu_green.y / 32)) {
			//いぬの移動先がのらいぬの座標だった場合はゲームオーバー
			return gameOver(norainuMessage);
		} else {
			//上記以外はゲーム続行
			return false;
		}
	} else {
		//いぬ以外の判定用処理
		if (inu.x / 32 === x && inu.y / 32 === y) {
			//のらいぬの移動先がいぬの座標だった場合はゲームオーバー
			return gameOver(norainuMessage);
		} else if (inu.x / 32 === obj.x / 32 && inu.y / 32 === obj.y / 32) {
			//いぬとのらいぬの移動先が同じ座標だった場合はゲームオーバー
			return gameOver(norainuMessage);
		} else {
			//上記以外はゲーム続行
			return false;
		}
	}	
}

//ゲームオーバー処理
function gameOver(message) {

	//ゲームオーバー処理実行フラグがオフの場合はゲームオーバー処理を実行
	if (!gameOverExeFlg) {

		//ゲームオーバー処理実行フラグをオンにする
		gameOverExeFlg = true;

		// 一時的にふにゃふにゃの画像になる
		inu.img.src = 'img/funyafunya32.png';

		// 0.03秒後にアラート表示して、初期化処理する
		setTimeout(function () {
			alert(message);
			clear(); // 初期化
			return true; // ゲーム終了
		} , 30);
	}
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