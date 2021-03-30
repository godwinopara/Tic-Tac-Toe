const boardDisplay = document.querySelectorAll("#board-display div")
const displayWinner = document.querySelector(".display")
const displayWinnerText = document.querySelector(".display h4")
const restartButton = document.querySelector(".display input")
const playerScore = document.querySelector(".player");

const computerScore = document.querySelector(".computer")
const resetScoreBoard = document.querySelector(".reset-score-board")


let updatePlayerScore = 0;
let updateComputerScore = 0;




restartButton.addEventListener("click", restartGame)
resetScoreBoard.addEventListener("click",resetScore)





const ticTacToeBoard = [

    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
]


function resetBoard() {
    for (let outerArrayIndex = 0; outerArrayIndex < ticTacToeBoard.length; outerArrayIndex++) {
        for (let innerArrayIndex = 0; innerArrayIndex < ticTacToeBoard[outerArrayIndex].length; innerArrayIndex++) {
            ticTacToeBoard[outerArrayIndex][innerArrayIndex] = ""
        }
    }

}

// Display TicTacBoard to Web Page


function displayBoard() {
    boardDisplay.forEach(boardElement => {
        const outterArray = parseFloat(boardElement.dataset.boardNumber[0])
        const innerArray = parseFloat(boardElement.dataset.boardNumber[1])
        boardElement.innerHTML = `<button>${ticTacToeBoard[outterArray][innerArray]}</button>`
    })
}
displayBoard()


/*
 **********************
 **********************
 **********************
 */




function userPlayer(mark) {
    boardDisplay.forEach(boardElement => {
        boardElement.addEventListener("click", () => {
            const position1 = parseFloat(boardElement.dataset.boardNumber[0])
            const position2 = parseFloat(boardElement.dataset.boardNumber[1])

            ticTacToeBoard[position1][position2] = mark

        })


    })
}

userPlayer("X")



/*
    Add Computer choice to the TicTacToe board Array
*/
function computerPlayer(mark) {
    const availablePosition = emptyBoardPositon()
    const computerSelectedPosition = Math.floor(Math.random() * availablePosition.length)
    const selectedBoardPosition = availablePosition[computerSelectedPosition]

    ticTacToeBoard[selectedBoardPosition[0]][selectedBoardPosition[1]] = mark
    displayBoard()
}

// Check for Empty position in the Board Array for Computer to randomly pick from


function emptyBoardPositon() {
    let emptyPositions = []
    for (let i = 0; i < ticTacToeBoard.length; i++) {
        for (let j = 0; j < ticTacToeBoard[i].length; j++) {
            if (ticTacToeBoard[i][j] == "") {
                emptyPositions.push([i, j])
            }
        }
    }
    return emptyPositions
}
/*
 ************************************************
 ************************************************
 */







function boardIsFull() {
    for (let i = 0; i < ticTacToeBoard.length; i++) {
        for (let j = 0; j < ticTacToeBoard[i].length; j++) {
            if (ticTacToeBoard[i][j] == "") {
                return false
            }
        }
    }
    return true
}




// Return all  the possible ways to win the TicTacToe Game

function winningCombination() {
    const leftVertical = [];
    const rightVertical = [];
    const middleVertical = [];
    const leftDiagonal = [];
    const rightDiagonal = [];
    const topHorizontal = [...ticTacToeBoard[0]];
    const middleHorizontal = [...ticTacToeBoard[1]];
    const bottomHorizontal = [...ticTacToeBoard[2]];


    for (let i = 0; i < ticTacToeBoard.length; i++) {
        leftDiagonal.push(ticTacToeBoard[i][i])
        for (let j = 0; j < ticTacToeBoard[i].length; j++) {
            if (j == 0) {
                leftVertical.push(ticTacToeBoard[i][j])
                if (i == 2) {
                    rightDiagonal.push(ticTacToeBoard[i][j])
                }
            } else if (j == 1) {
                middleVertical.push(ticTacToeBoard[i][j])
                if (i == 1) {
                    rightDiagonal.push(ticTacToeBoard[i][j])
                }


            } else if (j == 2) {
                rightVertical.push(ticTacToeBoard[i][j])
                if (i == 0) {
                    rightDiagonal.push(ticTacToeBoard[i][j])
                }
            }
        }
    }

    return [leftDiagonal, rightDiagonal, leftVertical, rightVertical, middleVertical, topHorizontal, middleHorizontal, bottomHorizontal]

}

// *********************************************************************



function allEqual(array, mark) {
    let checkAllEqual = array.every(element => {
        return element == mark
    })

    return checkAllEqual
}


function checkWin(mark) {
    const winningComboArray = winningCombination()
    let checkPossibleWin = winningComboArray.some(subArr => {
        return allEqual(subArr, mark)
    })
    return checkPossibleWin
}



function restartGame() {
    resetBoard()
    displayWinnerText.innerHTML = ""
    displayWinner.style.display = "none"
    displayBoard()
}

function displayWinnerToPage(mark) {
    displayWinnerText.innerHTML = `<h4>${mark} Wins!</h4>`
    displayWinner.style.display = "flex"
}

function draw() {
    displayWinnerText.innerHTML = `<h4>Draw!</h4>`
    displayWinner.style.display = "flex"
}

function updateScore() {
    playerScore.textContent = updatePlayerScore;
    computerScore.textContent = updateComputerScore
}

function resetScore(){
    updatePlayerScore = 0;
    updateComputerScore = 0;
    updateScore()
}

function playGame() {
    boardDisplay.forEach(element => {
        element.addEventListener("click", () => {
            userPlayer("X")
            checkWin("X")
            if (boardIsFull() && !checkWin("X") || boardIsFull() && !checkWin("O")) {
                draw()
            }
            if (checkWin("X")) {
                displayWinnerToPage("X")
                updatePlayerScore++
            }
            if (!boardIsFull() & !checkWin("X")) {
                computerPlayer("O")
                if (checkWin("O")) {
                    displayWinnerToPage("O")
                    updateComputerScore++
                }
            }


            updateScore()

            displayBoard()

        })


    })
}

playGame()