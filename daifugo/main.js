'use strict'

class Card {
	constructor(mark, number, marknumber, point) {
		this.marknumber = marknumber;
		this.mark = mark;
		this.number = number;
		this.point = point;
	}
}

// デッキを用意
const deck = [];
for(let i = 3; i < 16; i++) {
	deck.push(new Card('♠', i, 0, i));
	deck.push(new Card('♥', i, 1, i));
	deck.push(new Card('♣', i, 2, i));
	deck.push(new Card('♦', i, 3, i));
}
// ランダムにカードを2枚抜く
deck.splice(Math.floor(Math.random() * deck.length), 1);
deck.splice(Math.floor(Math.random() * deck.length), 1);
// デッキにジョーカーを加える
for(let i = 0; i < 2; i++){
	deck.push(new Card('Joker', 16, 4, 16));
}

// 配列をシャッフルする処理
const shuffle = array => {
	for(let i = array.length - 1; i >= 0; i--) {
		let r = Math.floor(Math.random() * (i + 1));
		const tmp = array[i];
		array[i] = array[r];
		array[r] = tmp;
	}
	return array;
}

// デッキをシャッフルする
shuffle(deck);


// 手札、一時的用、場の配列を用意
let computerHands1 = [];
let computerHands2 = [];
let computerHands3 = [];
let playerHands =[];
let fieldCards1 = [];
let fieldCards2 = [];
let fieldCards3 = [];
let fieldCards4 = [];
let passflg1 = 0;
let passflg2 = 0;
let passflg3 = 0;
let passflg4 = 0;
let playerHandsTmp = [];
let bindflg = 0;
let revolutionflg = 0;
let finishflg1 = 0;
let finishflg2 = 0;
let finishflg3 = 0;
let finishflg4 = 0;


// マーク順にソートする処理
const sortMark = (array) => {
	for(let i = 0; i < array.length; i++) {
		for(let j = array.length - 1; j > i; j--) {
			if(array[j].marknumber < array[j - 1].marknumber) {
				const tmp = array[j];
				array[j] = array[j - 1];
				array[j - 1] = tmp;
			}
		}
	}
}
// 数字順にソートする処理
const sortNumber = (array) => {
	for(let i = 0; i< array.length; i++) {
		for(let j = array.length - 1; j > i; j--) {
			if(array[j].number < array[j - 1].number) {
				const tmp = array[j];
				array[j] = array[j - 1];
				array[j - 1] = tmp;
			}
		}
	}
}
// ポイント順にソートする処理
const sortPoint = (array) => {
	for(let i = 0; i< array.length; i++) {
		for(let j = array.length - 1; j > i; j--) {
			if(array[j].point < array[j - 1].point) {
				const tmp = array[j];
				array[j] = array[j - 1];
				array[j - 1] = tmp;
			}
		}
	}
}
// クラスネームを指定する処理
const className = (array) => {
	if(array === fieldCards1) {
		return `card`;
	} else if(array === fieldCards2) {
		return `card`;
	} else if(array === fieldCards3) {
		return `card`;
	} else if(array === fieldCards4) {
		return `card`;
	} else if(array === playerHands) {
		return `card-front`;
	} else {
		return `card-back`;
	}
}
// parentのidを指定する処理
const idName = (array) => {
	if(array === playerHands) {
		return `player`;
	} else if(array === computerHands1) {
		return `computer1`
	} else if(array === computerHands2) {
		return `computer2`
	} else if(array === computerHands3) {
		return `computer3`
	} else {
		return `field`;
	}
}
// childのidを指定する処理
const idHead = (array) => {
	if(array === fieldCards1) {
		return `fa`;
	} else if (array === fieldCards2) {
		return `fb`;
	} else if (array === fieldCards3) {
		return `fc`;
	} else if (array === fieldCards4) {
		return `fd`;
	} else if(array === computerHands1) {
		return `ca`;
	} else if(array === computerHands2) {
		return `cb`;
	} else if(array === computerHands3) {
		return `cc`;
	} else {
		return `p`;
	}
}
// カード画像を表示する処理
const displayImg = (array) => {
	sortMark(array);
	sortNumber(array);
	for(let i = 0; i < array.length; i++) {
		const handImg = document.createElement("img");
		handImg.id = `${idHead(array)}${i + 1}`;
		handImg.classList.add(`${className(array)}`);
		// if(array === computerHands1 || array === computerHands2 || array === computerHands3) {
		// 	handImg.src = `../Trump-img/backside.png`
		// } else {
			handImg.src = `../Trump-img/${array[i].mark}${array[i].number}.png`;
		// }
		const element = document.getElementById(`${idName(array)}`);
		element.appendChild(handImg);
	}
}

// カード画像を削除する処理
const deleteImg = (array) => {
	for(let i = 0; i < array.length; i++) {
		const parent = document.getElementById(`${idName(array)}`);
		const child = document.getElementById(`${idHead(array)}${i + 1}`);
		parent.removeChild(child);
	}
}
// 手札を配る処理
const deal = array => {
	// カードを1枚ずつ配る
	for(let i = 0; i < array.length; i+=4) {
		playerHands.push(array[i]);
		computerHands1.push(array[i + 1]);
		computerHands2.push(array[i + 2]);
		computerHands3.push(array[i + 3]);
	}

	// カードを表示する
	displayImg(playerHands);
	displayImg(computerHands1);
	displayImg(computerHands2);
	displayImg(computerHands3);
}
// デッキから手札を配る
deal(deck);


// 場にカードがでていたら場のカードを返す
const returnFieldCards = (array) => {
	if(array === playerHands) {
		if(passflg3 === 0) return fieldCards3;
		else if(passflg2 === 0) return fieldCards2;
		else if(passflg1 === 0) return fieldCards1;
		else return fieldCards4;
	} else if(array === computerHands1) {
		if(passflg4 === 0) return fieldCards4;
		else if(passflg3 === 0) return fieldCards3;
		else if(passflg2 === 0) return fieldCards2;
		else return fieldCards1;
	} else if(array === computerHands2) {
		if(passflg1 === 0) return fieldCards1;
		else if(passflg4 === 0) return fieldCards4;
		else if(passflg3 === 0) return fieldCards3;
		else return fieldCards2;
	} else if(array === computerHands3) {
		if(passflg2 === 0) return fieldCards2;
		else if(passflg1 === 0) return fieldCards1;
		else if(passflg4 === 0) return fieldCards4;
		else return fieldCards3;
	}
}
// 自分の場の配列を返す
const returnOwnFieldCards = (array) => {
	switch (array) {
		case computerHands1: return fieldCards1;
		case computerHands2: return fieldCards2;
		case computerHands3: return fieldCards3;
		case playerHands: return fieldCards4;
	}
}
// パスフラグをたてる
const setPassFlg = (array) => {
	switch (array) {
		case computerHands1: passflg1 = 1; break;
		case computerHands2: passflg2 = 1; break;
		case computerHands3: passflg3 = 1; break;
		case playerHands: passflg4 = 1; break;
	}
}
// 最小値を返す処理
const minPoint = (array) => {
	let minP = 0;
	for(let i = 0; i < array.length; i++) {
		if(minP === 0 || minP > array[i].point) {
			minP = array[i].point;
		};
	}
	return minP;
}

