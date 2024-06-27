import data from "./db.json" assert { type: "json"};

var user = JSON.parse(localStorage.getItem("token"));
if(!user){
    window.location.href="./login.html"
}

let Quiz = JSON.parse(localStorage.getItem("sucess")) || [];

let pop = document.createElement("div");
pop.setAttribute("class", "pop");

let j = 9;
let l = 0;
let QuesAsked = [];
let realQues = [];
let id;

for (let qC = 0; qC < data.length; qC++) {
    let ind = Math.floor(Math.random() * data.length);
    QuesAsked.push(data[ind]);
    if (qC === data.length - 1) {
        for (let k = 0; k < QuesAsked.length; k++) {
            let flag = true;
            for (let m = 0; m < realQues.length; m++) {
                if (QuesAsked[k] === realQues[m]) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                realQues.push(QuesAsked[k]);
            }
        }
    }
}


const display = () => {

    let time = 30;

    document.querySelector(".question").innerHTML = null;
    document.querySelector(".options").innerHTML = null;

    let q = realQues[l];

    let ques = document.createElement("h3");
    ques.innerText = q.question;

    document.querySelector(".question").append(ques);

    let op1 = document.createElement("div");
    op1.innerText = q.option1;

    let op2 = document.createElement("div");
    op2.innerText = q.option2;

    let op3 = document.createElement("div");
    op3.innerText = q.option3;

    let op4 = document.createElement("div");
    op4.innerText = q.option4;

    let timer = document.createElement("div");
    timer.setAttribute("class", "timer");
    timer.innerText = time;

    document.querySelector(".options").append(op1, op2, op3, op4, timer);

    for (var i = 0; i < 4; i++) {
        document.querySelectorAll(".options>div:not(:last-child")[i].addEventListener("click", (e) => {
            if (e.target.innerText === q.correct) {
                e.target.style.backgroundColor = "#65FF00";
                e.target.style.color = "purple";

                Quiz.push(q);
                localStorage.setItem("sucess", JSON.stringify(Quiz));

                handleLevel();



            }
            else {
                handleLoss(e);
            }
        })
    }

    handleTimer(time, timer);
}


const start = () => {
    display();
}

const handleLevel = () => {
    document.querySelectorAll(".level>div")[j].style.backgroundColor = "#ffd700";
    document.querySelectorAll(".level>div")[j].style.color = "purple";
    console.log(j)
    if (j === 0) {
        document.querySelector(".p").innerHTML = null;
        let won = document.createElement("div");
        won.innerHTML = `<i style="color: purple;" class="fas fa-trophy"></i> Congratulations,<br> ${user.user} you've won the game.`;
        pop.append(won);
        document.querySelector(".p").append(pop);
        let it = setTimeout(() => {
            window.location.href = "./index.html"
            clearTimeout(it)
            clearInterval(id);
        }, 3000)
    }
    j--;
    l++;
    clearInterval(id);
    setTimeout(() => {
        display();
    }, 1000);
}

const handleTimer = (time, timer) => {
    id = setInterval(() => {
        time--;
        timer.innerText = time;

        if (time === 0) {
            document.querySelector(".p").innerHTML = null;
            let err = document.createElement("div");
            err.innerHTML = `<i style="color: purple;" class="fas fa-clock"></i> Oops time out,${user.user} you've lost the game.`;
            pop.append(err);
            document.querySelector(".p").append(pop);
            let ide = setTimeout(() => {
                window.location.href = "./index.html"
                clearTimeout(ide)
                clearInterval(id);
            }, 3000)
        }

    }, 1000)
}

const handleLoss = (e) => {
    if(j===9){
        var amount = "Nothing";
    }else{
        var amount = document.querySelectorAll(".level>div")[j+1].innerText;
    }
    console.log(j)
    localStorage.setItem("sucess", JSON.stringify([]));
    document.querySelector(".p").innerHTML = null;
    let err = document.createElement("div");
    err.innerHTML = `<i class="far fa-times-circle"></i> Oops wrong answer ${user.user}, you've won ${amount}.`;

    pop.append(err);
    e.target.style.backgroundColor = "red";
    document.querySelector(".p").append(pop);

    setTimeout(() => {
        window.location.href = "./index.html"
    }, 3000);
}

start();


