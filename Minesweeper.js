//takes a length and width, and mine amount
// Beginner 8x8 10, Medium 16x16 40, 22x22 99

// add visuals to the functions
// play sounds on mark, on loss, on victory, on uncover
// make screen red on loss
class MinesweeperBoard {
  constructor() {}
  getMinesBoard() {
    return this.mineboard;
  }
  getVisualBoard() {
    return this.mineCovered;
  }
  mark(space) { //no visual
    //place flag, if possible
    // 0 == covered, 1 == uncovered, 2 == marked;
    if (this.mineCovered[space] === 0) {
      this.mineCovered[space] = 2;
      return true;
    }
    return false;
  }
  unmark(space) { //no visual
    //remove flag, if possible
    if (this.mineCovered[space] === 2) {
      this.mineCovered[space] = 0;
      return true;
    }
    return false;
  }
  uncover(space) {
    //return true if bomb, false if safe
    return false;
  }
  isVictory() {
    for (i = 0; i < this.size; i++) {
      if (this.mineboard[i] != X && this.mineCovered[i] === 0) { //if the item is not a mine but is still covered return false
        return false;
      }
    }
    //return true if all other spaces revealed
    return true;
  }
  generateBoard(l, w, m) {
    this.size = l * w;
    this.mineboard = []; // what the player sees if uncovered
    // 0 == blank, 1-8 numbers, X for mine
    this.mineCovered = []; //what the player sees
    // 0 == covered, 1 == uncovered, 2 == marked;
    var minePlaceHolder = [];
    for (let i = 0; i < this.size; i++) { //create the board
      this.mineboard.push(0);
      this.mineCovered.push(0);
      minePlaceHolder.push(i);
    }
    //randomize mine position with fisher yates algorithm
    for (let i = this.size - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = minePlaceHolder[i];
      minePlaceHolder[i] = minePlaceHolder[j];
      minePlaceHolder[j] = temp;
    }
    // the first m values become mines in mineboard
    for (let i = 0; i < m; i++) {
      //console.log(minePlaceHolder[i]);
      this.mineboard[minePlaceHolder[i]] = 'X';
    }
  }
  drawBoard() { //draw  this.mineboard
    console.log("Size: " + this.size);
    if (this.size == 64){
      let toUse = "<div class='boardSweeperEZ'>";
      for (let i = 0; i < this.size; i++){
          toUse += "<div class='boardEZSquare' id='block" + i + "' onmousedown='detectClick(event," + i +")'></div>";
      }
      toUse += '</div>';
      document.getElementById("middleBox").innerHTML = toUse;
    }
    else if (this.size == 256){

    }
    else if (this.size == 484){

    }
  }
}
// Testing
function test() {
  console.log("Hello.");
}
//Writers
function writeToRulesBox(diff) {
  console.log(diff + " written");
  if (diff == 0) { //EZ
    document.getElementById('ruleText').innerHTML = "There will be an 8x8 board with 10 mines."
  } else if (diff == 1) { //Med
    document.getElementById('ruleText').innerHTML = "There will be an 16x16 board with 40 mines."
  } else if (diff == 2) { //Hard
    document.getElementById('ruleText').innerHTML = "There will be an 22x22 board with 99 mines."
  }
}
// Progression
function givenCustomMines(size, mines) {} ///WRITE MORE LATER
function givenGameMinesweeper() {
  console.log("Minesweeper was selected.");
  test();
  //convert buttons to difficulty buttons
  document.getElementById("middleBox").innerHTML =
    `
  <button type="button" class='gameButtons' onmouseover="writeToRulesBox(0)" onclick="givenDifficulty(0)">Easy</button> <br>
  <button type="button" class='gameButtons' onmouseover="writeToRulesBox(1)" onclick="givenDifficulty(1)">Medium</button><br>
  <button type="button" class='gameButtons' onmouseover="writeToRulesBox(2)" onclick="givenDifficulty(2)">Hard</button><br>
  <br>
  <div id="ruleText">The difficulty you select determines the size of the board and amount of mines.</div>
  `;
}
function givenDifficulty(diff) { //given the difficulty, create the board
  console.log(diff + " chosen.")
  window.gameBoard = new MinesweeperBoard();
  if (diff == 0) { //EZ
    window.difficulty = 0;
    window.gameBoard.generateBoard(8, 8, 10);
  } else if (diff == 1) { //MED
    window.difficulty = 1;
    window.gameBoard.generateBoard(16, 16, 40);
  } else if (diff == 2) { //HARD
    window.difficulty = 2;
    window.gameBoard.generateBoard(22, 22, 99);
  }
  window.gameBoard.drawBoard();
}
function detectClick(event,id){
  //alert("You pressed button: " + event.button + " on " + id);
  // 0 is left click, 2 is right click
  if (event.button == 0){
    alert("You pressed a left click on " + id);
  }
  else if (event.button == 2){
    alert("You pressed a right click on " + id);
  }
}