// 同じ数字を選択しているかの判定処理
const judgeSameNumber = (array) => {
	let flg = 1;
	for(let i = 0; i < array.length - 1; i++) {
		if(array[i].mark === "Joker") {
			array = array.filter(n => n !== array[i])
		} else if(array[i + 1].mark === "Joker") {
			array = array.filter(n => n !== array[i + 1]);
			i--;
		} else if(array[i].point !== array[i + 1].point) {
			flg = 0;
			break;
		} else {
			flg = 1;
		}
	}
	return flg
}
// 同じマークを選択しているかの判定処理
const judgeSameMark = (array) => {
	let flg = 1;
	for(let i = 0; i < array.length - 1; i++) {
		if(array[i].mark === "Joker") {
			array = array.filter(n => n !== array[i])
		} else if(array[i + 1].mark === "Joker") {
			array = array.filter(n => n !== array[i + 1]);
			i--;
		} else if(array[i].mark !== array[i + 1].mark) {
			flg = 0;
			break;
		} else {
			flg = 1;
		}
	}
	return flg;
}
// ジョーカーが何枚あるか
const returnCountJoker = (array) => {
	array = array.filter(n => n.number === 16);
	return array.length;
}
// 連続したカードを選択しているか
const judgeContinuousCards = (array) => {
	let a = 1;
	let b = returnCountJoker(array);
	sortNumber(array);
	// 大きい数字と小さい数字の差を計算し、マイナスになったら連続した数字ではない
	array = array.filter(n => n.number !== 16)
	for(let i = 0; i < array.length - 1; i++) {
		a = array[i + 1].number - array[i].number
		if(a > 1) b = b - a + 1;
	}
	return b < 0 ? 0 : 1;
}

// 配列のマークを返す
const returnMark = (array) => {
	const tmpArray = [];
	for(const element of array) {
		tmpArray.push(element.marknumber);
	}
	return tmpArray;
}
// 縛り文字の表示
const displayBind = () => {
	const field = document.getElementById(`field`);
	const h1 = document.createElement(`h1`);
	const status = document.getElementById(`status`);

	h1.innerText = `縛り`;
	h1.id = `fe2`;
	field.appendChild(h1);

	const p = document.createElement(`p`);
	p.innerText = `縛り`;
	p.id = `fe4`;
	status.appendChild(p);

	setTimeout(() => {
		const element = document.getElementById(`fe2`);
		field.removeChild(element);
	}, 600);
}

// 縛りジャッジ
const judgeBind = (array) => {
	const ownFieldMarkNumber = returnMark(returnOwnFieldCards(array));
	const preFieldMarkNumber = returnMark(returnFieldCards(array));

	if(returnFieldCards(array).length !== 0 && bindflg === 0) {
		for(let i = 0; i < ownFieldMarkNumber.length; i++) {
			if(ownFieldMarkNumber[i] === preFieldMarkNumber[i]) {
				bindflg = 1;
			} else {
				bindflg = 0;
				break;
			}
		}

		if(bindflg === 1) {
			displayBind();
		}
	}
}

// プレイヤーが選択しているカードを出せるかの判定
const judgePlayerHands = () => {
	if(playerHandsTmp.length === 0) {
		dasu.setAttribute(`disabled`, `disabled`);
	}
	// スペ3流しができる場合、出すを押せるようにする
	else if(playerHandsTmp.length === 1 && judgeSpadeThree(playerHandsTmp)
	&& returnFieldCards(playerHands).length === 1
	&& returnFieldCards(playerHands)[0].number === 16) {
		dasu.removeAttribute(`disabled`);
	}
	// 場のカードが0枚だったとき
	else if(returnFieldCards(playerHands).length === 0) {
		// 1枚である or 同じ数字である or 同じマークの階段上の数字である
		if(playerHandsTmp.length === 1 || judgeSameNumber(playerHandsTmp)
		|| judgeSameMark(playerHandsTmp) && playerHandsTmp.length > 2 && judgeContinuousCards(playerHandsTmp)) {
			dasu.removeAttribute(`disabled`);
		} else {
			dasu.setAttribute(`disabled`, `disabled`);
		}
	}
	// 場にカードがでているとき
	else {
		if(playerHandsTmp.length === 1 || judgeSameNumber(playerHandsTmp)
		|| judgeSameMark(playerHandsTmp) && playerHandsTmp.length > 2 && judgeContinuousCards(playerHandsTmp)) {
			// 場のカードと同じ枚数である & 1番小さい数字が場の1番小さい数字より大きい
			if(returnFieldCards(playerHands).length === playerHandsTmp.length
			&& minPoint(returnFieldCards(playerHands)) < minPoint(playerHandsTmp)) {
				// 縛りの判定
				if(bindflg === 0 || bindflg === 1
				&& returnJudgeBindArray(playerHands, playerHandsTmp).length === returnFieldCards(playerHands).length) {
					dasu.removeAttribute(`disabled`);
				} else {
					dasu.setAttribute(`disabled`, `disabled`);
				}
			} else {
				dasu.setAttribute(`disabled`, `disabled`);
			}
		} else {
			dasu.setAttribute(`disabled`, `disabled`);
		}
	}
}

const dasu = document.querySelector(`.dasu`);
// カードをクリックしたときの処理
const clickCard = () => {
	// クラスを変える処理
	for(let i = 0; i < playerHands.length; i++) {
		const id = `p${i + 1}`;
		const element = document.getElementById(`${id}`);
		const changeClass= () => {
			if(element.className === "card-front") {
				playerHandsTmp.push(playerHands[i]);
				element.className = "card-click";
				judgePlayerHands();
			} else if(element.className === "card-click") {
				playerHandsTmp = playerHandsTmp.filter(n => n !== playerHands[i]);
				element.className = "card-front";
				judgePlayerHands();
			};
		}

		element.addEventListener("click", changeClass);
	}
}
clickCard();


