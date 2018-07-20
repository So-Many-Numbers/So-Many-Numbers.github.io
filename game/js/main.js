let expressions = [];
let solutions = [];
let currentExpression = 0;
let numberProblems = 0;
let intime;
let currentTime;
let bg1 = false;
let bg2 = false;


function generateGame(numberOfProblems) {

  document.getElementById("non-math-area").innerHTML=`<p style="font-size:40px;">3</p>`;
  setTimeout(function(){ document.getElementById("non-math-area").innerHTML=`<p style="font-size:40px;">2</p>`; }, 1000);
  setTimeout(function(){ document.getElementById("non-math-area").innerHTML=`<p style="font-size:40px;">1</p>`; }, 2000);

setTimeout(function(){
document.getElementById("non-math-area").style.display = "none";
  document.getElementById("math-problems").style.display = "block";
  currentTime = 0;
  intime=setInterval(stopwatch,100);
  offset = Date.now();
  document.getElementById("math-answer").focus();
  numberProblems = numberOfProblems;

    document.getElementById("score-meter").innerHTML=numberProblems + " left";

  for (var i = 0; i < numberOfProblems; i++) {
    let operatorRand = Math.floor(Math.random() * 4);
    let operator;
    let firstNumber;
    let secondNumber;
    let solution;

    if (operatorRand == 0) {
      firstNumber = Math.floor((Math.random() * 20) + 1);
      secondNumber = Math.floor((Math.random() * 20) + 1);
      solution = firstNumber + secondNumber;
      expressions.push(firstNumber + " + " + secondNumber + " =");
      solutions.push(solution);
    }

    else if (operatorRand == 1) {
      firstNumber = Math.floor((Math.random() * 30) + 1);
      secondNumber = 30;
      while (firstNumber - secondNumber < 0) {
        secondNumber = Math.floor((Math.random() * 30) + 1);
      }
      solution = firstNumber - secondNumber;
      expressions.push(firstNumber + " - " + secondNumber + " =");
      solutions.push(solution);
    }

    else if (operatorRand == 2) {
      firstNumber = Math.floor((Math.random() * 12) + 1);
      secondNumber = Math.floor((Math.random() * 12) + 1);
      solution = firstNumber * secondNumber;
      expressions.push(firstNumber + " x " + secondNumber + " =");
      solutions.push(solution);
    }

    else {
      let numberOne = Math.floor((Math.random() * 12) + 1);
      let numberTwo = Math.floor((Math.random() * 12) + 1);
      firstNumber = numberOne * numberTwo;
      while (firstNumber % secondNumber != 0) {
        secondNumber = numberOne;
      }
      solution = firstNumber / secondNumber;
      expressions.push(firstNumber + " ÷ " + secondNumber + " =");
      solutions.push(solution);
    }

  }



  document.getElementById("row3").innerHTML=expressions[currentExpression];
  document.getElementById("row4").innerHTML=expressions[currentExpression + 1];
  document.getElementById("row5").innerHTML=expressions[currentExpression + 2];
  document.getElementById("percentageBar").innerHTML="0% Complete"
  document.getElementById("home-area").innerHTML=`<a title="Back to title" onclick="location.href='../index.html'">⌂</a>`;
}, 3000);
}

document.getElementById("math-answer").addEventListener("input", checkAnswer);

