const prompt = require("prompt-sync")();
const fs = require('fs');
const {resolve} = require('path');

// class for generating the different modes of user input
class CharGenerator {

    // constructor to set and store the user input
    constructor(userInput){
        this.userInput = userInput;
    }

    // method to generate the upper case
    modeUpperCase(){
        return this.userInput.toUpperCase();
    }

    // method to generate the alternate case
    modeAlternateCase(){

        // check whether first letter is upper case or not
        const checkFirstLetterCase = this.userInput[0].toUpperCase() === this.userInput[0];

        // split and map over its characters
        return this.userInput.split("").map((char, i) =>

            // if first letter is uppercase and even-indexed OR first letter is lowercase and odd-indexed, then toggle to uppercase, otherwise keep it as it is.
            (checkFirstLetterCase === (i % 2 === 0) ? char.toUpperCase() : char.toLowerCase()))

            // join the characters after toggle based on conditions
            .join('');
    }

    // method to generate the content and format of CSV
    generateContent(separator) {
        return this.userInput.split("").join(separator);
    }
    
}

// class for generating the CSV file
class CSVGenerator{

    // constructor to set the absolute filepath of the CSV file
    constructor(fileName) {
        this.fileName = fileName;
    }

    // method to write and generate the CSV
    generate(fileContent){
        // write the content to the CSV filepath
        fs.writeFile(this.fileName, fileContent, (err) => {
            if (err) {
                console.error(err.message); // error handling
            } else {
                console.log(this.fileName); // display the absolute filepath of csv file.
            }
        });
    }

}

// class to run the overall functionality of the program.
class Program {

    // constructor to:
    constructor(userInput){

        // store the content of user input
        this.userInput = userInput;
        this.csvFileName = resolve(userInput.replace(/\s/g, '_') + ".csv");

        // create new instance of CharGenerator class.
        this.charGenerator = new CharGenerator(userInput);
    }

    // run the program
    run(){
        // generate the uppercase, alternate case and CSV content from the user input
        const upperCase = this.charGenerator.modeUpperCase();
        const alternateCase = this.charGenerator.modeAlternateCase();
        const csvContent = this.charGenerator.generateContent(",");

        // create the instance of CSVGenerator class
        const csvGenerator = new CSVGenerator(this.csvFileName);

        // write the content stored in csvContent and generate into CSV file.
        csvGenerator.generate(csvContent);

        // display the output
        console.log(upperCase);
        console.log(alternateCase);
    }
}

// main program
let userInput;

// loop if userInput is empty or not provided by user
while (!userInput) {
    userInput = prompt("Enter characters: ");
}

const program = new Program(userInput);
program.run();