// 場の配列をすべて削除する
const deleteAllFieldCards = () => {
	const field = document.getElementById(`field`);
	while(field.firstChild){
		field.removeChild(field.firstChild);
	}
	fieldCards1 = [];
	fieldCards2 = [];
	fieldCards3 = [];
	fieldCards4 = [];
}
// パスフラグをすべて0に戻す
const clearPassFlg = () => {
	passflg1 = 0;
	passflg2 = 0;
	passflg3 = 0;
	passflg4 = 0;
}
// 縛りフラグを0に戻す
const clearBindFlg = () => {
	bindflg = 0;
	const status = document.getElementById(`status`);
	const element = document.getElementById(`fe4`);
	if(element !== null) {
		status.removeChild(element);
	}
}
// 1秒後に関数を実行、プロミスを返す
const sleep = (funcA, funcB, funcC, funcD) => {
	return new Promise(function(resolve) {
		setTimeout(() => {
			funcA();
			if(funcB !== undefined) funcB();
			if(funcC !== undefined) funcC();
			if(funcD !== undefined) funcD();
			resolve();
		}, 600);
	})
}
// 1秒後にコンピュータがアクションする
function action(array) {
	return new Promise(async function(resolve) {
		if(passflg1 === 0 && array === computerHands1) {
			if(passflg1 + passflg2 + passflg3 + passflg4 > 2) {
				await sleep(deleteAllFieldCards, clearPassFlg, clearBindFlg);
			}
			if(finishflg1 === 1) {
				passflg1 = 1;
				resolve();
			}
			else {
					setTimeout(function() {
					computerAction(computerHands1);
					resolve();
				}, 600);
			}
		} else if(passflg2 === 0 && array === computerHands2) {
			if(passflg1 + passflg2 + passflg3 + passflg4 > 2) {
				await sleep(deleteAllFieldCards, clearPassFlg, clearBindFlg);
			}
			if(finishflg2 === 1) {
				passflg2 = 1;
				resolve();
			}
			else {
				setTimeout(function() {
					computerAction(computerHands2);
					resolve();
				}, 600);
			}
		} else if(passflg3 === 0 && array === computerHands3){
			if(passflg1 + passflg2 + passflg3 + passflg4 > 2) {
				await sleep(deleteAllFieldCards, clearPassFlg, clearBindFlg);
			}
			if(finishflg3 === 1) {
				passflg3 = 1;
				resolve();
			}
			else {
				setTimeout(function() {
					computerAction(computerHands3);
					resolve();
				}, 600);
			}
		}
		else resolve();
	})
}
// 1,2,3の順でコンピュータがアクションする
async function compAction() {
	// ゲーム終了
	if(finishflg1 + finishflg2 + finishflg3 + finishflg4 === 4) {
		setTimeout(deleteAllFieldCards, 600);
		console.log(`ゲーム終了`);
	}
	else {
		await action(computerHands1);
		await action(computerHands2);
		await action(computerHands3);
		if(passflg4 === 1) {
			compAction();
		} else if(finishflg4 === 1) {
			if(passflg1 + passflg2 + passflg3 === 3) {
				deleteAllFieldCards();
				clearPassFlg();
				clearBindFlg();
			}
			passflg4 = 1;
			compAction();
		} else if(passflg1 + passflg2 + passflg3 === 3) {
			setTimeout(function() {
				deleteAllFieldCards();
				clearPassFlg();
				clearBindFlg();
				pass.removeAttribute(`disabled`);
			}, 600);
		} else{
			pass.removeAttribute(`disabled`);
		}
	}
}

// 自分以外のプレイヤーのパスフラグを1にする
const setAllPassFlg = (array) => {
	switch (array) {
		case computerHands1: passflg2 = 1; passflg3 = 1; passflg4 = 1; break;
		case computerHands2: passflg1 = 1; passflg3 = 1; passflg4 = 1; break;
		case computerHands3: passflg1 = 1; passflg2 = 1; passflg4 = 1; break;
		case playerHands: passflg1 = 1; passflg2 = 1; passflg3 = 1; break;
	}
}
// 8切りのアクション
const eightCardAction = (array) => {
	setAllPassFlg(array);

	const field = document.getElementById(`field`);
	const h1 = document.createElement(`h1`);
	h1.innerText = `8切り`;
	h1.id = `fe2`;
	field.appendChild(h1);

	setTimeout(() => {
		const element = document.getElementById(`fe2`);
		field.removeChild(element);
	}, 600);
}
// 3流しのアクション
const spadeThreeCardAction = (array) => {
	setAllPassFlg(array);

	const field = document.getElementById(`field`);
	const h1 = document.createElement(`h1`);
	h1.innerText = `3流し`;
	h1.id = `fe2`;
	field.appendChild(h1);

	setTimeout(() => {
		const element = document.getElementById(`fe2`);
		field.removeChild(element);
	}, 600);
}
// イレギュラーなアクション
const jugdgeIrregularAction = (fieldArray, array) => {
	// 8切り革命
	if((fieldArray.length === 4 || fieldArray.length === 5)
	&& fieldArray[0].number === 8 && fieldArray[1].number === 8) {
		revolution();
		setAllPassFlg(array);
	}
	// 革命
	else if((fieldArray.length === 4 || fieldArray.length === 5) && fieldArray[0].point === fieldArray[1].point) {
		revolution();
	}
	// 8切り
	else if((fieldArray.length === 1 || fieldArray.length === 2) && fieldArray[0].number === 8
	|| fieldArray.length === 3 && (fieldArray[0].number === 8 && fieldArray[1].number === 8
	|| fieldArray[0].number === 8 && fieldArray[1].number === 16 && fieldArray[2].number === 16)) {
		eightCardAction(array);
	}
	// 3流し
	else if(fieldArray.length === 1 && judgeSpadeThree(fieldArray)
	&& returnFieldCards(array).length !== 0
	&& returnFieldCards(array)[0].number === 16) {
		spadeThreeCardAction(array);
	}
	// 縛り
	else {
		judgeBind(array);
	}
}

// 上がりの文字を表示する
const displayFinish = (array) => {
	const h1 = document.createElement(`h1`);
	switch(finishflg1 + finishflg2 + finishflg3 + finishflg4) {
		case 1: h1.innerText = `1位：大富豪`; break;
		case 2: h1.innerText = `2位：富豪`; break;
		case 3: h1.innerText = `3位：貧民`; break;
		case 4: h1.innerText = `4位：大貧民`; break;
	}
	const element = document.getElementById(`${idName(array)}`);
	element.appendChild(h1);
}

// 上がり判定
const jugdgeFinish = (array) => {
	if(array.length === 0) {
		switch(array) {
			case computerHands1: finishflg1 = 1; break;
			case computerHands2: finishflg2 = 1; break;
			case computerHands3: finishflg3 = 1; break;
			case playerHands: finishflg4 = 1; break;
		}
		displayFinish(array);
		if(finishflg1 + finishflg2 + finishflg3 + finishflg4 === 3) {
			if(finishflg1 === 0) {
				finishflg1 = 1;
				setTimeout(function() {
					deleteImg(computerHands1);
					displayFinish(computerHands1);
				}, 600);
			} else if(finishflg2 === 0) {
				finishflg2 = 1;
				setTimeout(function() {
					deleteImg(computerHands2);
					displayFinish(computerHands2);
				}, 600);
			} else if(finishflg3 === 0) {
				finishflg3 = 1;
				setTimeout(function() {
					deleteImg(computerHands3);
					displayFinish(computerHands3);
				}, 600);
			} else if(finishflg4 === 0) {
				finishflg4 = 1;
				setTimeout(function() {
					deleteImg(playerHands);
					displayFinish(playerHands);
				}, 600);
			}
		}
	}
}

