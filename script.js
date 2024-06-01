const ADD_OPERATOR = "+";
const SUBTRACT_OPERATOR = "-";
const MULTIPLY_OPERATOR = "*";
const DIVIDE_OPERATOR = "/";

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, number1, number2) {
    switch (operator) {
        case ADD_OPERATOR:
            return add(number1, number2);
        case SUBTRACT_OPERATOR:
            return subtract(number1, number2);
        case MULTIPLY_OPERATOR:
            return multiply(number1, number2);
        case DIVIDE_OPERATOR:
            return divide(number1, number2);
    }
}

let display = document.querySelector(".display");

let number1;
let operator;
let number2;
// This variable is true if the last button that was clicked was an operator
// or an equals
let specialClicked = false;

const buttons = document.querySelector(".buttons");

function displayOperations() {
    if (number1 === null || number1 === undefined) {
        number1 = Number(display.textContent);
    } else if (number2 !== null || number2 !== undefined) {
        number1 = operate(operator, number1, number2);
        display.textContent = number1;
    }
}

buttons.addEventListener("click", e => {
    const character = e.target.textContent;

    // If clear button was clicked
    if (character === "C") {
        specialClicked = false;
        number1 = null;
        operator = null;
        number2 = null;
        display.textContent = "0";
    }

    // If a number button was clicked
    else if (!isNaN(character)) {
        operatorClicked = false;
        if (display.textContent === "0" || specialClicked) display.textContent = character;
        else display.textContent += character; 
        specialClicked = false;
        return;
    }

    // If "+" or "-" button was clicked
    switch (character) {
        case ADD_OPERATOR:
        case SUBTRACT_OPERATOR:
            specialClicked = true;
            operator = character;
            displayOperations();
            return;
    }

    const unicode = character.codePointAt(0);
    const UNICODE_MULTIPLICATION = 215;
    const UNICODE_DIVISION = 247;
    // If multiplication or division button was clicked
    switch (unicode) {
        case UNICODE_MULTIPLICATION:
        case UNICODE_DIVISION:
            specialClicked = true;
            operator = (unicode === UNICODE_MULTIPLICATON) ? MULTIPLY_OPERATOR
                : DIVIDE_OPERATOR;
            displayOperations();
            return;
    }

    // If equality button was pressed
    if (character === "=") {
        if (number1 === null || number1 === undefined);
        else {
            specialClicked = true;
            number2 = Number(display.textContent);
            number1 = operate(operator, number1, number2);
            display.textContent = number1;
        }
        return;
    }
});
