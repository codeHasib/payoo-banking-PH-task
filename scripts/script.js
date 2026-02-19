let userInfo = JSON.parse(localStorage.getItem("user")) || [];
const setUserInfo = () =>
  localStorage.setItem("user", JSON.stringify(userInfo));

if (document.body.id === "login-page") {
  const accNo = document.querySelector("#input-acc");
  const pin = document.querySelector("#input-pin");
  const loginBtn = document.querySelector("#btn-login");
  function newUserAuthenticate() {
    const user = {
      accNo: "",
      pin: 0,
      balance: 0,
    };
    const accNoValue = accNo.value.trim();
    const pinValue = pin.value.trim();
    if (accNoValue.length < 11) {
      alert("Invalid Account Number");
      return;
    }
    user.accNo = accNoValue;
    if (pinValue.length < 4) {
      alert("Invalid Pin");
      return;
    }
    user.pin = pinValue;
    accNo.value = "";
    pin.value = "";
    userInfo.push(user);
    setUserInfo();
  }
  pin.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      newUserAuthenticate();
      window.location.replace("home.html");
    }
  });
  loginBtn.addEventListener("click", () => {
    newUserAuthenticate();
    window.location.replace("home.html");
  });
  function checkUser() {
    if (userInfo.length > 0) {
      window.location.replace("home.html");
    }
  }
  checkUser();
}

let appState = JSON.parse(localStorage.getItem("appState")) || [];
let setAppState = () =>
  localStorage.setItem("appState", JSON.stringify(appState));

