const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
      this.field = field;
    }

    print() {
        let array = this.field;
        process.stdout.write('\n');

        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array[i].length; j++) {
                process.stdout.write(array[i][j]); // use stdout.write() to print without formatting
            }
            process.stdout.write('\n'); // use stdout.write() to print a new line after each row
        }
    };


    updateField(move) {
        move = move.toLowerCase();
        let gameStatus; // 'w' for win, 'c' for continue, 'g' for game over

        if (this.field[0][0] === pathCharacter) {
            if (move === 'l' || move === 'u') {
                gameStatus = 'g'; 
                process.stdout.write('\nGame Over');
                return;
            } else if (move === 'r') {
                this.field[0][1] = pathCharacter;
                this.print();
            }; 
        };
    }
};

const newField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
  ]);
  

newField.print();

const move = prompt("\nWhich way would you like to move?" + "\n(L = Left, R = Right, U = Up, D = Down): ");


newField.updateField(move);