// 出すボタンを押したときの処理
const putIntoField = () => {
	pass.setAttribute(`disabled`, `disabled`);
	fieldCards4 = playerHandsTmp;
	playerHandsTmp = [];
	deleteImg(playerHands);
	// 手札の配列から場に出したカードを削除する
	for(let i = 0; i < fieldCards4.length; i++) {
		playerHands = playerHands.filter(n => n !== fieldCards4[i]);
	}
	displayImg(playerHands);
	displayImg(fieldCards4);
	jugdgeIrregularAction(fieldCards4, playerHands);
	jugdgeFinish(playerHands);
	dasu.setAttribute(`disabled`, `disabled`);
	compAction();
	clickCard();
}
dasu.addEventListener("click", putIntoField);

// パスの文字を画面に表示する
const displayPass = (array) => {
	const field = document.getElementById(`field`);
	const h2 = document.createElement(`h2`);
	h2.innerText = `パス`;
	switch (array) {
		case computerHands1:
			h2.id = `fa6`
			field.appendChild(h2);
			break;
		case computerHands2:
			h2.id = `fb6`
			field.appendChild(h2);
			break;
		case computerHands3:
			h2.id = `fc6`
			field.appendChild(h2);
			break;
		case playerHands:
			h2.id = `fd6`
			field.appendChild(h2);
			break;
	}
}
// パスを押したときの処理
const pass = document.querySelector(`.pass`);
pass.addEventListener("click", function() {
	dasu.setAttribute(`disabled`, `disabled`);
	pass.setAttribute(`disabled`, `disabled`);
	setPassFlg(playerHands);
	displayPass(playerHands);
	compAction();
});

// 最大値を返す処理
const maxPoint = (array) => {
	let maxNum = 0;
	for(let i = 0; i < array.length; i++) {
		if(maxNum === 0 || maxNum < array[i].point) {
			maxNum = array[i].point;
		};
	}
	return maxNum;
}

// computerがアクションする
async function computerAction(array) {
	// 3流しの判定
	if(returnFieldCards(array).length === 1 && returnFieldCards(array)[0].marknumber === 4 && judgeSpadeThree(array)){
		deleteImg(array);
		returnOwnFieldCards(array)[0] = array[0];
		array.splice(0, 1);
		displayImg(returnOwnFieldCards(array));
		displayImg(array);
		spadeThreeCardAction(array);
	} else if(returnFieldCards(array).length === 0 || minPoint(returnFieldCards(array)) < maxPoint(array)) {
		deleteImg(array);
		// パスをしたときは何もしない
		if(compareFieldCards(array) === 2) ;
		// console.log(`返り値2：パスしたので表示を変更しない`);
		else {
			displayImg(returnOwnFieldCards(array));
			jugdgeIrregularAction(returnOwnFieldCards(array), array);
		}
		displayImg(array);
		jugdgeFinish(array);
	} else {
		console.log(`pass1: 場のカードより小さいカードしかないので出せない`);
		displayPass(array);
		setPassFlg(array);
	}
}

// コンピュータが場のカードと比較してとるアクション
const compareFieldCards = (array) => {
	if(returnFieldCards(array).length === 0){
		judgeFieldCards0(array);
	} else if(returnFieldCards(array).length === 1) {
		if(judgeFieldCards1(array) === 2) return 2;
	} else if(returnFieldCards(array).length === 2) {
		if(judgeFieldCards2(array) === 2) return 2;
	} else if(returnFieldCards(array).length === 3) {
		if(judgeFieldCards3(array) === 2) return 2;
	} else {
		if(judgeFieldCards4(array) === 2) return 2;
	}
}

// 場にカードを出す
const putCompToFieldA = (array) => {
	if(array === computerHands1) {
		fieldCards1 = array.filter(n => n.number === judgeRevolution(array)[1]);
	}
	else if(array === computerHands2) {
		fieldCards2 = array.filter(n => n.number === judgeRevolution(array)[1]);
	}
	else if(array === computerHands3) {
		fieldCards3 = array.filter(n => n.number === judgeRevolution(array)[1]);
	}
	else fieldCards4 = array.filter(n => n.number === judgeRevolution(array)[1]);
}
const putCompToFieldB = (point, array, array2) => {
	if(array === computerHands1) {
		fieldCards1 = array2.filter(n => n.point === point);
	}
	else if(array === computerHands2) {
		fieldCards2 = array2.filter(n => n.point === point);
	}
	else if(array === computerHands3) {
		fieldCards3 = array2.filter(n => n.point === point);
	}
	else fieldCards4 = array2.filter(n => n.point === point);
}
const putCompToFieldC = (point, array) => {
	if(array === computerHands1) {
		fieldCards1 = array.filter(n => n.point === point);
	}
	else if(array === computerHands2) {
		fieldCards2 = array.filter(n => n.point === point);
	}
	else if(array === computerHands3) {
		fieldCards3 = array.filter(n => n.point === point);
	}
	else fieldCards4 = array.filter(n => n.point === point);
}
const putCompToFieldD = (point, array) => {
	if(array === computerHands1) {
		fieldCards1 = array.filter(n => n.point === point ||
		n.point === point + 1 || n.point === point + 2);
	}
	else if(array === computerHands2) {
		fieldCards2 = array.filter(n => n.point === point ||
		n.point === point + 1 || n.point === point + 2);
	}
	else if(array === computerHands3) {
		fieldCards3 = array.filter(n => n.point === point ||
		n.point === point + 1 || n.point === point + 2);
	}
	else fieldCards4 = array.filter(n => n.point === point ||
		n.point === point + 1 || n.point === point + 2);
}
const putCompToFieldE = (marknumber, point, array) => {
	if(array === computerHands1) {
		fieldCards1 = array.filter(n => n.marknumber === marknumber
		&& (n.point === point || n.point === point + 1 || n.point === point + 2));
	}
	else if(array === computerHands2) {
		fieldCards2 = array.filter(n => n.marknumber === marknumber
		&& (n.point === point || n.point === point + 1 || n.point === point + 2));
	}
	else if(array === computerHands3) {
		fieldCards3 = array.filter(n => n.marknumber === marknumber
		&& (n.point === point || n.point === point + 1 || n.point === point + 2));
	}
	else fieldCards4 = array.filter(n => n.marknumber === marknumber
		&& (n.point === point || n.point === point + 1 || n.point === point + 2));
}

