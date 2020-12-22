let leftRacket=document.querySelector("#leftRacket");
let rightRacket=document.querySelector("#rightRacket");
let racketHeight=document.querySelector(".racket").clientHeight;
let racketWidth=document.querySelector(".racket").clientWidth;
let pongBallWidth=document.querySelector("#pongBall").clientWidth;
let pongBallHeight=document.querySelector("#pongBall").clientHeight;
let pongBall=document.querySelector("#pongBall");

let leftRandom = Math.random()*3+2;
let rightRandom = Math.random()*3+2;
if(leftRandom<3.5){
    leftRandom*=-1;
}
if(rightRandom<3.5){
    rightRandom*=-1;
}
let pongBallLeft=leftRandom;
let pongBallTop=rightRandom;
let gameSpeed=18;
let leftScore=0;
let rightScore=0;

leftRacket.style.top = (window.innerHeight-racketHeight)/2+"px";
rightRacket.style.top = (window.innerHeight-racketHeight)/2+"px";
pongBall.style.top=window.innerHeight/2+"px";
pongBall.style.left=((window.innerWidth-pongBallWidth)/2+1)+"px";

function restartGame(){
        leftRacket.style.top = (window.innerHeight-racketHeight)/2+"px";
        rightRacket.style.top = (window.innerHeight-racketHeight)/2+"px";
        pongBall.style.top=window.innerHeight/2+"px";
        pongBall.style.left=((window.innerWidth-pongBallWidth)/2+1)+"px";
        leftRandom = Math.random()*3+2;
        rightRandom = Math.random()*3+2;
        if(leftRandom<3.5){
            leftRandom*=-1;
        }
        if(rightRandom<3.5){
            rightRandom*=-1;
        }
        pongBallLeft=leftRandom;
        pongBallTop=rightRandom;
}

function pongBallLoop(){
        pongBall.style.top=(parseInt(pongBall.style.top)+pongBallTop)+"px";
        pongBall.style.left=(parseInt(pongBall.style.left)+pongBallLeft)+"px";
        if(parseInt(pongBall.style.top)<=0 || parseInt(pongBall.style.top)+pongBallHeight>=window.innerHeight){
            pongBallTop=pongBallTop*(-1);
        }
        if(parseInt(pongBall.style.left) <= (0+racketWidth) && parseInt(pongBall.style.top) >= parseInt(leftRacket.style.top) && parseInt(pongBall.style.top) <= parseInt(leftRacket.style.top)+racketHeight){
            pongBall.style.left=parseInt(pongBall.style.left)+racketWidth+"px";
            pongBallLeft=pongBallLeft*(-1);

        }
        else if(parseInt(pongBall.style.left)+pongBallWidth>window.innerWidth-(racketWidth+1) && parseInt(pongBall.style.top) >= parseInt(rightRacket.style.top) && parseInt(pongBall.style.top) <= parseInt(rightRacket.style.top)+racketHeight){
            pongBall.style.left=parseInt(pongBall.style.left)-racketWidth+"px";
            pongBallLeft=pongBallLeft*(-1);
    
        }
        if(parseInt(pongBall.style.left)<=0){

            rightScore++;
            document.querySelector("#rightScore").innerHTML=rightScore;
            if(rightScore>4){
                alert("Kazanan Sağ Taraf");
                leftScore=0;
                rightScore=0;
                document.querySelector("#rightScore").innerHTML=rightScore;
                document.querySelector("#leftScore").innerHTML=leftScore;
            }
            restartGame();
        }
        if(parseInt(pongBall.style.left)+pongBallWidth>=window.innerWidth)
        {   leftScore++;
            document.querySelector("#leftScore").innerHTML=leftScore;
            if(leftScore>4){
            alert("Kazanan Sol Taraf");
            rightScore=0;
            leftScore=0;
            document.querySelector("#leftScore").innerHTML=leftScore;
            document.querySelector("#rightScore").innerHTML=rightScore;
            }
            restartGame();
        }
}
setInterval(pongBallLoop,gameSpeed);
window.addEventListener("keydown",logKey);
//document.onkeypress=logKey;
function logKey(e){
    switch(e.code){
        case "KeyW":
            console.log("w");
            if(parseInt(leftRacket.style.top)<=0)
            {
                leftRacket.style.top=leftRacket.style.top;
            }
            else{
            leftRacket.style.top=((parseInt(leftRacket.style.top))-pongBallHeight)+"px";
            }
            break;
        case "KeyS":
            console.log("s");
            if((parseInt(leftRacket.style.top))<=((window.innerHeight)-parseInt(racketHeight)))
            {
                leftRacket.style.top=(parseInt(leftRacket.style.top)+pongBallHeight)+"px";
            }
            else{
                leftRacket.style.top=leftRacket.style.top;
            }
            break;
        case "ArrowUp":
            console.log("yukarı ok");
            if(parseInt(rightRacket.style.top)<=0){
                rightRacket.style.top=rightRacket.style.top;
            }
            else{
                rightRacket.style.top=(parseInt(rightRacket.style.top)-pongBallHeight)+"px";
            }
            break;
        case "ArrowDown":
            console.log("Aşağı ok");
            if(parseInt(rightRacket.style.top)>=(window.innerHeight)-parseInt(racketHeight)){

                rightRacket.style.top=rightRacket.style.top;
            }
            else{
                rightRacket.style.top=(parseInt(rightRacket.style.top)+pongBallHeight)+"px";
            }
            break;
        default:
            console.log("Farklı bir tuş");
    }
}
