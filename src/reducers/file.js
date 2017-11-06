import {
    FETCH_FILE,
    UPDATE_FILE
} from '../constants/File'
import data from '../snapshot.csv'
import Papa from 'papaparse'

let initialState;
const localFile = new XMLHttpRequest();

localFile.open("GET", data, false);
localFile.onreadystatechange = _ => {
    if (localFile.readyState === 4) {
        if (localFile.status === 200 || localFile.status === 0) {
            Papa.parse(localFile.responseText, {
                complete: result => {
                    initialState = result;
                }
            });
        }
    }
};
localFile.send(null);


export default function page(state = initialState, action) {
    switch (action.type) {
        case FETCH_FILE:
            return {...state, data: action.payload};
        case UPDATE_FILE:
            return {...state, data: action.payload};
        default:
            return state;
    }
}