// 最小値の次に小さい数字を返す
const nextMinPoint = (array) => {
	array =  array.filter(n => n.point !== minPoint(array));
	return minPoint(array);
}

// 同じ数字がいくつあるか数える
const countSamePoint = (point, array) => array.filter(n => n.point === point).length;
// 配列の何番目にその数字があるか数える
const countPointPosition = (p, array, marknumber) => {
	if(marknumber === undefined) {
		for(let i = 0; i < array.length; i++) {
			if(array[i].point === p) return i;
		}
	} else {
		for(let i = 0; i < array.length; i++) {
			if(array[i].point === p && array[i].marknumber === marknumber) return i;
		}
	}
}
// スペードの3を持っているかの判定
const judgeSpadeThree = (array) => {
	return array[0].marknumber === 0 && array[0].number === 3 ? 1 : 0;
}
// 革命を出せるかどうかを判定
const judgeRevolution = (array) => {
	let j = 0;
	let k = 0;
	for(let i = 0; i < array.length; i++) {
		if(k === 3){
			return [1, array[i - 1].number];
		} else if(j === array[i].number) {
			k++;
			j = array[i].number;
		} else {
			k = 0;
			j = array[i].number;
		}
	}
	return [0, 0];
}

// 階段上のカードをコンピュータの手札から削除する
const deleteStairs = (point, array, marknumber) => {
	array.splice(countPointPosition(point, array, marknumber), 1);
	array.splice(countPointPosition(point + 1, array, marknumber), 1);
	array.splice(countPointPosition(point + 2, array, marknumber), 1);
}
// 階段を出すかどうかの判定
const judgeStairs = (point, array) => {
	sortPoint(array);
	// 階段がない、もしくは、階段の最小値が全体の最小値ではない
	if(returnStairsArray(array).length < 3 || returnStairsArray(array)[0].point !== point) {
		return 0;
	}
	// 階段以外が反則上がりのカード
	else if(judgeFoul(array).length === 3 && array.length !== 3) {
		console.log(`階段以外が反則上がりのカードなので、反則あがりのカードを先に出す`);
		if(array.filter(n => n.point === 8).length !== 0) {
			putCompToFieldC(8, array);
			array.splice(countPointPosition(8, array), countSamePoint(8, array));
			return 1;
		} else if(array.filter(n => n.point === 15).length !== 0) {
			putCompToFieldC(15, array);
			array.splice(countPointPosition(15, array), countSamePoint(15, array));
			return 1;
		} else {
			putCompToFieldC(16, array);
			array.splice(countPointPosition(16, array), countSamePoint(16, array));
			return 1;
		}
	}
	// 反則上がりの階段1セット＋他の階段1セットの場合、反則上がりのセットを先に出す
	else if(judgeFoul(array).length === 6 && maxPoint(judgeFoul(array)) === 15) {
		// 革命をしたときには4のマーク、通常時はエースのマークをだせば良い
		putCompToFieldE(returnMarkNumber(14, array)[0], 13, array);
		deleteStairs(13, array, returnMarkNumber(14, array)[0]);
		return 1;
	}
	else {
		putCompToFieldE(returnMarkNumber(point + 1, array)[0], point, array);
		deleteStairs(point, array, returnMarkNumber(point + 1, array)[0]);
		return 1;
	}
}

// 場のカードが0枚だったとき
const judgeFieldCards0 = (array) => {
	let minP = minPoint(array);
	let nextMinP = nextMinPoint(array);
	// 2（革命時は3）、ジョーカー、8を除外
	let computerTmp = array.filter(n => n.point < 15 && n.point !== 8);
	// 最小値を除外
	let computerTmp2 = computerTmp.filter(n => n.number !== minPoint(computerTmp));
	// 革命を出せる場合、革命のカードを最初に出す
	// 8切り革命
	if(computerTmp.length > 5 && judgeRevolution(array)[0] && judgeRevolution(array)[1] === 8
	|| !judgeSpadeThree(computerTmp) && computerTmp.length === 5
	&& judgeRevolution(array)[0] && judgeRevolution(array)[1] === 8) {
		console.log(`8切り革命を起こす!`);
		putCompToFieldA(array);
		array.splice(countPointPosition(judgeRevolution(array)[1], array), 4);
	}
	// 革命
	else if(computerTmp.length > 5 && judgeRevolution(array)[0] ||
	!judgeSpadeThree(computerTmp) && computerTmp.length === 5 && judgeRevolution(array)[0]) {
		console.log(`革命を起こす!`);
		putCompToFieldA(array);
		array.splice(countPointPosition(judgeRevolution(array)[1], array), 4);
	}
	// スペ3が手札にあり、3と反則上がりのカード以外が数字1種類しかない場合
	else if(computerTmp2.length !== 0 && judgeSpadeThree(array) &&
		(computerTmp2[0].point === computerTmp2[computerTmp2.length - 1].point)) {
		if(computerTmp[1].number === 3) {
			console.log(`3が複数枚あるので、3の次に大きいカードを出す`);
			let a = array.filter(n => n.point !== minPoint(computerTmp));
			putCompToFieldB(nextMinPoint(a), array, array);
			array.splice(countPointPosition(nextMinPoint(a), array), countSamePoint(nextMinPoint(a), array));
		} else {
			console.log(`スペードの3と反則上がりのカードの他に数字1種類しかないので、3を出す`);
			putCompToFieldC(minP, array);
			array.splice(countPointPosition(minP, array), countSamePoint(minP, array));
		}
	}
	// スペ3が手札にあるが、手札枚数が9枚以上の場合
	else if(judgeSpadeThree(array) && array.length > 8) {
		console.log(`スペードの3があるが、手札が9枚以上なので3を出さない`);
		if(!(judgeStairs(nextMinP, array))) {
			putCompToFieldC(nextMinP, array);
			array.splice(countPointPosition(nextMinP, array), countSamePoint(nextMinP, array));
		}
	} else {
		// 最小値しかもってない場合
		if(nextMinP === 0) {
			putCompToFieldC(minP, array);
			array.splice(countPointPosition(minP, array), countSamePoint(minP, array));
			console.log(`最小値のカードしかないので、最小値を出す`);
		}
		// 最小値以外が反則上がりのカードだった場合
		else if(computerTmp2.length === 0) {
			// 最小値が8の場合
			if(minP === 8) {
				putCompToFieldC(minP, array);
				array.splice(countPointPosition(minP, array), countSamePoint(minP, array));
				console.log(`反則上がりの中の最小値8を出す`)
			}
			// 最小値の次のカード（反則上がりになる札）を出す
			else {
				console.log(`最小値以外は反則上がりのカードなので、反則上がりのカードを出す`);
				putCompToFieldC(nextMinP, array);
				array.splice(countPointPosition(nextMinP, array), countSamePoint(nextMinP, array));
			}
		}
		else {
			if(!(judgeStairs(minP, array))) {
				console.log(`普通に出す`);
				putCompToFieldC(minP, array);
				array.splice(countPointPosition(minP, array), countSamePoint(minP, array));
			}
		}
	}
}


