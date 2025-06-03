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
let totalRemaining = 0;

function updateRemaining() {
  const totalRemaining = totalIncome - totalExpense;
  remainingSpan.textContent = `${totalRemaining} EGP`;
}

addExpense.addEventListener("click", function (e) {
  e.preventDefault();
  if (description.value.length > 0 && amount.value > 0) {
    const item = document.createElement("li");
    const itemText = document.createTextNode(
      `${amount.value} for ${description.value}`
    );

    item.appendChild(itemText);
    list.appendChild(item);

    item.classList.add("text-[#5A827E]", "expense_item");

    totalExpense += +amount.value;
    totalExpensesSpan.textContent = `${totalExpense} EGP`;

    updateRemaining();

    description.value = "";
    amount.value = "";
  }
});

addIncome.addEventListener("click", function (e) {
  e.preventDefault();

  totalIncome += +income.value + +anotherIncome.value;
  totalIncomeSpan.textContent = `${totalIncome} EGP`;

  updateRemaining();

  income.value = "";
  anotherIncome.value = "";
});