if (document.body.id === "home-page") {
  // HomePage DOMS
  const balanceDisplay = document.querySelector(".balance");
  // Add Money
  const addMoneySelect = document.querySelector("#add-money-select");
  addMoneySelect.addEventListener("click", () => {
    sectionSelect("add-money-section");
  });
  const bankSel = document.querySelector("#bank-select");
  const addMoneyAccNo = document.querySelector("#add-money-acc");
  const addMoneyAmnt = document.querySelector("#add-money-amnt");
  const addMoneyPin = document.querySelector("#add-money-pin");
  const addMoneyBtn = document.querySelector("#add-money-btn");
  function addMoney() {
    const type = "Add Money";
    const bankValue = bankSel.value;
    if (bankValue.length <= 0) {
      alert("Please select a bank");
      return;
    }
    const addMoneyAccNoValue = addMoneyAccNo.value.trim();
    if (addMoneyAccNoValue.length < 11) {
      alert("Invalid Acc Number");
      return;
    }
    const amountValue = Number(addMoneyAmnt.value.trim());
    if (amountValue < 0) {
      alert("Invalid Amount");
      return;
    }
    const pinValue = addMoneyPin.value.trim();
    if (pinValue !== userInfo[0].pin) {
      alert(`Incorrect user pin
      Your saved pin is: ${userInfo[0].pin};
        `);
      return;
    }
    userInfo[0].balance += amountValue;
    balanceDisplay.textContent = `$${userInfo[0].balance}`;
    const now = new Date();
    const time = now.toLocaleString().split(",").join(" - ");
    addTransactions(type, amountValue, addMoneyAccNoValue, time);
    setAppState();
    setUserInfo();
    bankSel.value = "";
    addMoneyAccNo.value = "";
    addMoneyAmnt.value = "";
    addMoneyPin.value = "";
  }
  addMoneyBtn.addEventListener("click", () => {
    addMoney();
  });
  // Cash-out
  const cashOutSelect = document.querySelector("#cash-out-select");
  cashOutSelect.addEventListener("click", () => {
    sectionSelect("cash-out-section");
  });
  const cashOutNumberInput = document.querySelector("#cash-out-acc");
  const cashOutAmntInput = document.querySelector("#cash-out-amnt");
  const cashOutPinInput = document.querySelector("#cash-out-pin");
  const cashOutBtn = document.querySelector("#cash-out-btn");
  function cashOut() {
    const type = "Cash-out";
    const numberValue = cashOutNumberInput.value.trim();
    if (numberValue.length < 11 || numberValue.length > 11) {
      alert("Invalid Agent Number");
      return;
    }
    const amntValue = Number(cashOutAmntInput.value.trim());
    if (amntValue < 0 || amntValue > userInfo[0].balance) {
      alert("Invalid Amount or Insufficient Balance");
      return;
    }
    const pinValue = cashOutPinInput.value.trim();
    if (pinValue !== userInfo[0].pin) {
      alert(`Pin Doesnt Match 
        Your pin is: ${userInfo[0].pin}`);
      return;
    }
    const now = new Date();
    const time = now.toLocaleDateString().split(",").join(" - ");
    userInfo[0].balance -= amntValue;
    addTransactions(type, amntValue, numberValue, time);
    renderBalance(userInfo);
    setUserInfo();
    setAppState();
    cashOutNumberInput.value = "";
    cashOutAmntInput.value = "";
    cashOutPinInput.value = "";
  }
  cashOutBtn.addEventListener("click", () => {
    cashOut();
  });
  cashOutPinInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") cashOut();
  });
  // Transfer Money
  const transferMoneySelect = document.querySelector("#transfer-money-select");
  transferMoneySelect.addEventListener("click", () => {
    sectionSelect("transfer-money-section");
  });
  const transferMoneyAccInput = document.querySelector("#transfer-money-acc");
  const transferMoneyAmntInput = document.querySelector("#transfer-money-amnt");
  const transferMoneyPinInput = document.querySelector("#transfer-money-pin");
  const transferMoneyBtn = document.querySelector("#transfer-money-btn");
  function transferMoney() {
    const type = "Transfer Money";
    const numberValue = transferMoneyAccInput.value.trim();
    if (numberValue.length < 11 || numberValue.length > 11) {
      alert("Invalid User Number");
      return;
    }
    const amntValue = Number(transferMoneyAmntInput.value.trim());
    if (amntValue < 0 || amntValue > userInfo[0].balance) {
      alert("Invalid Amount or Insufficient Balance");
      return;
    }
    const pinValue = transferMoneyPinInput.value.trim();
    if (pinValue !== userInfo[0].pin) {
      alert(`Pin Doesnt Match 
        Your pin is: ${userInfo[0].pin}`);
      return;
    }
    const now = new Date();
    const time = now.toLocaleDateString().split(",").join(" - ");
    userInfo[0].balance -= amntValue;
    addTransactions(type, amntValue, numberValue, time);
    renderBalance(userInfo);
    setUserInfo();
    setAppState();
    transferMoneyAmntInput.value = "";
    transferMoneyAccInput.value = "";
    transferMoneyPinInput.value = "";
  }
  transferMoneyBtn.addEventListener("click", () => {
    transferMoney();
  });
  transferMoneyPinInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") transferMoney();
  });
  // Bonus Section
  const bonusSelect = document.querySelector("#bonus-select");
  bonusSelect.addEventListener("click", () => {
    sectionSelect("bonus-section");
  });
  const bonusCouponInput = document.querySelector("#bonus-coupon");
  const bonusBtn = document.querySelector("#bonus-btn");
  function getBonus() {
    const type = "Bonus Coupon";
    const couponValue = bonusCouponInput.value.trim().toLowerCase();
    if (couponValue === "hasib") {
      const now = new Date();
      const time = now.toLocaleString().split(",").join(" - ");
      userInfo[0].balance += 1000;
      renderBalance(userInfo);
      addTransactions(type, 1000, couponValue, time);
      setUserInfo();
      setAppState();
      bonusCouponInput.value = "";
    } else {
      alert("Invalid coupon code use: 'hasib'");
    }
  }
  bonusBtn.addEventListener("click", () => {
    getBonus();
  });
  bonusCouponInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") getBonus();
  });
  // Pay Bill
  const payBillSelect = document.querySelector("#pay-bill-select");
  payBillSelect.addEventListener("click", () => {
    sectionSelect("pay-bill-section");
  });
  const payBillTypeSelect = document.querySelector("#bill-select");
  const payBillAccInput = document.querySelector("#bill-acc");
  const payBillAmntInput = document.querySelector("#bill-amnt");
  const payBillPinInput = document.querySelector("#bill-pin");
  const payBillBtn = document.querySelector("#bill-btn");
  function payBill() {
    const type = "Pay Bill";
    const billType = payBillTypeSelect.value;
    if (billType.length <= 0) {
      alert("Please select a bill type");
      return;
    }
    const accNo = payBillAccInput.value.trim();
    if (accNo.length < 11 || accNo.length > 11) {
      alert("Invalid Acc Number");
      return;
    }
    const amountValue = Number(payBillAmntInput.value.trim());
    if (amountValue < 0 || amountValue > userInfo[0].balance) {
      alert("Invalid Amount or Insufficient Balance");
      return;
    }
    const pinValue = payBillPinInput.value.trim();
    if (pinValue !== userInfo[0].pin) {
      alert(`Incorrect user pin
      Your saved pin is: ${userInfo[0].pin};
        `);
      return;
    }
    userInfo[0].balance -= amountValue;
    const now = new Date();
    const time = now.toLocaleString().split(",").join(" - ");
    renderBalance(userInfo);
    addTransactions(type, amountValue, billType, time);
    setAppState();
    setUserInfo();
    billType.value = "";
    payBillAccInput.value = "";
    payBillAmntInput.value = "";
    payBillPinInput.value = "";
  }
  payBillBtn.addEventListener("click", () => {
    payBill();
  });
  payBillPinInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") payBill();
  });
  // Transactions
  const transSel = document.querySelector("#transactions-select");
  transSel.addEventListener("click", () => {
    sectionSelect("transactions-section");
    renderTransactions();
  });
  const transParentDiv = document.querySelector("#trans-div");
  function renderTransactions() {
    transParentDiv.innerHTML = "";
    if (appState.length > 0) {
      appState.forEach((trans) => {
        let div = document.createElement("div");
        let imageDiv = document.createElement("div");
        let img = document.createElement("img");
        img.src = "assets/opt-6.png";
        imageDiv.append(img);
        div.append(imageDiv);
        let textDiv = document.createElement("div");
        let h2 = document.createElement("h2");
        h2.textContent = trans.name;
        textDiv.append(h2);
        let p = document.createElement("p");
        p.textContent = trans.time;
        textDiv.append(p);
        div.append(textDiv);
        transParentDiv.append(div);
      });
    } else {
      transParentDiv.innerHTML = `<h2 class="text-center text-xl font-lighter">
        No history.
        </h2>`;
    }
  }

  // Logout
  const logOutBtn = document.querySelector("#logoutBtn");
  logOutBtn.addEventListener("click", () => {
    localStorage.clear();
    window.location.replace("index.html");
  });

  // Re usable functions
  function addTransactions(name, amount, accNo, time) {
    const transaction = {
      name: name,
      amount: amount,
      accNo: accNo,
      time: time,
    };
    appState.push(transaction);
  }
  function renderBalance(arr) {
    if (arr.length > 0) {
      balanceDisplay.textContent = `$${arr[0].balance}`;
    }
  }
  function sectionSelect(id) {
    const allMethods = document.querySelectorAll(".methods");
    allMethods.forEach((section) => {
      section.style.display = "none";
    });
    if (id) {
      const selected = document.querySelector(`#${id}`);
      selected.style.display = "block";
    }
  }
  // Call important functions
  renderBalance(userInfo);
  sectionSelect();
}
