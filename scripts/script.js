let userInfo = JSON.parse(localStorage.getItem("user")) || [];
const setUserInfo = () =>
  localStorage.setItem("user", JSON.stringify(userInfo));

const accNo = document.querySelector("#input-acc");
const pin = document.querySelector("#input-pin");
const loginBtn = document.querySelector("#btn-login");
function newUserAuthenticate() {
  const user = {
    accNo: "",
    pin: 0,
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