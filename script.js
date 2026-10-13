// 2. Store Application Data & Declare Variables
let totalBudget = 0;
let totalExpenses = 0;

// 3. Collect User Input using JavaScript prompts
function getUserInputs() {
    let budgetInput = prompt("Enter your total monthly budget ($):", "1000");
    let expenseInput = prompt("Enter your total monthly expenses ($):", "450");

    // Convert inputs to floating point numbers
    totalBudget = parseFloat(budgetInput) || 0;
    totalExpenses = parseFloat(expenseInput) || 0;
}

// 4 & 5. Perform Budget Calculations with Reusable Functions
function calculateRemainingBalance(budget, expenses) {
    return budget - expenses;
}

function calculateSavingsPercentage(budget, expenses) {
    if (budget === 0) return 0;
    let remaining = calculateRemainingBalance(budget, expenses);
    return (remaining / budget) * 100;
}

// 6. Display Results in the browser console
function runSpendWiseTracker() {
    getUserInputs();

    let remainingBalance = calculateRemainingBalance(totalBudget, totalExpenses);
    let savingsPercentage = calculateSavingsPercentage(totalBudget, totalExpenses);

    console.log("==========================================");
    console.log("       SPENDWISE BUDGET SUMMARY           ");
    console.log("==========================================");
    console.log(`Total Monthly Budget  : $${totalBudget.toFixed(2)}`);
    console.log(`Total Monthly Expenses: $${totalExpenses.toFixed(2)}`);
    console.log(`Remaining Balance     : $${remainingBalance.toFixed(2)}`);
    console.log(`Savings Percentage    : ${savingsPercentage.toFixed(1)}%`);
    console.log("==========================================");
}

// Execute the function when script loads
runSpendWiseTracker();