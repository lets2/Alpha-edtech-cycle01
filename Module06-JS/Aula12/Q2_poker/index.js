const buttonShuffleDeck = document.querySelector("#shuffleDeck");
const buttonPickCards = document.querySelector("#pickCards");
const containerHand = document.querySelector("#containerHand");
const containerMessage = document.querySelector("#containerMessage");
const messageCardOnDeck = document.querySelector("#numberCardsRemainsDeck");
const suitList = ["clubs", "diamonds", "hearts", "spades"];

//const containerDeck = document.querySelector("#containerDeck");
//const suitId = ["C", "D", "H", "S"];

let cardsOnDeck = 52;
let listOfCardsOriginal = [];
let copyListOfCards = [];
let currentHand = [];
let handOrdened = []; //Hand cards sorted in ascending order
let cardNames = [
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"T",
	"J",
	"Q",
	"K",
	"A",
];
//each element is a card/object with attributes
//e.g.: {name:"2",number:2,suit:"clubs",suitId:"C",src:"./assets/2C.svg"}
//e.g.: {name:"2",number:2,suit:"diamonds",suitId:"D",src:"./assets/2D.svg"}
//e.g.: {name:"T",number:10,suit:"hearts",suitId:"H",src:"./assets/TH.svg"}
//e.g.: {name:"J",number:11,suit:"hearts",suitId:"H",src:"./assets/JH.svg"}
//e.g.: {name:"Q",number:12,suit:"spades",suitId:"S",src:"./assets/QS.svg"}
//e.g.: {name:"K",number:13,suit:"clubs",suitId:"C",src:"./assets/KC.svg"}
//e.g.: {name:"A",number:14,suit:"diamonds",suitId:"D",src:"./assets/AD.svg"}

//INITIALIZE
createDeck();
containerMessage.innerHTML = ""; //delete message about new cards
createCopyOfList();
shuffleDeck();
//showHand(copyListOfCards);
showNumberCardsOnDeck();

function createDeck() {
	for (let number = 2; number <= 14; number++) {
		suitList.forEach((element) => {
			const card = {};
			//console.log("Nesse momento elem = ", element[0]);
			card.name = cardNames[number - 2];
			card.number = number;
			card.suit = element;
			card.suitId = element[0].toUpperCase();
			card.src = `./assets/${card.name}${card.suitId}.svg`;
			listOfCardsOriginal.push(card);
		});
	}
}

buttonShuffleDeck.addEventListener("click", () => {
	containerMessage.innerHTML = ""; //delete message about new cards
	createCopyOfList();
	shuffleDeck();
	//showHand(copyListOfCards);
	showNumberCardsOnDeck();
});

function createCopyOfList() {
	copyListOfCards = [...listOfCardsOriginal]; //spread operator
}

function shuffleDeck() {
	cardsOnDeck = 52;
	containerHand.innerHTML = `<img src="./assets/00back_cards_blue.PNG" alt="cassino table" />`;
	copyListOfCards.sort(() => {
		return Math.random() - 0.5;
	});
}

function showHand(listHand) {
	containerHand.innerHTML = "";
	listHand.forEach((element) => {
		containerHand.innerHTML += `<img src=${element.src}>`;
	});
}

buttonPickCards.addEventListener("click", () => {
	containerMessage.innerHTML = ""; //clear message about previous hand

	pickNewhand();
	handOrdened = [...currentHand].sort(OrderedHandAscendingOrder);
	//showHand(handOrdened);
	setTimeout(() => {
		showHand(handOrdened);
	}, 800);
	showNumberCardsOnDeck();
	if (cardsOnDeck > 2) {
		setTimeout(() => {
			rankHand();
		}, 1000);
		cardsOnDeck = cardsOnDeck - 5;
	}
});

