
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
}

function goBack() {
  document.getElementById("ashleyInfo").style.display="none";
  document.getElementById("timothyInfo").style.display="none";
  document.getElementById("gameStart").style.display="block";
  document.getElementById("authors").style.display="flex";
}
