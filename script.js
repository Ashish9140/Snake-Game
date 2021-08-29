// bug : where we are pressing multiple keys before its given time it will interchange

let SnackArr = [{ x: 8, y: 7 }];
let food = { x: 12, y: 15 };
let a = 0, b = 0;
let snackupdation = false;
const foodCut = new Audio("food.mp3");
const gameOver = new Audio("gameover.mp3");
const snackMove = new Audio("move.mp3");
const music = new Audio("music.mp3");
let score = 0, highScore=0;

window.addEventListener("keydown", function (e) {
    music.play();
    switch (e.key) {
        case "ArrowUp":
            if (b != (1))
                b = -1;
            a = 0;
            snackMove.play();
            break;

        case "ArrowDown":
            if (b != (-1))
                b = 1;
            a = 0;
            snackMove.play();
            break;

        case "ArrowRight":
            b = 0;
            if (a != (-1))
                a = 1;
            snackMove.play();
            break;

        case "ArrowLeft":
            b = 0;
            if (a != (1))
                a = -1;
            snackMove.play();
            break;
    }
});


function play() {
    let board = document.querySelector(".board");
    board.innerHTML = "";

    // here we are displaying food
    let createFood = document.createElement("div");
    createFood.className = "food";
    createFood.style.gridRowStart = food.y;
    createFood.style.gridColumnStart = food.x;
    board.appendChild(createFood);

    // here we are displaying score and highscore
    let disScore = document.querySelector(".score");
    disScore.innerHTML = "Score-" + score;
    let disHighScore = document.querySelector(".highScore");
    highScore = localStorage.getItem("highScore");

    if (highScore < score) {
        disHighScore.innerHTML = "HighScore-" + score;
        localStorage.setItem("highScore", score);
    }
    else {
        disHighScore.innerHTML = "HighScore-" + highScore;
    }

    // working on snack updation
    if (SnackArr[0].x === food.x && SnackArr[0].y === food.y) {
        foodCut.play();
        snackupdation = true;
        // here we are updating score
        score++;
        disScore.innerHTML = "Score-" + score;

        SnackArr.unshift({ x: SnackArr[0].x + a, y: SnackArr[0].y + b });
        food.x = Math.round(2 + (16 - 2) * Math.random());
        food.y = Math.round(2 + (16 - 2) * Math.random());

        // here we used for loop to check if food position to equal with snack segment
        for (let i = 0; i < SnackArr.length; i++) {
            if (food.x == SnackArr[i].x && food.y == SnackArr[i].y) {
                food.x = Math.round(1 + (18 - 1) * Math.random());
                food.y = Math.round(1 + (18 - 1) * Math.random());
                i = -1;
            }
        }
    }
    else {
        snackupdation = false;
    }

    if (snackupdation === false) {
        for (let i = SnackArr.length - 2; i >= 0; i--) {
            SnackArr[i + 1] = { ...SnackArr[i] };
        }
        SnackArr[0].x += a;
        SnackArr[0].y += b;
    }

    // here we are displaying snack
    SnackArr.forEach(function (element, index) {
        let createSnack = document.createElement("div");
        if (index === 0)
            createSnack.className = "head";
        else
            createSnack.className = "head-body";
        createSnack.style.gridRowStart = SnackArr[index].y;
        createSnack.style.gridColumnStart = SnackArr[index].x;
        board.appendChild(createSnack);
    });

    snacKCollide();

}

function snacKCollide() {

    // here we are giving condition where our snack will collide with the boundary
    if (SnackArr[0].x > 18 || SnackArr[0].x <= 0 || SnackArr[0].y > 18 || SnackArr[0].y <= 0) {
        music.pause();
        gameOver.play();
        SnackArr = [{ x: 8, y: 7 }];
        food.x = 12, food.y = 15;
        a = 0, b = 0;
        score = 0;
        alert("Press key to play again ,, Position unmatched");
    }

    // here we are giving condition where our snack will collide with their segments
    for (let i = 1; i < SnackArr.length; i++) {
        if (SnackArr[i].x === SnackArr[0].x && SnackArr[i].y === SnackArr[0].y) {
            music.pause();
            gameOver.play();
            alert("Press key to play again  ,, Colllided with the segment");
            SnackArr = [{ x: 8, y: 7 }];
            food.x = 12, food.y = 15;
            a = 0, b = 0;
            score = 0;
        }
    }
}

setInterval(play, 60);