const url = "http://localhost:5678/api/";

const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.querySelector("form");

const errorContainer = document.createElement("p");
errorContainer.classList.add("error");
const submitButton = document.querySelector('input[type ="submit"]');
form.insertBefore(errorContainer, submitButton);

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
        if (errorContainer == true) {
          form.removeChild(errorContainer);
        }
        if (response.status === 404) {
          errorContainer.textContent = "L'adresse email est incorrect !!!";
        } else if (response.status === 401) {
          errorContainer.textContent = "Le mot de passe est incorret !!!";
        }
      } else {
        return response.json();
      }
    })
    .then((data) => {
      console.log(localStorage);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("token", data.token);
      document.location.href = "./index.html";
    })
    .catch((err) => {
      console.log(err);
    });
});
