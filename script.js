const ADD_OPERATOR = "+";
const SUBTRACT_OPERATOR = "-";
const MULTIPLY_OPERATOR = "*";
const DIVIDE_OPERATOR = "/";
const DISPLAY_DIGIT_LIMIT = 12;

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

function formatResult(result) {
    if (isNaN(result)) return result;
    const resultString = result.toString();
    if (resultString.length <= DISPLAY_DIGIT_LIMIT) return result;

    let decimals = DISPLAY_DIGIT_LIMIT
        - resultString.split(".")[0].length;

    if (decimals >= 0) return Number(result.toFixed(decimals));

    // decimals < 0 means that the integer part is longer than the limit
    // The exponent notation adds aproximatily 5 extra characters in most cases
    const EXTRA_EXPONENT_LENGTH = 5;
    return result.toExponential(DISPLAY_DIGIT_LIMIT - EXTRA_EXPONENT_LENGTH);
}

function operate(operator, number1, number2) {
    let result;
    switch (operator) {
        case ADD_OPERATOR:
            result = add(number1, number2);
            break;
        case SUBTRACT_OPERATOR:
            result = subtract(number1, number2);
            break;
        case MULTIPLY_OPERATOR:
            result = multiply(number1, number2);
            break;
        case DIVIDE_OPERATOR:
            if (number2 === 0) return "Division by 0 error";
            result = divide(number1, number2);
            break;
    }

    return result;
}

let display = document.querySelector(".display");

let number1 = null;
let operator = null;
let number2 = null;
// buffer stores the exact value of results after a calculation.
// For more accuracy when doing multiple calculations.
let buffer = null;
// specialClicked is true if the last button that was clicked was an operator
// or an equals.
// For the flow of logic.
let specialClicked = false;
// operatorButton if a reference to the button corresponding 
// to the current operator.
// For styling the button corresponding to operator currently selected.
let operatorButton = null;

const buttons = document.querySelector(".buttons");

// Function that executes the main part of the logic when an operator is clicked
function displayOperations(e) {
    if (operatorButton !== null)
        operatorButton.classList.remove("operator-chosen");
    operatorButton = e.target;
    operatorButton.classList.add("operator-chosen");
    if (number1 === null) {
        number1 = specialClicked ? buffer : Number(display.textContent);
    } else if (!specialClicked) {
        number2 = Number(display.textContent);
        number1 = operate(operator, number1, number2);
        display.textContent = formatResult(number1);
    }
}

buttons.addEventListener("click", e => {
    const character = e.target.textContent;

    // If clear button was clicked
    if (character === "AC") {
        number1 = null;
        operator = null;
        number2 = null;
        buffer = null;
        if (operatorButton !== null)
            operatorButton.classList.remove("operator-chosen");
        operatorButton = null;
        display.textContent = "0";
        specialClicked = false;
        return;
    }

    // If a number button was clicked
    if (!isNaN(character)) {
        if (
            display.textContent === "0"
            || specialClicked
        ) display.textContent = character;
        else if (display.textContent.length >= DISPLAY_DIGIT_LIMIT) return;
        else display.textContent += character;
        specialClicked = false;
        return;
    }

    if (character === ".") {
        if (
            display.textContent === "0"
            || specialClicked
        ) display.textContent = "0.";
        else if (display.textContent.length >= DISPLAY_DIGIT_LIMIT) return;
        else if (!display.textContent.includes(".")) display.textContent += ".";
        specialClicked = false;
        return;
    }

    if (
        e.target.classList.contains("delete")
        || e.target.parentNode.classList.contains("delete")
    ) {
        if (
            display.textContent === "0"
            || specialClicked
        ) return;
        else if (display.textContent.length === 1) display.textContent = "0";
        else display.textContent = display.textContent.slice(0, -1);
        specialClicked = false;
        return;
    }

    // If addition or subtraction button was clicked
    switch (character) {
        case ADD_OPERATOR:
        case SUBTRACT_OPERATOR:
            displayOperations(e);
            operator = character;
            specialClicked = true;
            return;
    }

    const unicode = character.codePointAt(0);
    const UNICODE_MULTIPLICATION = 215;
    const UNICODE_DIVISION = 247;
    // If multiplication or division button was clicked
    switch (unicode) {
        case UNICODE_MULTIPLICATION:
        case UNICODE_DIVISION:
            displayOperations(e);
            operator = (unicode === UNICODE_MULTIPLICATION) ? MULTIPLY_OPERATOR
                : DIVIDE_OPERATOR;
            specialClicked = true;
            return;
    }

    // If equals button was clicked
    if (character === "=") {
        if (operatorButton !== null)
            operatorButton.classList.remove("operator-chosen");
        operatorButton = null;
        if (number1 === null) {
            number1 = Number(display.textContent);
            if (specialClicked && buffer !== null) {
                number1 = buffer;
                buffer = operate(operator, number1, number2);
                display.textContent = formatResult(buffer);
                number1 = null;
            }
            specialClicked = true;
        }
        else if (operator !== null) {
            number2 = Number(display.textContent);
            buffer = operate(operator, number1, number2);
            display.textContent = formatResult(buffer);
            number1 = null;
            specialClicked = true;
        }
        return;
    }
});
