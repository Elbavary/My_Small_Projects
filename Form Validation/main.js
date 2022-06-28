// Form Validation

const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// Check input validation
function checkValid(inputArr) {
  inputArr.forEach(input => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// Check Valid Email

function checkEmail(input) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else if (input.value.trim() === "") {
    showError(input, "Email is required");
  } else {
    showError(input, "Email is not valid");
  }
}

//  check input fields length
function checkLength(input, min, max) {
  if (input.value === "") {
    showError(input, `${getFieldName(input)} is required`);
  } else if (input.value.length < min && input.value !== "") {
    showError(
      input,
      `${getFieldName(input)} should be more than ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} should be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

// checkPassword does not Match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match");
  }
}

// Get fieldName
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener("submit", e => {
  e.preventDefault();
  checkValid([username, email, password, password2]);
  checkEmail(email);
  checkLength(username, 4, 10);
  checkLength(password, 8, 15);
  checkPasswordsMatch(password, password2);
});
