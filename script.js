// Get the display element from the document
const display = document.getElementById('display');
// Initialize currentOperation to manage ongoing calculations
let currentOperation = '';

// Function to append/attach a value to the current display and handle ongoing operations
function appendToDisplay(value) {
    // Check if the entered value is an operator and there's an ongoing operation
    if (['+', '-', '*', '/', '^'].includes(value) && currentOperation) {
        // Calculate the result of the current operation before adding a new operator
        calculate();
    }
    // Append the value to the display
    display.value += value;
    // Add the value to the string of current operations
    currentOperation += value;
}

// Function to clear the display and reset currentOperation
function clearDisplay() {
    // Clear the display
    display.value = '';
    // Reset the current operation string blank
    currentOperation = '';
}

// Function to evaluate the current operation
function calculate() {
    try {
        // Handle exponentiation separately due to eval not supporting '^' for power operations
        if (currentOperation.includes('^')) {
            const parts = currentOperation.split('^');
            const base = parseFloat(parts[0]);
            const exponent = parseFloat(parts[1]);
            display.value = Math.pow(base, exponent);
        } else {
            const result = eval(currentOperation);
            // Check for division by zero which results in Infinity
            if (!isFinite(result)) {
                throw new Error("Division by zero");
            }
            display.value = result;
        }
        // Set the current operation to the result for further operations
        currentOperation = display.value.toString();
    } catch (error) {
        // If an error occurs, display 'Error!!' and reset currentOperation
        display.value = "Error!!";
        currentOperation = '';
    }
}

// Function to calculate the percentage of the current number
function calculatePercentage() {
    try {
        const result = parseFloat(currentOperation) / 100;
        display.value = result.toString();
        currentOperation = result.toString();
    } catch (error) {
        display.value = "Error!!";
        currentOperation = '';
    }
}

// Function to calculate the square root of the current number
function calculateSquareRoot() {
    try {
        const result = Math.sqrt(parseFloat(currentOperation));
        if (!isFinite(result)) {
            throw new Error("Invalid input for square root");
        }
        display.value = result.toString();
        currentOperation = result.toString();
    } catch (error) {
        display.value = "Error!!";
        currentOperation = '';
    }
}
