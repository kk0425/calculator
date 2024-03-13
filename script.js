//TODO
//fix overflow on results; eg show 1.30000e13 or some other format
//add keyboard support

const calcButtons = document.querySelectorAll(".number-button");
let display = document.querySelector("#display");
let history = document.querySelector("#display-history");
let operand1 = null;
let operator = '';
let inputReset = false;

for (const button of calcButtons) {
    button.addEventListener("click", (element) => {
        if (display.textContent === "0" || inputReset) {
            if (history.textContent.includes("=")) {
                history.textContent = '';
            }
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
    if (operator) {
        if (!history.textContent.includes("=")) {
            history.textContent = operand1 + " " + operator + " " + display.textContent + " =";
            display.textContent = equals();
            operand1 = null;
            operator = '';
            inputReset = true;
        }
    }
});

const operatorElements = document.querySelectorAll(".operator");
for (const operatorValue of operatorElements) {
    operatorValue.addEventListener("click", () => {
        if (operator) {
            display.textContent = equals();
        }
        operand1 = display.textContent;
        operator = operatorValue.textContent;
        history.textContent = display.textContent + " " + operator;
        inputReset = true;
    });
};

document.querySelector("#percent").addEventListener("click", () => {
    display.textContent = Number(display.textContent) / 100;
});

document.querySelector("#sign").addEventListener("click", () => {
    display.textContent = Number(display.textContent) * -1;
});

document.querySelector("#backspace").addEventListener("click", () => {
    display.textContent = Number(display.textContent.toString().slice(0, -1));
});

let memory = null;
document.querySelector("#memory-store").addEventListener("click", () => {
    memory = display.textContent;
    document.querySelector("#memory-display").classList.remove("memory-display-hidden");
});

document.querySelector("#memory-recall").addEventListener("click", () => {
    if (memory) display.textContent = memory;
});

document.querySelector("#memory-clear").addEventListener("click", () => {
    memory = null;
    document.querySelector("#memory-display").classList.add("memory-display-hidden");
});