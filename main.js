const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const moves = ['u', 'd', 'l', 'r'];

class Field {
  constructor(fieldArray) {
    this._fieldArray = fieldArray;
    this._currentRow = 0;
    this._currentColumn = 0;
  }

  get fieldArray() {
    return this._fieldArray;
  }

  print() {
    for (let i = 0; i < this.fieldArray.length; i++) {
      console.log(this.fieldArray[i].join(''));
    }
  }

  get currentRow() {
    return this._currentRow;
  }

  get currentColumn() {
    return this._currentColumn;
  }

  set currentRow(newRow) {
    this._currentRow = newRow;
  }

  set currentColumn(newColumn) {
    this._currentColumn = newColumn;
  }

  moveUp() {
    this.currentRow -= 1;
  }

  moveLeft() {
    this.currentColumn -= 1;
  }

  moveDown() {
    this.currentRow += 1;
  }

  moveRight() {
    this.currentColumn += 1;
  }

  promptPlayer() {
    this.print();
    this.move = prompt('\n Which way? [u -(↑)up, l -(←)left, d -(↓)down, r -(→)right] ');
    if (!moves.includes(this.move)) {
      console.log('Invalid move◆. ◇Please try again.');
      this.promptPlayer();
    }
  }

  static generateField() {
    // Creates random field, width and height (between 5 to 10), and a random percentage of holes (between 20 and 25 percent).
    const fieldHeight = Math.floor(Math.random() * 5) + 6;
    const fieldWidth = Math.floor(Math.random() * 5) + 6;
    const holePercentage = Math.floor(Math.random() * 5) + 21;

    const generatedField = [];

    // Rows field
    for (let i = 0; i < fieldHeight; i++) {
      generatedField.push([]);
    }

    // Columns field
    for (let i = 0; i < fieldHeight; i++) {
      for (let j = 0; j < fieldWidth; j++) {
        generatedField[i].push(fieldCharacter);
      }
    }

    generatedField[0].splice(0, 1, pathCharacter);

    const randomRow = Math.floor(Math.random() * (fieldHeight - 1)) + 1;
    const randomColumn = Math.floor(Math.random() * (fieldWidth - 1)) + 1;
    generatedField[randomRow].splice(randomColumn, 1, hat);

    const numOfHoles = Math.floor((holePercentage / 100) * fieldHeight * fieldWidth);

    for (let k = 0; k < numOfHoles; k++) {
      const randomRow = Math.floor(Math.random() * fieldHeight);
      const randomColumn = Math.floor(Math.random() * fieldWidth);

      if (generatedField[randomRow][randomColumn] !== pathCharacter && generatedField[randomRow][randomColumn] !== hat && generatedField[randomRow][randomColumn] !== hole) {
      generatedField[randomRow].splice(randomColumn, 1, hole);
      }
    }

    return generatedField;
  }
}

const play = (field) => {
  console.log('Find Your Hat (^).\n Avoid the holes (O).\n Stay within the field (░).\n One can use ctrl+C to break.\n');

  while (field.fieldArray[field.currentRow][field.currentColumn] !== hat) {
    field.promptPlayer();

    switch (field.move) {
      case 'u':
        field.moveUp();
        break;
      case 'l':
        field.moveLeft();
        break;
      case 'd':
        field.moveDown();
        break;
      case 'r':
        field.moveRight();
        break;
    }

    if (field.fieldArray[field.currentRow] === undefined || field.fieldArray[field.currentRow][field.currentColumn] === undefined) {
      console.log('You felt, out of field ■. Please try again...\n');
      break;
    } 
    else if (field.fieldArray[field.currentRow][field.currentColumn] === hole) {
      console.log('You felt, into hole ●. Please try again...\n');
      break;
    }
    else if (field.fieldArray[field.currentRow][field.currentColumn] === fieldCharacter) {
      field.fieldArray[field.currentRow].splice(field.currentColumn, 1, pathCharacter);
    }
  }

  if (field.fieldArray[field.currentRow][field.currentColumn] === hat) {
    field.fieldArray[field.currentRow].splice(field.currentColumn, 1, pathCharacter);
    field.print();
    console.log('\n"★ Congratulations! ★" You found your HAT.🎩')
  }
}

const playFieldArray = Field.generateField();
const playField = new Field(playFieldArray);
play(playField);