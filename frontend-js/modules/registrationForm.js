import axios from "axios";

export default class RegistrationForm {
  constructor() {
    // DOM Selectors
    this._csrf = document.querySelector('[name="_csrf"]').value;
    this.form = document.querySelector("#registration-form");
    this.allFields = document.querySelectorAll(
      "#registration-form .form-control"
    );
    this.username = document.querySelector("#username-register");
    this.username.previousValue = "";
    this.email = document.querySelector("#email-register");
    this.email.previousValue = "";
    this.password = document.querySelector("#password-register");
    this.password.previousValue = "";
    this.username.isUnique = false;
    this.email.isUnique = false;

    // Method Calls
    this.insertValidationElements();
    this.events();
  }

  // Events
  events() {
    // Username Event Handler
    this.username.addEventListener("keyup", () => {
      this.isDifferent(this.username, this.usernameHandler);
    });

    // Email Event Handler
    this.email.addEventListener("keyup", () => {
      this.isDifferent(this.email, this.emailHandler);
    });

    // Password Event Handler
    this.password.addEventListener("keyup", () => {
      this.isDifferent(this.password, this.passwordHandler);
    });

    this.username.addEventListener("blur", () => {
      this.isDifferent(this.username, this.usernameHandler);
    });

    this.email.addEventListener("blur", () => {
      this.isDifferent(this.email, this.emailHandler);
    });

    this.password.addEventListener("blur", () => {
      this.isDifferent(this.password, this.passwordHandler);
    });

    // Form Submit Event
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.formSubmitHandler();
    });
  }

  // Methods
  formSubmitHandler() {
    this.usernameImmediately();
    this.usernameAfterDelay();
    this.emailAfterDelay();
    this.passwordImmediately();
    this.passwordAfterDelay();

    if (
      this.username.isUnique &&
      !this.username.errors &&
      this.email.isUnique &&
      !this.email.errors &&
      !this.password.errors
    ) {
      this.form.submit();
    }
  }

  insertValidationElements() {
    this.allFields.forEach((field) => {
      field.insertAdjacentHTML(
        "afterend",
        `
          <div class="alert alert-danger small liveValidateMessage"></div>
        `
      );
    });
  }

  isDifferent(el, handler) {
    if (el.previousValue != el.value) {
      handler.call(this);
    }
    el.previousValue = el.value;
  }

  usernameHandler() {
    this.username.errors = false;
    this.usernameImmediately();
    clearTimeout(this.username.timer);
    this.username.timer = setTimeout(() => this.usernameAfterDelay(), 800);
  }

  emailHandler() {
    this.email.errors = false;
    clearTimeout(this.email.timer);
    this.email.timer = setTimeout(() => this.emailAfterDelay(), 800);
  }

  passwordHandler() {
    this.password.errors = false;
    this.passwordImmediately();
    clearTimeout(this.password.timer);
    this.password.timer = setTimeout(() => this.passwordAfterDelay(), 800);
  }

  usernameImmediately() {
    if (
      this.username.value != "" &&
      !/^([a-zA-Z0-9]+)$/.test(this.username.value)
    ) {
      this.showValidationError(
        this.username,
        "Username can only contain letters and numbers"
      );
      this.username.classList.add("border-danger");
    }

    if (this.username.value.length > 30) {
      this.showValidationError(
        this.username,
        "Username can't be more than 30 characters"
      );
    }

    if (!this.username.errors) {
      this.hideValidationError(this.username);
      this.username.classList.remove("border-danger");
    }
  }

  passwordImmediately() {
    if (this.password.value.length > 50) {
      this.showValidationError(
        this.password,
        "Password cannot exceed 50 characters"
      );
      this.password.classList.add("border-danger");
    }

    if (!this.password.errors) {
      this.hideValidationError(this.password);
      this.password.classList.remove("border-danger");
    }
  }

  passwordAfterDelay() {
    if (this.password.value.length < 12) {
      this.showValidationError(
        this.password,
        "Password must be atleast 12 characters"
      );
      this.password.classList.add("border-danger");
    }
  }

  usernameAfterDelay() {
    if (this.username.value.length < 3) {
      this.showValidationError(
        this.username,
        "Username must be atleast 3 characters"
      );
      this.username.classList.add("border-danger");
    }

    // Sending axios request to check if username already exists
    if (!this.username.errors) {
      axios
        .post("/doesUsernameExist", {
          _csrf: this._csrf,
          username: this.username.value,
        })
        .then((response) => {
          if (response.data) {
            this.showValidationError(
              this.username,
              "That username is already taken, please try another one"
            );
            this.username.isUnique = false;
          } else {
            this.username.isUnique = true;
          }
        })
        .catch(() => {
          console.log("Please try again later!");
        });
    }
  }

  emailAfterDelay() {
    if (!/^\S+@\S+$/.test(this.email.value)) {
      this.showValidationError(
        this.email,
        "You must enter a valid email address"
      );
      this.email.classList.add("border-danger");
    }

    // Email already is use or not
    if (!this.email.errors) {
      axios
        .post("/emailAlreadyTaken", {
          _csrf: this._csrf,
          email: this.email.value,
        })
        .then((response) => {
          if (response.data) {
            this.email.isUnique = false;
            this.showValidationError(
              this.email,
              "That email is already in use"
            );
          } else {
            this.email.isUnique = true;
            this.hideValidationError(this.email);
            this.email.classList.remove("border-danger");
          }
        })
        .catch(() => {
          console.log("Please try again later!");
        });
    }
  }

  showValidationError(el, message) {
    el.nextElementSibling.innerHTML = message;
    el.nextElementSibling.classList.add("liveValidateMessage--visible");
    el.errors = true;
  }

  hideValidationError(el) {
    el.nextElementSibling.classList.remove("liveValidateMessage--visible");
  }
}
