const boardRegions = document.querySelectorAll("#gameBoard div")

let board = [
    ["","",""],
    ["","",""],
    ["","",""]
]

let player1 = ""
let player2 = ""
let jogadorVez = ""

function telaIniciar(){
    setTimeout(() => {
        document.querySelector(".telaInicial").style.zIndex = "-1"
        document.querySelector(".telaInicial").style.opacity = "0"
        document.querySelector(".div-jogadores").style.zIndex = "1"
        document.querySelector(".div-jogadores").style.opacity = "100%" 
    }, 100);
   
}

function inicarJogo(){
    player1 = document.getElementById("player1").value
    player2 = document.getElementById("player2").value

    if(player1.length > 0 && player2.length > 0 && player1 != player2){

        document.getElementById("resposta").innerText = player1
        document.querySelector(".div-jogadores").style.zIndex = "-1"
        document.querySelector(".div-jogadores").style.opacity = "0"
        document.querySelector(".div-jogo").style.zIndex = "1"
        document.querySelector(".div-jogo").style.opacity = "100%"

        boardRegions.forEach( element => {
            element.addEventListener('click', boardClick)

        printVez()
        });
    } else {
        document.getElementById("player1").style.borderTop = "1vh solid black"
        document.getElementById("player2").style.borderTop = "1vh solid black"

        setTimeout(() => {
            document.getElementById("player1").style.borderTop = ""
            document.getElementById("player2").style.borderTop = ""  
        }, 1500);
    }

}

let cont = 0

function boardClick(ev){


    const region = ev.currentTarget.dataset.region
    const regionArray = region.split('.')
    const row = regionArray[0]
    const column = regionArray[1]

    if(jogadorVez === player2){

        if(board[row][column] === ""){

            board[row][column] = "O"

            ev.currentTarget.innerHTML = "<p>O</p>"

            cont += 1
        }  

    } else {

        if(board[row][column] === ""){

            board[row][column] = "X"

            ev.currentTarget.innerHTML = "<p>X</p>"

            cont += 1
        }
    }



    if(cont % 2 === 0){
        jogadorVez = player1
    } else {
        jogadorVez = player2
    }

    console.clear()
    console.table(board)
    console.log(cont)

    
    document.getElementById("resposta").innerText = jogadorVez
    
    verificarVencedor()
    
}

function verificarVencedor(){
    if(board[0][0] != "" && board[0][1] != "" && board[0][2]  != "" &&
    board[0][0] === board[0][1] && board[0][0] === board[0][2]){

        printVencedor()

    } else if(board[1][0] != "" && board[1][1] != "" && board[1][2]  != "" &&
    board[1][0] === board[1][1] && board[1][0] === board[1][2]){
 
        printVencedor()
    
    } else if(board[2][0] != "" && board[2][1] != "" && board[2][2]  != "" &&
    board[2][2] === board[2][1] && board[2][0] === board[2][2]){
 
        printVencedor()
    
    } else if(board[0][0] != "" && board[1][0] != "" && board[2][0]  != "" &&
    board[0][0] === board[1][0] && board[0][0] === board[2][0]){
 
        printVencedor()
    
    } else if(board[0][1] != "" && board[1][1] != "" && board[2][1]  != "" &&
    board[0][1] === board[1][1] && board[0][1] === board[2][1]){
 
        printVencedor()
    
    } else if(board[0][2] != "" && board[1][2] != "" && board[2][2]  != "" &&
    board[0][2] === board[1][2] && board[0][2] === board[2][2]){
 
        printVencedor()
    
    } else if(board[0][0] != "" && board[1][1] != "" && board[2][2]  != "" &&
    board[0][0] === board[1][1] && board[0][0] === board[2][2]){
 
        printVencedor()
    
    } else if(board[0][2] != "" && board[1][1] != "" && board[2][0]  != "" &&
    board[0][2] === board[1][1] && board[0][2] === board[2][0]){
 
        printVencedor()
    
    }  else {
        if(board[0][0] != "" && board[0][1] != "" && board[0][2] != "" && board[1][0] != "" && board[1][1] != "" && board[1][2] != "" && board[2][0] != "" && board[2][1] != "" && board[2][2] != ""){
            printEmpate()
        } else {
            printVez()
        }
    }

}

function printVez(){
    document.querySelector(".resposta").style.zIndex = "2"
    setTimeout(() => {
        document.querySelector(".resposta").style.opacity = "100%"

        setTimeout(() => {
            document.querySelector(".resposta").style.opacity = "0"
            
            setTimeout(() => {
                document.querySelector(".resposta").style.zIndex = "-1"
            }, 600);
        }, 1750);
    }, 750);
}


function printVencedor(){

    boardRegions.forEach( element => {
        element.removeEventListener('click', boardClick)
    });

    setTimeout(() => {
        let vencedor = ""
    if (cont % 2 === 0) {
        vencedor = player2
    } else {
        vencedor = player1   }

    document.getElementById("resultado").innerText =  vencedor.toUpperCase() +" VENCEU!"

    document.querySelector(".telaFinal").style.zIndex = "1"
    document.querySelector(".div-jogo").style.zIndex = "-1"
    document.querySelector(".telaFinal").style.opacity = "100%"
    document.querySelector(".div-jogo").style.opacity = "-0"
    }, 2000);
    
} 

function printEmpate(){

    boardRegions.forEach( element => {
        element.removeEventListener('click', boardClick)
    });

    setTimeout(() => {
        document.getElementById("resultado").innerText = "EMPATE!"

        document.querySelector(".telaFinal").style.zIndex = "1"
        document.querySelector(".div-jogo").style.zIndex = "-1"
        document.querySelector(".telaFinal").style.opacity = "100%"
        document.querySelector(".div-jogo").style.opacity = "-0"
    }, 2000);

    
}

function reiniciar(){
    boardRegions.forEach( element => {
        element.addEventListener('click', boardClick)
    });

    board = [
        ["","",""],
        ["","",""],
        ["","",""]
    ]
    boardRegions.forEach( element => {
        element.innerText = ""
    })

    console.log(board)
    cont = 0
    jogadorVez = player1
    document.getElementById("resposta").innerText = player1

    document.querySelector(".telaFinal").style.zIndex = "-1"
    document.querySelector(".div-jogo").style.zIndex = "1"
    document.querySelector(".telaFinal").style.opacity = "0"
    document.querySelector(".div-jogo").style.opacity = "100%"

    printVez()
}