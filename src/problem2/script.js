// Define the conversion rates
const conversionRates = {
     'BCN': { 'ADA': 0.5, 'ELA': 2 , 'BCN': 1},
     'ADA': { 'BCN': 2, 'ELA': 1.5, 'ADA': 1},
     'ELA': { 'BCN': 0.5, 'ADA': 0.66, 'ELA': 1},
};

function startup(){
    updateTable(JSON.parse(localStorage.getItem('transactions')) || []);
}
// Get the input and output elements
const inputCurrency = document.getElementById('input-currency');
const outputCurrency = document.getElementById('output-currency');
const inputSelect = document.getElementById('input-select');
const outputSelect = document.getElementById('output-select');

// Variable to store the last input element
let lastInputElement = inputCurrency;

// Function to convert the input value and update the output field
function convertCurrency(inputElement, outputElement, inputSelectElement, outputSelectElement, invertRate = false) {
     // Get the selected currencies
     const inputSelectedCurrency = inputSelectElement.value;
     const outputSelectedCurrency = outputSelectElement.value;

     // Get the conversion rate for the selected currencies
     let conversionRate = conversionRates[inputSelectedCurrency][outputSelectedCurrency];

     // Invert the conversion rate if necessary
     if (invertRate) {
          conversionRate = 1 / conversionRate;
     }

     // Convert the input value using the conversion rate
     const convertedValue = inputElement.value * conversionRate;

     // Update the output field with the converted value
     outputElement.value = convertedValue;
}

// Listen for changes in the input field and select fields for conversion from input to output
inputCurrency.addEventListener('input', function() {
     lastInputElement = inputCurrency;
     convertCurrency(inputCurrency, outputCurrency, inputSelect, outputSelect);
});
inputSelect.addEventListener('change', function() {
     if (lastInputElement === inputCurrency) {
          convertCurrency(inputCurrency, outputCurrency, inputSelect, outputSelect);
     } else {
          convertCurrency(outputCurrency, inputCurrency, outputSelect, inputSelect, true);
    }
});
outputSelect.addEventListener('change', function() {
    if (lastInputElement === inputCurrency) {
        convertCurrency(inputCurrency, outputCurrency, inputSelect, outputSelect);
    } else {
        convertCurrency(outputCurrency, inputCurrency, outputSelect, inputSelect, true);
    }
});

// Listen for changes in the output field and select fields for conversion from output to input
outputCurrency.addEventListener('input', function() {
    lastInputElement = outputCurrency;
    convertCurrency(outputCurrency, inputCurrency, outputSelect, inputSelect, true);
});
outputSelect.addEventListener('change', function() {
    if (lastInputElement === outputCurrency) {
        convertCurrency(outputCurrency, inputCurrency, outputSelect, inputSelect, true);
    } else {
        convertCurrency(inputCurrency, outputCurrency, inputSelect, outputSelect);
    }
});
inputSelect.addEventListener('change', function() {
    if (lastInputElement === outputCurrency) {
        convertCurrency(outputCurrency, inputCurrency, outputSelect, inputSelect, true);
    } else {
        convertCurrency(inputCurrency, outputCurrency, inputSelect, outputSelect);
    }
});

// Function to swap the currencies
function swap() {
    event.preventDefault();
    // Get the current values
    const inputCurrencyValue = inputCurrency.value;
    const outputCurrencyValue = outputCurrency.value;
    const inputSelectedCurrency = inputSelect.value;
    const outputSelectedCurrency = outputSelect.value;

     // Check if the input or output values are empty
     if (!inputCurrencyValue || !outputCurrencyValue) {
        alert('Please enter both an input and output value.');
        return;
    }

    // Create a transaction object
    const transaction = {
        inputCurrency: inputSelectedCurrency,
        inputAmount: inputCurrencyValue,
        outputCurrency: outputSelectedCurrency,
        outputAmount: outputCurrencyValue
    };
   
    // Get the existing transactions from local storage
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    // Add the new transaction to the array
    transactions.push(transaction);

    // Save the updated transactions back to local storage
    localStorage.setItem('transactions', JSON.stringify(transactions));

    // Update the table
    updateTable(transactions);
    alert('Transaction successful! Please check the table for details.');
}

// Function to update the table with the transactions
function updateTable(transactions) {
    // Get the table body
    const tableBody = document.getElementById('transactions-table-body');

    // Clear the table body
    tableBody.innerHTML = '';

    // Add a row for each transaction
    for (const transaction of transactions) {
        const row = document.createElement('tr');

        const inputCell = document.createElement('td');
        inputCell.textContent = `${transaction.inputAmount} ${transaction.inputCurrency}`;
        row.appendChild(inputCell);

        const outputCell = document.createElement('td');
        outputCell.textContent = `${transaction.outputAmount} ${transaction.outputCurrency}`;
        row.appendChild(outputCell);

        tableBody.appendChild(row);
    }
}
function clearAll() {
    // Remove the 'transactions' item from local storage
    localStorage.removeItem('transactions');

    // Update the table
    updateTable([]);
}

var dropdownOptions = document.getElementsByClassName('dropdown-option');

for (var i = 0; i < dropdownOptions.length; i++) {
  dropdownOptions[i].addEventListener('click', function(event) {
    document.getElementById('dropdown-button').innerHTML = this.innerHTML;
  });
}