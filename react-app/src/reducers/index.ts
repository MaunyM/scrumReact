import { combineReducers } from 'redux';
import planning from './planning';
import me from './me';
import forms from './forms';
import deck from './cardDeck';

const scrumReducer = combineReducers({
    me,
    planning,
    deck,
    forms
});

export { scrumReducer };