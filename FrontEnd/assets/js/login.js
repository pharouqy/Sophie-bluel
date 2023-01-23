const url = "http://localhost:5678/api/";

const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = {
    email: email.value,
    password: password.value,
  };
  fetch(`${url}users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (!response.ok) {
      } else {
        return response;
      }
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
});
