import { StatusBar } from 'expo-status-bar';
import React from 'react';
import JobsNavigator from "./navigation/JobsNavigator"
import { Provider } from "react-redux"
import { createStore, combineReducers, applyMiddleware } from "redux"
import ReduxThunk from "redux-thunk"

import AuthReducers from "./reducers/authReducer"
import JobReducers from "./reducers/jobReducer"

const rootReducer = combineReducers({
  auth: AuthReducers,
  job: JobReducers
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {
  return (
    <Provider store={store}>
      <JobsNavigator />
    </Provider>
  );
}


