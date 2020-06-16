import { elements } from "./base";

export const getInput = () => {
    let formInputs = Array.from(elements.formInputs);
    return formInputs.map(node => node.value);
};

export const clearInput = () => {
    let formInputs = Array.from(elements.formInputs);
    formInputs[0].focus();
    formInputs.forEach(node => node.value = '');
}
