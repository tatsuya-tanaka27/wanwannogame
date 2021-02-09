//canvasの設定（せってい）
let canvas = document.getElementById( 'canvas' );
canvas.width = 640;		//canvasの横幅（よこはば）
canvas.height = 544;	//canvasの縦幅（たてはば）
 
//コンテキストを取得（しゅとく）
let ctx = canvas.getContext('2d');

//定数作成
const directionArray = [0, 1, 2, 3, 4]; //移動方向 0：なし 1：左 2：上 3：右 4：下
const moveTypeArray = [0, 1, 2, 3, 4, 5, 6, 7]; //移動タイプ 0：置物 1：プレイヤー 2：固定移動 3：ランダム移動 4：追跡移動 5：アイテム（装備） 6：アイテム（消費） 7：階段
const coalMessage = "やったー！にゃんにゃんにやっとあえたわん！げーむくりあだわん！";
const unchiMessage = "ぎゃー！うんちふんじゃった！くさすぎるから、すたーとからやりなおしだわん！";
const unchiTrapMessage = "わーい、ちょこそふとだわん！と、思ったらうんちとらっぷだったわん！くさすぎるから、すたーとからやりなおしだわん！";
const deadMessage = "きゃん！てきにやられちゃった！げーむおーばーになったので、さいしょからやりなおしだわん！";
const bossBattleDeadMessage = "きゃん！ぼすにやられちゃった！げーむおーばーになったので、さいしょからやりなおしだわん！つぎは装備品とかをちゃんと拾って、やりなおすわん！";
const bossBattleWinMessage = "ひゃっほー、ぼすをたおしたわん！さっそく、にゃんにゃんをむかえにいくわん！";
const bossBattleDefaultMessage = "がっはっはっ！<br />にゃんにゃんを返してほしければ<br />この俺様と勝負するがう！！";
const dispTypeArray = [0, 1, 2, 3, 4]; //表示タイプ 0：プレイヤー 1：１階 2：２階 3：３階 4：最終階
const mapTypeArray = [0, 1, 2, 3, 4]; //マップタイプ 0：なし 1：１階 2：２階 3：３階 4：最終階
const norainu_navy_statusArray = [2, 2, 0]; //のらいぬ紺のステータス[HP, 攻撃力, 防御力]
const norainu_purple_statusArray = [4, 3, 0]; //のらいぬ紺のステータス[HP, 攻撃力, 防御力]
const norainu_green_statusArray = [8, 5, 0]; //のらいぬ紺のステータス[HP, 攻撃力, 防御力]
const okimono_statusArray = [1, 0, 0]; //置物のステータス[HP, 攻撃力, 防御力]
const rengaArray = ['dummy', 'img/renga32_1.png', 'img/renga32_2.png', 'img/renga32_3.png', 'img/renga32_4.png']; //レンガの画像
const mapArray = [ //マップ情報三次元配列 0：なし(ダミー要素) 1：１階 2：２階 3：３階 4：最終階
	[['dummy']],
	[
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
	],
	[
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
	],
	[
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
	],
	[
		[1, 1, 1, 1, 1, 1, 1, 1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1],
		[1, 1, 1, 1, 1, 1, 0, 0 ,0 ,0 ,0 ,0 ,0 ,1 ,1 ,1 ,1 ,1 ,1 ,1],
		[1, 1, 1, 1, 1, 1, 0, 0 ,0 ,0 ,0 ,0 ,0 ,1 ,1 ,1 ,1 ,1 ,1 ,1],
		[1, 1, 1, 1, 1, 1, 0, 0 ,0 ,0 ,0 ,0 ,0 ,1 ,1 ,1 ,1 ,1 ,1 ,1],
		[1, 1, 1, 1, 1, 1, 0, 0 ,0 ,0 ,0 ,0 ,0 ,1 ,1 ,1 ,1 ,1 ,1 ,1],
		[1, 1, 1, 1, 1, 1, 0, 0 ,0 ,0 ,0 ,0 ,0 ,1 ,1 ,1 ,1 ,1 ,1 ,1],
		[1, 1, 1, 1, 1, 1, 0, 0 ,0 ,0 ,0 ,0 ,0 ,1 ,1 ,1 ,1 ,1 ,1 ,1],
		[1, 1, 1, 1, 1, 1, 1, 1 ,1 ,0 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1],
		[1, 1, 1, 1, 1, 1, 1, 1 ,1 ,0 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1],
		[1, 1, 1, 1, 1, 1, 1, 1 ,1 ,0 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1],
		[1, 1, 1, 1, 1, 1, 1, 1 ,1 ,0 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1],
		[1, 1, 1, 1, 1, 1, 1, 1 ,1 ,0 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1],
		[1, 1, 1, 1, 1, 1, 1, 1 ,1 ,0 ,0 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1],
		[1, 1, 1, 1, 1, 1, 1, 1 ,1 ,0 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1],
		[1, 1, 1, 1, 1, 1, 1, 1 ,1 ,0 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1],
		[1, 1, 1, 1, 1, 1, 1, 1 ,1 ,0 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	]
]

//グローバル変数
let moveFlg = false; //全キャラクターの移動フラグ
let musicFlg = false; //音楽再生フラグ
let battleLog = document.getElementById("battlelog"); //バトルログ
let battleFlg = false; //戦闘可能フラグ
let gameClearFlg = false //ゲームクリアフラグ
let touchCounter = 0; //戦闘回数カウンター
let dispHp = document.getElementById("hp"); //画面表示用HP
let dispAtk = document.getElementById("atk") ; //画面表示用攻撃力
let dispDef = document.getElementById("def"); //画面表示用防御力
let dispMessage = document.getElementById('message');
let battle_hp = document.getElementById("battle_hp"); //ボスバトル画面表示用HP
let mp = document.getElementById("mp"); //ボスバトル画面表示用MP
let tenshon = document.getElementById("tenshon"); //ボスバトル画面表示用テンション
let audio = document.getElementById("audio");//通常曲
let audio_boss = document.getElementById("audio_boss");//ボス曲
let audio_end = document.getElementById("audio_end");//エンディング曲
let inu_move_x = 0; //わんわんの横移動先の座標
let inu_move_y = 0; //わんわんの縦移動先の座標
let inu_start_x = 0; //わんわんの現在の階の横スタート位置
let inu_start_y = 0; //わんわんの現在の階の縦スタート位置
let inu_file_name = 'inu32' //わんわんの現在の画像
let mapType = mapTypeArray[1]; //マップの初期値：１階
let wanwanStatusArray = [5, 1, 1]; //[最大HP, 現在の攻撃力, 現在の防御力]
let boss_statusArray = [200, 35, 10]; //ぼすのステータス[HP, 攻撃力, 防御力]
let battleCounter = 0; //合計戦闘回数
let chocosoftCounter = 0;//ちょこそふとカウンター（割り込み処理防止用）
let bossFlg = false;//ボスバトルフラグ
let menu_id = 0;//ボスバトルで使用するバトルメニュー管理用のID値
let inu_mp = 0;//ボスバトルで使用するわんわんのMP
let inu_tenshon = 0;//ボスバトルで使用するわんわんのテンション
let turnFlg = false;//ボスバトル用のターンフラグ false：プレイヤー true：敵
let bossBattleMessage = "";//ボスバトル画面に表示するメッセージ
let inuDamage = 0;//ボスバトル画面に表示するわんわんが受けたダメージ
let bossinuDamage = 0;//ボスバトル画面に表示するぼすが受けたダメージ
let defFlg = false;//わんわんの防御フラグ
let bossSkillFlg = false;//ぼすのスキル発動フラグ
let powerAttackFlg = false;//ぼすのパワーアタックフラグ
let doubleAttackFlg = false;//ぼすのダブルアタックフラグ
let powerAttackCounter = 0;//ぼすのパワーアタック発動からの経過ターン数
let missFlg = false;//攻撃ミスフラグ
let criticalFlg = false;//クリティカル攻撃フラグ
let reTryFlg = false;//ボスバトルの操作やり直しフラグ
let winFlg = false;//ボスバトル勝利フラグ

//キャラクターのオブジェクトを作成 後に描画したものが高さ上になるので、キャラは後に描画する
let objectArray = []; //全オブジェクトを保持する配列
//１階のオブジェクト
let kaidan1 = createObject('kaidan32', 'kaidan', 448, 384, directionArray[0], moveTypeArray[7], okimono_statusArray[0], okimono_statusArray[1], okimono_statusArray[2], '階段', false, dispTypeArray[1], false);
objectArray.push(kaidan1); //全オブジェクト配列に追加
let buki1 = createObject('hone_red32', 'buki1', 224, 224, directionArray[0], moveTypeArray[5], okimono_statusArray[0], 1, okimono_statusArray[2], 'ふつうのほねそーど', false, dispTypeArray[1], false);
objectArray.push(buki1); //全オブジェクト配列に追加
let bougu1 = createObject('kubiwa_red32', 'bougu1', 512, 288, directionArray[0], moveTypeArray[5], okimono_statusArray[0], okimono_statusArray[1], 1, 'ふつうのくびわ', false, dispTypeArray[1], false);
objectArray.push(bougu1); //全オブジェクト配列に追加
let softcream1 = createObject('softcream32', 'softcream', 96, 352, directionArray[0], moveTypeArray[6], okimono_statusArray[0], okimono_statusArray[1], okimono_statusArray[2], 'ソフトクリーム', false, dispTypeArray[1], false);
objectArray.push(softcream1); //全オブジェクト配列に追加
let niku1 = createObject('niku32', 'niku', 480, 96, directionArray[0], moveTypeArray[6], okimono_statusArray[0], okimono_statusArray[1], okimono_statusArray[2], 'ほねつきにく', false, dispTypeArray[1], false);
objectArray.push(niku1); //全オブジェクト配列に追加
let unchi1 = createObject('unchi32', 'unchi', 224, 320, directionArray[0], moveTypeArray[0], okimono_statusArray[0], okimono_statusArray[1], okimono_statusArray[2], 'うんち', false, dispTypeArray[1], false);
objectArray.push(unchi1); //全オブジェクト配列に追加
let unchi2 = createObject('unchi32', 'unchi', 352, 288, directionArray[0], moveTypeArray[0], okimono_statusArray[0], okimono_statusArray[1], okimono_statusArray[2], 'うんち', false, dispTypeArray[1], false);
objectArray.push(unchi2); //全オブジェクト配列に追加
let norainu_navy1 = createObject('norainu_navy32', 'norainu_navy1', 128, 128, directionArray[1], moveTypeArray[2], norainu_navy_statusArray[0], norainu_navy_statusArray[1], norainu_navy_statusArray[2], 'のらいぬ紺１', false, dispTypeArray[1], false);
objectArray.push(norainu_navy1); //全オブジェクト配列に追加
let norainu_navy2 = createObject('norainu_navy32', 'norainu_navy2', 416, 320, directionArray[2], moveTypeArray[2], norainu_navy_statusArray[0], norainu_navy_statusArray[1], norainu_navy_statusArray[2], 'のらいぬ紺２', false, dispTypeArray[1], false);
objectArray.push(norainu_navy2); //全オブジェクト配列に追加
let norainu_purple1 = createObject('norainu_purple32', 'norainu_purple1', 544, 96, directionArray[0], moveTypeArray[3], norainu_purple_statusArray[0], norainu_purple_statusArray[1], norainu_purple_statusArray[2], 'のらいぬ紫１', false, dispTypeArray[1], false);
objectArray.push(norainu_purple1); //全オブジェクト配列に追加
//２階のオブジェクト
let kaidan2 = createObject('kaidan32', 'kaidan', 96, 0, directionArray[0], moveTypeArray[7], okimono_statusArray[0], okimono_statusArray[1], okimono_statusArray[2], '階段', false, dispTypeArray[2], false);
objectArray.push(kaidan2); //全オブジェクト配列に追加
let unchi3 = createObject('unchi32', 'unchi', 544, 416, directionArray[0], moveTypeArray[0], okimono_statusArray[0], okimono_statusArray[1], okimono_statusArray[2], 'うんち', false, dispTypeArray[2], false);
objectArray.push(unchi3); //全オブジェクト配列に追加
let unchi4 = createObject('unchi32', 'unchi', 160, 384, directionArray[0], moveTypeArray[0], okimono_statusArray[0], okimono_statusArray[1], okimono_statusArray[2], 'うんち', false, dispTypeArray[2], false);
objectArray.push(unchi4); //全オブジェクト配列に追加
let buki2 = createObject('hone_green32', 'buki2', 96, 352, directionArray[0], moveTypeArray[5], okimono_statusArray[0], 2, okimono_statusArray[2], 'かっこいいほねそーど', false, dispTypeArray[2], false);
objectArray.push(buki2); //全オブジェクト配列に追加
let bougu2 = createObject('kubiwa_green32', 'bougu2', 544, 96, directionArray[0], moveTypeArray[5], okimono_statusArray[0], okimono_statusArray[1], 2, 'かっこいいくびわ', false, dispTypeArray[2], false);
objectArray.push(bougu2); //全オブジェクト配列に追加
let softcream2 = createObject('softcream32', 'softcream', 384, 64, directionArray[0], moveTypeArray[6], okimono_statusArray[0], okimono_statusArray[1], okimono_statusArray[2], 'ソフトクリーム', false, dispTypeArray[2], false);
objectArray.push(softcream2); //全オブジェクト配列に追加
let niku2 = createObject('niku32', 'niku', 64, 32, directionArray[0], moveTypeArray[6], okimono_statusArray[0], okimono_statusArray[1], okimono_statusArray[2], 'ほねつきにく', false, dispTypeArray[2], false);
objectArray.push(niku2); //全オブジェクト配列に追加
let norainu_green1 = createObject('norainu_green32', 'norainu_green1', 608, 64, directionArray[1], moveTypeArray[2], norainu_green_statusArray[0], norainu_green_statusArray[1], norainu_green_statusArray[2], 'のらいぬ緑１', false, dispTypeArray[2], false);
objectArray.push(norainu_green1); //全オブジェクト配列に追加
let norainu_purple2 = createObject('norainu_purple32', 'norainu_purple2', 256, 416, directionArray[0], moveTypeArray[3], norainu_purple_statusArray[0], norainu_purple_statusArray[1], norainu_purple_statusArray[2], 'のらいぬ紫２', false, dispTypeArray[2], false);
objectArray.push(norainu_purple2); //全オブジェクト配列に追加
let norainu_purple3 = createObject('norainu_purple32', 'norainu_purple3', 192, 160, directionArray[0], moveTypeArray[3], norainu_purple_statusArray[0], norainu_purple_statusArray[1], norainu_purple_statusArray[2], 'のらいぬ紫３', false, dispTypeArray[2], false);
objectArray.push(norainu_purple3); //全オブジェクト配列に追加
//３階のオブジェクト
let kaidan3 = createObject('kaidan32', 'kaidan', 320, 384, directionArray[0], moveTypeArray[7], okimono_statusArray[0], okimono_statusArray[1], okimono_statusArray[2], '階段', false, dispTypeArray[3], false);
objectArray.push(kaidan3); //全オブジェクト配列に追加
let buki3 = createObject('hone_blue32', 'buki3', 160, 0, directionArray[0], moveTypeArray[5], okimono_statusArray[0], 3, okimono_statusArray[2], 'でんせつのほねそーど', false, dispTypeArray[3], false);
objectArray.push(buki3); //全オブジェクト配列に追加
let bougu3 = createObject('kubiwa_blue32', 'bougu3', 32, 512, directionArray[0], moveTypeArray[5], okimono_statusArray[0], okimono_statusArray[1], 3, 'でんせつのくびわ', false, dispTypeArray[3], false);
objectArray.push(bougu3); //全オブジェクト配列に追加
let softcream3 = createObject('softcream32', 'softcream', 256, 288, directionArray[0], moveTypeArray[6], okimono_statusArray[0], okimono_statusArray[1], okimono_statusArray[2], 'ソフトクリーム', false, dispTypeArray[3], false);
objectArray.push(softcream3); //全オブジェクト配列に追加
let niku3 = createObject('niku32', 'niku', 544, 512, directionArray[0], moveTypeArray[6], okimono_statusArray[0], okimono_statusArray[1], okimono_statusArray[2], 'ほねつきにく', false, dispTypeArray[3], false);
objectArray.push(niku3); //全オブジェクト配列に追加
let unchi5 = createObject('unchi32', 'unchi', 64, 256, directionArray[0], moveTypeArray[0], okimono_statusArray[0], okimono_statusArray[1], okimono_statusArray[2], 'うんち', false, dispTypeArray[3], false);
objectArray.push(unchi5); //全オブジェクト配列に追加
let unchi6 = createObject('unchi32', 'unchi', 320, 288, directionArray[0], moveTypeArray[0], okimono_statusArray[0], okimono_statusArray[1], okimono_statusArray[2], 'うんち', false, dispTypeArray[3], false);
objectArray.push(unchi6); //全オブジェクト配列に追加
let norainu_green2 = createObject('norainu_green32', 'norainu_green2', 256, 64, directionArray[1], moveTypeArray[2], norainu_green_statusArray[0], norainu_green_statusArray[1], norainu_green_statusArray[2], 'のらいぬ緑２', false, dispTypeArray[3], false);
objectArray.push(norainu_green2); //全オブジェクト配列に追加
let norainu_green3 = createObject('norainu_green32', 'norainu_green3', 64, 448, directionArray[4], moveTypeArray[2], norainu_green_statusArray[0], norainu_green_statusArray[1], norainu_green_statusArray[2], 'のらいぬ緑３', false, dispTypeArray[3], false);
objectArray.push(norainu_green3); //全オブジェクト配列に追加
let norainu_green4 = createObject('norainu_green32', 'norainu_green4', 288, 384, directionArray[4], moveTypeArray[3], norainu_green_statusArray[0], norainu_green_statusArray[1], norainu_green_statusArray[2], 'のらいぬ緑４', false, dispTypeArray[3], false);
objectArray.push(norainu_green4); //全オブジェクト配列に追加
//４階
let golden_niku = createObject('golden_niku32', 'golden_niku', 288, 320, directionArray[0], moveTypeArray[6], okimono_statusArray[0], okimono_statusArray[1], okimono_statusArray[2], 'ごーるでんほねつきにく', false, dispTypeArray[4], false);
objectArray.push(golden_niku); //全オブジェクト配列に追加
let chocosoft = createObject('chocosoft32', 'chocosoft', 288, 480, directionArray[0], moveTypeArray[0], okimono_statusArray[0], okimono_statusArray[1], okimono_statusArray[2], 'ちょこそふと', false, dispTypeArray[4], false);
objectArray.push(chocosoft); //全オブジェクト配列に追加
let neko = createObject('neko32', 'neko', 288, 96, directionArray[0], moveTypeArray[0], okimono_statusArray[0], okimono_statusArray[1], okimono_statusArray[2], 'にゃんにゃん', false, dispTypeArray[4], false);
objectArray.push(neko); //全オブジェクト配列に追加
let bossinu = createObject('bossinu36', 'bossinu', 288, 192, directionArray[0], moveTypeArray[0], boss_statusArray[0], boss_statusArray[1], boss_statusArray[2], 'ぼす', false, dispTypeArray[4], false);
objectArray.push(bossinu); //全オブジェクト配列に追加
//プレイヤー
let inu = createObject('inu32', 'inu', inu_start_x, inu_start_y, directionArray[0], moveTypeArray[1], wanwanStatusArray[0], wanwanStatusArray[1], wanwanStatusArray[2], 'わんわん', false, dispTypeArray[0], false);
objectArray.push(inu); //全オブジェクト配列に追加
 
//マップチップのImageオブジェクトを作る
let michi = new Image();
michi.src = 'img/michi32.png'; //道
let renga = new Image();
renga.src = rengaArray[mapType]; //レンガ
 
//キーボードのオブジェクトを作成
let key = new Object();
key.up = false;
key.down = false;
key.right = false;
key.left = false;
key.push = '';
 
//マップの作成（さくせい）
let map = mapArray[mapType];

//初期状態は音楽停止
audio.pause();
audio_boss.pause();
audio_end.pause();

//ボスバトル画面で表示するデフォルトメッセージの設定
bossBattleMessage = bossBattleDefaultMessage;
dispMessage.innerHTML = bossBattleMessage;

/*
//テスト用
inu.hp = 1;
wanwanStatusArray[0] = 1;
inu.atk = 400;
inu.def = 4;
mapType = 4;
inu.x = 320;
inu.y = 384;
inu_start_x = 320;
inu_start_y = 384;
*/

 
//メインループ
function main() {

	//ゲームクリアフラグがオフの場合にメイン処理を実行
	if (!gameClearFlg) {

		//キーを押下した時と押下していない時のイベントに関数をバインド
		addEventListener("keydown", keydownfunc, false);
		addEventListener("keyup", keyupfunc, false);

		//キャラが分身して移動しているように見えないようにするための対策
		ctx.fillStyle = "rgb( 240, 221, 182 )"; //キャラ移動した時に塗（ぬ）りつぶす色を指定（してい） 
		ctx.fillRect(0, 0, 640, 544); //塗（ぬ）りつぶす

		//わんわんのステータスを画面に表示
		dispHp.value = inu.hp;
		dispAtk.value = inu.atk;
		dispDef.value = inu.def;

		//キャンバス情報生成
		canvasCreate();

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

//キャラクターオブジェクト作成
function createObject(fileName, objName, x, y, direction, moveType, hp, atk, def, dispName, 
atkFlg, dispType, itemFlg) {
	let obj = new Object();
	obj.img = new Image();
	obj.fileName = fileName; //画像ファイル名
	obj.img.src = 'img/' + fileName + '.png'; //画像パス
	obj.objName = objName; //キャラクター名
	obj.x = x; //横位置の座標
	obj.y = y; //縦位置の座標
	obj.direction = direction; //移動方向 0：なし 1：左 2：上 3：右 4：下
	obj.moveType = moveType; //移動タイプ 0：置物 1：プレイヤー 2：固定移動 3：ランダム移動 4：追跡移動 5：アイテム（装備） 6：アイテム（消費） 7：階段
	obj.move = 0; //移動値
	obj.hp = hp; //HP
	obj.atk = atk; //攻撃力
	obj.def = def; //防御力
	obj.dispName = dispName; //バトルログ表示名
	obj.atkFlg = atkFlg; //攻撃フラグ
	obj.dispType = dispType; //表示タイプ
	obj.itemFlg = itemFlg; //アイテムフラグ false：拾われてない true：拾われた
	//オブジェクトのステータスをディープコピーして、デフォルトステータス作成
	obj.defaultStatus = JSON.parse(JSON.stringify(obj));
	ctx.drawImage(obj.img, obj.x, obj.y);
	return obj;
}

//キャンバスの中身を生成
function canvasCreate() {

	//マップ情報取得
	map = mapArray[mapType];
 
	//キャンバス領域の上限に達するまで、マップチップを配置する
	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map[y].length; x++) {
			if ( map[y][x] === 0 ) ctx.drawImage( michi, 0, 0, 32, 32, 32*x, 32*y, 32, 32 );
			if ( map[y][x] === 1 ) ctx.drawImage( renga, 0, 0, 32, 32, 32*x, 32*y, 32, 32 );
		}
	}

	//キャラクターをキャンバスに描画
	for (let z = 0; z < objectArray.length; z++){

		//オブジェクト情報取得
		let obj = objectArray[z];

		//表示タイプ別にキャラをキャンバスに描画する
		if (obj.dispType == dispTypeArray[0]) {
			//プレイヤー（わんわん）はつねに表示して、移動させる
			ctx.drawImage(obj.img, obj.x, obj.y);
			move(obj);
		} else if (obj.dispType == mapType) {
			//マップタイプ毎のキャラを表示する

			//HPが0ではないオブジェクトを表示する
			if (obj.hp > 0) {
				//置物と敵キャラを表示する
				if (obj.moveType == moveTypeArray[0] || obj.moveType == moveTypeArray[7]) {
					//移動タイプが置物か階段の場合は固定で表示する
					ctx.drawImage(obj.img, obj.x, obj.y,);
				} else if (obj.moveType == moveTypeArray[5] || obj.moveType == moveTypeArray[6]) {
					//移動タイプがアイテムで、アイテムフラグがオフの場合は固定で表示する
					if (!obj.itemFlg) {
						ctx.drawImage(obj.img, obj.x, obj.y,);
					}
				} else {
					//敵キャラ

					//HPが0ではない敵を表示して、移動させる
					ctx.drawImage(obj.img, obj.x, obj.y);
					move(obj);
				}
			} 
		}
	}
}

//BGM制御
function bgm() {
	let audio = document.getElementById('audio');
	if (musicFlg) {
		audio.pause();
		audio_boss.pause();
		audio_end.pause();
		musicFlg = false;
	} else {
		audio.currentTime = 0;
		audio.play();
		audio_boss.pause();
		audio_end.pause();
		musicFlg = true;
	}
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
	
	//戦闘フラグ初期化
	battleFlg = false;

	//バトルログ初期化
	battleLog.value = "";

	//ボスバトル勝利フラグがオフの場合のみ、現在の階のスタート位置に戻る
	if (!winFlg || chocosoftCounter > 0) {
		//わんわんの位置を現在の階の初期位置にする
		inu.x = inu_start_x;
		inu.y = inu_start_y;
	}
	
	//わんわんの画像設定
	inu.img.src = "img/" + inu_file_name + ".png";

	//ちょこそふとカウンターをリセット
	chocosoftCounter = 0;

	//わんわんのHPが1より下になった場合は全てを初期化
	if (inu.hp < 1) {

		//マップを１階にする
		mapType = mapTypeArray[1];

		//わんわんを１階の初期位置に移動させる
		inu_start_x = 0;
		inu_start_y = 0;
		inu.x = inu_start_x;
		inu.y = inu_start_y;

		//ゲームクリアフラグをオンにする
		gameClearFlg = false;

		//わんわんのステータスを初期化
		wanwanStatusArray = [5, 1, 1];

		//レンガの画像を初期化
		renga.src = rengaArray[1];

		//全オブジェクトの初期化を行う
		for (let z = 0; z < objectArray.length; z++) {
			let obj = objectArray[z];
			obj.img.src = 'img/' + obj.defaultStatus.fileName + '.png'; //画像ファイル名
			obj.objName = obj.defaultStatus.objName; //キャラクター名
			obj.x = obj.defaultStatus.x; //横位置の座標
			obj.y = obj.defaultStatus.y; //縦位置の座標
			obj.direction = obj.defaultStatus.direction; //移動方向 0：なし 1：左 2：上 3：右 4：下
			obj.moveType = obj.defaultStatus.moveType; //移動タイプ 0：なし 1：プレイヤー 2：固定移動 3：ランダム移動 4：追跡移動
			obj.move = obj.defaultStatus.move; //移動値
			obj.hp = obj.defaultStatus.hp; //HP
			obj.atk = obj.defaultStatus.atk; //攻撃力
			obj.def = obj.defaultStatus.def; //防御力
			obj.dispName = obj.defaultStatus.dispName; //バトルログ表示名
			obj.atkFlg = obj.defaultStatus.atkFlg; //攻撃フラグ
			obj.dispType = obj.defaultStatus.dispType; //表示タイプ
			obj.itemFlg= obj.defaultStatus.itemFlg; //アイテムフラグ 0：拾われてない 1：拾われた

			//プレイヤーと１階のオブジェクトを表示
			if (obj.dispType == dispTypeArray[0] || obj.dispType == dispTypeArray[1]) {
				ctx.drawImage(obj.img, obj.x, obj.y);
			}

			//ボスバトル画面のメッセージを初期化
			bossBattleMessage = bossBattleDefaultMessage;
			dispMessage.innerHTML = bossBattleMessage;
		}
	}
}

//キャラクターオブジェクトの移動
function move(obj) {

	//方向キーが押されている場合（ばあい）は、キャラクターオブジェクトが移動する
	if (obj.move === 0) {
		
		//方向キーが押下されたらわんわんを動かし、移動フラグをオンにする。
		if (obj.objName == 'inu') {
			if (key.left === true) {
				obj.direction = directionArray[1];
				moveFlg = true;
				battleFlg = true;
			} else if (key.up === true) {
				obj.direction = directionArray[2];
				moveFlg = true;
				battleFlg = true;
			} else if (key.right === true) {
				obj.direction = directionArray[3];
				moveFlg = true;
				battleFlg = true;
			} else if (key.down === true) {
				obj.direction = directionArray[4];
				moveFlg = true;
				battleFlg = true;
			} else {
				obj.direction = directionArray[0];
				moveFlg = false;
				battleFlg = false;
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
				//移動設定処理
				moveSet(x, y, obj, 'left');
			}
			//上移動
			if ( obj.direction == directionArray[2] ) {
				let x = obj.x/32;
				let y = obj.y / 32;

				//わんわん以外が一番上より上に移動しようとしたら方向転換する
				if (y - 1 < 0 && obj.objName != 'inu') {
					obj.direction = directionArray[4];
				}
				
				//移動先が一番上より上でなければ移動設定開始
				if ( y > 0) {
					y--;
					//移動設定処理
					moveSet(x, y, obj, 'up');
				}
			}
			//右移動
			if ( obj.direction == directionArray[3] ) {
				let x = obj.x/32;
				let y = obj.y/32;
				x++;			
				//移動設定処理
				moveSet(x, y, obj, 'right');
			}
			//下移動
			if ( obj.direction == directionArray[4] ) {
				let x = obj.x/32;
				let y = obj.y/32;
				y++;

				//わんわん以外が一番下より下に移動しようとしたら方向転換する
				if (y >= 17 && obj.objName != 'inu') {
					obj.direction = directionArray[2];
				}

				//移動先が一番下より下でなければ移動設定開始
				if (y < 17) {
					//移動設定処理
					moveSet(x, y, obj, 'down');
				}
			}
		}
	}

	//移動値による処理
	if (obj.move > 0) {
		//移動値が０より上であれば、移動値を設定

		//移動値を4pxずつ進ませる（なめらかに移動しているように見せるため）
		obj.move -= 4;

		//わんわんだった場合は方向キーに対応した移動値を設定する
		if(obj.objName == 'inu'){
			inuMove(obj);
		} else {
			//敵の動き
			enemyMove(obj);
		}
	} else {
		//移動値が０より下であれば、バトル、もしくは、アイテムの処理を行う
		if (obj.objName == 'inu') {
			//処理対象がわんわんだった場合

			//あとでなにかあれば追加する
			
		} else {
			//処理対象がわんわん以外だった場合はバトル処理を行う

			//攻撃フラグがオンだった場合はタッチカウンターをインクリメントする
			if (obj.atkFlg) {
				touchCounter++;
			}
		
			//バトル処理
			battle(obj);
		}
	}
}

//移動設定処理
function moveSet(x, y, obj, directionCode) {
	
	if (map[y][x] === 0) {
		//終了判定がtrueでなければキャラクター移動値を設定
		if (!endJudge(x, y, obj)) {
			//わんわんだった場合
			if (obj.objName == 'inu') {

				//方向キーのコード値を設定
				key.push = directionCode;

				//わんわん移動フラグ
				let inuMoveFlg = true;

				//わんわんのアイテム接触フラグ
				let inuItemFlg = false;

				//わんわんがゲットするアイテム
				let getItemObj = null;

				//マップ変更フラグ
				let mapChangeFlg = false;

				//わんわんが接触した階段オブジェクト
				let kaidanObj = null;

				//うんちフラグ
				let unchiFlg = false;

				//ちょこそふと接触フラグ
				let chocosoftFlg = false;

				//全オブジェクト分のチェック処理を行う
				for (let z = 0; z < objectArray.length; z++) {

					//オブジェクト情報取得
					let checkObj = objectArray[z];

					//現在いる階のオブジェクトのみチェック対象にする
					if (checkObj.dispType == mapType) {
		
						//チェック対象オブジェクトの移動タイプが移動型の場合（敵）に判定処理を行う
						if (checkObj.moveType == moveTypeArray[2] || checkObj.moveType == moveTypeArray[3]
							|| checkObj.moveType == moveTypeArray[4]) {
							if ((checkObj.hp > 0) && (checkObj.y / 32 == y && checkObj.x / 32 == x)) {
								//移動先にHPが残っている敵がいた場合は動かない
								obj.move = 0;
								inuMoveFlg = false;
								break;
							}
						} else if (checkObj.moveType == moveTypeArray[5] || checkObj.moveType == moveTypeArray[6]) {
							//チェック対象オブジェクトの移動タイプがアイテムの場合はアイテム処理を行う
							if (checkObj.y / 32 == y && checkObj.x / 32 == x) {
								//わんわんとアイテムの座標が一致した場合はアイテム接触フラグをオンにする
								inuItemFlg = true; 
								getItemObj = checkObj; //座標が一致したアイテムを取得する
								break;
							}
						} else if (checkObj.moveType == moveTypeArray[7]) {
							//チェック対象オブジェクトの移動タイプが階段の場合はマップ変更処理を行う
							if (checkObj.y / 32 == y && checkObj.x / 32 == x) {
								//わんわんと階段の座標が一致した場合はマップ変更フラグをオンにする
								mapChangeFlg = true;
								kaidanObj = checkObj;
								break;
							}
						} else {

							//チェック対象オブジェクトがうんちだった場合はうんち処理を行う
							if (checkObj.objName == 'unchi' && (checkObj.y / 32 == y && checkObj.x / 32 == x)) {
								//わんわんとうんちの座標が一致した場合はうんちフラグをオンにする
								unchiFlg = true;
								break;
							}

							//最終回の場合にチェックする処理
							if (mapType == 4) {

								//チェック対象オブジェクトがちょこそふとだった場合はちょこそふとの処理を行う
								if (checkObj.objName == 'chocosoft' && (checkObj.y / 32 == y && checkObj.x / 32 == x)) {
									//わんわんとぼすの座標が一致した場合はボスバトルフラグをオンにする
									chocosoftFlg = true;
									obj.move = 0;
									inuMoveFlg = false;
									break;
								}

								//ボスバトル勝利フラグがオフで、チェック対象オブジェクトがぼすだった場合はボスバトル処理を行う
								if (!winFlg && checkObj.objName == 'bossinu' && (checkObj.y / 32 == y && checkObj.x / 32 == x)) {
									//わんわんとぼすの座標が一致した場合はボスバトルフラグをオンにする
									bossFlg = true;
									obj.move = 0;
									inuMoveFlg = false;
									break;
								}								
							}
						}
					}
				}

				//わんわんの移動フラグがオンになっていれば、敵がいないと見なして動く
				if (inuMoveFlg) {
					obj.move = 32;
				}

				//わんわんのアイテム接触フラグがオンになっていれば、アイテム処理を行う
				if (inuItemFlg) {
					item(getItemObj);
					inuItemFlg = false;
					getItemObj = null;
				}

				//マップ変更フラグがオンであれば、マップ変更処理を行う
				if (mapChangeFlg) {
					mapChange(kaidanObj);
					mapChangeFlg = false;
				}

				//うんちフラグがオンであれば、うんち処理を行う
				if (unchiFlg) {
					unchi();
					unchiFlg = false;
				}

				//ちょこそふとフラグがオンであれば、うんちトラップの処理を行う
				if (chocosoftFlg && chocosoftCounter == 0) {
					unchiTrap();
					chocosoftFlg = false;
					chocosoftCounter++;
				}

				//ボスバトルフラグがオンであれば、ボスバトル処理を行う
				if (bossFlg) {
					bossBattle();
				}
				
			} else {
				//わんわん以外の動き

				//敵の移動フラグ
				let enemyMoveFlg = false;
				
				//移動先に他のオブジェクトがいないかをチェック
				if (y == inu.y / 32 && x == inu.x / 32) {
					//移動先にわんわんがいた場合は動かないで、オブジェクトの戦闘フラグをオンにする
					obj.move = 0;
					obj.atkFlg = true;
					enemyMoveFlg = false;
				} else if (y == inu_move_y && x == inu_move_x) {
					//敵の移動先とわんわんの移動先が一緒だった場合は動かないで、オブジェクトの戦闘フラグをオンにする
					obj.move = 0;
					obj.atkFlg = true;
					enemyMoveFlg = false;
				} else {

					//全オブジェクト分のチェック処理を行う
					for (let z = 0; z < objectArray.length; z++) {

						//オブジェクト情報取得
						let checkObj = objectArray[z];

						//現在いる階のオブジェクトのみチェック対象にする
						if (checkObj.dispType == mapType) {
		
							//チェック対象オブジェクトが自分以外の場合は判定処理を行う
							if (obj.objName != checkObj.objName) {
								if ((checkObj.hp > 0) && (checkObj.y / 32 == y && checkObj.x / 32 == x)) {
									//移動先にHPが残っているオブジェクトがいた場合は動かない
									obj.move = 0;
									enemyMoveFlg = false;
									break;
								}
							} else {
								//移動先に何も存在しない場合、敵の移動フラグをオンにする
								enemyMoveFlg = true;
							}
						}
					}
				}
				//敵の移動フラグがオンの場合は動く
				if (enemyMoveFlg) {
					obj.move = 32;
				}
			}
		}	
	} else {
		//移動タイプが固定の場合は逆方向に設定する
		if (directionCode == 'left' && obj.moveType == moveTypeArray[2]) {
			obj.direction = directionArray[3];
		} else if (directionCode == 'up' && obj.moveType == moveTypeArray[2]) {
			obj.direction = directionArray[4];
		}else if (directionCode == 'right' && obj.moveType == moveTypeArray[2]) {
			obj.direction = directionArray[1];
		} else if (directionCode == 'down' && obj.moveType == moveTypeArray[2]) {
			obj.direction = directionArray[2];
		}
	}
}

//わんわんの動き
function inuMove(obj) {
	if (key.push === 'left') {
		obj.x -= 4; //左
	} else if (key.push === 'up') {
		obj.y -= 4; //上
	} else if (key.push === 'right') {
		obj.x += 4; //右
	} else if (key.push === 'down') {
		obj.y += 4; //下
	} else {
		return false;
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
		return false;
	}
	
}

//ゲーム終了判定処理
function endJudge(x, y, obj) {

	// 処理対象がわんわんの場合だけ、わんわん用の判定処理を行う
	if (obj.objName == 'inu') {

		//わんわんの移動先の座標を設定
		inu_move_x = x;
		inu_move_y = y;

		//ゲーム終了判定
		if (mapType == 4 && (inu_move_x == neko.x / 32 && inu_move_y == neko.y / 32)) {
			//わんわんの移動先がにゃんにゃんの座標だった場合はゲームクリアとし、エンディング処理を実行する
			end();
		} else {
			//上記以外はゲーム続行
			return false;
		}
	} else {
		return false;
	}	
}

//ゲームリスタート処理
function gameReStart(message) {
	inu.img.src = 'img/funyafunya32.png'; // 一時的にふにゃふにゃの画像になる
	// 0.03秒後にアラート表示して、初期化処理する
	setTimeout(function () {
		alert(message);
		clear(); // 初期化
		return true; // ゲームリスタート
	} , 30);
}

//バトル処理
function battle(obj) {

	//処理対象がわんわんの場合は戦闘処理を行わい
	if (obj.dispName == 'inu') {
		return false;
	}

	//バトルフラグがオフであればバトル発生
	if (obj.atkFlg && touchCounter == 1) {
		
		//ログ
		let log = "";

		//0.75秒後に処理する
		setTimeout(function () {

			//戦闘開始メッセージ
			log = obj.dispName + "との戦闘が開始されました。\r\n";

			//わんわんの攻撃
			log += inu.dispName + "の攻撃！" + "\r\n";
			log += obj.dispName + "に" + (inu.atk - obj.def) + "のダメージを与えた。 \r\n"
			
			//敵からの攻撃
			log += obj.dispName + "の攻撃。。\r\n";
			log += inu.dispName + "は" + (obj.atk - inu.def) + "のダメージを受けた。 \r\n"

			//HP計算処理
			inu.hp = inu.hp - (obj.atk - inu.def);
			obj.hp = obj.hp - (inu.atk - obj.def);
			dispHp.valeu = inu.hp;

			//合計戦闘回数
			battleCounter++;
			log += "合計戦闘回数：" + battleCounter + "\r\n";

			//わんわんの残りHPを表示
			log += "わんわんの残りHP：" + inu.hp + "\r\n";
			
			//タッチカウンターと攻撃フラグを初期化
			touchCounter = 0;
			obj.atkFlg = 0;

			//バトルログを画面に表示
			battleLog.value = log;

			//わんわんのHPが1を下回ったらゲームリスタート処理へ
			if (inu.hp < 1) {
				gameReStart(deadMessage);
			}

			//バトルが終了したので、バトルフラグをオフにする
			battleFlg = false;
			obj.atkFlg = false;

		} , 500);
	}
}

//アイテム処理
function item(obj) {

	//取得するアイテムが存在し、アイテム取得フラグがオフであれば、アイテム処理を行う
	if (obj != null && obj.itemFlg == false) {

		//ログ
		let log = "わんわんは" + obj.dispName + "を手に入れた。\r\n";	

		//アイテムのタイプによって処理を分ける
		if (obj.moveType == moveTypeArray[5]) {

			//装備アイテムの場合
			log += "わんわんは" + obj.dispName + "を装備した。\r\n";

			//わんわんの装備処理を行う
			if (obj.atk > 0) {
				//武器
				inu.atk = wanwanStatusArray[1] + obj.atk; //攻撃力を加算
				log += "わんわんの攻撃力は" + inu.atk + "になった。\r\n";

				//わんわんの姿を変える
				if (obj.objName == "buki1") {
					inu.img.src = 'img/inu_hone_red32.png';
					inu_file_name = 'inu_hone_red32';
				} else if (obj.objName == "buki2") {
					inu.img.src = 'img/inu_hone_green32.png';
					inu_file_name = 'inu_hone_green32';
				} else if (obj.objName == "buki3") {
					inu.img.src = 'img/inu_hone_blue32.png';
					inu_file_name = 'inu_hone_blue32';
				}

			} else if (obj.def > 0) {
				//防具
				inu.def = wanwanStatusArray[2] + obj.def; //攻撃力を加算
				log += "わんわんの防御力は" + inu.def + "になった。\r\n";
			}

			//アイテムフラグをオンにする
			obj.itemFlg = true;

		} else if (obj.moveType == moveTypeArray[6]) {

			//回復アイテムの場合
			log += "わんわんは" + obj.dispName + "をおいしそうに食べた。\r\n";

			//使用した回復アイテムによって、効果が変わる
			if (obj.objName == 'softcream') {
				//ソフトクリーム

				//わんわんのHPを全回復させる
				inu.hp = wanwanStatusArray[0];
				log += "わんわんのHPは全回復した。\r\n";
				
			} else if (obj.objName == 'niku') {
				//ほねつきにく

				//わんわんの最大HPを1上げて、HPを全回復させる
				wanwanStatusArray[0] = wanwanStatusArray[0] + 2;
				inu.hp = wanwanStatusArray[0];
				log += "わんわんの最大HPは2上がり、HPは全回復した。\r\n";
				
			} else if (obj.objName == 'golden_niku') {
				//ごーるでんほねつきにく

				//わんわんのHPを全回復させたあとに全ての能力を倍増する
				inu.hp = wanwanStatusArray[0];
				inu.hp = inu.hp * 10;
				inu.atk = inu.atk * 5;
				inu.def = inu.def * 5;
				//わんわんのHPの半分をボスバトルで使用するMPとする
				inu_mp = Math.round((wanwanStatusArray[0] * 10) / 2);
				log += "わんわんの全ての能力がパワーアップした！\r\n";
				
			}

			//アイテムフラグをオンにする
			obj.itemFlg = true;		
		}

		battleLog.value = log;
	}
}

//マップ変更処理
function mapChange(obj) {

	let log = "わんわんは階段を下りた。 \r\n";

	//現在の階より一つ下の階のマップにする
	mapType++;

	//レンガの画像を変更
	renga.src = rengaArray[mapType];

	//現在の階のスタート位置を変更
	inu_start_x = obj.x;
	inu_start_y = obj.y;

	battleLog.value = log;
		
}

//うんち処理
function unchi() {
	//うんち用のメッセージを表示して、ゲームリスタートする
	gameReStart(unchiMessage);
}

//ちょこそふと処理
function unchiTrap() {
	//うんちトラップのメッセージを表示して、ゲームリスタートする
	gameReStart(unchiTrapMessage);
}

//ボスバトル
function bossBattle() {

	//音楽再生フラグがオンであれば、ボスバトル用のBGMを再生
	if (musicFlg) {
		audio.pause();
		audio_boss.play();
	}

	//ボスバトル用の画面表示ステータスを設定
	battle_hp.innerHTML = inu.hp;	
	mp.innerHTML = inu_mp; 
	tenshon.innerHTML = inu_tenshon;

	//ボスバトル用の画面をオーバーレイする
	$("#overlay_game, #overlayWindow_game").fadeIn();
}

//キーボードが押されたときに呼び出される関数（かんすう）
function keydownfunc(event) {
	
	//ボスバトルフラグがオフの場合にキーボード操作を許容する
	if (!bossFlg) {
		let key_code = event.keyCode;
		if (key_code === 37) key.left = true;
		if (key_code === 38) key.up = true;
		if (key_code === 39) key.right = true;
		if (key_code === 40) key.down = true;
		event.preventDefault();		//方向キーでブラウザがスクロールしないようにする
	} else {
		//ボスバトルフラグがオンの場合

		//ターンフラグが味方の場合で、わんわんのHPが残っている場合
		if (!turnFlg && inu.hp > 1) {
			//ボスバトル画面用のキーボード操作を許容する
			
			switch (event.keyCode) {
				case 37: //カーソルキーの左
				break;
			case 38: //カーソルキーの上
				if (menu_id <= 1) {
					activeMenu(4);
				} else {
					activeMenu(menu_id - 1);
				}
				break;
			case 39: //カーソルキーの右
				break;
			case 40: //カーソルキーの下
				if (menu_id >= 4) {
					activeMenu(1);
				} else {
					activeMenu(menu_id + 1);
				}
				break;
			case 13: //エンターキー
				doCommand(menu_id);
				break;
			default: //その他の場合はなにもしない
				break;
			}
		}
	}
}
 
//キーボードが放（はな）されたときに呼び出される関数
function keyupfunc(event) {
	//ボスバトルフラグがオフの場合にキーボード操作を許容する
	if (!bossFlg) {
		let key_code = event.keyCode;
		if( key_code === 37 ) key.left = false;
		if( key_code === 38 ) key.up = false;
		if( key_code === 39 ) key.right = false;
		if (key_code === 40) key.down = false;
	}
}


//ドラクエ風バトル処理

function activeMenu(id)
{
	if (menu_id == id) {
		//前回と同じメニューが選ばれた場合はコマンドを実行
		doCommand(id);
	} else {
		if (menu_id != 0) {
			//現在のメニューのカーソルを消す
			document.getElementById('menu' + menu_id).className = 'menu';
		}
		//今回選ばれたメニューにカーソルを表示
		document.getElementById('menu' + id).className = 'menu menu-active';
		menu_id = id;
	}
}
//コマンドの実行
function doCommand(command_id)
{

	//ターンフラグがプレイヤーの場合にコマンド実行する（割り込み処理防止のため）
	if (!turnFlg) {

		//バトルメッセージの表示開始
		bossBattleMessage = "プレイヤーターン開始します。<br>";

		switch (command_id) {
			case 1: //たたかう
				bossBattleMessage += "わんわんのこうげき！<br>";

				//攻撃成功判定処理を行う 引数はミスする確率
				battleJudge(20);

				//ミスフラグを判定
				if (missFlg) {
					//ミスフラグがオンだった場合は攻撃ミス
					bossBattleMessage += "わんわんの攻撃は外してしまった。<br>";
					missFlg = false;//ミスフラグをオフに戻す
				} else {
					//上記以外は攻撃成功

					//クリティカル攻撃発生判定
					criticalJudge();

					//クリティカルフラグを判定
					if (criticalFlg) {
						//クリティカルフラグがオンの場合は会心の一撃発生
						bossinuDamage =  Math.round(inu.atk * 2 - bossinu.def);
						bossinu.hp -= bossinuDamage;
						bossBattleMessage += "わんわんの会心の一撃発生！ぼすに" + bossinuDamage + "ダメージをあたえた。<br>";
						criticalFlg = false; //クリティカルフラグを戻す
					} else {
						//上記以外は通常のダメージ計算
						bossinuDamage = inu.atk - bossinu.def;
						bossinu.hp -= bossinuDamage;
						bossBattleMessage += "ぼすに" + bossinuDamage + "ダメージをあたえた。<br>";
					}
				}
				
				break;
			case 2: //ふせ
				bossBattleMessage += "わんわんはふせをして、みがまえた！<br>";
				defFlg = true;
				break;
			case 3: //ぺろぺろ	
				//残りMPによって行動を決める
				if (inu_mp < 3) {
					//MPが3を下回っていた場合は操作やり直しフラグをオン
					reTryFlg = true;
					bossBattleMessage += "ぺろぺろを使用できるMPがありません。<br>";
					bossBattleMessage += "操作をやり直してください。<br>";
				} else if (inu.hp >= (wanwanStatusArray[0] * 10)) {
					//わんわんの現在のHPが最大HP以上だった場合は操作やり直しフラグをオン
					reTryFlg = true;
					bossBattleMessage += "わんわんのHPは最大になっています。<br>";
					bossBattleMessage += "操作をやり直してください。<br>";
				} else {
					//上記以外はぺろぺろを使用してHPを回復
					bossBattleMessage += "わんわんはじぶんのきずぐちをぺろぺろした！<br>";
					bossBattleMessage += "わんわんのHPが回復した。<br>";
					inu_mp -= 3;

					//HPが上限に達するまで40回復する
					for (let heal_loop = 0; heal_loop < 40; heal_loop++){
						if (inu.hp < (wanwanStatusArray[0] * 10)) {
							inu.hp++;
						} else {
							break;
						}
					}
				}
				break;
			case 4: //ほえる
				//残りMPによって行動を決める
				if (inu_mp < 5) {
					//MPが5を下回っていた場合は操作やり直しフラグをオン
					reTryFlg = true;
					bossBattleMessage += "ぺろぺろを使用できるMPがありません。<br>";
					bossBattleMessage += "操作をやり直してください。<br>";
				} else {
					//上記以外はほえるを使用してテンションをあげる
					bossBattleMessage += "わんわんはほえて、テンションをあげた！<br>";
					bossBattleMessage += "わんわんの攻撃力と守備力が2あがった。<br>";
					inu_mp -= 5;
					inu.atk += 2;
					inu.def += 2;
					inu_tenshon++;
					break;
				}
				break;
			default:
				break;
		}

		//操作やり直しフラグを判定
		if (reTryFlg) {

			//操作やり直しフラグをオフにして処理終了
			reTryFlg = false;

			//ボスバトルのメッセージを表示
			dispMessage.innerHTML = '<span class="message">' + bossBattleMessage + '</span>';

		} else {
			//上記以外の場合は処理を続行

			//ぼすの残りHPによって、メッセージを出しわける
			if (bossinu.hp < 1) {
				//ぼすのHPがなくなったら、ゲームオーバーのメッセージを表示
				bossBattleMessage += "ぼすを倒しました！おめでとうございます！！";
			} else {
				//上記以外はプレイヤーターン終了のメッセージを表示
				bossBattleMessage += "プレイヤーターン終了します。敵ターンが終了するまでお待ちください。";
			}

			//ボスバトルのメッセージを表示
			dispMessage.innerHTML = '<span class="message">' + bossBattleMessage + '</span>';

			//ターンフラグを敵ターンにチェンジ
			turnFlg = true;

			//ボスバトル終了判定処理を行う
			if (battleEndJudge()) {
				//ボスバトル終了判定処理がtrueだった場合はボスバトル終了へ
				battleEnd()
			} else {
				//戦闘が続行する場合は敵のターンへ
				setTimeout(function (){
					enemyTurn();
				}, 3000);
			}
		}
	} 
}

//ボスバトルの敵ターン処理
function enemyTurn() {

	////ターンフラグがプレイヤーの場合に敵処理を開始する
	if (turnFlg) {

		bossBattleMessage = "敵ターン開始します。<br>";

		//パワーアタックフラグがオンで、経過ターン数が１であるかを判定
		if (powerAttackFlg && powerAttackCounter == 1) {
			//条件にヒットしたら、パワーアタックを行う（ぼすの攻撃力に40加算した攻撃）

			//わんわんの防御フラグを判定
			if (defFlg) {
				//防御フラグがオンの場合は被ダメージを半分にする
				inuDamage = Math.floor((bossinu.atk + 40 - inu.def) / 2);
				defFlg = false; //防御フラグをオフにする
			} else {
				//上記以外は通常のダメージ計算処理を行う
				inuDamage = bossinu.atk + 40  - inu.def;
			}

			bossBattleMessage += "ぼすが必殺技パワーアタックを発動した！<br>";

			//パワーアタックフラグとカウンターをリセット
			powerAttackFlg = false;
			powerAttackCounter = 0;

			//ダメージ判定処理へ
			damageJudge();
				
		} else {
			//上記以外が通常のバトル処理を行う

			//攻撃成功判定処理を行う 引数はミスする確率
			battleJudge(30);

			//ミスフラグを判定
			if (missFlg) {
				//ミスフラグがオンだった場合は攻撃ミス
				bossBattleMessage += "ぼすがこうげきしてきた！<br>";
				bossBattleMessage += "わんわんはぼすのこうげきをかわした。<br>";
				missFlg = false;//ミスフラグをオフに戻す
			} else {
				//上記以外は攻撃成功

				//ぼすの必殺技発動判定
				bossSkillJudge();

				//ぼすの必殺技フラグを判定
				if (powerAttackFlg && powerAttackCounter == 0) {
					//パワーアタックがオンで、経過ターン数が0の場合
					bossBattleMessage += "ぼすは大きく息を吸い込んで、力を溜めた！<br>";
					bossBattleMessage += "次のターン、ぼすが強力な攻撃を仕掛けてきます。<br>";
					powerAttackCounter++;
				} else if (doubleAttackFlg) {
					//ダブルアタックフラグがオンの場合は、ぼすの攻撃判定を２回行う

					//わんわんの防御フラグを判定
					if (defFlg) {
						//防御フラグがオンの場合は被ダメージを半分にする
						inuDamage = Math.floor(((bossinu.atk - inu.def) / 2) * 2);
						defFlg = false; //防御フラグをオフにする
					} else {
						//上記以外は通常のダメージ計算処理を行う
						inuDamage =  Math.round((bossinu.atk - inu.def) * 2);
					}

					doubleAttackFlg = false; //クリティカルフラグを戻す
					bossBattleMessage += "ぼすが必殺技ダブルアタックを発動した！<br>";

					//ダメージ判定処理へ
					damageJudge();
					
				} else {

					//クリティカル攻撃発生判定
					criticalJudge();

					//クリティカルフラグを判定
					if (criticalFlg) {
						//クリティカルフラグがオンの場合は痛恨の一撃発生

						//わんわんの防御フラグを判定
						if (defFlg) {
							//防御フラグがオンの場合は被ダメージを半分にする
							inuDamage = Math.floor((bossinu.atk　* 1.5 - inu.def)  / 2);
							defFlg = false; //防御フラグをオフにする
						} else {
							//上記以外は通常のダメージ計算処理を行う
							inuDamage =  Math.round(bossinu.atk * 1.5 - inu.def);
						}

						criticalFlg = false; //クリティカルフラグを戻す
						bossBattleMessage += "ぼすの痛恨の一撃が発生！<br>";

					} else {
						//上記以外は通常のダメージ計算

						//わんわんの防御フラグを判定
						if (defFlg) {
							//防御フラグがオンの場合は被ダメージを半分にする
							inuDamage = Math.floor((bossinu.atk - inu.def) / 2);
							defFlg = false; //防御フラグをオフにする
						} else {
							//上記以外は通常のダメージ計算処理を行う
							inuDamage = bossinu.atk - inu.def;
						}

						bossBattleMessage += "ぼすがこうげきしてきた！<br>";
					}

					//ダメージ判定処理へ
					damageJudge();
				}
			}
		}

		//わんわんの残りHPによって、メッセージを出しわける
		if (inu.hp < 1) {
			//わんわんのHPがなくなったら、ゲームオーバーのメッセージを表示
			bossBattleMessage += "わんわんのHPがなくなったので、ゲームオーバーです。";
		} else {
			//上記以外は敵ターン終了のメッセージを表示
			bossBattleMessage += "敵ターン終了しました。プレイヤーは操作を開始してください。";
		}

		//ボスバトルのメッセージを表示
		dispMessage.innerHTML = '<span class="message">' + bossBattleMessage + '</span>';

		//ターンフラグを味方ターンにチェンジ
		turnFlg = false;

		//ボスバトル終了判定処理へ
		if (battleEndJudge()) {
			//ボスバトル終了判定処理がtrueだった場合はボスバトル終了へ
			battleEnd()
		} else {
			//戦闘続行の場合はなにもしない
		}
	}
}

//攻撃成功判定処理 引数はミスする確率の数値
function battleJudge(missNum) {

	//切り上げのバトルランダム数値を取得して、100までの数値で整数化
	let battleRandomNam = Math.random();
	battleRandomNam = Math.round(battleRandomNam * 100);

	//バトルランダム数値がミスする確率の数値以下であるかを判定
	if (battleRandomNam <= missNum) {
		//ミスする確率の数値以下である場合はミスフラグをオンにする
		missFlg = true;
	} else {
		//上記以外はミスフラグをオフにする
		missFlg = false;
	}
}

//クリティカル攻撃発生判定処理
function criticalJudge() {

	//切り上げのクリティカルランダム数値を取得して、100までの数値で整数化
	let criticalRandomNam = Math.random();
	criticalRandomNam = Math.round(criticalRandomNam * 100);

	//クリティカルランダム数値が30以下の数値であるかを判定
	if (criticalRandomNam <= 30) {
		//30以下の数値である場合はクリティカルフラグをオンにする
		criticalFlg = true;
	} else {
		//上記以外はクリティカルフラグをオフにする
		criticalFlg = false;
	}
}

//ぼすの必殺発動判定
function bossSkillJudge() {

	//切り上げのスキルランダム数値を取得して、100までの数値で整数化
	let skillRandomNam = Math.random();
	skillRandomNam = Math.round(skillRandomNam * 100);

	//スキルランダム数値によって行動を変える
	if (skillRandomNam <= 25) {
		//ダブルアタックフラグオン
		doubleAttackFlg = true;
	} else if (skillRandomNam <= 50) {
		//パワーアタックフラグオン
		powerAttackFlg = true;
	} else {
		//必殺技発動しない
		return false;
	}
	
}

//ボスバトル終了判定処理
function battleEndJudge() {
	//わんわんかぼすのHPはなくなったかを判定
	if (inu.hp < 1 || bossinu.hp < 1) {
		//どちらかのHPがなくなっていた場合はバトル終了へ
		return true;
	} else {
		//わんわんとぼすのHPがともに残っていた場合はバトル続行
		return false;
	}
}

//ダメージ判定処理
function damageJudge() {
	
	//わんわんの被ダメージを判定
	if (inuDamage > 0) {
		//被ダメージが１以上
		inu.hp -= inuDamage;
		battle_hp.innerHTML = inu.hp;
		bossBattleMessage += "わんわんは" + inuDamage + "ダメージくらった。<br>";
	} else {
		//被ダメージがなし
		bossBattleMessage += "わんわんはダメージ受けなかった。<br>";
	}
}

//ボスバトル終了処理
function battleEnd() {

	//３秒経過してから
	setTimeout(function () {

		//音楽再生フラグがオンであれば、通常用のBGMに切り替え
		if (musicFlg) {
			audio_boss.pause();
			audio.currentTime = 0;
			audio.play();
		}

		//ボスバトルフラグをオフにする
		bossFlg = false;

		//わんわんかぼすいぬのHPがなくなった用のアラートメッセージを表示
		if (inu.hp < 1) {
			//わんわんのHPがなくなっていた場合は、ゲームオーバーのメッセージを表示
			alert(bossBattleDeadMessage);
		} else if (bossinu.hp < 1) {
			//ぼすのHPがなくなっていた場合は、勝利のメッセージを表示
			alert(bossBattleWinMessage);
			//ボスバトル勝利フラグをオンにする
			winFlg = true;
		}

		//ボスバトル用オーバーレイ画面を解除
		$("#overlay_game, #overlayWindow_game").fadeOut();

		//初期化処理へ
		clear();

	}, 3000);
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
				audio_boss.pause();
				audio_end.play();
			}

			//５秒後にタイトル画面に戻る
			setTimeout(function () {
				location.href = "../index.html";
			}, 5000);
		
		}, 1250);
		
	}, 30);
}