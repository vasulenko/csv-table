import {
    FETCH_FILE,
    UPDATE_WITH_DELTAS
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

export function updateWithDeltas(file) {
    return (dispatch, getState) => {
        Papa.parse(file, {
            complete: result => {
                let interval = 0,
                    deltasArr = [];
                result.data.forEach((el, i) => {
                    if (el.length === 1 && el[0] !== '') {
                        interval += parseInt(el[0], 10);
                        composer(deltasArr.slice(), interval, dispatch, getState);
                        deltasArr = [];
                    }
                    else {
                        deltasArr.push(el);
                    }
                });
            }
        });
    }
}

function composer(deltasArr, interval, dispatch, getState) {
    setTimeout(_ => {
        let composedState = getState().file.data.slice();
        if (deltasArr.length > composedState.length - 1) {
            composedState = composedState.concat(deltasArr.slice(composedState.length - 1));
        }
        deltasArr.forEach((delta, i) => {
            delta.forEach((cell, j) => {
                if (cell.length > 0) {
                    composedState[i + 1][j] = cell;
                }
            });
        });
        dispatch({
            type: UPDATE_WITH_DELTAS,
            payload: composedState
        });
    }, interval);
}