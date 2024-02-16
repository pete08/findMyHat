const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(fieldLayout) {
    this.field = fieldLayout;
    this.headY = 0;
    this.headX = 0;
    this.holefield = `You fell into a HOLE and died!\n
      !!!                                                   !!!\n
      !!!                                                   !!!\n
      !!!        |-------|                                  !!!\n
      !!!        |       |                                  !!!\n
      !!!       _|)))))))|__                                !!!\n
      !!!                                                   !!!\n
      !!!                                                   !!!\n
      !!!                                                   !!!\n
      !!!                                                   !!!\n
      !!!                                                   !!!\n
      !!!      / ^^ ^^  \\                                   !!!\n
      !!!      | (o)(o) |                                   !!!\n
      !!!      |  <     |                                   !!!\n
      !!!      |   (0)  |     |     /         ||    ||      !!!\n
      !!!      \\_______/     |   /           ||   //        !!!\n
      !!!            \\_______|_/_____________||_//          !!!\n
      !!!                                                   !!!\n
      !!!                                                   !!!\n
      !!!                                                   !!!\n
      !!!             !                                     !!!\n
      !!!            !!!                      !             !!!\n
      !!!           !!!!!         !          !!!            !!!\n
      !!!          !!!!!!!       !!!        !!!!!     !     !!!\n
      !!!  !      !!!!!!!!!     !!!!!      !!!!!!!   !!!    !!!\n
      !!! !!!!   !!!!!!!!!!!   !!!!!!!   !!!!!!!!!! !!!!!!!!!!!\n
      !!!!!!!!! !!!!!!!!!!!!! !!!!!!!!! !!!!!!!!!!!!!!!!!!!!!!!\n
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n`;
    this.hatfield = `You found a HAT! yay! You Win!!!\n
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n
      !!!                                !!!\n
      !!!          ____   _____          !!!\n
      !!!          |   \\/    |           !!!\n
      !!!          |          |          !!!\n
      !!!          ||||||||||||          !!!\n
      !!!     \\____|__________|____/     !!!\n
      !!!                                !!!\n
      !!!                                !!!\n
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n`;
  }

  //method: print field 
  print() {
    for (let i = 0; i < this.field.length; i++) {
      console.log(this.field[i].join(""));
    }
  }

  //current point
  printHead() {
    console.log(this.field[this.headY][this.headX]);
  }

  requestMove() {
    let direction = prompt('Enter a directon (W,S,A,D): ');
    switch (direction.toLowerCase()) {
    case 'w':
      this.inputW();
      break;
    case 'd':
      this.inputD();
      break;
    case 's':
      this.inputS();
      break;
    case 'a':
      this.inputA();
      break;
    default:
      console.log(`Please select another 'key'`);
      this.requestMove();
    }
  }

  //continue game by requesting another Directional Input
  continueGame() {
    this.print();
    this.requestMove();
  }
  //checks whether current coordinates are in bounds
  checkFieldCoordinatesY(y) {
    if (y < 0 || y > (this.field.length - 1)) {
      return false;
    }
    return true;
  }
  checkFieldCoordinatesX(x) {
    if (x < 0 || x > (this.field[0].length - 1)) {
      return false;
    }
    return true;
  }

  //checks item in new location
  checkFieldContents(y,x) {
    // console.log(`checkFieldContents: this.field[${y}][${x}]: ${this.field[y][x]}`);
    switch (this.field[y][x]) {
    case 'O':
      return this.holefield;
    case '^':
      return this.hatfield;
    default:
      return false;
    }
  }

  //Directional Input methods
  inputW() {
    //check if 'hat' or 'hole'
    let fieldContent = this.checkFieldContents((this.headY - 1), this.headX)
    if (fieldContent) {
      console.log(fieldContent);
      return;
    }

    //move
    this.headY--;

    //check field Edge
    if (!(this.checkFieldCoordinatesY(this.headY))) {
      console.log('Out of Bounds! you fell off the field to your demise! Goodbye!');
      return;
    }
    this.field[this.headY][this.headX] = '*';
    this.continueGame();
  }

  inputD() {
    //check if 'hat' or 'hole'
    let fieldContent = this.checkFieldContents(this.headY, (this.headX + 1));
    if (fieldContent) {
      console.log(fieldContent);
      return;
    }

    //move
    this.headX++;

    //check field Edge
    if (!(this.checkFieldCoordinatesX(this.headX))) {
      console.log('Goodbye!');
      return;
    }
    this.field[this.headY][this.headX] = '*';
    this.continueGame();
  }

  inputS() {
    //check if 'hat' or 'hole'
    let fieldContent = this.checkFieldContents((this.headY + 1), this.headX);
    if (fieldContent) {
      console.log(fieldContent);
      return;
    }

    //move
    this.headY++;
    
    //check field Edge
    if (!(this.checkFieldCoordinatesY(this.headY))) {
      console.log('Goodbye!');
      return;
    }
    this.field[this.headY][this.headX] = '*';
    this.continueGame();
  }
  
  inputA() {
    //check if 'hat' or 'hole'
    let fieldContent = this.checkFieldContents(this.headY, (this.headX - 1));
    if (fieldContent) {
      console.log(fieldContent);
      return;
    }

    //move
    this.headX--;
    
    //check field Edge
    if (!(this.checkFieldCoordinatesX(this.headX))) {
      console.log('Goodbye!');
      return;
    }
    this.field[this.headY][this.headX] = '*';
    this.continueGame();
  }
  
}


const beta = new Field(
  [
    [pathCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter],
    [fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,hole,fieldCharacter],
    [hole,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter],
    [fieldCharacter,fieldCharacter,hole,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter],
    [fieldCharacter,hat,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter],
    [fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter],
    [fieldCharacter,fieldCharacter,fieldCharacter,hole,fieldCharacter,fieldCharacter,fieldCharacter]
  ]
);


beta.print();
console.log();
beta.requestMove();
