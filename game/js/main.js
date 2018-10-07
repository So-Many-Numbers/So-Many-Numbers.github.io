const expressions = [];
const solutions = [];
let currentExpression = 0;
let numberProblems = 0;
let intime;
let currentTime;
let bg1 = false;
let bg2 = false;

let saveData = {
  asmdHighScore: null,
  asHighScore: null,
  mdHighScore: null
}

if(typeof(localStorage) !== "undefined") {
  if (localStorage.getItem("soManyNumbersSaveData")) {
    const parsedData = JSON.parse(localStorage.getItem("soManyNumbersSaveData"));
    for (let i = 0; i < Object.keys(parsedData).length; i += 1) {
      if (saveData.hasOwnProperty(Object.getOwnPropertyNames(parsedData)[i])) {
        saveData[Object.keys(saveData)[Object.keys(saveData).indexOf(Object.getOwnPropertyNames(parsedData)[i])]]
        = parsedData[Object.keys(parsedData)[i]];
      }
    }
  }
}

var isNotSafariPrivate = function() {
  var doesItWork = 'test', storage = window.sessionStorage;
  try {
    storage.setItem(doesItWork, '1');
    storage.removeItem(doesItWork);
    return true;
  }
  catch (error) {
    return false;
  }
}

function save() {
  if ( isNotSafariPrivate() ) {
    localStorage.setItem('soManyNumbersSaveData', JSON.stringify(saveData));
  }
}

function generateGame(numberOfProblems) {

  document.getElementById("countdownNumber").innerHTML="3";
  setTimeout(() => { document.getElementById("countdownNumber").innerHTML="2"; }, 1000);
  setTimeout(() => { document.getElementById("countdownNumber").innerHTML="1"; }, 2000);

  setTimeout(() => {
    document.getElementById("countdown").style.display = "none";
    document.getElementById("main-game").style.display = "grid";
    currentTime = 0;
    intime = setInterval(stopwatch,100);
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
  document.getElementById("percentageBar").innerHTML="0% Complete";
}, 3000);
}

document.getElementById("math-answer").addEventListener("keypress", function (e) {
  if (e.key.length === 1 && isNaN(e.key) && !e.ctrlKey || e.keyCode === 32) {
    e.preventDefault();
  }
});

document.getElementById("math-answer").addEventListener("input", checkAnswer);

function checkAnswer() {
  if (Number(document.getElementById("math-answer").value) === solutions[currentExpression]
&& document.getElementById("math-answer").value.length > 0) {
    console.log(document.getElementById("math-answer").value.length);
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
      if(Number(currentTime) < Number(saveData.asmdHighScore) || saveData.asmdHighScore === null) {
        saveData.asmdHighScore=currentTime;
        save();
      }
      document.getElementById("non-math-area").innerHTML=`
        <p class="congrats">Congrats!</p>
        <div class="results">
          <div class="mathMode" id="mathMode2">+ - x ÷</div>
          <div>Your Score: ` + currentTime + ` seconds</div>
          <div>High Score: ` + saveData.asmdHighScore + ` seconds</div>
        </div>
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
      document.getElementById("encouragement").style.display = "none";
      document.getElementById("gameBG").style.backgroundColor="#fafafa";
      document.getElementById("timer-area").style.backgroundColor="#e2e239";
    }

    document.getElementById("active-gauge").style.width = gaugePercent+"%";
    document.getElementById("percentageBar").innerHTML= gaugePercent.toFixed(0)+"%"+ " Complete";
    document.getElementById("score-meter").innerHTML=numberProblems - currentExpression + " left";
    document.getElementById("encouragement").innerHTML="<span id='encouragement-words'>" + (numberProblems - currentExpression) + " left</span>";
    document.getElementById("set3").style.transform="scale(1.05)";
    document.getElementById("math-answer").classList.add("math-box-right");
    setTimeout(() => {
  document.getElementById("set3").style.transform="scale(1)";
document.getElementById("math-answer").classList.remove("math-box-right");}, 100);
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