// 配列の中のユニークな数字を返す
const returnUniquePoint = (array) => {
	const tmpArray = [0];
	for(const element of array){
		if(tmpArray[tmpArray.length - 1] !== element.point) {
			tmpArray.push(element.point);
		}
	}
	tmpArray.shift();
	return tmpArray;
}
// 配列の数字が何枚ずつあるか返す
const returnUniqueCount = (array) => {
	const tmpArray = [];
	let j = 0;
	for(let i = 0; i < array.length - 1; i++) {
		if(array[i].point === array[i + 1].point) {
			j++;
		} else {
			tmpArray.push(j + 1);
			j = 0;
		}
	}
	tmpArray.push(j + 1);
	return tmpArray;
}
// 与えたポイントのマークをすべて返す
const returnMarkNumber = (point, array) => {
	let tmpArray = array.filter(n => n.point === point);
	const tmpArray2 = [];
	for(const element of tmpArray) {
		tmpArray2.push(element.marknumber);
	}
	return tmpArray2;
}

// 階段を除いた配列を返す
const returnExceptStairs = (array) => {
	let uniquePoint = returnUniquePoint(array);
	let uniqueCount = returnUniqueCount(array);
	let markNumber = [];
	let i = 0;

	while(i < uniquePoint.length - 2) {
		if(uniquePoint[i] + 1 === uniquePoint[i + 1]
		&& uniquePoint[i + 1] + 1 === uniquePoint[i + 2]
		&& (uniqueCount[i] + uniqueCount[i + 1] + uniqueCount[i + 2]) < 5) {
			// 階段上の数字に一致した場合
			markNumber = returnMarkNumber(uniquePoint[i], array);
			for(const element of markNumber) {
				if(returnMarkNumber(uniquePoint[i + 1], array).includes(element) &&
				returnMarkNumber(uniquePoint[i + 2], array).includes(element)){
					// 階段が一致した場合
					array = array.filter(n => n.point !== uniquePoint[i] || n.marknumber !== element);
					array = array.filter(n => n.point !== uniquePoint[i + 1] || n.marknumber !== element);
					array = array.filter(n => n.point !== uniquePoint[i + 2] || n.marknumber !== element);
					uniquePoint = returnUniquePoint(array);
					uniqueCount = returnUniqueCount(array);
					i = -1;
					break;
				} else {
					// マークが一致していない
				}
			}
			i++;
		} else {
			// 階段上の数字がなかった場合
			i++;
		}
	}
	return array;
}
// 1枚だけの配列を返す
const returnOneCardArray = (array) => {
	const tmpArray = [];
	let uniquePoint = returnUniquePoint(array);
	let uniqueCount = returnUniqueCount(array);

	for(let i = 0; i < uniqueCount.length; i++) {
		if(uniqueCount[i] === 1) {
			tmpArray.push(array.filter(n => n.point === uniquePoint[i])[0]);
		}
	}
	return tmpArray;
}
// ペアの配列を返す
const returnPairsArray = (array) => {
	const tmpArray = [];
	let uniquePoint = returnUniquePoint(array);
	let uniqueCount = returnUniqueCount(array);

	for(let i = 0; i < uniqueCount.length; i++) {
		if(uniqueCount[i] === 2) {
			tmpArray.push(array.filter(n => n.point === uniquePoint[i])[0]);
			tmpArray.push(array.filter(n => n.point === uniquePoint[i])[1]);
		}
	}
	return tmpArray;
}
// トリプルの配列を返す
const returnTripleArray = (array) => {
	const tmpArray = [];
	let uniquePoint = returnUniquePoint(array);
	let uniqueCount = returnUniqueCount(array);

	for(let i = 0; i < uniqueCount.length; i++) {
		if(uniqueCount[i] === 3) {
			tmpArray.push(array.filter(n => n.point === uniquePoint[i])[0]);
			tmpArray.push(array.filter(n => n.point === uniquePoint[i])[1]);
			tmpArray.push(array.filter(n => n.point === uniquePoint[i])[2]);
		}
	}
	return tmpArray;
}
// 革命の配列を返す
const returnRevolutionArray = (array) => {
	const tmpArray = [];
	let uniquePoint = returnUniquePoint(array);
	let uniqueCount = returnUniqueCount(array);

	for(let i = 0; i < uniqueCount.length; i++) {
		if(uniqueCount[i] === 4) {
			tmpArray.push(array.filter(n => n.point === uniquePoint[i])[0]);
			tmpArray.push(array.filter(n => n.point === uniquePoint[i])[1]);
			tmpArray.push(array.filter(n => n.point === uniquePoint[i])[2]);
			tmpArray.push(array.filter(n => n.point === uniquePoint[i])[3]);
		}
	}
	return tmpArray;
}
// 縛り判定をみて、出せる配列を返す
const returnJudgeBindArray = (array, array2) => {
	const tmpArray = [];
	// 縛りありの場合
	if(bindflg === 1 && array2.length !== 0) {
		// 同じマークのカードだけを追加
		for(let i = 0; i < returnFieldCards(array).length ; i++) {
			for(let j = 0; j < array2.length; j++) {
				if(returnMark(returnFieldCards(array))[i] === array2[j].marknumber) {
					tmpArray.push(array2[j]);
				}
			}
		}
		// ジョーカーを追加
		if(array2[array2.length - 1].marknumber === 4) {
			tmpArray.push(array2[array2.length - 1]);
			if(array2.length > 2 && array2[array2.length -2].marknumber === 4) {
				tmpArray.push(array2[array2.length - 2]);
			}
		}
		return tmpArray;
	} //縛りなしの場合
	else {
		return array2;
	}
}
// 反則上がりのカードを除いた配列を返す
const judgeFoul = (array) => {
	array = array.filter(n => n.point < 15 && n.point !== 8);
	if(array.length === 0) {
		return array;
	}
	else if(judgeSpadeThree(array)) {
		array.splice(0, 1);
	}
	return array;
}


