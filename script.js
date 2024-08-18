const totalBill = document.getElementById("totalbill");
const numberOfPeople = document.getElementById("numberOfPeople");
const tipButtons = document.querySelectorAll(".tip-btn");
const customTip = document.getElementById("customTip");
const tipTotal = document.getElementById("tipTotal");
const perPerson = document.getElementById("perPerson");
const resetBtn = document.getElementById("resetBtn");

// Function to calculate and display tip
function calculateTip(tipPercentage) {
    const bill = parseFloat(totalBill.value);
    const people = parseInt(numberOfPeople.value);

    console.log(`Bill: ${bill}, People: ${people}, Tip Percentage: ${tipPercentage}`);

    // Validate bill input
    if (isNaN(bill) || bill <= 0) {
        document.getElementById("errorMessageBill").textContent = "Can't be zero";
        totalBill.classList.add("border-red-500");
        return;
    } else {
        document.getElementById("errorMessageBill").textContent = "";
        totalBill.classList.remove("border-red-500");
    }

    // Validate number of people input
    if (isNaN(people) || people <= 0) {
        document.getElementById("errorMessagePeople").textContent = "Can't be zero";
        numberOfPeople.classList.add("border-red-500");
        return;
    } else {
        document.getElementById("errorMessagePeople").textContent = "";
        numberOfPeople.classList.remove("border-red-500");
    }

    // Check if tipPercentage is a valid number
    if (isNaN(tipPercentage) || tipPercentage <= 0) {
        console.error("Invalid tip percentage");
        return;
    }

    // Calculate tip and total amounts
    const tipAmount = (bill * tipPercentage) / 100;
    const totalAmount = bill + tipAmount;
    const perPersonAmount = totalAmount / people;

    console.log(`Tip Amount: ${tipAmount}, Total Amount: ${totalAmount}, Per Person Amount: ${perPersonAmount}`);

    // Update the display with the calculated values
    tipTotal.textContent = `$${tipAmount.toFixed(2)}`;
    perPerson.textContent = `$${perPersonAmount.toFixed(2)}`;
}

// Event listeners for tip buttons
tipButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Remove active class from all buttons
        tipButtons.forEach(btn => btn.classList.remove("active"));
        customTip.value = ''; // Clear custom tip input

        // Add active class to clicked button
        button.classList.add("active");

        const tipValueStr = button.getAttribute("data-type");
        console.log(`Button Tip Value (String): ${tipValueStr}`);
        if (tipValueStr) {
            const tipValue = parseFloat(tipValueStr);
            console.log(`Parsed Tip Value: ${tipValue}`);
            if (!isNaN(tipValue)) {
                calculateTip(tipValue);
            } else {
                console.error("Invalid tip value from button");
            }
        } else {
            console.error("data-tip attribute is missing or empty");
        }
    });
});

// Event listener for custom tip input
customTip.addEventListener("input", () => {
    // Remove active class from all buttons
    tipButtons.forEach(btn => btn.classList.remove("active"));

    const tipValue = parseFloat(customTip.value);
    console.log(`Custom Tip Value: ${tipValue}`);
    if (!isNaN(tipValue) && tipValue > 0) {
        calculateTip(tipValue);
    } else {
        console.error("Invalid custom tip value");
    }
});

// Reset button
resetBtn.addEventListener("click", () => {
    totalBill.value = '';
    numberOfPeople.value = '';
    customTip.value = '';
    tipTotal.textContent = '$0.00';
    perPerson.textContent = '$0.00';
    tipButtons.forEach(btn => btn.classList.remove("active"));
    document.getElementById("errorMessageBill").textContent = "";
    document.getElementById("errorMessagePeople").textContent = "";
    totalBill.classList.remove("border-red-500");
    numberOfPeople.classList.remove("border-red-500");
});
