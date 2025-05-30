const API = "http://172.17.40.7:8080";

document.getElementById("submit").addEventListener('click', () => {
  let obj = {
    firstName: document.getElementById("first_name").value,
    lastName: document.getElementById("last_name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    dateOfBirth: document.getElementById("date_of_birth").value
  }
  fetch(API+"/auth/register", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then((res) => {
      if(res.ok==false) {
        throw new Error("Error");
      }
      window.location.href = "/index.html";
    })
})