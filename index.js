var cards = [1, 2, 3, 4, 5, 6, 7, 8];
var board = document.getElementById("board");
var firstCard = null;

var pictures = [
    "./assets/paw_patrol_logo.png",
    "./assets/chase.png",
    "./assets/marcus.png",
    "./assets/rocky.png",
    "./assets/ruben.png",
    "./assets/stella.png",
    "./assets/zuma.png",
    "./assets/ryder.png",
    "./assets/jungle_patrol.png"
];

function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

function createBoard() {
	cards = shuffle(cards.concat(cards));
	for (var i = 0; i < cards.length; i++) {
        //card creation
		var card = document.createElement("div");
		card.className = "card";
		card.dataset.value = cards[i];
		card.addEventListener("click", flipCard);
		board.appendChild(card);
	}
}

function flipCard(event) {
    let k = event.target.dataset.value;
	if (!firstCard) {
		firstCard = event.target;
		firstCard.classList.add("flipped");
        setTimeout(function() {
            firstCard.style.background = "center / contain no-repeat url(" + pictures[k] + ")";
        }, 500)
        
	} else if (event.target !== firstCard) {
		event.target.classList.add("flipped");
        setTimeout(function() {
            event.target.style.background = "center / contain no-repeat url(" + pictures[k] + ")";
        }, 500)
        
		if (event.target.dataset.value === firstCard.dataset.value) {
			event.target.removeEventListener("click", flipCard);
			firstCard.removeEventListener("click", flipCard);
            firstCard = null;
		} else {
			setTimeout(function() {
				event.target.classList.remove("flipped");
                event.target.innerHTML = "";
                event.target.style.background = "center / contain no-repeat url(" + pictures[0] + ")";
				firstCard.classList.remove("flipped");
                firstCard.innerHTML = "";
                firstCard.style.background = "center / contain no-repeat url(" + pictures[0] + ")";
                firstCard = null;
			}, 2500);
		}
	}
}

createBoard();