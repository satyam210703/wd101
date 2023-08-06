const form = document.getElementById("user-form");
form.addEventListener("submit", function(event) {
  event.preventDefault(); // prevent page from reloading
  validateForm();
});

function validateForm() {
  const nameInput = document.getElementById("name").value;
  const emailInput = document.getElementById("email").value;
  const passwordInput = document.getElementById("password").value;
  const dobInput = new Date(document.getElementById("dob").value);
  const age = (new Date() - dobInput) / (365 * 24 * 60 * 60 * 1000);
  const termsChecked = document.getElementById("acceptTerms").checked;
  
  if (nameInput === "") {
    alert("Please enter your name.");
    return false;
  }

  if (emailInput === "") {
    alert("Please enter your email address.");
    return false;
  }

  if (passwordInput === "") {
    alert("Please enter a password.");
    return false;
  }

  if (age < 18 || age > 55) {
    alert("Please enter a valid date of birth (you must be between 18 and 55 years old).");
    return false;
  }

  if (!termsChecked) {
    alert("Please accept the terms and conditions.");
    return false;
  }
}

let userEntries = [];

const retriveEntries = () => {
  const entries = localStorage.getItem("user-entries");
  if (entries) {
    return JSON.parse(entries);
  } else {
    return [];
  }
};

const displayEntries = () => {
  const entries = retriveEntries();

  const tableEntries = entries.map((entry) => {
    const nameCell = `<td>${entry.name}</td>`;
    const emailCell = `<td>${entry.email}</td>`;
    const passwordCell = `<td>${entry.password}</td>`;
    const dobCell = `<td>${entry.dob}</td>`;
    const TandCCell = `<td>${entry.TandC}</td>`;
    const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${TandCCell}</tr>`;
    return row;
  }).join("\n");

  const table = `<table border="2px"><tr><th>Name</th><th>Email</th><th>Password</th><th>Date of Birth</th><th>Accepted terms?</th></tr>${tableEntries}</table>`;
  const details = document.getElementById("user-entries");
  details.innerHTML = table;
}

const saveUserForm = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const termsChecked = document.getElementById("acceptTerms").checked;
  const age = calculateAge(new Date(dob));

  if (age >= 18 && age <= 55) {
    const entry = {
      name,
      email,
      password,
      dob,
      TandC: termsChecked
    };
    userEntries.push(entry);
    localStorage.setItem("user-entries", JSON.stringify(userEntries));
    displayEntries();
  } else {
    alert("Sorry, you must be between 18 and 55 years old to register.");
  }
};

const calculateAge = (birthday) => {
  const ageDifferenceMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifferenceMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

form.addEventListener("submit", saveUserForm);
displayEntries();