function checkAnswer() {
  if (document.getElementById("math-answer").value == solutions[currentExpression]) {
    currentExpression += 1;

    if (currentExpression == 1) {
      document.getElementById("row2").innerHTML=expressions[currentExpression-1];
      document.getElementById("solution2").innerHTML=solutions[currentExpression-1];
      document.getElementById("row3").innerHTML=expressions[currentExpression];
      document.getElementById("row4").innerHTML=expressions[currentExpression + 1];
      document.getElementById("row5").innerHTML=expressions[currentExpression + 2];
      document.getElementById("math-answer").value = "";
    }

    else if (numberProblems - currentExpression == 2) {
      document.getElementById("row1").innerHTML=expressions[currentExpression-2];
      document.getElementById("solution1").innerHTML=solutions[currentExpression-2];
      document.getElementById("row2").innerHTML=expressions[currentExpression-1];
      document.getElementById("solution2").innerHTML=solutions[currentExpression-1];
      document.getElementById("row3").innerHTML=expressions[currentExpression];
      document.getElementById("row4").innerHTML=expressions[currentExpression + 1];
      document.getElementById("row5").innerHTML="&nbsp;"
      document.getElementById("math-answer").value = "";
    }

    else if (numberProblems - currentExpression == 1) {
      document.getElementById("row1").innerHTML=expressions[currentExpression-2];
      document.getElementById("solution1").innerHTML=solutions[currentExpression-2];
      document.getElementById("row2").innerHTML=expressions[currentExpression-1];
      document.getElementById("solution2").innerHTML=solutions[currentExpression-1];
      document.getElementById("row3").innerHTML=expressions[currentExpression];
      document.getElementById("row4").innerHTML="&nbsp;";
      document.getElementById("math-answer").value = "";
    }
    else if (numberProblems == currentExpression) {
      clearInterval(intime);
      document.getElementById("math-problems").style.display = "none";
      document.getElementById("non-math-area").style.display = "block";
      document.getElementById("non-math-area").innerHTML=`
        <p style="font-size:45px;">Congrats!</p>
        <p><button class="button-again" onclick="playitagain()">Play Again</button></p>
        <p><button class="button-again" onclick="location.href='../index.html'">Back to Title</button></p>
      `;
    }
    else {
      document.getElementById("row1").innerHTML=expressions[currentExpression-2];
      document.getElementById("solution1").innerHTML=solutions[currentExpression-2];
      document.getElementById("row2").innerHTML=expressions[currentExpression-1];
      document.getElementById("solution2").innerHTML=solutions[currentExpression-1];
      document.getElementById("row3").innerHTML=expressions[currentExpression];
      document.getElementById("row4").innerHTML=expressions[currentExpression + 1];
      document.getElementById("row5").innerHTML=expressions[currentExpression + 2];
      document.getElementById("math-answer").value = "";
    }

    let gaugePercent = (currentExpression / numberProblems)*100;

    if (gaugePercent >= 33 && gaugePercent<66) {
      if (bg1==false) {
      bg1 = true;
      document.getElementById("gameBG").style.backgroundColor="#c9ead0";
      document.getElementById("encouragement").style.opacity = 1;
      setTimeout(function(){document.getElementById("encouragement").style.opacity = 0;}, 750);
      }
    }

    if (gaugePercent >= 66&& gaugePercent<90) {
      if (bg2==false) {
        bg2 = true;
      document.getElementById("gameBG").style.backgroundColor="#e0e8b6";
      document.getElementById("encouragement").style.opacity = 1;
      setTimeout(function(){document.getElementById("encouragement").style.opacity = 0;}, 750);
          }
    }

    if (gaugePercent >= 90&& gaugePercent<100) {
      document.getElementById("gameBG").style.backgroundColor="#e6c695";
      document.getElementById("encouragement").style.opacity = 1;
    }

    if (gaugePercent >= 100) {
      document.getElementById("encouragement").style.opacity = 0;
      document.getElementById("gameBG").style.backgroundColor="#fafafa";
      document.getElementById("timer-area").style.backgroundColor="#e2e239";
    }

    document.getElementById("active-gauge").style.width = gaugePercent+"%";
    document.getElementById("percentageBar").innerHTML= gaugePercent.toFixed(0)+"%"+ " Complete";
    document.getElementById("score-meter").innerHTML=numberProblems - currentExpression + " left";
    document.getElementById("encouragement").innerHTML="<span id='encouragement-words'>" + (numberProblems - currentExpression) + " left</span>";
    document.getElementById("score-meter").style.transform="scale(1.1)";
    document.getElementById("set3").style.transform="scale(1.05)";
    setTimeout(function(){ document.getElementById("score-meter").style.transform="scale(1)";
  document.getElementById("set3").style.transform="scale(1)";}, 100);
  }
}

function stopwatch() {
currentTime = (currentTime*1+(stopwatch2()/1000)).toFixed(1);
document.getElementById("timer-area").innerHTML=currentTime + " s";
}

function stopwatch2() {
var now = Date.now(),
d = now - offset;
offset = now;
return d;
}


function playitagain() {
  location.reload();
}

document.querySelector("input").addEventListener("keypress", function (e) {
  if (
    e.key.length === 1 && isNaN(e.key) && !e.ctrlKey) {
    e.preventDefault();
  }
});
