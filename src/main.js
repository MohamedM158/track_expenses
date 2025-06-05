const description = document.getElementById("description");
const amount = document.getElementById("expense");
const addExpense = document.getElementById("add_expense");
const list = document.getElementById("list");
const income = document.getElementById("income");
const anotherIncome = document.getElementById("another_income");
const addIncome = document.getElementById("add_income");
const totalIncomeSpan = document.getElementById("total_income");
const totalExpensesSpan = document.getElementById("total_expenses");
const remainingSpan = document.getElementById("remaining");
const clear = document.getElementById("clear");

let totalExpense = 0;
let totalIncome = 0;

window.addEventListener("DOMContentLoaded", () => {
  const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
  const savedIncome = JSON.parse(localStorage.getItem("income")) || 0;

  totalIncome = savedIncome;
  totalIncomeSpan.textContent = `${totalIncome} EGP`;

  savedExpenses.forEach((exp) => {
    const item = document.createElement("li");
    item.textContent = `${exp.amount} for ${exp.description}`;
    item.classList.add("text-[#5A827E]", "expense_item");
    list.appendChild(item);
    totalExpense += +exp.amount;
  });

  totalExpensesSpan.textContent = `${totalExpense} EGP`;
  updateRemaining();
});

function updateRemaining() {
  const totalRemaining = totalIncome - totalExpense;
  remainingSpan.textContent = `${totalRemaining} EGP`;
}

addExpense.addEventListener("click", function (e) {
  e.preventDefault();
  if (description.value.length > 0 && amount.value > 0) {
    const item = document.createElement("li");
    item.textContent = `${amount.value} for ${description.value}`;
    item.classList.add("text-[#5A827E]", "expense_item");
    list.appendChild(item);

    totalExpense += +amount.value;
    totalExpensesSpan.textContent = `${totalExpense} EGP`;

    const oldExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    oldExpenses.push({ amount: +amount.value, description: description.value });
    localStorage.setItem("expenses", JSON.stringify(oldExpenses));

    updateRemaining();

    description.value = "";
    amount.value = "";
  }
});

addIncome.addEventListener("click", function (e) {
  e.preventDefault();

  const addedIncome = +income.value + +anotherIncome.value;
  totalIncome += addedIncome;
  totalIncomeSpan.textContent = `${totalIncome} EGP`;

  localStorage.setItem("income", JSON.stringify(totalIncome));

  updateRemaining();

  income.value = "";
  anotherIncome.value = "";
});

clear.addEventListener("click", function () {
  localStorage.removeItem("expenses");
  localStorage.removeItem("income");
  location.reload();
});
