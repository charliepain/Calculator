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
        case "+":
            return add(number1, number2); 
        case "-":
            return subtract(number1, number2);
        case "*":
            return multiply(number1, number2);
        case "/":
            return divide(number1, number2);
    }   
}

let display = document.querySelector(".display");

let number1;
let operator;
let number2;


const buttons = document.querySelector(".buttons");
buttons.addEventListener("click", e => {
    const character = e.target.textContent;
    if (!isNaN(character)
        || character === "+"
        || character === "-") {
            display.textContent += ` ${character}`;
            return;
    }

    const unicode = character.codePointAt(0);
    switch (unicode) {
        case 215:
        case 247:
            display.textContent += ` ${String.fromCharCode(unicode)}`;
            break;
    }
});
