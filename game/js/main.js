let expressions = [];
let solutions = [];
let currentExpression = 0;
let numberProblems = 0;

function generateGame(numberOfProblems) {
  document.getElementById("math-answer").focus();
  numberProblems = numberOfProblems;
  for (var i = 0; i < numberOfProblems; i++) {
    let operatorRand = Math.floor(Math.random() * 4);
    let operator;
    let firstNumber;
    let secondNumber;
    let solution;

    if (operatorRand == 0) {
      firstNumber = Math.floor(Math.random() * 21);
      secondNumber = Math.floor(Math.random() * 21);
      solution = firstNumber + secondNumber;
      expressions.push(firstNumber + " + " + secondNumber + " =");
      solutions.push(solution);
    }

    else if (operatorRand == 1) {
      firstNumber = Math.floor(Math.random() * 31);
      secondNumber = 30;
      while (firstNumber - secondNumber < 0) {
        secondNumber = Math.floor(Math.random() * 21);
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
  console.log(expressions);
  console.log(solutions);



  document.getElementById("row3").innerHTML=expressions[currentExpression];
  document.getElementById("row4").innerHTML=expressions[currentExpression + 1];
  document.getElementById("row5").innerHTML=expressions[currentExpression + 2];

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
    }

    else if (numberProblems - currentExpression == 2) {
      document.getElementById("row1").innerHTML=expressions[currentExpression-2];
      document.getElementById("solution1").innerHTML=solutions[currentExpression-2];
      document.getElementById("row2").innerHTML=expressions[currentExpression-1];
      document.getElementById("solution2").innerHTML=solutions[currentExpression-1];
      document.getElementById("row3").innerHTML=expressions[currentExpression];
      document.getElementById("row4").innerHTML=expressions[currentExpression + 1];
      document.getElementById("row5").innerHTML="&nbsp;"
    }

    else if (numberProblems - currentExpression == 1) {
      document.getElementById("row1").innerHTML=expressions[currentExpression-2];
      document.getElementById("solution1").innerHTML=solutions[currentExpression-2];
      document.getElementById("row2").innerHTML=expressions[currentExpression-1];
      document.getElementById("solution2").innerHTML=solutions[currentExpression-1];
      document.getElementById("row3").innerHTML=expressions[currentExpression];
      document.getElementById("row4").innerHTML="&nbsp;";
    }
    else if (numberProblems == currentExpression) {
      document.getElementById("problem-area").innerHTML="<p>Yay!</p>"
    }
    else {
      document.getElementById("row1").innerHTML=expressions[currentExpression-2];
      document.getElementById("solution1").innerHTML=solutions[currentExpression-2];
      document.getElementById("row2").innerHTML=expressions[currentExpression-1];
      document.getElementById("solution2").innerHTML=solutions[currentExpression-1];
      document.getElementById("row3").innerHTML=expressions[currentExpression];
      document.getElementById("row4").innerHTML=expressions[currentExpression + 1];
      document.getElementById("row5").innerHTML=expressions[currentExpression + 2];
    }

    document.getElementById("math-answer").value = "";
  }
}
