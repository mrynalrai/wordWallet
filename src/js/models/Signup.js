import axios from 'axios';
import { renderSnackbar } from '../uiComponents/Snackbar';
import { elements } from '../views/base';
import { renderWordList } from '../index';

export default class Signup {
	constructor(form, fields) {
		this.form = form;
		this.fields = fields;
		this.validateonSubmit();
	}

	async validateonSubmit() {
		let self = this;

		this.form.addEventListener("submit", (e) => {
			elements.signupBtn.value = "SIGNING UP...";
			e.preventDefault();
			var error = 0;
			self.fields.forEach((field) => {
				const input = document.querySelector(`#${field}`);
				if (self.validateFields(input) == false) {
					error++;
				}
			});
			console.log(error);
			if (error == 0) {
				self.userSignup(document.querySelector(`#${self.fields[0]}`).value, 
				document.querySelector(`#${self.fields[1]}`).value,
				document.querySelector(`#${self.fields[2]}`).value,
				document.querySelector(`#${self.fields[3]}`).value)
			} else {
				elements.signupBtn.value = "SIGN UP";
			}
		});
	}

	
	validateFields(field) {
		if (field.id == "signupPassword") {
		  if (field.value.length < 8) {
			this.setStatus(
			  elements.signupPasswordError,
			  "error"
			);
			return false;
		  } else {
			this.setStatus(elements.signupPasswordError, "success");
			return true;
		  }
		} else if (field.id == "email") {
		  const re = new RegExp(/(.+)@(.+){2,}\.(.+){2,}/);
		  if (!re.test(field.value)) {
			this.setStatus(
			  elements.signupEmailError,
			  "error"
			);
			return false;
		  } else {
			this.setStatus(elements.signupEmailError, "success");
			return true;
		  }
		} else if (field.id == "passwordCnfrm") {
			const pass = document.querySelector(`#${this.fields[2]}`).value;
			const cPass = document.querySelector(`#${this.fields[3]}`).value;
			if (pass !== cPass) {
			  this.setStatus(
				elements.signupConfirmPasswordError,
				"error"
			  );
			  return false;
			} else {
			  this.setStatus(elements.signupConfirmPasswordError, "success");
			  return true;
			}
		} else {
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
		  field.style.display = "inline";
		}
	  }

	async userSignup(name, email, password, passwordConfirm) {
        try {
            const res = await axios({
              method: 'POST',
              url: 'https://api.mywordwallet.com/.netlify/functions/api/v1/users/signup',
              // url: 'http://127.0.0.1:9000/.netlify/functions/api/v1/users/signup',
              data: {
				name,
                email,
                password,
				passwordConfirm
              },
			  // credentials: 'include', // Don't forget to specify this if you need cookies
			  withCredentials: true,
			  credentials: 'include'
            });
        
            if (res.data.status === 'success') {
				elements.signupBtn.value = "SIGN UP";
              renderSnackbar('User successfully created');
            //   return word;
            //   window.setTimeout(() => {
            //     location.assign('/');
            //   }, 1500);
				elements.signupScreen.style.display = "none";
				elements.loginScreen.style.display = "none";
				elements.dashboard.style.display = "flex";
				renderWordList();
            }
          } catch (err) {
			elements.signupBtn.value = "SIGN UP";
			// console.log(err.response);
            renderSnackbar("Request failed. ");
          }
    }
}

const form = document.querySelector(".signup__input--container");
if (form) {
	const fields = ["name", "email", "signupPassword", "passwordCnfrm"];
	const validator = new Signup(form, fields);
}
