import {
    FETCH_FILE,
    UPDATE_FILE
} from '../constants/File'
import Papa from 'papaparse'

export function fetchFile(file) {
    return (dispatch) => {
        Papa.parse(file, {
            complete: result => {
                dispatch({
                    type: FETCH_FILE,
                    payload: result.data
                })
            }
        });
    }
}

export function updateFile(file) {
    return (dispatch, getState) => {
        Papa.parse(file, {
            complete: result => {
                const currentState = getState().file;
                let interval = 0;
                for (let i = 10; i < result.data.length; i++) {
                    interval += parseInt(result.data[i], 10);
                    setTimeout(_ => {
                        composer(currentState.data, result.data.slice(i - 9, i), dispatch);
                    }, interval);
                    i += 10;
                }
            }
        });
    }
}

function composer(current, result, dispatch) {
    let composedState = current.slice();
    result.forEach((el, i) => {
        el.forEach((cell, j) => {
            if (cell.length > 0) {
                composedState[i + 1][j] = cell;
            }
        });
    });
    dispatch({
        type: UPDATE_FILE,
        payload: composedState
    });

}