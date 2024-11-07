const cell = document.querySelectorAll('.cell');
const statusText = document.getElementById('status-text');
const restartBtn = document.getElementById('restart-btn');

const winContation = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let option = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = 'x';
let running = false;

initializeGame();

function initializeGame() {
    cell.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener('click', restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute('cellindex');
    if (option[cellIndex] !== "" || !running) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    option[index] = currentPlayer;
    cell.textContent = currentPlayer;
}
function changePlayer() {
    currentPlayer = (currentPlayer == 'x') ? 'o' : 'x';
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    roundWon = false;
    for (let i=0; i<winContation.length; i++) {
        const contation = winContation[i];
        const cellA = option[contation[0]];
        const cellB = option[contation[1]];
        const cellC = option[contation[2]];

        if (cellA == '' || cellB == '' || cellB ==''){
            continue;
        }
        if (cellA==cellB && cellB==cellC){
            roundWon = true;
            break;
        }
    }
    if(roundWon){
        statusText.textContent=`${currentPlayer} wins`;
        running=false;
    }
    else if(!option.includes("")){
        statusText.textContent='Draw';
        running=false;
    }
    else{
        changePlayer();
    }
}

function restartGame() {
    currentPlayer='x';
    option = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cell.forEach(cell=>cell.textContent = "");
    running= true;
}