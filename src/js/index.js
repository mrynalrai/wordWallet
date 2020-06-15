import '../../dist/resources/css/style.scss';
import { elements } from './views/base';
import Form from './models/Form';
import List from './models/List';
import * as formView from './views/formView';

/** Global state of the app
 * - Current form
 * - Search object
 * - Current delete object
 */
const state = {};

elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    controlForm();
})

// document.addEventListener('keypress', e => {
//     if (event.keyCode === 13 || e.which === 13) {
//         // e.preventDefault();
//         // controlForm();
//         elements.form.addEventListener('submit', (e) => {
//             e.preventDefault();
//             controlForm();
//         })
//     }
// })

function controlForm() {
    // 1) Get data from input
    const formInputs = formView.getInput();
    // 2) New form object and add it to state
    state.form = new Form(formInputs[0], formInputs[1], formInputs[2], formInputs[3]);
    // 3) Prepare UI for results
    formView.clearInput();
    formView.clearResults();
    //renderLoader(elements.searchRes);
    //try {
        // 4) Search for recipes
        //await state.search.getResults();
        controlList();

        // 5) Render results on UI
        //clearLoader();
        formView.renderResults(state.list.getWordList());
    //} catch (err) {
        //alert('Something wrong with the search...');
        //clearLoader();
    //}
}

function controlList() {
    //create a new list if there isn't one
    if (!state.list) state.list = new List();
    //Add new word to the list
    state.list.addWord(state.form);
    //Add to UI
}

let ctrlDeleteWord = event => {
    let word = event.target.parentNode.parentNode.parentNode.parentNode;
    if (word.id) {
        // Delete the item from the Data structure
        state.list.deleteWord(word.id);
        // Delete the item from the UI
        formView.deleteWord(word);
        // Update and show the new list
        formView.clearResults();
        formView.renderResults(state.list.getWordList());
    }
}

elements.wordContainer.addEventListener('click', ctrlDeleteWord);
