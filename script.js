let boxes = document.querySelectorAll(".btn");
let reset = document.querySelector(".set");
let contentdata = document.querySelector(".content");
let message = document.querySelector(".msg");
let newGame = document.querySelector(".new");

let turnO = true;

let winMoves = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerHTML !== "") return; 
        if (turnO) {
            box.innerHTML = "O";
            turnO = false;
        } else {
            box.innerHTML = "X";
            turnO = true;
        }

        box.disabled = true;

        if (winnercheck()) return;
        if (isDraw()) showDraw(); 
    });
});

const disableboxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableboxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerHTML = ""; 
        turnO = true; 
    }
}


const resetGame = () => {
    enableboxes();
    contentdata.classList.add("hide"); 
}


const displayWinner = (winner) => {
    message.innerHTML = `Congratulations! ${winner} is the winner!`;
    contentdata.classList.remove("hide"); 
    disableboxes(); 
}


const showDraw = () => {
    message.innerHTML = "It's a Draw!";
    contentdata.classList.remove("hide");
    disableboxes(); 
}

const restart = () => {
    enableboxes(); 
    contentdata.classList.add("hide");
}


const winnercheck = () => {
    for (let pattern of winMoves) {
        let player1 = boxes[pattern[0]].innerHTML;
        let player2 = boxes[pattern[1]].innerHTML;
        let player3 = boxes[pattern[2]].innerHTML;

        
        if (player1 !== "" && player1 === player2 && player2 === player3) {
            displayWinner(player1); 
            return true; 
        }
    }
    return false;
}


const isDraw = () => {
    for (let box of boxes) {
        if (box.innerHTML === "") {
            return false; 
        }
    }
    return true; 
}

reset.addEventListener("click", resetGame);
newGame.addEventListener("click", restart);
