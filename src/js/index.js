import '../../dist/resources/css/style.scss';
import { elements } from './views/base';
import Form from './models/Form';
import List from './models/List';
import Search from './models/Search';
import * as formView from './views/formView';
import * as listView from './views/listView';
import * as searchView from './views/searchView';

/** Global state of the app
 * - Current form
 * - Search object
 * - Current delete object
 */
const state = {};
state.searching = false;
elements.searchForm.style.visibility = 'hidden';

function searching(words) {
    if (words.length > 0) {
        state.search = true;
        elements.searchForm.style.visibility = 'visible';
    } else {
        state.search = false;
        elements.searchForm.style.visibility = 'hidden';
    }
}

elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    controlForm();
})

function controlForm() {
    // 1) Get data from input
    const formInputs = formView.getInput();
    // 2) New form object and add it to state
    state.form = new Form(formInputs[0], formInputs[1], formInputs[2], formInputs[3]);
    // 3) Prepare UI for results
    formView.clearInput();
    listView.clearResults();
    //renderLoader(elements.searchRes);
    //try {
        // 4) Search for recipes
        //await state.search.getResults();
        controlList();

        // 5) Render results on UI
        //clearLoader();
        listView.renderResults(state.list.getWordList());
        searching(state.list.getWordList());
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
        listView.deleteWord(word);
        searching(state.list.getWordList());
        // Update and show the new list
        listView.clearResults();
        listView.renderResults(state.list.getWordList());
        searching(state.list.getWordList());
    }
}

elements.wordContainer.addEventListener('click', ctrlDeleteWord);

elements.searchButton.addEventListener('click', ctrlSearch);
elements.searchQuery.addEventListener('keypress', e => {
    if (event.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        ctrlSearch();
    }
})
elements.searchQuery.addEventListener('blur', ctrlSearch);

function ctrlSearch() {
    // 1) Get data from input
    const query = searchView.getInput();
    // 2) Get word from input query and add it to state
    if (query) {
        state.search = new Search(query);
        state.searchReults = state.list.getWord(query);
        // 3) Render UI for results
        if (state.searchReults) {
            listView.clearResults();
            listView.renderResults([state.searchReults]);
        } else {
            listView.clearResults();
            listView.renderNolistMsg();
        }
    } else {
        listView.clearResults();
        listView.renderResults(state.list.getWordList());
    }
}

// Restore word list on page load
window.addEventListener('load', () => {
    state.list = new List();
    
    // Restore likes
    state.list.readStorage();

    // Render the existing words
    listView.renderResults(state.list.getWordList());
    searching(state.list.getWordList());
});