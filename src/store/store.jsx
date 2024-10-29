import { configureStore } from "@reduxjs/toolkit";
import sectionReducer from './slice'

const store = configureStore({ reducer: { sections: sectionReducer } })

export default store;

