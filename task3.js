document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentExpression = '';

    function updateDisplay() {
        display.innerText = currentExpression;
    }
    function appendToDisplay(value) {
        const operators = ['+', '-', '*', '/', '%', '^', '√'];

        if (value === '.' && currentExpression.slice(-1) === '.') return;
        if (operators.includes(value) && operators.includes(currentExpression.slice(-1))) return;
        if (currentExpression === '' && operators.includes(value)) return;
        currentExpression = currentExpression.toString() + value.toString();
        updateDisplay();
    }
    function calculate() {
        try {
            let result;
            if (currentExpression.includes('√')) {
                const number = parseFloat(currentExpression.split('√')[1]);
                result = Math.sqrt(number);
            } else if (currentExpression.includes('^')) {
                const [base, exponent] = currentExpression.split('^').map(Number);
                result = Math.pow(base, exponent);
            } else {
                result = eval(currentExpression.replace('%', '/100'));
            }
            currentExpression = result.toString();
        } catch (e) {
            currentExpression = 'Error';
        }
        updateDisplay();
    }
    function clearDisplay() {
        currentExpression = '';
        updateDisplay();
    }
    function backspace() {
        currentExpression = currentExpression.slice(0, -1);
        updateDisplay();
    }

    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.innerText;
            if (value >= '0' && value <= '9' || value === '.') {
                appendToDisplay(value);
            } 
            else if (value === 'C') {
                clearDisplay();
            } 
            else if (value === '=') {
                calculate();
            } 
            else if (value === '←') {
                backspace();
            } 
            else 
            {
                const operators = ['+', '-', '*', '/', '%', '^', '√'];
                if (operators.includes(value)) {
                    appendToDisplay(value);
                }
            }
        });
    });
});
