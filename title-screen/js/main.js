
// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
  }
}
// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function authorInfo(name) {
  document.getElementById("gameStart").style.display="none";
  document.getElementById("authors").style.display="none";
  if (name==="Ashley") {
    document.getElementById("ashleyInfo").style.display="block";
  }
  if (name==="Timothy") {
    document.getElementById("timothyInfo").style.display="block";
  }
  if (name==="Help") {
    document.getElementById("helpInfo").style.display="block";
  }
}

function goBack() {
  document.getElementById("ashleyInfo").style.display="none";
  document.getElementById("timothyInfo").style.display="none";
  document.getElementById("helpInfo").style.display="none";
  document.getElementById("gameStart").style.display="block";
  document.getElementById("authors").style.display="flex";
}

function toggleCustomize() {
  if (saveData.titleView === 0) {
    document.getElementById("customize").innerHTML="Presets &nbsp;▴";
    document.getElementById("presetOperators").style.display="none";
    document.getElementById("presetOperators").style.opacity=0;
    document.getElementById("customizeOperators").style.display="block";
    document.getElementById("customizeGoButton").style.display="block";
    setTimeout(function(){
      document.getElementById("customizeOperators").style.opacity=1;
      document.getElementById("customizeGoButton").style.opacity=1;
     }, 16);
    saveData.titleView = 1;
    save();
  } else {
    document.getElementById("customize").innerHTML="Customize &nbsp;▾";
    document.getElementById("presetOperators").style.display="block";
    document.getElementById("customizeOperators").style.display="none";
    document.getElementById("customizeOperators").style.opacity=0;
    document.getElementById("customizeGoButton").style.display="none";
    document.getElementById("customizeGoButton").style.opacity=0;
    setTimeout(function(){
      document.getElementById("presetOperators").style.opacity=1;
     }, 16);
    saveData.titleView = 0;
    save();
  }
}

function renderTitle() {
  document.getElementById("gameStart").style.opacity=1;

  if (saveData.titleView === 1) {
    document.getElementById("customize").innerHTML="Presets &nbsp;▴";
    document.getElementById("presetOperators").style.display="none";
    document.getElementById("presetOperators").style.opacity=0;
    document.getElementById("customizeOperators").style.display="block";
    document.getElementById("customizeGoButton").style.display="block";
    document.getElementById("customizeOperators").style.opacity=1;
    document.getElementById("customizeGoButton").style.opacity=1;
  }

  for (let i = 0; i < saveData.savedOperators.length; i+=1) {
    document.getElementById("smallCircle"+saveData.savedOperators.charAt(i)).classList.add("smallCircleActivated");
  }
  if (saveData.savedOperators.length > 0) {
    document.getElementById("customizeStart").classList.remove("buttonDisabled");
  }

}

function loadGame(operators) {
  window.location.href = "/game?level="+operators;
}

function changeCustomizeOperator(buttonPressed) {
  if (document.getElementById(buttonPressed).classList.contains("smallCircleActivated")) {
    document.getElementById(buttonPressed).classList.remove("smallCircleActivated")
  } else {
    document.getElementById(buttonPressed).classList.add("smallCircleActivated");
  }
  // Check which operators are activated to change Start button status
  const elements = ["smallCirclea", "smallCircles", "smallCirclem", "smallCircled"];
  let operatorsActivated = "";
  for (let i = 0; i < elements.length; i+=1) {
    if (document.getElementById(elements[i]).classList.contains("smallCircleActivated")) {
      operatorsActivated += elements[i].slice(-1);
    }
  }
  if (operatorsActivated.length > 0) {
    document.getElementById("customizeStart").classList.remove("buttonDisabled");
  } else {
    document.getElementById("customizeStart").classList.add("buttonDisabled");
  }
  saveData.savedOperators = operatorsActivated;
  save();
}

function loadGameFromCustomize() {
  if (saveData.savedOperators === "") {
    alert("Select the operator(s) you want to use. Then press Start.")
  } else {
    loadGame(saveData.savedOperators);
  }
}