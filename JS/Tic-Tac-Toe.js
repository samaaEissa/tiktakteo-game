// game initialization values
let X_IMAGE_URL = 'img/x.png';
let O_IMAGE_URL = 'img/circle.png';
let freeBoxes = [];
let takenBoxes ={};
let width=3;
let i=width;
let currentcolor='lightblue';

// load game with defual width =3
window.addEventListener('load', function() {    
  document.documentElement.style.setProperty('--square-size', (450/width)-5);
  initializeGame(width);
})
// change the game size with the selcted one
$("#size-selection").change(function(){
  var selectedChoice = $(this).children("option:selected").val();
  width=parseInt(selectedChoice)
  initializeGame(width);
});
// initialize new game with the same size
$('#NewGame').click(function(){
  initializeGame(width);      
});
// initialize Game
function initializeGame( width){
  let result= document.querySelector('#results');
  result.innerHTML='';
  freeBoxes = [];
  takenBoxes ={};
  let image= document.getElementById('result-img');
    image.src='img/congratulations.png';
    let massage=document.getElementById('modal-massage');
    massage.innerText='Congratulations you win'
  var boxesCount=Math.pow(width,2)  
  document.documentElement.style.setProperty('--square-size', (450/width)-3);  
  createBoxes(boxesCount);
    var boxes = document.querySelectorAll('#grid div');
    for (const box of boxes) {
      box.addEventListener('click', changeToX);
      freeBoxes.push(box);
    }
    changeBodyBg(currentcolor)
}
// create Boxes
function createBoxes(boxesCount)
{ const container= document.querySelector('#grid');
   container.innerHTML="";
   for(i=0;i<boxesCount;i++)
   {  const box=document.createElement('div')
       box.dataset.index = i;
       container.appendChild(box)
   }
}
// change the color of x
$("#Xcolor").change(function(){
  X_IMAGE_URL = $("#Xcolor").children("option:selected").val();
});
//change the color of o
$("#Ocolor").change(function(){
  O_IMAGE_URL= $("#Ocolor").children("option:selected").val();
});

function assignSpace(space, owner) {
  const image = document.createElement('img');
  image.src = owner === 'x' ? X_IMAGE_URL : O_IMAGE_URL;
  space.appendChild(image);

  const index = parseInt(space.dataset.index);
  takenBoxes[index] = owner;
  const indexToRemove = freeBoxes.indexOf(space);
  freeBoxes.splice(indexToRemove, 1);
  space.removeEventListener('click', changeToX);
}

function changeToX(event) {
  assignSpace(event.currentTarget, 'x');

  if (isGameOver()) {
    displayWinner();
  } else {
    computerChooseO();
  }
}

function computerChooseO() {
  const allBoxes  = document.querySelectorAll('#grid div');
  const index = Math.floor(Math.random() * freeBoxes.length);
  const freeSpace = freeBoxes[index];
  assignSpace(freeSpace, 'o');
  if (isGameOver()) {
    displayWinner();
  }
}

function isGameOver() {
  return freeBoxes.length === 0 || getWinner() !== null;
}

function displayWinner() {
  const winner = getWinner();
  const resultContainer = document.querySelector('#results');
  const header = document.createElement('h1');
  if (winner === 'x') {
    header.textContent = 'You win!';
    let image= document.getElementById('result-img');
    image.src='img/congratulations.png';
    let massage=document.getElementById('modal-massage');
    massage.innerText='Congratulations you win'
    $('#myModal').modal('show');
  } else if (winner === 'o') {
    header.textContent = 'Computer wins';
    let image= document.getElementById('result-img');
    image.src='img/sad-face.png';
    let massage=document.getElementById('modal-massage');
    massage.innerText='sorry, Computer wins'
    $('#myModal').modal('show');
  } else 
  {
    header.textContent = 'Tie';
    let image= document.getElementById('result-img');
    image.src='img/tie.jpg';
    let massage=document.getElementById('modal-massage');
    massage.innerText='it is a tie, it was a fair game'
    $('#myModal').modal('show');
  }
  resultContainer.appendChild(header);
  // Remove remaining event listeners
  for (const box of freeBoxes) {
    box.removeEventListener('click', changeToX);
  }
}


function checkBoxes(list) {
  if(takenBoxes[list[0]] == undefined) 
        {return null
        }
    for (let k = 0; k < list.length-1; k++) {        
          if (takenBoxes[list[k]]!== takenBoxes[list[k+1]]) {
          return null;
        }
    }
   return takenBoxes[list[0]]; 
}

// Returns 'x', 'o', or null for no winner yet.
function getWinner() {
 for(let j=0;j<i;j++){
 let row=[]
 let column=[]
 for (let col=0; col<width;col++){
   row.push(col+(width*j));
   column.push(col*width +j);
 }let result = checkBoxes(row) ||
 checkBoxes(column);
row=[]    
column=[]
if (result!=null) {
return result;
}}    
// Check diagonals
  MainDiaag=[]
  SecDiag=[]
  s=0;
for( let d=0;d<width;d++){
  MainDiaag.push((d*width) +d);
  s=s+(width-1);
  SecDiag.push(s);
}
return checkBoxes(MainDiaag) || checkBoxes(SecDiag);
}


// Function to change heading background color
function changeBodyBg(color){
  currentcolor=color
  document.body.style.background = currentcolor;
  changeHeadingBg(currentcolor)
}
// Function to change heading background color
function changeHeadingBg(currentcolor){
  //document.getElementById("heading").style.background = color;
  var boxes = document.querySelectorAll('#grid div');   
    for (const box of boxes) {
      $(box).css("background-color",currentcolor);
    }  
}
function pictureChange()
{
document.getElementById("Image").src="p.png";
}