function pickNewhand() {
	if (copyListOfCards.length >= 5) {
		imageAndGif.setAttribute(
			"src",
			"./assets/000_firstGIF_3_frames_play_once_espelhado.GIF"
		);
		containerHand.innerHTML = `<img src="./assets/00back_cards_blue.PNG" alt="cassino table" />`;

		showGifAnimation();
		currentHand = [];
		for (let i = 0; i < 5; i++) {
			const element = copyListOfCards[0];
			currentHand.push(element);
			copyListOfCards.splice(0, 1);
		}
	} else {
		containerMessage.innerHTML =
			"<p>Not enough cards in the deck for a new hand!</p>";
	}
}
let intervalId;
let countBackCards = 1;
function showGifAnimation() {
	if (intervalId) return;
	intervalId = setInterval(() => {
		if (countBackCards < 4) {
			animationCards(countBackCards);
		} else {
			clearInterval(intervalId);
			intervalId = null;
			countBackCards = 1;
		}
	}, 200);
}
function animationCards(index) {
	containerHand.innerHTML += `<img src=${handOrdened[index].src}>`;
	countBackCards++;
}

function OrderedHandAscendingOrder(firstObject, secondObject) {
	return firstObject.number - secondObject.number;
}

function showNumberCardsOnDeck() {
	messageCardOnDeck.innerHTML = `<span>${copyListOfCards.length}</span>`;
}

function rankHand() {
	showMessageRankHand("Nothing");
	let rankStatus = [];
	//rankStatus[9] = true;
	rankStatus[8] = verifyIfThereIsPair();
	rankStatus[7] = verifyIfThereAreTwoPair();
	rankStatus[6] = verifyIfThereIsThreeOfAKind();
	rankStatus[5] = verifyIfThereIsSequence();
	rankStatus[4] = verifyIfThereIsFlush();
	rankStatus[3] = verifyIfThereIsFullHouse();
	rankStatus[2] = verifyIfThereIsFourOfAKind();
	rankStatus[1] = verifyIfThereIsStraightFlush();
	rankStatus[0] = verifyIfThereIsRoyalFlush();
	const index = rankStatus.indexOf(true);
	const rankOffical = getStringClassifyRank(index);
	showMessageRankHand(rankOffical);
}

function getStringClassifyRank(index) {
	const listOfMessagesRank = [
		"Royal Flush",
		"Straight flush",
		"Four of a kind",
		"Full House",
		"Flush",
		"Sequence",
		"Three of a Kind",
		"two Pair",
		"One Pair",
		"Nothing",
	];
	return index !== -1 ? listOfMessagesRank[index] : listOfMessagesRank[9];
}

function verifyIfThereIsPair() {
	for (let i = 0; i < handOrdened.length; i++) {
		for (let j = i + 1; j < handOrdened.length; j++) {
			if (handOrdened[i].number === handOrdened[j].number) {
				showMessageRankHand("One Pair");
				return true;
			}
		}
	}
	return false;
}

function verifyIfThereAreTwoPair() {
	if (
		(handOrdened[0].number === handOrdened[1].number &&
			handOrdened[2].number === handOrdened[3].number) ||
		(handOrdened[1].number === handOrdened[2].number &&
			handOrdened[3].number === handOrdened[4].number) ||
		(handOrdened[0].number === handOrdened[1].number &&
			handOrdened[3].number === handOrdened[4].number)
	) {
		showMessageRankHand("Two Pair");
		return true;
	}
	return false;
}

function showMessageRankHand(rank) {
	containerMessage.innerHTML = `<p>You have: ${rank}!</p>`;
}

function verifyIfThereIsThreeOfAKind() {
	const situation1 = isAll3Equal(
		handOrdened[0].number,
		handOrdened[1].number,
		handOrdened[2].number
	);
	const situation2 = isAll3Equal(
		handOrdened[1].number,
		handOrdened[2].number,
		handOrdened[3].number
	);
	const situation3 = isAll3Equal(
		handOrdened[2].number,
		handOrdened[3].number,
		handOrdened[4].number
	);

	if (situation1 || situation2 || situation3) {
		showMessageRankHand("Three of a Kind");
		return true;
	}
	return false;
}

function isAll3Equal(number1, number2, number3) {
	return number1 === number2 && number1 === number3;
}

