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
            };
            process.stdout.write('\n'); // use stdout.write() to print a new line after each row
        };
    }


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
            };

            if (x === 2 && y === 1) {
                gameStatus = 'w'; 
                this.print();
                process.stdout.write('\nYou win!\n');
                break;
            };

            this.print();
            move = prompt("Which way would you like to move?" + "\n(L = Left, R = Right, U = Up, D = Down): ");
        };
    }

    static generateField(height, width, holePercentage) {
        if (height < 2 || width < 2) {
            height = prompt("Enter new height greater than 1: ")
            width = prompt("Enter new width greater than 1: ")
        };
        
        let field = [];

        //Create a field with only field characters
        for (let i = 0; i < height; i++) {
            field.push([]);
            for (let j = 0; j < width; j++) {
                field[i].push(fieldCharacter);
            };
        };

        //Place at least one hat, one hole, and one pathCharacter in the field
        let hatRow = Math.floor(Math.random() * height);
        let hatCol = Math.floor(Math.random() * width);
        field[hatRow][hatCol] = hat;

        let holeRow = Math.floor(Math.random() * height);
        let holeCol = Math.floor(Math.random() * width);
        while (holeRow === hatRow && holeCol === hatCol) {
            holeRow = Math.floor(Math.random() * height);
            holeCol = Math.floor(Math.random() * width);
        }
        field[holeRow][holeCol] = hole;

        let pathRow = Math.floor(Math.random() * height);
        let pathCol = Math.floor(Math.random() * width);
        while ((pathRow === hatRow && pathCol === hatCol) || (pathRow === holeRow && pathCol === holeCol) ) {
            holeRow = Math.floor(Math.random() * height);
            holeCol = Math.floor(Math.random() * width);
        }
        field[pathRow][pathCol] = pathCharacter;


        //place holes in field when it's greater than 2x2
        if (width * height > 4) {
            const remainingCells = height * width - 4; //subtract the four initial cells in the 2x2 array
            let holesToPlace = Math.floor(height * width * holePercentage) - 1; //one hole was already placed 

            //while loop fills holes in random field character locations beyond initila 2x2 grid
            //will place holes below maximum threshold of holes for entire grid is satisfied
            while (holesToPlace > 0) {
                const i = Math.floor(Math.random() * height);
                const j = Math.floor(Math.random() * width);

                if (field[i][j] === fieldCharacter && i>=2 && j >=2) {
                    field[i][j] = hole;
                    holesToPlace--;
                };
            };  
        };

        return field;

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

//after gameplay, use generateField static method
//print out a 5x5 field with randomly placed holes representing up to 30% of the field 
const otherField = new Field(Field.generateField(5, 5, 0.3));
otherField.print();