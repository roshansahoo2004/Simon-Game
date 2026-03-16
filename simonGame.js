let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];
let highScore = 0;

let started = false;
let level = 0;

let h2 = document.querySelector('h2');

document.addEventListener("keypress", () => {
    if(started == false){
        // console.log("game started");
        started = true;
        levelUp();
    }
});
// game ke dwara flash
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}
// user click par flaash hoga
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    // random btn choose
    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
} 

function checkAns(idx) {
    // console.log("curr level :",level); // humare level ki value aur gameSeq aur userSeq ki length same hogi
    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000)
        }
    } else {
        h2.innerHTML = `Game Over! Your Score was <b> ${level} </b> <br> Press any key to start.`;
        document.querySelector('body').style.backgroundColor = "red";
        setTimeout(() => {
            document.querySelector('body').style.backgroundColor = "white";
        },200);
        if(highScore < level){
            highScore = level;
        }
        let h3 = document.createElement("h3");
        h3.innerText = `Highest Score : ${highScore}`;
        h3.classList.add("highscore");
        h2.append(h3);
        reset();
    }
}

function btnPress() {
    // console.log(this);
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id"); // id create humne identify karne ke liye kiya tha
    // console.log(userColor);
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}
// sare btn ko select kiya event listener add karne ke liyye
let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}