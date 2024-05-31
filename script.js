const display = document.getElementById('display');

function appendToDisplay(input) {
    display.value += input;
}

function clearDisplay() {
    display.value = "";
}

function backspaceDisplay() {
    let value = display.value;
    display.value = value.substr(0, value.length - 1);
}

function calculate() {
    try {
        let expression = display.value;

        // Handle square root
        expression = expression.replace(/√(\d+)/g, (_, number) => Math.sqrt(number));

        // Handle power
        expression = expression.replace(/\^/g, '**');

        // Handle factorial
        while (expression.includes('!')) {
            const factorialRegex = /(\d+)!/;
            const match = factorialRegex.exec(expression);
            if (match) {
                const num = parseInt(match[1], 10);
                const factorial = factorialOf(num);
                expression = expression.replace(factorialRegex, factorial);
            }
        }

        // Evaluate the final expression
        display.value = eval(expression);
    } catch (error) {
        display.value = "Error";
    }
}

function factorialOf(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorialOf(n - 1);
}
