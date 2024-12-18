import { configureStore } from "@reduxjs/toolkit";

import { reducer } from "./reducer";
import { Store } from "./types/store";

export const initializeStore = (): Store => configureStore({ reducer });
