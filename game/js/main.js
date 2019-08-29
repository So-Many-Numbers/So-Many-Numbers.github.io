// Variables that will be used across multiple functions
const ruleset = [];
const expressions = [];
const solutions = [];
const levelArray = [];
let currentExpression = 0;
let numberProblems = 0;
let intime;
let currentTime;
let bg1 = false;
let bg2 = false;

function generateGame(numberOfProblems) {
    // Grab the URL parameters that specify difficulty and level
    const urlParams = new URLSearchParams(window.location.search);
    const diffParam = urlParams.get('diff');
    const levelParam = urlParams.get('level');

    /*
    Define how math problems are generated based on difficulty.
    Simple ruleset
      Add: Answer no greater than 20
      Sub: Subtract from no more than 15
      Mult/Div: 10-times tables
    Standard ruleset
      Add: Answer no greater than 40
      Sub: Subtract from no more than 30
      Mult/Div: 12-times tables
    */
    if (diffParam === "simple") {
      ruleset.push(10,15,10);
    } else {
      ruleset.push(20,30,12);
    }

    /*
    Determine which operators to use based on chosen level.
    mathLevelDisplay will display the chosen operators to the player.
    */
    let mathLevelDisplay = "";
    if (!levelParam || !levelParam.includes("a") && !levelParam.includes("s")
      && !levelParam.includes("m") && !levelParam.includes("d")) {
      levelArray.push("a", "s", "m", "d");
      mathLevelDisplay += "+-x÷";
    } else {
      if (levelParam.includes("a")) {
        levelArray.push("a");
        mathLevelDisplay += "+";
      }
      if (levelParam.includes("s")) {
        levelArray.push("s");
        mathLevelDisplay += "-";
      }
      if (levelParam.includes("m")) {
        levelArray.push("m");
        mathLevelDisplay += "x";
      }
      if (levelParam.includes("d")) {
        levelArray.push("d");
        mathLevelDisplay += "÷";
      }
    }
    document.getElementsByClassName("mathLevel")[0].innerHTML=mathLevelDisplay;
    document.getElementsByClassName("mathLevel")[1].innerHTML=mathLevelDisplay;

    // Now that difficulty and level are defined, generate math problems
    for (let i = 0; i < numberOfProblems; i+=1) {
      let operatorRand = levelArray[Math.floor(Math.random() * levelArray.length)];
      let firstNumber;
      let secondNumber;
      let solution;
      if (operatorRand === "a") {
        firstNumber = Math.floor((Math.random() * ruleset[0]) + 1);
        secondNumber = Math.floor((Math.random() * ruleset[0]) + 1);
        solution = firstNumber + secondNumber;
        expressions.push(firstNumber + " + " + secondNumber + " =");
        solutions.push(solution);
      }
      else if (operatorRand === "s") {
        firstNumber = Math.floor((Math.random() * ruleset[1]) + 1);
        secondNumber = Math.floor((Math.random() * ruleset[1]) + 1);
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
        firstNumber = Math.floor((Math.random() * ruleset[2]) + 1);
        secondNumber = Math.floor((Math.random() * ruleset[2]) + 1);
        solution = firstNumber * secondNumber;
        expressions.push(firstNumber + " x " + secondNumber + " =");
        solutions.push(solution);
      }
      else {
        let numberOne = Math.floor((Math.random() * ruleset[2]) + 1);
        let numberTwo = Math.floor((Math.random() * ruleset[2]) + 1);
        firstNumber = numberOne * numberTwo;
        while (firstNumber % secondNumber !== 0) {
          secondNumber = numberOne;
        }
        solution = firstNumber / secondNumber;
        expressions.push(firstNumber + " ÷ " + secondNumber + " =");
        solutions.push(solution);
      }
    }

  // Display a 3-second countdown
  document.getElementById("countdown").style.opacity=1;
  document.getElementById("countdownNumber").innerHTML="3";
  setTimeout(() => { document.getElementById("countdownNumber").innerHTML="2"; }, 1000);
  setTimeout(() => { document.getElementById("countdownNumber").innerHTML="1"; }, 2000);

  
  // After 3 seconds, reveal the problems and start the timer
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

// This event listener addresses a Firefox bug, but a year later, I forgot what that bug was
document.getElementById("math-answer").addEventListener("keypress", function (e) {
  if (e.key.length === 1 && isNaN(e.key) && !e.ctrlKey || e.keyCode === 32) {
    e.preventDefault();
  }
});

// This event listener runs the checkAnswer function every time the player types something in the answer box
document.getElementById("math-answer").addEventListener("input", checkAnswer);

function checkAnswer() {
  if (Number(document.getElementById("math-answer").value) === solutions[currentExpression]
      && document.getElementById("math-answer").value.length > 0) { // If the problem is correct and input box is not blank

    currentExpression += 1; // Bump up to next problem

    // If the problem solved is not the last one, refresh the displayed problems
    if (currentExpression !== numberProblems) {
      displayProblems();
    }
    // If the problem solved is the last one
    else {
      clearInterval(intime); // Stop the timer
      // Switch to the Congrats view (non-math-area)
      document.getElementById("math-problems").style.display = "none";
      document.getElementById("non-math-area").style.display = "block";

      let levelString = levelArray.join(''); // Convert level to string for localStorage parsing
      let diffString; // Convert difficulty to string for localStorage parsing
      if (ruleset === [10,15,10]) {
        diffString = "simple";
      } else {
        diffString = "standard";
      }

      if (saveData.levels.hasOwnProperty(levelString)) { // If the player has played the level before
        if (saveData.levels[levelString].hasOwnProperty(diffString)) { // If the player has played the diff/level combination before
          saveData.levels[levelString][diffString]["timesFinished"] += 1; // Increment times finished for played diff/level by 1
          if (Number(currentTime) < saveData.levels[levelString][diffString].highScore) { // If it's a new high score
            document.getElementById("timer-area").style.backgroundColor="#e2e239"; // Make the timer area gold
            saveData.levels[levelString][diffString].highScore = Number(currentTime); // Save the new high score
          } else {
            document.getElementById("timer-area").style.backgroundColor="#c0c0c0"; // If it's not a high score, make timer area gray
          }
          save(); // Save new data to localStorage
        } else { // If the player played the level, but at a new difficulty
          document.getElementById("timer-area").style.backgroundColor="#e2e239";
          saveData.levels[levelString][diffString] = {}; // Allocate save info in localStorage array
          saveData.levels[levelString][diffString]["highScore"] = Number(currentTime);
          saveData.levels[levelString][diffString]["timesFinished"] = 1;
          save();
        }
      } else { // If the player never played the level before
        document.getElementById("timer-area").style.backgroundColor="#e2e239";
        saveData.levels[levelString] = {};
        saveData.levels[levelString][diffString] = {};
        saveData.levels[levelString][diffString]["highScore"] = Number(currentTime);
        saveData.levels[levelString][diffString]["timesFinished"] = 1;
        save();
      }
      // Display current game score and the high score for given diff/level
      document.getElementById("results").innerHTML=`
          <div>Your Score: ` + currentTime + ` seconds</div>
          <div>High Score: ` + saveData.levels[levelString][diffString].highScore.toFixed(1) + ` seconds</div>
      `;
      // Fade in the play again/change level buttons
      setTimeout(() => { document.getElementById("buttonsDiv").style.opacity=1; }, 100);
    }

    // Clear out the answer box
    document.getElementById("math-answer").value = "";
    // Raise the gauge percentage
    let gaugePercent = (currentExpression / numberProblems)*100;
    /*
      When the game is a third of the way through, change the background color and notify the player how many problems are left.
      Also display the current elapsed time.
      TODO: Save these time splits
    */
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
    // Do the same thing for two-thirds, with a different background color
    else if (gaugePercent >= 66&& gaugePercent<90) {
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
    // At more than 90% of the way through, permanently notify the player how many problems are left
    else if (gaugePercent >= 90&& gaugePercent<100) {
      document.getElementById("encouragement").classList.add("notransition");
      document.getElementById("gameBG").style.backgroundColor="#e6c695";
      document.getElementById("encouragement").innerHTML="<span id='encouragement-words'>" + (numberProblems - currentExpression) + " left";
      document.getElementById("encouragement").style.opacity = 1;
    }
    // At 100%, clear the notification and restore the background color
    else if (gaugePercent >= 100) {
      document.getElementById("encouragement").style.opacity = 0;
      document.getElementById("encouragement").style.display = "none";
      document.getElementById("gameBG").style.backgroundColor="#fafafa";
    }
    // Increase the gauge percentage bar
    document.getElementById("active-gauge").style.width = gaugePercent+"%";
    document.getElementById("percentageBar").innerHTML= gaugePercent.toFixed(0)+"%"+ " Complete";
    // Update number of problems left
    document.getElementById("score-meter").innerHTML=numberProblems - currentExpression + " left";
    // Perform a pulse animation when the next problem appears
    // The classlist toggle is to get the answer box to temporarily appear green
    document.getElementById("set3").style.transform="scale(1.05)";
    document.getElementById("math-answer").classList.add("math-box-right");
    setTimeout(() => {
      document.getElementById("set3").style.transform="scale(1)";
      document.getElementById("math-answer").classList.remove("math-box-right");
    }, 100);

  }
}

// Function that controls how the problems are displayed to the player
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

// Stopwatch functions
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

// Reloads the game to play again on same diff/level
function playitagain() {
  location.reload();
}
