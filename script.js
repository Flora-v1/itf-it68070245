const inputAccount = document.getElementById("inputAccount");
const inputBalance = document.getElementById("inputBalance");
const result = document.getElementById("result");
const accountDisplay = document.getElementById("accountDisplay");
const cashDisplay = document.getElementById("cashDisplay");
const amountInput = document.getElementById("amount");
const errorMsg = document.getElementById("error");
const historyList = document.getElementById("history");
const operationSelect = document.getElementById("operation");

let accountBalance = 0;
let cashBalance = 0;

function change() {
  accountBalance = Number(inputAccount.value);
  cashBalance = Number(inputBalance.value);

  updateDisplay();
  addHistory("ตั้งค่าเริ่มต้น");
}

function updateDisplay() {
  result.textContent = `Account Balance: ${accountBalance.toLocaleString()} บาท | Cash Balance: ${cashBalance.toLocaleString()} บาท`;
  accountDisplay.textContent = accountBalance.toLocaleString();
  cashDisplay.textContent = cashBalance.toLocaleString();
  errorMsg.textContent = "";
}

// 🔹 ใช้ select เลือกฝากหรือถอน
function processTransaction() {
  const amount = Number(amountInput.value);
  const operation = operationSelect.value;

  if (amount <= 0) {
    showError("กรุณาใส่จำนวนเงินที่ถูกต้อง");
    return;
  }

  if (operation === "deposit") {
    if (amount > cashBalance) {
      showError("❌ ERROR: เงินสดไม่พอสำหรับการฝาก");
      addHistory("❌ ERROR: เงินสดไม่พอสำหรับการฝาก");
      return;
    }
    cashBalance -= amount;
    accountBalance += amount;
    addHistory(`ฝากเงิน ${amount.toLocaleString()} บาท`);
  } 
  else if (operation === "withdraw") {
    if (amount > accountBalance) {
      showError("❌ ERROR: ยอดเงินในบัญชีไม่พอสำหรับการถอน");
      addHistory("❌ ERROR: ยอดเงินในบัญชีไม่พอสำหรับการถอน");
      return;
    }
    accountBalance -= amount;
    cashBalance += amount;
    addHistory(`ถอนเงิน ${amount.toLocaleString()} บาท`);
  }

  updateDisplay();
  amountInput.value = "";
}

function showError(message) {
  errorMsg.textContent = message;
}

function addHistory(action) {
  const li = document.createElement("li");
  li.textContent = `${action} → Account: ${accountBalance.toLocaleString()} บาท | Cash: ${cashBalance.toLocaleString()} บาท`;
  historyList.appendChild(li);
}
