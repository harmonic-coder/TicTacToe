let boxes = document.querySelectorAll('.box');
let reset = document.querySelector('#reset-butn');
let newGame = document.querySelector('#new-butn');
let msgContainer = document.querySelector('.winner-msg');
let resetContainer = document.querySelector('.resetButn');
let msg = document.querySelector('#msg');

let turnO = true; //playerX or playerO

let winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
];

resetContainer.classList.remove("noHide");
let clickCount = 0;
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked!");
        clickCount++;
        //box.innerText = "Abcd"
        if(turnO) {
            box.innerText = 'O';
            turnO = false;
        }
        else {
            box.innerText = 'X';
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    })
});

const disableBoxes = () => {
    for (let box of boxes) {
      box.disabled = true;
    }
  };

const enableBoxes = () => {
   for (let box of boxes) {
     box.disabled = false;
   }
 };

const showWinner = (winner) => {
    clickCount = 0;
    msg.innerText = `Winner!!! Player${winner}`;
    msgContainer.classList.remove("hide");
}

const gameDraw = () => {
    clickCount = 0;
    msg.innerText = `It's a Draw!`;
    msgContainer.classList.remove("hide");
    resetContainer.classList.add("noHide");
}

reset.addEventListener("click", () => {
    console.log("Reset Clicked!");
    clickCount = 0;
    turnO = true
    enableBoxes();
    boxes.forEach((box) => {
        box.innerText = '';
    })
})

newGame.addEventListener("click", () => {
    console.log("New Game Clicked!");
    msgContainer.classList.add("hide");
    resetContainer.classList.remove("noHide");
    turnO = true
    enableBoxes();
    boxes.forEach((box) => {
        box.innerText = '';
    })
})

const checkWinner = () => {
    for (pattern of winPatterns){
       // console.log(boxes[pattern[0]].innerText, boxes[pattern[1]].innerText, boxes[pattern[2]].innerText);
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 !== '' && pos2 !== '' && pos3 !== '') {
            if(pos1 === pos2 && pos2 === pos3){
                console.log ("WINNER!");
                resetContainer.classList.add("noHide");
                showWinner(pos1);
                disableBoxes();
            }
            else{
                if(clickCount === 9){
                    gameDraw();
                }
            }
        }
    }
}