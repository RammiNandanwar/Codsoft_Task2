document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentExpression = '';

    function updateDisplay() {
        display.innerText = currentExpression;
    }

    function appendToDisplay(value) {
        if (value === '.' && currentExpression.slice(-1) === '.') return;
        currentExpression = currentExpression.toString() + value.toString();
        updateDisplay();
    }

    function calculate() {
        try {
            currentExpression = eval(currentExpression).toString();
        } catch (e) {
            currentExpression = 'Error';
        }
        updateDisplay();
    }

    function clearDisplay() {
        currentExpression = '';
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
            else 
            {
                const operators = ['+', '-', '*', '/'];
                if (operators.includes(value)) {
                    appendToDisplay(value);
                }
            }
        });
    });
});