function verifyIfThereIsSequence() {
	//console.log("Entrando na sequencia:", handOrdened);
	const diffFistSecond = isDiffEqualOne(
		handOrdened[0].number,
		handOrdened[1].number
	);
	const diffSecondThird = isDiffEqualOne(
		handOrdened[1].number,
		handOrdened[2].number
	);
	const diffThirdFourth = isDiffEqualOne(
		handOrdened[2].number,
		handOrdened[3].number
	);
	const diffFourthFifth = isDiffEqualOne(
		handOrdened[3].number,
		handOrdened[4].number
	);

	if (
		(diffFistSecond && diffSecondThird && diffThirdFourth && diffFourthFifth) ||
		IsSequenceAceToFive()
	) {
		showMessageRankHand("Sequence");
		return true;
	}
	return false;
}

function IsSequenceAceToFive() {
	return (
		handOrdened[0].name == "2" &&
		handOrdened[1].name == "3" &&
		handOrdened[2].name == "4" &&
		handOrdened[3].name == "5" &&
		handOrdened[4].name == "A"
	);
}

function isDiffEqualOne(smallNumber, largerNumber) {
	const diff = largerNumber - smallNumber;
	return diff === 1;
}

function verifyIfThereIsFlush() {
	const isEqSuit1and2 = compareSuit(handOrdened[0].suit, handOrdened[1].suit);
	const isEqSuit2and3 = compareSuit(handOrdened[1].suit, handOrdened[2].suit);
	const isEqSuit3and4 = compareSuit(handOrdened[2].suit, handOrdened[3].suit);
	const isEqSuit4and5 = compareSuit(handOrdened[3].suit, handOrdened[4].suit);
	if (isEqSuit1and2 && isEqSuit2and3 && isEqSuit3and4 && isEqSuit4and5) {
		showMessageRankHand("Flush");
		return true;
	}
	return false;
}

function compareSuit(suit1, suit2) {
	return suit1 === suit2;
}

function verifyIfThereIsFullHouse() {
	const IsTrioAtBeginning = isAll3Equal(
		handOrdened[0].number,
		handOrdened[1].number,
		handOrdened[2].number
	);
	const isPairAtEnd = handOrdened[3].number === handOrdened[4].number;
	const isPairAtBeginning = handOrdened[0].number === handOrdened[1].number;
	const IsTrioAtEnd = isAll3Equal(
		handOrdened[2].number,
		handOrdened[3].number,
		handOrdened[4].number
	);
	if (
		(IsTrioAtBeginning && isPairAtEnd) ||
		(isPairAtBeginning && IsTrioAtEnd)
	) {
		showMessageRankHand("Full house");
		return true;
	}
	return false;
}

function verifyIfThereIsFourOfAKind() {
	const AreTheFirstFourEqual =
		isAll3Equal(
			handOrdened[0].number,
			handOrdened[1].number,
			handOrdened[2].number
		) &&
		isAll3Equal(
			handOrdened[1].number,
			handOrdened[2].number,
			handOrdened[3].number
		);
	const AreTheLastFourEqual =
		isAll3Equal(
			handOrdened[1].number,
			handOrdened[2].number,
			handOrdened[3].number
		) &&
		isAll3Equal(
			handOrdened[2].number,
			handOrdened[3].number,
			handOrdened[4].number
		);
	if (AreTheFirstFourEqual || AreTheLastFourEqual) {
		showMessageRankHand("Four of a kind");
		return true;
	}
	return false;
}

function verifyIfThereIsStraightFlush() {
	if (verifyIfThereIsSequence() && verifyIfThereIsFlush()) {
		console.log(
			"Testando se é verdadeiro sequence:",
			verifyIfThereIsSequence()
		);
		console.log("Vendo se eh flush", verifyIfThereIsFlush());
		showMessageRankHand("Straight flush");
		return true;
	}

	return false;
}

function verifyIfThereIsRoyalFlush() {
	if (
		verifyIfThereIsSequence() &&
		verifyIfThereIsFlush() &&
		handOrdened[4].name === "A"
	) {
		showMessageRankHand("Royal flush");
		return true;
	}

	return false;
}