// 場のカードが1枚だったとき
const judgeFieldCards1 = (array) => {
	const exceptStairsArray = returnExceptStairs(array);
	const oneCardArray = returnOneCardArray(exceptStairsArray);

	// 縛り判定の処理、配列を返す
	const bindArray = returnJudgeBindArray(array, oneCardArray);

	if(bindArray.length === 0) {
		console.log(`pass -1: 場のカードが1枚で、1枚で出せるカードなし`);
		displayPass(array);
		setPassFlg(array);
		return 2;
	}
	else if(maxPoint(bindArray) <= minPoint(returnFieldCards(array))) {
		console.log(`pass 4: 場のカードが1枚で、場のカードより大きいカードがない`);
		displayPass(array);
		setPassFlg(array);
		return 2;
	}
	// 反則上がり以外のカードが1枚だけのとき
	else if(judgeFoul(array).length === 1 && array.length !== 1) {
		// 反則上がり以外の最小値を除外
		let a = bindArray.filter(n => n !== judgeFoul(bindArray)[0]);
		// 場のカード以下のカードを除外
		a = a.filter(n => n.point > minPoint(returnFieldCards(array)));
		// 出せるカードがある場合
		if(a.length !== 0) {
			// 最小値を場に出す
			putCompToFieldB(minPoint(a), array, a);
			array.splice(countPointPosition(minPoint(a), array), 1);
		}
		else {
			console.log(`pass 6: 反則上がり以外のカードが1枚で、反則上がりのカードが出せない`);
			displayPass(array);
			setPassFlg(array);
			return 2;
		}
	} else {
		let a = bindArray.filter(n => n.point > minPoint(returnFieldCards(array)));
		putCompToFieldB(minPoint(a), array, a);
		array.splice(countPointPosition(minPoint(a), array, returnMarkNumber(minPoint(a), a)[0]), 1);
	}
}

// 場のカードが2枚だったとき
const judgeFieldCards2 = (array) => {
	const exceptStairsArray = returnExceptStairs(array);
	let pairsArray = returnPairsArray(exceptStairsArray);

	// 縛り判定の処理、配列を返す
	const bindArray = returnJudgeBindArray(array, pairsArray);
	pairsArray = returnPairsArray(bindArray);

	if(pairsArray.length === 0) {
		console.log(`pass 2: 出せるペアがない`);
		displayPass(array);
		setPassFlg(array);
		return 2;
	}
	else if(maxPoint(pairsArray) <= minPoint(returnFieldCards(array))) {
		displayPass(array);
		console.log(`pass 7: ペアの中で場のカードより大きなカードがない`);
		setPassFlg(array);
		return 2;
	}
	// 反則上がり以外のカードが2枚だけのとき
	else if(judgeFoul(array).length === 2 && pairsArray.length === 2) {
		// 反則上がり以外の最小値を除外
		let a = pairsArray.filter(n => n !== judgeFoul(pairsArray)[0]
		&& n !== judgeFoul(pairsArray)[1]);
		// 場のカード以下のカードを除外
		a = a.filter(n => n.point > minPoint(returnFieldCards(array)));
		if(a.length !== 0) {
			// 最小値を場に出す
			putCompToFieldB(minPoint(a), array, a);
			array.splice(countPointPosition(minPoint(a), array), 2);
		} else {
			displayPass(array);
			console.log(`pass 8: 反則上がり以外のカードが2枚だけで反則上がりのカードは出せない`);
			setPassFlg(array);
			return 2;
		}
	// }
	// else if(judgeFoul(pairsArray) === 0) {
	// 	displayPass(array);
	// 	console.log(`computer pass 9`);
	// 	setPassFlg(array);
	// 	return 2;
	} else {
		let a = pairsArray.filter(n => n.point > minPoint(returnFieldCards(array)));
		putCompToFieldB(minPoint(a), array, a);
		array.splice(countPointPosition(minPoint(a), array, returnMarkNumber(minPoint(a), a)[0]), 2);
	}
}

// 階段の配列だけを返す
const returnStairsArray = (array) => {
	let uniquePoint = returnUniquePoint(array);
	let uniqueCount = returnUniqueCount(array);
	let markNumber = [];
	let i = 0;
	let tmpArray = [];

	while(i < uniquePoint.length - 2) {
		if(uniquePoint[i] + 1 === uniquePoint[i + 1]
		&& uniquePoint[i + 1] + 1 === uniquePoint[i + 2]
		&& (uniqueCount[i] + uniqueCount[i + 1] + uniqueCount[i + 2]) < 5) {
			// 階段上の数字に一致した場合
			markNumber = returnMarkNumber(uniquePoint[i], array);
			for(const element of markNumber) {
				if(returnMarkNumber(uniquePoint[i + 1], array).includes(element) &&
				returnMarkNumber(uniquePoint[i + 2], array).includes(element)){
					// 階段が一致した場合
					tmpArray.push(array.filter(n => n.point === uniquePoint[i] && n.marknumber === element)[0])
					tmpArray.push(array.filter(n => n.point === uniquePoint[i + 1] && n.marknumber === element)[0])
					tmpArray.push(array.filter(n => n.point === uniquePoint[i + 2] && n.marknumber === element)[0])
					array = array.filter(n => n.point !== uniquePoint[i] || n.marknumber !== element);
					array = array.filter(n => n.point !== uniquePoint[i + 1] || n.marknumber !== element);
					array = array.filter(n => n.point !== uniquePoint[i + 2] || n.marknumber !== element);
					uniquePoint = returnUniquePoint(array);
					uniqueCount = returnUniqueCount(array);
					i = -1;
					break;
				} else {
					// マークが一致していない
				}
			}
			i++;
		} else {
			// 階段上の数字がなかった場合
			i++;
		}
	}
	return tmpArray;
}

