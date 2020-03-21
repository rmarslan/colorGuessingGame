var colors = [],
colorToMatch,
isGameOver = false,
score = 0,
colorNum = 6;
colorsGridParent = document.getElementById('colors-grid-parrent');
appInit();

function appInit(){
  isGameOver = false;
  score = 0;
  main();
}

function main(){
  if(!isGameOver){
    colors = [];
    generteColors(colorNum);
    updateColorUi();
  }
}


//Generate Random Colors
function generteColors(num){
  var num1, num2, num3, color;
  for(var i = 0; i < num ; i++){
    num1 = Math.floor(Math.random() * 256);
    num2 = Math.floor(Math.random() * 256);
    num3 = Math.floor(Math.random() * 256);
    color = {
      id : i,
      colorCode: [num1, num2, num3]
    };
    colors.push(color);
  }
}

//Generate the random number
function generateNum(max){
  return Math.floor(Math.random() * max);
}

// Update the colors  of boxes in the UI
function updateColorUi(){
  var colorBox,
  j = 0;
  for(var i = 0; i < colors.length; i++){
    //Create the color Box
    colorBox = document.createElement('div');
    colorBox.setAttribute('class', 'col span-1-of-3 box');
    colorBox.setAttribute('id', 'box-' + i);
    colorBox.style.backgroundColor = 'rgb(' + colors[i].colorCode[j] + ',' + colors[i].colorCode[j + 1] + ',' + colors[i].colorCode[j + 2];
    //append the color box
    colorsGridParent.appendChild(colorBox);
  }
  //choose a rondom color from colors aray
  colorToMatch = colors[generateNum(colors.length)].colorCode;
  //console.log(colorToMatch);
  //upadate the UI Gueseesd color section
  document.querySelector('.guess-color-code').innerHTML = '<div class="color-code-for-guessing">RGB (' + colorToMatch[j] + ',' + colorToMatch[j + 1] + ',' + colorToMatch[j + 2] + ')</div>';
  //Update the score
  document.getElementById('score').lastChild.nodeValue = score;
}

//Delete the color boxes from the UI
function removeEl(){
  for(var i = 0; i < colors.length; i++){
   var el = document.getElementById('box-' + i);
  el.parentElement.removeChild(el);
  }
}

//Target the element that were clicked
colorsGridParent.addEventListener('click', function(e){
  if(!isGameOver){
    var targetId = e.target.id;
    var id = targetId.split('-')[1];
    //select the color that were clicked
    var colorGuessed = colors[id].colorCode;
    //check weather the selected color matches or not
    if (colorToMatch === colorGuessed){
      score++;
      removeEl();
      main();  
    } else{
      isGameOver = true;
      document.querySelector('.color-code-for-guessing').textContent = "Game Over";
      main();
    }
  }
});

// New game controller
document.querySelector('.btn-new').addEventListener('click', function(){
  colorNum = 6;
  removeEl();
  appInit();
});

//Hard Game Controller
document.querySelector('.btn-hard').addEventListener('click', function(){
  if(!isGameOver){
    score = 0;
    colorNum = 9;
    removeEl();
    main();
  } else{
    alert("First start a new gamme than choose hard level");
  }
});

//Easy Mode controller
document.querySelector('.btn-easy').addEventListener('click', function(){
  if(!isGameOver){
    score = 0;
    colorNum = 3;
    removeEl();
    main();
  } else{
    alert("First start a new gamme than choose Easy level");
  }
});