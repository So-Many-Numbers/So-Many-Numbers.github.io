const expressions = [];
const solutions = [];
const modeArray = [];
let currentExpression = 0;
let numberProblems = 0;
let intime;
let currentTime;
let bg1 = false;
let bg2 = false;

let saveData = {
  modes: {}
}

if(supportsLocalStorage) {
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

function save() {
  if (supportsLocalStorage) {
    localStorage.setItem('soManyNumbersSaveData', JSON.stringify(saveData));
  }
}

function generateGame(numberOfProblems) {

    let mathModeDisplay = "";

    const urlParams = new URLSearchParams(window.location.search);
    const modeParam = urlParams.get('mode');
    if (!modeParam || !modeParam.includes("a") && !modeParam.includes("s")
      && !modeParam.includes("m") && !modeParam.includes("d")) {
      modeArray.push("a", "s", "m", "d");
      mathModeDisplay += "+-x÷";
    } else {
      if (modeParam.includes("a")) {
        modeArray.push("a");
        mathModeDisplay += "+";
      }
      if (modeParam.includes("s")) {
        modeArray.push("s");
        mathModeDisplay += "-";
      }
      if (modeParam.includes("m")) {
        modeArray.push("m");
        mathModeDisplay += "x";
      }
      if (modeParam.includes("d")) {
        modeArray.push("d");
        mathModeDisplay += "÷";
      }
    }
    document.getElementsByClassName("mathMode")[0].innerHTML=mathModeDisplay;
    document.getElementsByClassName("mathMode")[1].innerHTML=mathModeDisplay;

    for (let i = 0; i < numberOfProblems; i+=1) {
      let operatorRand = modeArray[Math.floor(Math.random() * modeArray.length)];
      let operator;
      let firstNumber;
      let secondNumber;
      let solution;

      if (operatorRand === "a") {
        firstNumber = Math.floor((Math.random() * 20) + 1);
        secondNumber = Math.floor((Math.random() * 20) + 1);
        solution = firstNumber + secondNumber;
        expressions.push(firstNumber + " + " + secondNumber + " =");
        solutions.push(solution);
      }

      else if (operatorRand === "s") {
        firstNumber = Math.floor((Math.random() * 30) + 1);
        secondNumber = Math.floor((Math.random() * 30) + 1);
        if (firstNumber - secondNumber < 0) {
          solution = secondNumber - firstNumber;
          expressions.push(secondNumber + " - " + firstNumber + " =");
        } else {
          solution = firstNumber - secondNumber;
          expressions.push(firstNumber + " - " + secondNumber + " =");
        }
        solutions.push(solution);
      }

    else if (operatorRand === "m") {
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
      while (firstNumber % secondNumber !== 0) {
        secondNumber = numberOne;
      }
      solution = firstNumber / secondNumber;
      expressions.push(firstNumber + " ÷ " + secondNumber + " =");
      solutions.push(solution);
    }

  }


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

  displayProblems();
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

    currentExpression += 1;

    if (currentExpression !== numberProblems) {
      displayProblems();
    }

    else {
      clearInterval(intime);
      document.getElementById("math-problems").style.display = "none";
      document.getElementById("non-math-area").style.display = "block";
      const modeString = modeArray.join('');
      if (saveData.modes.hasOwnProperty(modeString)) {
        saveData.modes[modeString]["timesFinished"] += 1;
        if (Number(currentTime) < saveData.modes[modeString].highScore) {
          document.getElementById("timer-area").style.backgroundColor="#e2e239";
          saveData.modes[modeString].highScore = Number(currentTime);
        } else {
          document.getElementById("timer-area").style.backgroundColor="#c0c0c0";
        }
        save();
      } else {
        document.getElementById("timer-area").style.backgroundColor="#e2e239";
        saveData.modes[modeString] = {};
        saveData.modes[modeString]["highScore"] = Number(currentTime);
        saveData.modes[modeString]["timesFinished"] = 1;
        save();
      }
      document.getElementById("results").innerHTML=`
          <div>Your Score: ` + currentTime + ` seconds</div>
          <div>High Score: ` + saveData.modes[modeString].highScore.toFixed(1) + ` seconds</div>
      `;
      setTimeout(() => { document.getElementById("buttonsDiv").style.opacity=1; }, 100);
    }

    document.getElementById("math-answer").value = "";

    let gaugePercent = (currentExpression / numberProblems)*100;

    if (gaugePercent >= 33 && gaugePercent<66) {
      if (bg1===false) {
        bg1 = true;
        document.getElementById("gameBG").style.backgroundColor="#c9ead0";
        document.getElementById("encouragement").classList.add("notransition");
        document.getElementById("encouragement").innerHTML="<span id='encouragement-words'>" + (numberProblems - currentExpression) + " left - " + currentTime + " s</span>";
        document.getElementById("encouragement").style.opacity = 1;
        setTimeout(() => {
          document.getElementById("encouragement").classList.remove("notransition");
          document.getElementById("encouragement").style.opacity = 0;
        }, 750);
      }
    }

    if (gaugePercent >= 66&& gaugePercent<90) {
      if (bg2===false) {
        bg2 = true;
        document.getElementById("gameBG").style.backgroundColor="#e0e8b6";
        document.getElementById("encouragement").classList.add("notransition");
        document.getElementById("encouragement").innerHTML="<span id='encouragement-words'>" + (numberProblems - currentExpression) + " left - " + currentTime + " s</span>";
        document.getElementById("encouragement").style.opacity = 1;
        setTimeout(() => {
          document.getElementById("encouragement").classList.remove("notransition");
          document.getElementById("encouragement").style.opacity = 0;
        }, 750);
      }
    }

    if (gaugePercent >= 90&& gaugePercent<100) {
      document.getElementById("encouragement").classList.add("notransition");
      document.getElementById("gameBG").style.backgroundColor="#e6c695";
      document.getElementById("encouragement").innerHTML="<span id='encouragement-words'>" + (numberProblems - currentExpression) + " left";
      document.getElementById("encouragement").style.opacity = 1;
    }

    if (gaugePercent >= 100) {
      document.getElementById("encouragement").style.opacity = 0;
      document.getElementById("encouragement").style.display = "none";
      document.getElementById("gameBG").style.backgroundColor="#fafafa";
    }

    document.getElementById("active-gauge").style.width = gaugePercent+"%";
    document.getElementById("percentageBar").innerHTML= gaugePercent.toFixed(0)+"%"+ " Complete";
    document.getElementById("score-meter").innerHTML=numberProblems - currentExpression + " left";
    document.getElementById("set3").style.transform="scale(1.05)";
    document.getElementById("math-answer").classList.add("math-box-right");
    setTimeout(() => {
      document.getElementById("set3").style.transform="scale(1)";
      document.getElementById("math-answer").classList.remove("math-box-right");
    }, 100);

  }
}

function displayProblems() {
  document.getElementById("row1").innerHTML=expressions[currentExpression-2];
  document.getElementById("solution1").innerHTML=solutions[currentExpression-2];
  document.getElementById("row2").innerHTML=expressions[currentExpression-1];
  document.getElementById("solution2").innerHTML=solutions[currentExpression-1];
  document.getElementById("row3").innerHTML=expressions[currentExpression];
  document.getElementById("row4").innerHTML=expressions[currentExpression + 1];
  document.getElementById("row5").innerHTML=expressions[currentExpression + 2];

  if (expressions[currentExpression-2] === undefined) {
    document.getElementById("row1").innerHTML="";
    document.getElementById("solution1").innerHTML="";
  }

  if (expressions[currentExpression-1] === undefined) {
    document.getElementById("row2").innerHTML="";
    document.getElementById("solution2").innerHTML="";
  }

  if (expressions[currentExpression+1] === undefined) {
    document.getElementById("row4").innerHTML="";
  }

  if (expressions[currentExpression+2] === undefined) {
    document.getElementById("row5").innerHTML="";
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
