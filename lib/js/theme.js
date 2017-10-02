var htmlElem = document.querySelector('html');
var pElem = document.querySelector('p');

var bgcolorForm = document.getElementById('bgcolor');
var fontForm = document.getElementById('font');

if(!localStorage.getItem('bgcolor')) {
  populateStorage();
} else {
  setStyles();
}

function populateStorage() {
  localStorage.setItem('bgcolor', document.getElementById('bgcolor').value);
  localStorage.setItem('font', document.getElementById('font').value);

  setStyles();
}

function setStyles() {
  var currentColor = localStorage.getItem('bgcolor');
  var currentFont = localStorage.getItem('font');

  document.getElementById('bgcolor').value = currentColor;
  document.getElementById('font').value = currentFont;

  htmlElem.style.backgroundColor = '#' + currentColor;
  pElem.style.fontFamily = currentFont;
}

bgcolorForm.onchange = populateStorage;
fontForm.onchange = populateStorage;
