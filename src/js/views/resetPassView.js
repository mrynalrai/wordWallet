import { elements } from "./base";

export const postSubmit = () => {
    elements.resetPassForm.style.display = 'none';
    elements.resetPassLoginRedirect.style.display = 'none';
    elements.resetPassSubHeaderTitle1.innerHTML = 'Your password has been changed.';
    elements.resetPassSubHeaderTitle2.innerHTML = '';
    elements.resetPassLoginRedirectPostEmail.style.display = 'block';
};
