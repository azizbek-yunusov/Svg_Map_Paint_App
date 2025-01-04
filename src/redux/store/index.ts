import { configureStore } from "@reduxjs/toolkit";
import settings from "../features/settings";
import auth from "../features/auth";
import users from "../features/users";
import customers from "../features/customers";
import sectors from "../features/sectors";
import banks from "../features/banks";
import payment from "../features/payment";
import org from "../features/org";
import purposes from "../features/purpose";

export const store = configureStore({
  reducer: {
    settings,
    auth,
    users,
    customers,
    sectors,
    banks,
    payment,
    purposes,
    org
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
