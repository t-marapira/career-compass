const assessmentForm = document.querySelector("form");

assessmentForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const career = document.querySelector("select").value;

    const checkedModules = [];

    const checkboxes = document.querySelectorAll(".module-list input");

    checkboxes.forEach(box => {

        if (box.checked) {

            checkedModules.push(box.parentElement.textContent.trim());

        }

    });

    if (career === "Select a Career") {

        alert("Please select a career.");

        return;

    }

    if (checkedModules.length === 0) {

        alert("Please select at least one completed module.");

        return;

    }

    console.log(career);

    console.log(checkedModules);

    window.location.href = "results.html";

});