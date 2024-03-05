const calcButtons = document.querySelectorAll(".number-button");
let display = document.querySelector("#display");
let num1 = 0;
let num2 = 0;
let operator;

for (const button of calcButtons) {
    button.addEventListener("click", (element) => {
        if (display.textContent === "0") {
            display.textContent = element.target.textContent;
        } else if (display.textContent.length <= 9) {
            display.textContent = display.textContent + element.target.textContent;
        }
    });
};

document.querySelector("#clear").addEventListener("click", () => {
    display.textContent = "0";
});

document.querySelector("#decimal").addEventListener("click", () => {
    if (!display.textContent.includes(".") && (display.textContent.length <= 9)) {
        display.textContent = display.textContent + ".";
    }
});

const OPERATORS = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
};

function equals() {
    return OPERATORS[operator](num1, Number(display.textContent));
}

document.querySelector("#equal").addEventListener("click", () => {
    display.textContent = equals();
});

const operatorElements = document.querySelectorAll(".operator");
for (const operatorValue of operatorElements) {
    operatorValue.addEventListener("click", () => {
        num1 = Number(display.textContent);
        operator = operatorValue.textContent;
        display.textContent = 0;
    });
};
