//takes a length and width, and mine amount
// Beginner 8x8 10, Medium 16x16 40, 22x22 99

// add visuals to the functions
// play sounds on mark, on loss, on victory, on uncover
/// add adjustments for all difficulties
// add counter for mines and flags

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
    // edit the mines board to uncover the space, if the space wasn't already uncovered
    if (this.mineboard[space] == 9){// if mine
      this.mineCovered[space] = 1;     //convert it to visible
      console.log("The Player has lost.");
      this.loserScreen();
    }
    else{// wow, not mine
      if (this.mineboard[space] == 0){ //if zero, cascade
        this.uncoverZeroes(space);
        this.drawBoard();
      }
      else{ //if number, dont cascade
        // don't do anything?
        this.mineCovered[space] = 1;     //convert it to visible
        this.drawBoard();
        if (this.isVictory()){
          this.victoryParty();
        }
      }
    }
  }
  uncoverZeroes(i){
    if (this.mineCovered[i] == 1){
      return;
    }
    this.mineCovered[i] = 1;
    if (this.mineboard[i] == 0){
      let l = this.length;
      //hand it off to eight spaces around. copy from numbers
      if ((i % l != 0) && (i >= l)){this.uncoverZeroes(i-l-1)}//top left
      if (i >= l){this.uncoverZeroes(i-l)}//top
      if ((i >= l) && (i % l != (l - 1))){this.uncoverZeroes(i-l+1)}//top right
      if (i % l != 0){this.uncoverZeroes(i-1)}//left
      if (i % l != (l - 1)){this.uncoverZeroes(i + 1)}//right
      if ((i < (this.size - l) && (i % l != 0))){this.uncoverZeroes(i + l - 1)}//bottom left
      if (i < (this.size - l)){this.uncoverZeroes(l + i)}//bottom
      if ((i < (this.size - l)) && (i % l != (l - 1))){this.uncoverZeroes(l + i + 1)}//bottom right
    }
    this.drawBoard();
    if (this.isVictory()){
      this.victoryParty();
    }
  }
  isVictory() {
    for (let i = 0; i < this.size; i++) {
      if (this.mineboard[i] != 9 && this.mineCovered[i] === 0) { //if the item is not a mine but is still covered return false
        return false;
      }
    }
    //return true if all other spaces revealed
    return true;
  }
  victoryParty(){
    //tell the player they've won, do cool effects!
    console.log("The Player has won!");
    this.revealBoard();
    this.drawNonInteractiveBoard();
    document.getElementById('middleBox').innerHTML =
    `
    <div class='victoryMineGreen'> Wow, you won! </div>
    `
    + document.getElementById('middleBox').innerHTML;
  }
  revealBoard(){
    //view the board and reveal mines
    for (let i = 0; i < this.size; i++){
      this.mineCovered[i] = 1;
    }
  }
  loserScreen(){
    //draw noninteractive board
    //throw up loss banner
    this.revealBoard();
    this.drawNonInteractiveBoard();
    document.getElementById('middleBox').innerHTML =
    `
    <div class='lossMineRed'> Saddening, you lose! </div>
    `
    + document.getElementById('middleBox').innerHTML;
  }
  generateBoard(l, w, m) {
    this.size = l * w;
    this.length = l;
    this.mineCount = m;
    this.mineboard = []; // what the player sees if uncovered
    // 0 == blank, 1-8 numbers, 9 for mine
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
      this.mineboard[minePlaceHolder[i]] = 9;
    }
    this.convertBoardToNumbers();
  }
  convertBoardToNumbers(){
    //Once there are mines in our board, we can now convert the adjacent spaces to uncoverNumbers
    let l = this.length;
    for (let i = 0; i < this.size; i++){
      if (this.mineboard[i] == 9){} //skip, is mine
      else{ // check each rule seperately for errors
        let mines = 0;
        mines += ((i % l != 0) && (i >= l) && (this.mineboard[i  - l - 1] == 9) ? 1 : 0 );//top left
        mines += ((i >= l) && (this.mineboard[i-l] == 9) ? 1 : 0);//top
        mines += ((i >= l) && (i % l != (l - 1)) && (this.mineboard[i - l + 1] == 9) ? 1 : 0);//top right
        mines += ((i % l != 0) && (this.mineboard[i-1] == 9) ? 1 : 0);//left
        mines += ((i % l != (l - 1)) && (this.mineboard[i+1] == 9) ? 1 : 0);//right
        mines += ( (i < (this.size - l)) && (i % l != 0) && (this.mineboard[i+l-1] == 9) ? 1: 0);//bottom left
        mines += ( (i < (this.size - l)) && (this.mineboard [i + l] == 9) ? 1: 0);//bottom
        mines += ( (i < (this.size - l)) && (i % l != (l - 1) ) && (this.mineboard [i + l + 1] == 9) ? 1: 0);//bottom right
        this.mineboard[i] = mines;
      }
    }
    //console.log(this.mineboard);
  }
  drawBoard() { //draw  this.mineboard
    //console.log("Size: " + this.size);
    if (this.size == 64){
      let toUse = "<div class='boardSweeperEZ'>";
      let visualBoard = this.getVisualBoard();
      for (let i = 0; i < this.size; i++){
          if (visualBoard[i] == 0){//covered and unmarked
            toUse += "<div class='boardEZSquare' id='block" + i + "' onmousedown='detectClick(event," + i +")'></div>";
          }
          else if (visualBoard[i] == 2){//covered and marked
            toUse += "<img src='mineImages/easy/flag.png' onmousedown='detectClick(event," + i +")' class='square64'>";
          }
          else{
            //has been uncovered
            toUse += "<img src='mineImages/easy/square" + this.mineboard[i] + ".png' class='square64'>";
          }
      }
      toUse += '</div>';
      toUse +=
      `
      <div class = 'mineMenuBar'>
      <button type="button" class='gameButtons' onclick="retreatMainMenu()">Main Menu</button>
      <button type="button" class='gameButtons' onclick="window.gameBoard.fastRestart()">Restart</button>
      <button type="button" class='gameButtons' onclick="givenGameMinesweeper()">Change Difficulty</button>
      </div>
      `;
      document.getElementById("middleBox").innerHTML = toUse;
    }
    else if (this.size == 256){
      let toUse = "<div class='boardSweeperEZ'>";
      let visualBoard = this.getVisualBoard();
      for (let i = 0; i < this.size; i++){
          if (visualBoard[i] == 0){//covered and unmarked
            toUse += "<div class='boardMEDSquare' id='block" + i + "' onmousedown='detectClick(event," + i +")'></div>";
          }
          else if (visualBoard[i] == 2){//covered and marked
            toUse += "<img src='mineImages/easy/flag.png' onmousedown='detectClick(event," + i +")' class='square256'>";
          }
          else{
            //has been uncovered
            toUse += "<img src='mineImages/easy/square" + this.mineboard[i] + ".png' class='square256'>";
          }
      }
      toUse += '</div>';
      toUse +=
      `
      <div class = 'mineMenuBar'>

      <button type="button" class='gameButtons' onclick="window.gameBoard.fastRestart()">Restart</button>
      <button type="button" class='gameButtons' onclick="givenGameMinesweeper()">Change Difficulty</button>
      </div>
      `;
      document.getElementById("middleBox").innerHTML = toUse;
    }
    else if (this.size == 484){

    }
  }
  drawNonInteractiveBoard(){ //draw a board that shows up on game loss
    if (this.size == 64){
      let toUse = "<div class='boardSweeperEZ'>";
      let visualBoard = this.getVisualBoard();
      for (let i = 0; i < this.size; i++){
          if (visualBoard[i] == 0){//covered and unmarked
            toUse += "<div class='boardEZSquare' id='block" + i + "' ></div>";
          }
          else if (visualBoard[i] == 2){//covered and marked
            toUse += "<img src='mineImages/easy/flag.png' class='square64'>";
          }
          else{
            //has been uncovered
            toUse += "<img src='mineImages/easy/square" + this.mineboard[i] + ".png' class='square64'>";
          }
      }
      toUse += '</div>';
      toUse +=
      `
      <div class = 'mineMenuBar'>

      <button type="button" class='gameButtons' onclick="window.gameBoard.fastRestart()">Restart</button>
      <button type="button" class='gameButtons' onclick="givenGameMinesweeper()">Change Difficulty</button>
      </div>
      `;
      document.getElementById("middleBox").innerHTML = toUse;
    }
    else if (this.size == 256){
      let toUse = "<div class='boardSweeperEZ'>";
      let visualBoard = this.getVisualBoard();
      for (let i = 0; i < this.size; i++){
          if (visualBoard[i] == 0){//covered and unmarked
            toUse += "<div class='boardMEDSquare' id='block" + i + "' ></div>";
          }
          else if (visualBoard[i] == 2){//covered and marked
            toUse += "<img src='mineImages/easy/flag.png'  class='square256'>";
          }
          else{
            //has been uncovered
            toUse += "<img src='mineImages/easy/square" + this.mineboard[i] + ".png' class='square256'>";
          }
      }
      toUse += '</div>';
      toUse +=
      `
      <div class = 'mineMenuBar'>

      <button type="button" class='gameButtons' onclick="window.gameBoard.fastRestart()">Restart</button>
      <button type="button" class='gameButtons' onclick="givenGameMinesweeper()">Change Difficulty</button>
      </div>
      `;
      document.getElementById("middleBox").innerHTML = toUse;
    }
  }
  fastRestart(){
    //generate a board again, then draw the board
    this.generateBoard(this.length,this.length,this.mineCount);
    this.drawBoard();
  }
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
function givenCustomMines(size, mines) {} ///WRITE MORE LATER - think of board correlations?
function givenGameMinesweeper() {
  console.log("Minesweeper was selected.");
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
    // alert("You pressed a left click on " + id);
    let visual = window.gameBoard.getVisualBoard()[id];
    if (visual == 1){ //if already uncovered
      console.log("Player tried to uncover an already uncovered space.");
      //add oof sound effect
    }
    else if (visual == 2){
      console.log("Player tried to uncover a space they had already marked.")
      // add oof sound effect
    }
    else{ //uncover
      console.log("Uncovering space: " + id);
      window.gameBoard.uncover(id);
    }
  }
  else if (event.button == 2){
    //alert("You pressed a right click on " + id);
    //check if space is marked already
    let covered = window.gameBoard.getVisualBoard()[id];
    if (covered == 0){ //covered - so mark it
      window.gameBoard.mark(id);
      //play positive ding sound
      console.log("Space " + id + " was marked.");
      window.gameBoard.drawBoard();
    }
    else if (covered == 1){ //uncovered - say it can't be marked? play an error sound? do nothing?
      console.log("Player tried to mark tile " + id + ", but that tile was uncovered.")
      //play oof sound
    }
    else if (covered == 2){ //already marked - so unmark it
      window.gameBoard.unmark(id);
      //play positive ding sound?
      console.log("Space " + id + " was unmarked.");
      window.gameBoard.drawBoard();
    }
  }
}
