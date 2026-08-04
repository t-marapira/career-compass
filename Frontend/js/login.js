const loginForm = document.querySelector("form");

loginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const email = document.querySelector("input[type='email']").value;

    const password = document.querySelector("input[type='password']").value;

    if (email === "" || password === "") {

        alert("Please enter your email and password.");

        return;

    }

    alert("Login Successful!");

    window.location.href = "dashboard.html";

});