// Pair.
// Two pair.
// Three of a kind.
// Sequence.//cincocartas em sequencia, nao importa naipe
// Flush//cinco cartas do mesmo naipe
// Full house.//um trio e um par
// Four of a kind.//quatro cartas do mesmo valor
// Straight flush.//sequencia com mesmo nipe
// Royal flush.//squencia de mesmo nipe usando A,K,Q,J and 10
/* 
	handOrdened[0].number = 3;
	handOrdened[1].number = 4;
	handOrdened[2].number = 5;
	handOrdened[3].number = 6;
	handOrdened[4].number = 7; 

	handOrdened[0].suit = "hearts";
	handOrdened[1].suit = "hearts";
	handOrdened[2].suit = "hearts";
	handOrdened[3].suit = "hearts";
	handOrdened[4].suit = "hearts"; */

/*******************
 CHEAT HAND/DECK TESTING ALL CASE! 
VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
 *******************/
const obj1 = {
	name: "2",
	number: 2,
	suit: "clubs",
	suitId: "C",
	src: "./assets/2C.svg",
};
//all examples are saved at conteudo.js file
import exemplos from "./conteudo.js";
console.log(exemplos);
console.log(exemplos[0]);

const selectCheat = document.querySelector("#selectCheatHand");
selectCheat.addEventListener("change", () => {
	const option = selectCheat.value;
	handOrdened = [];
	for (let i = 0; i < 5; i++) {
		const newObj = {};
		newObj.name = "";
		newObj.number = "";
		newObj.suit = "";
		newObj.suidId = "";
		newObj.src = "";
		handOrdened.push(newObj);
	}
	switch (option) {
		case "nothing":
			createCheatHand(0, 8, 2, 10, 4);
			break;
		case "onePair":
			createCheatHand(0, 1, 7, 3, 4);
			break;
		case "twoPair":
			createCheatHand(0, 1, 2, 3, 4);
			break;
		case "threeKind":
			createCheatHand(0, 1, 5, 3, 4);
			break;
		case "sequence":
			//createCheatHand(1, 6, 2, 7, 19); //example sequence with ACE
			createCheatHand(1, 6, 2, 7, 4); //example sequence without ACE
			break;
		case "flush":
			createCheatHand(8, 9, 10, 11, 12);
			break;
		case "fullHouse":
			createCheatHand(0, 1, 5, 2, 3);
			break;
		case "fourKind":
			createCheatHand(0, 1, 5, 20, 3);
			break;
		case "straightFlush":
			createCheatHand(13, 14, 15, 16, 17);
			break;
		case "royalFlush":
			createCheatHand(15, 16, 17, 18, 19);
			break;
		default:
	}
	//if (option !== "no") {
	showHand(handOrdened);
	rankHand();
	containerMessage.innerHTML = "";
	///} else {
	///	showHand([]);
	///		containerMessage.innerHTML = "";
	///	}
});
function createCheatHand(n1, n2, n3, n4, n5) {
	const _obj1 = exemplos[n1];
	const _obj2 = exemplos[n2];
	const _obj3 = exemplos[n3];
	const _obj4 = exemplos[n4];
	const _obj5 = exemplos[n5];
	//console.log(_obj1.name, _obj2, _obj3, _obj4, _obj5);
	modifyOrderedHand(0, _obj1);
	modifyOrderedHand(1, _obj2);
	modifyOrderedHand(2, _obj3);
	modifyOrderedHand(3, _obj4);
	modifyOrderedHand(4, _obj5);
}
function modifyOrderedHand(index, obj) {
	handOrdened[index].name = obj.name;
	handOrdened[index].number = obj.number;
	handOrdened[index].suit = obj.suit;
	handOrdened[index].suitId = obj.suitId;
	handOrdened[index].src = obj.src;
}

/*******************
 * ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 CHEAT HAND/DECK TESTING ALL CASE! 
 *******************/

/*
 DOING ANIMATION
 */

const imageAndGif = document.querySelector("#imageAndGif");

/*
 DOING ANIMATION
 */
