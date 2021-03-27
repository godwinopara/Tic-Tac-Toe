const horizontalTopGridElement = document.querySelectorAll(".upborder")

const horizontalMiddleGridElement = document.querySelectorAll(".middle-border")

const horizontalBottomGridElement = document.querySelectorAll(".bottom-border")

const boardNum = document.querySelectorAll("[data-boardnumber]")

const gameBoard = [["X","",""],["X","","O"],["","X","O"]]

let upboardele = gameBoard[0]
let middleboardele = gameBoard[1]
let bottomboardele = gameBoard[2]


function displayTopElement(){
    horizontalTopGridElement.forEach((element, index) => {
        element.innerHTML = `<h3>${upboardele[index]}</h3>`
    })
    
}

function displayMiddleElement(){
    horizontalMiddleGridElement.forEach((element, index) => {
        element.innerHTML = `<h3>${middleboardele[index]}</h3>`
    })
}

function displayBottomGridElement (){
    horizontalBottomGridElement.forEach((element, index) => {
        element.innerHTML = `<h3>${bottomboardele[index]}</h3>`
    })
}


function boardDisplay(){
    displayTopElement()
    displayMiddleElement()
    displayBottomGridElement()
}

boardDisplay()




boardNum.forEach(element => {
    element.addEventListener("click", () => {
        let gameBoardOutterArrPosition = parseFloat(element.dataset.boardnumber[0])
        let gameBoardInnerArrPosition = parseFloat(element.dataset.boardnumber[1])


        gameBoard[gameBoardOutterArrPosition][gameBoardInnerArrPosition] = "X"

        boardDisplay()
    })
});


function randomPosition(){
    let positions = []
    for(let i = 0; i < gameBoard.length; i++){
        for(let j = 0; j < gameBoard[i].length; j++){
            if (gameBoard[i][j] == ""){
                positions.push([i, j])
            }
        }
    }
    let random = Math.floor((Math.random()* positions.length))
    return positions[random]
}



function computerPlay(){
    let computerSelectedPosition = randomPosition()
    gameBoard[computerSelectedPosition[0]][computerSelectedPosition[1]] = "O"
boardDisplay()

    console.log(gameBoard)
}

console.log(computerPlay())