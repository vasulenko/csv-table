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
                    interval += parseInt(result.data[i]);
                    setTimeout(_ => {
                        composer(currentState.data, result.data.slice(i - 9, i), interval, dispatch);
                    }, interval);
                    i += 10;
                }
            }
        });
    }
}

function composer(current, result, interval, dispatch) {
    let composedState = current.slice();
    for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result[i].length; j++) {
            if (result[i][j].length > 0) {
                composedState[i + 1][j] = result[i][j];
            }
        }
    }
    dispatch({
        type: UPDATE_FILE,
        payload: composedState
    });

}