import axios from "axios";
import { renderSnackbar } from "../uiComponents/Snackbar";
import { elements } from "../views/base";
import { renderWordList } from "../index";

export default class Login {
  constructor(form, fields) {
    this.form = form;
    this.fields = fields;
    this.validateonSubmit();
  }

  async validateonSubmit() {
    let self = this;

    this.form.addEventListener("submit", (e) => {
      elements.loginBtn.value = "LOGGING IN...";
      e.preventDefault();
      var error = 0;
      self.fields.forEach((field) => {
        const input = document.querySelector(`#${field}`);
        if (self.validateFields(input) == false) {
          error++;
        }
      });
      if (error == 0) {
        self.userLogin(
          document.querySelector(`#${self.fields[0]}`).value,
          document.querySelector(`#${self.fields[1]}`).value
        );
      } else {
		elements.loginBtn.value = "LOGIN";
	  }
    });
  }

  validateFields(field) {
    if (field.type == "password") {
      if (field.value.length < 8) {
        this.setStatus(
          elements.passwordError,
          "error"
        );
        return false;
      } else {
        this.setStatus(elements.passwordError, "success");
        return true;
      }
    } else if (field.id == "username") {
      const re = new RegExp(/(.+)@(.+){2,}\.(.+){2,}/);
      if (!re.test(field.value)) {
        this.setStatus(
          elements.usernameError,
          "error"
        );
        return false;
      } else {
        this.setStatus(elements.usernameError, "success");
        return true;
      }
    } else {
      this.setStatus(elements.usernameError, "success");
      return true;
    }
  }

  setStatus(field, status) {
    if (status == "success") {
      if (field) {
        field.style.display = "none";
      }
    }

    if (status == "error") {
      console.log(field);
      field.style.display = "inline";
    }
  }

  async userLogin(email, password) {
    try {
      // console.log(email, password);
      const res = await axios({
        method: "POST",
        url: "https://api.mywordwallet.com/.netlify/functions/api/v1/users/login",
        // url: 'http://127.0.0.1:9000/.netlify/functions/api/v1/users/login',
        data: {
          email,
          password,
        },
        // credentials: 'include', // Don't forget to specify this if you need cookies
        withCredentials: true,
        credentials: "include",
      });

      if (res.data.status === "success") {
        elements.loginBtn.value = "LOGIN";
        renderSnackbar("User successfully login");
        elements.loginScreen.style.display = "none";
        elements.signupScreen.style.display = "none";
        elements.dashboard.style.display = "flex";
        renderWordList();
      }
    } catch (err) {
      elements.loginBtn.value = "LOGIN";
      renderSnackbar("Request failed. ");
    }
  }
}

const form = document.querySelector(".login__input--container");
if (form) {
  const fields = ["username", "password"];
  const validator = new Login(form, fields);
}
