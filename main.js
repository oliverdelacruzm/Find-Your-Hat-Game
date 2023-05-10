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

        let x = 0;
        let y = 0; 
        
        while (gameStatus !== 'w') {

            if (move === 'l') {
                y -= 1; 
            } else if (move === 'r') {
                y += 1;
            } else if (move === 'd') {
                x += 1;
            } else if (move === 'u') {
                x -= 1;
            };


            if (x < 0 || x > 2 || y < 0 || y > 2) {
                gameStatus = 'g'; 
                process.stdout.write('\nGame Over');
                break;
            } else if ((x === 0 && y === 2) || (x === 1 && y === 1)) {
                gameStatus = 'g'; 
                process.stdout.write('\nGame Over');
                break;
            } else {
                this.field[x][y] = pathCharacter;
            }

            if (x === 2 && y === 1) {
                gameStatus = 'w'; 
                this.print();
                process.stdout.write('\nYou win!');
                break;
            }

            
            // if (this.field[0][0] === pathCharacter) {
            //     if (move === 'l' || move === 'u') {
            //         gameStatus = 'g'; 
            //         process.stdout.write('\nGame Over');
            //         return;
            //     } else if (move === 'r') {
            //         this.field[0][1] = pathCharacter;
            //         this.print();
            //     }; 
            // };

            // if (gameStatus === 'w') {
            //     process.stdout.write("\nYou have won the game!");
            //     break;
            // };

            this.print();
            move = prompt("Which way would you like to move?" + "\n(L = Left, R = Right, U = Up, D = Down): ");
        };
    }
};

const newField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
  ]);
  

newField.print();
const move = prompt("Which way would you like to move?" + "\n(L = Left, R = Right, U = Up, D = Down): ").trim();
newField.updateField(move);

