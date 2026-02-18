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
    const time = now.toLocaleString().split(",").join("|");
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

  // Logout
  const logOutBtn = document.querySelector("#logoutBtn");
  logOutBtn.addEventListener("click", ()=> {
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

  // Call important functions
  renderBalance(userInfo);
}
