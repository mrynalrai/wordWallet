import { elements } from "./base";

export const postSubmit = () => {
    elements.forgotPassForm.style.display = 'none';
    elements.forgotPassLoginRedirect.style.display = 'none';
    elements.forgotPassSubHeaderTitle1.innerHTML = 'Email Sent';
    elements.forgotPassSubHeaderTitle2.innerHTML = 'Check your email for instructions on how to reset your password.';
    elements.forgotPassLoginRedirectPostEmail.style.display = 'block';
};
