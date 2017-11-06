import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk'

const initialState = {};
const enhancers = [];
const middleware = [
    thunk
];
const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
)
const store = createStore(
    rootReducer,
    initialState,
    composedEnhancers
);

export default store