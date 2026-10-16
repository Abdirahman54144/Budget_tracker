// ==========================================
// 1. Data Structures & State Management
// ==========================================
let totalBudget = 0;
let expensesArray = []; // Array to store expense objects[cite: 28, 29]

// DOM Element Selectors
const budgetForm = document.getElementById('budgetForm');
const expenseForm = document.getElementById('expenseForm');
const monthlyBudgetInput = document.getElementById('monthlyBudget');
const expenseTitleInput = document.getElementById('expenseTitle');
const expenseAmountInput = document.getElementById('expenseAmount');

const displayBudget = document.getElementById('displayBudget');
const displayExpenses = document.getElementById('displayExpenses');
const displayBalance = document.getElementById('displayBalance');
const statusMessage = document.getElementById('statusMessage');
const expenseList = document.getElementById('expenseList');

// ==========================================
// 2. Helper Functions & Loops
// ==========================================

// Process expenses array using a loop to calculate total expenses[cite: 28, 29]
function calculateTotalExpenses() {
    let total = 0;
    for (let i = 0; i < expensesArray.length; i++) {
        total += expensesArray[i].amount;
    }
    return total;
}

// Render expense items dynamically into the DOM using loop[cite: 28, 29]
function renderExpenseList() {
    expenseList.innerHTML = '';

    if (expensesArray.length === 0) {
        expenseList.innerHTML = '<li style="color: #64748b;">No expenses added yet.</li>';
        return;
    }

    expensesArray.forEach((expense) => {
        const li = document.createElement('li');
        li.className = 'expense-item';
        li.innerHTML = `
            <span>${expense.title}</span>
            <span class="amount">-$${expense.amount.toFixed(2)}</span>
        `;
        expenseList.appendChild(li);
    });
}

// Implement Decision Making (Conditionals)[cite: 28, 29]
function updateStatusMessage(balance) {
    if (totalBudget === 0) {
        statusMessage.textContent = "Please set your monthly budget first.";
        statusMessage.className = "status-alert info";
    } else if (balance < 0) {
        statusMessage.textContent = "Warning: You have exceeded your budget!";
        statusMessage.className = "status-alert danger";
    } else if (balance <= totalBudget * 0.2) {
        statusMessage.textContent = "Caution: You have used over 80% of your budget.";
        statusMessage.className = "status-alert warning";
    } else {
        statusMessage.textContent = "Great job! Your budget is well within healthy limits.";
        statusMessage.className = "status-alert success";
    }
}

// Update the Dashboard Dynamically (DOM Manipulation)[cite: 28, 29]
function updateDashboard() {
    const totalExpenses = calculateTotalExpenses();
    const remainingBalance = totalBudget - totalExpenses;

    displayBudget.textContent = `$${totalBudget.toFixed(2)}`;
    displayExpenses.textContent = `$${totalExpenses.toFixed(2)}`;
    displayBalance.textContent = `$${remainingBalance.toFixed(2)}`;

    updateStatusMessage(remainingBalance);
    renderExpenseList();
}

// ==========================================
// 3. Event Listeners & Interaction Handling
// ==========================================

// Handle Budget Form Submission[cite: 28, 29]
budgetForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const budgetValue = parseFloat(monthlyBudgetInput.value);

    if (!isNaN(budgetValue) && budgetValue >= 0) {
        totalBudget = budgetValue;
        updateDashboard();
        monthlyBudgetInput.value = '';
    }
});

// Handle Expense Form Submission[cite: 28, 29]
expenseForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const title = expenseTitleInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value);

    if (title !== '' && !isNaN(amount) && amount > 0) {
        // Store multiple records in array[cite: 28, 29]
        expensesArray.push({
            title: title,
            amount: amount
        });

        updateDashboard();

        // Clear input fields
        expenseTitleInput.value = '';
        expenseAmountInput.value = '';
    }
});

// Initial Dashboard Render
updateDashboard();