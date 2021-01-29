//takes a length and width, and mine amount
// Beginner 8x8 10, Medium 16x16 40, 22x22 99

// add visuals to the functions
// play sounds on mark, on loss, on victory, on uncover
// make screen red on loss
class MinesweeperBoard {
  constructor(){}
  getMinesBoard() {
    return this.mineboard;
  }
  getVisualBoard() {
    return this.mineCovered;
  }
  mark(space){//no visual
    //place flag, if possible
    // 0 == covered, 1 == uncovered, 2 == marked;
    if (this.mineCovered[space] === 0){
      this.mineCovered[space] = 2;
      return true;
    }
    return false;
  }
  unmark(space){ //no visual
    //remove flag, if possible
    if (this.mineCovered[space] === 2){
      this.mineCovered[space] = 0;
      return true;
    }
    return false;
  }
  uncover(space){
    //return true if bomb, false if safe
    return false;
  }
  isVictory(){
    for (i = 0; i < this.size; i++){
      if (this.mineboard[i] != X && this.mineCovered[i] === 0){ //if the item is not a mine but is still covered return false
        return false;
      }
    }
    //return true if all other spaces revealed
    return true;
  }
  generateBoard(l,w,m){
  this.size = l * w;
  this.mineboard = []; // what the player sees if uncovered
  // 0 == blank, 1-8 numbers, X for mine
  this.mineCovered = []; //what the player sees
  // 0 == covered, 1 == uncovered, 2 == marked;
  var minePlaceHolder = [];
  for (i = 0; i < this.size; i++) { //create the board
    this.mineboard.push(0);
    this.mineCovered.push(0);
    minePlaceHolder.push(i);
  }
  //randomize mine position with fisher yates algorithm
  for (i = this.size - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = minePlaceHolder[i];
    minePlaceHolder[i] = minePlaceHolder[j];
    minePlaceHolder[j] = temp;
  }
  // the first m values become mines in mineboard
  for (i = 0; i < m; i++) {
    this.mineboard[minePlaceHolder[i]] = 'X';
  }
}
  }

// WRITERS
function writeAboutEasy(){
  document.getElementById("middleBox").innerHTML =
  `
  <button type="button" class='gameButtons' onmouseover='writeAboutEasy()' onclick="givenDifficulty('Easy')">Click Me!</button> <br>
  <button type="button" class='gameButtons' onmouseover='writeAboutMedium()' onclick="test()">Medium</button><br>
  <button type="button" class='gameButtons' onmouseover='writeAboutHard()' onclick="test()">Hard</button><br>
  <button type="button" class='gameButtons' onclick="givenDifficulty('Easy')">Click Me!</button>
  <br>
  The board will be 8x8 (64 squares) and there will be 10 mines.
  `;
}
function writeAboutMedium(){
  document.getElementById("middleBox").innerHTML =
  `
  <button type="button" class='gameButtons' onmouseover='writeAboutEasy()' onclick="givenDifficulty('Easy')">Click Me!</button> <br>
  <button type="button" class='gameButtons' onmouseover='writeAboutMedium()' onclick="test()">Medium</button><br>
  <button type="button" class='gameButtons' onmouseover='writeAboutHard()' onclick="test()">Hard</button><br>
  <button type="button" class='gameButtons' onclick="givenDifficulty('Easy')">Click Me!</button>
  <br>
  The board will be 16x16 (256 squares) and there will be 40 mines.
  `;
}
function writeAboutHard(){
  document.getElementById("middleBox").innerHTML =
  `
  <button type="button" class='gameButtons' onmouseover='writeAboutEasy()' onclick="givenDifficulty('Easy')">Click Me!</button> <br>
  <button type="button" class='gameButtons' onmouseover='writeAboutMedium()' onclick="test()">Medium</button><br>
  <button type="button" class='gameButtons' onmouseover='writeAboutHard()' onclick="test()">Hard</button><br>
  <button type="button" class='gameButtons' onclick="givenDifficulty('Easy')">Click Me!</button>
  <br>
  The board will be 22x22 (484 squares) and there will be 99 mines.
  `;
}
// Testing
function test(){
  console.log("Hello.");
}

// Progression
function givenCustomMines(size,mines){}
function givenGameMinesweeper(){
  console.log("Minesweeper was selected.");
  test();
  //convert buttons to difficulty buttons
  document.getElementById("middleBox").innerHTML =
  `
  <button type="button" class='gameButtons' onclick="givenDifficulty('Easy')">Click Me!</button> <br>
  <button type="button" class='gameButtons' onmouseover='writeAboutMedium()' onclick="test()">Medium</button><br>
  <button type="button" class='gameButtons' onmouseover='writeAboutHard()' onclick="test()">Hard</button><br>
  <button type="button" class='gameButtons' onclick="givenDifficulty('Easy')">Click Me!</button>
  <br>
  The difficulty you select determines the size of the board and amount of mines.
  `;
}
function givenDifficulty(diff){
  console.log(diff + " chosen.")
  var gameBoard = new MinesweeperBoard();
  if (diff === "easy"){

  }
  else if (diff === "medium"){

  }
  else if (diff === "hard"){

  }
}