// 場のカードが3枚だったとき
const judgeFieldCards3 = (array) => {
	let exceptStairsArray = returnExceptStairs(array);
	let tripleArray = returnTripleArray(exceptStairsArray);

	// 縛り判定の処理、配列を返す
	const bindArray = returnJudgeBindArray(array, tripleArray);
	tripleArray = returnTripleArray(tripleArray);

	if(tripleArray.length === 0) {
		displayPass(array);
		console.log(`pass -3: 場のカードがトリプルで出せるカードがない`);
		setPassFlg(array);
		return 2;
	}
	// トリプルの場合
	else if(returnFieldCards(array)[0].point === returnFieldCards(array)[1].point
	|| returnFieldCards(array)[1].point === 16 && returnFieldCards(array)[2].point === 16) {
		// 反則上がり以外のカードが3枚だけのとき
		if(judgeFoul(array).length === 3 && tripleArray.length === 3 && array.length !== 3) {
			// 反則上がり以外の最小値を除外
			let a = tripleArray.filter(n => n !== judgeFoul(tripleArray)[0]
			&& n !== judgeFoul(tripleArray)[1] && n !== judgeFoul(tripleArray)[2]);
			// 場のカード以下のカードを除外
			a = a.filter(n => n.point > minPoint(returnFieldCards(array)));
			if(a.length !== 0) {
				// 最小値を場に出す
				putCompToFieldB(minPoint(a), array, a);
				array.splice(countPointPosition(minPoint(a), array), 3);
			} else {
				displayPass(array);
				console.log(`pass 11: 反則上がり以外のカードが3枚で、反則上がりのカードは出せない`);
				setPassFlg(array);
				return 2;
			}
		}
		// 反則あがりのカードしかない場合
		else if(judgeFoul(tripleArray) === 0) {
			displayPass(array);
			console.log(`pass 12: 反則上がりのカードしかないので出せない`);
			setPassFlg(array);
			return 2;
		}
		else {
			let a = tripleArray.filter(n => n.point > minPoint(returnFieldCards(array)));
			if(a.length === 0) {
				displayPass(array);
				console.log(`pass 10: 場のカードが3枚で場のカードより大きなカードがない`);
				setPassFlg(array);
				return 2;
			}
			else {
				putCompToFieldB(minPoint(a), array, a);
				array.splice(countPointPosition(minPoint(a), array), 3);
			}
		}
	}
	// 階段の場合
	else {
		sortPoint(array);
		let stairsArray = returnStairsArray(array);
		const bindArray = returnJudgeBindArray(array, stairsArray);
		stairsArray = returnStairsArray(bindArray);

		// 階段が1セットで、それ以外のカードが反則上がりの場合
		if(judgeFoul(array).length === 3 && stairsArray.length === 3) {
			console.log(`pass 13: 階段で、それ以外が反則上がりのカード`);
			displayPass(array);
			setPassFlg(array);
			return 2;
		}
		// 反則上がりの階段1セット＋他の階段1セットの場合、反則上がりのセットを先に出す
		else if(judgeFoul(exceptStairsArray).length === 0 && stairsArray.length === 6
		&& maxPoint(stairsArray) === 15) {
			let a = stairsArray.filter(n => n.point > minPoint(returnFieldCards(array)));
			if(a > 2) {
				// 革命をしたときには4のマーク、通常時はエースのマークをだせば良い
				putCompToFieldE(returnMarkNumber(14, stairsArray)[0], 13, array);
			} else {
				console.log(`pass 14: 反則上がりの階段を出したいが、場のカードより大きいカードが無い`);
				displayPass(array);
				setPassFlg(array);
				return 2;
			}
		}
		else if(maxPoint(returnFieldCards(array)) !== 16
		&& maxPoint(stairsArray) > maxPoint(returnFieldCards(array))
		|| maxPoint(returnFieldCards(array)) === 16
		&& maxPoint(stairsArray) > maxPoint(returnFieldCards(array).filter(n => n.point !== 16)) + 1) {
			for(let i = 0; i < stairsArray.length; i=+3) {
				if(minPoint(returnFieldCards(array)) < stairsArray[i].point) {
					putCompToFieldE(stairsArray[i + 1].marknumber, stairsArray[i].point, array);
					deleteStairs(stairsArray[i].point, array, stairsArray[i + 1].marknumber);
					break;
				}
			}
		}
		else {
			displayPass(array);
			console.log(`pass 16: 場のカードが階段で、出せるカードがない`);
			setPassFlg(array);
			return 2;
		}
	}
}

// 場のカードが4枚だったとき
const judgeFieldCards4 = (array) => {
	let exceptStairsArray = returnExceptStairs(array);
	let revolutionArray = returnRevolutionArray(exceptStairsArray);
	const bindArray = returnJudgeBindArray(array, revolutionArray);
	revolutionArray = returnRevolutionArray(bindArray);

	if(revolutionArray.length === 0) {
		displayPass(array);
		console.log(`pass -4: 場のカードが4枚で、手札に4枚のカードがない`);
		setPassFlg(array);
		return 2;
	}
	else if(returnFieldCards(array).length > 4) {
		displayPass(array);
		console.log(`pass 20: 場のカードが5枚以上`);
		setPassFlg(array);
		return 2;
	}
	else if(maxPoint(revolutionArray) <= minPoint(returnFieldCards(array))) {
		displayPass(array);
		console.log(`pass 17: 場のカードが4枚で、場のカードより大きいカードがない`);
		setPassFlg(array);
		return 2;
	}
	// 反則上がり以外のカードが4枚だけのとき
	else if(judgeFoul(array).length === 4 && revolutionArray.length === 4) {
		sortPoint(revolutionArray);
		// 反則上がり以外の最小値を除外
		let a = revolutionArray.filter(n => n !== judgeFoul(revolutionArray).point);
		// 場のカード以下のカードを除外
		a = a.filter(n => n.point > minPoint(returnFieldCards(array)));
		if(a.length !== 0) {
			// 最小値を場に出す
			putCompToFieldB(minPoint(a), array, a);
			array.splice(countPointPosition(minPoint(a), array), 4);
			revolution();
		} else {
			displayPass(array);
			console.log(`pass 18: 場のカードが4枚で反則上がりのカードしかない`);
			setPassFlg(array);
			return 2;
		}
	} else if(judgeFoul(revolutionArray) === 0) {
		displayPass(array);
		console.log(`pass 19: 場のカードが4枚で?`);
		setPassFlg(array);
		return 2;
	} else {
		sortPoint(revolutionArray);
		let a = revolutionArray.filter(n => n.point > minPoint(returnFieldCards(array)));
		putCompToFieldB(minPoint(a), array, a);
		array.splice(countPointPosition(minPoint(a), array), 4);
		revolution();
	}
}

const doRevolution = (array) => {
	let j = 3;
	let k = 15;
	while(j < 16){
		for(let i = 0; i < array.length; i++){
			if(array[i].point === j) {
				array[i].point = k;
				array = array.filter(n => n !== array[i]);
				i--;
			}
		}
		j++;
		k--;
	}
}

const revolution = () => {
	console.log(revolutionflg);
	doRevolution(computerHands1);
	doRevolution(computerHands2);
	doRevolution(computerHands3);
	doRevolution(playerHands);
	doRevolution(fieldCards1);
	doRevolution(fieldCards2);
	doRevolution(fieldCards3);
	doRevolution(fieldCards4);

	revolutionflg === 0 ? revolutionflg = 1 : revolutionflg = 0;

	const field = document.getElementById(`field`);
	const h1 = document.createElement(`h1`);
	const status = document.getElementById(`status`);

	if(revolutionflg === 1) {
		h1.innerText = `革命`;
		h1.id = `fe1`;
		field.appendChild(h1);

		const p = document.createElement(`p`);
		p.innerText = `革命`;
		p.id = `fe3`;
		status.appendChild(p);
	}
	else {
		h1.innerText = `革命返し`;
		h1.id = `fe1`;
		field.appendChild(h1);

		const fe3 = document.getElementById(`fe3`);
		status.removeChild(fe3);
	}

	setTimeout(() => {
		const element = document.getElementById(`fe1`);
		field.removeChild(element);
	}, 600);
}
