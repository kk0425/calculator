const calcButtons = document.querySelectorAll(".number-button");
let display = document.querySelector("#display");
let history = document.querySelector("#display-history");
let operand1 = null;
let operand2 = null;
let operator = '';
let inputReset = false;

for (const button of calcButtons) {
    button.addEventListener("click", (element) => {
        if (display.textContent === "0" || inputReset) {
            display.textContent = element.target.textContent;
            inputReset = false;
        } else if (display.textContent.length <= 9) {
            display.textContent = display.textContent + element.target.textContent;
        }
    });
};

document.querySelector("#clear").addEventListener("click", () => {
    display.textContent = 0;
    operand1 = null;
    operand2 = null;
    operator = '';
    history.textContent = '';
    inputReset = false;
});

document.querySelector("#decimal").addEventListener("click", () => {
    if (!display.textContent.includes(".") && (display.textContent.length < 9)) {
        display.textContent = display.textContent + ".";
    }
});

function equals() {
    const OPERATORS = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => a / b,
    };
    return OPERATORS[operator](Number(operand1), Number(display.textContent));
}

document.querySelector("#equal").addEventListener("click", () => {
    display.textContent = equals();
});

const operatorElements = document.querySelectorAll(".operator");
for (const operatorValue of operatorElements) {
    operatorValue.addEventListener("click", () => {
        operator = operatorValue.textContent;
        history.textContent = history.textContent + " " + display.textContent + " " + operator + " ";
        operand1 = display.textContent;
        inputReset = true;
    });
};

document.querySelector("#percent").addEventListener("click", () => {
    display.textContent = Number(display.textContent) / 100;
});