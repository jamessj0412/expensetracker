// DOM Elements
const balanceElement = document.getElementById('balance');
const incomeElement = document.getElementById('income');
const expenseElement = document.getElementById('expense');
const transactionList = document.getElementById('transactionList');
const categoryReport = document.getElementById('categoryReport');
const form = document.getElementById('transactionForm');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');

// Initial state
let transactions = [];

// Update balance, income and expense
function updateBalance() {
  const income = transactions
    .filter(transaction => transaction.amount > 0)
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const expenses = transactions
    .filter(transaction => transaction.amount < 0)
    .reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0);

  const balance = income - expenses;

  incomeElement.innerText = `$${income.toFixed(2)}`;
  expenseElement.innerText = `$${expenses.toFixed(2)}`;
  balanceElement.innerText = balance.toFixed(2);
}

// Update transaction list
function updateTransactionList() {
  transactionList.innerHTML = '';

  transactions.forEach((transaction, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      ${transaction.description} - $${Math.abs(transaction.amount.toFixed(2))} 
      <span>${transaction.category}</span>
      <button onclick="deleteTransaction(${index})">X</button>
    `;
    transactionList.appendChild(listItem);
  });
}

// Update category report
function updateCategoryReport() {
  const categories = {};

  transactions.forEach(transaction => {
    if (transaction.category !== 'income') {
      categories[transaction.category] = (categories[transaction.category] || 0) + Math.abs(transaction.amount);
    }
  });

  categoryReport.innerHTML = '';
  for (const category in categories) {
    const listItem = document.createElement('li');
    listItem.textContent = `${category}: $${categories[category].toFixed(2)}`;
    categoryReport.appendChild(listItem);
  }
}

// Add transaction
function addTransaction(event) {
  event.preventDefault();

  const description = descriptionInput.value;
  const amount = parseFloat(amountInput.value);
  const category = categoryInput.value;

  const transaction = {
    description,
    amount: category === 'income' ? amount : -Math.abs(amount),
    category
  };

  transactions.push(transaction);
  updateBalance();
  updateTransactionList();
  updateCategoryReport();

  form.reset();
}

// Delete transaction
function deleteTransaction(index) {
  transactions.splice(index, 1);
  updateBalance();
  updateTransactionList();
  updateCategoryReport();
}

// Event Listener
form.addEventListener('submit', addTransaction);

