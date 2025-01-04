import { IAuth, ILogin, User } from "@/interfaces/user";
import { fetchHandler } from "@/utils/apis";
import { handlePending, handleRejected } from "@/utils/handlers";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: IAuth = {
  loading: false,
  status: "offline",
  user: localStorage.getItem("admin")
    ? (JSON.parse(localStorage.getItem("admin") as string) as User)
    : null,
  logged: !!localStorage.getItem("admin"),
  role: localStorage.getItem("role")
    ? JSON.parse(localStorage.getItem("role"))
    : "",
  error: null,
  socket: "disconnected",
};
const authUrl = "/api/web/user";

export const signIn = createAsyncThunk(
  "auth/sign-in",
  (credentials: ILogin, thunkAPI) =>
    fetchHandler(`${authUrl}/singin`, "post", credentials, thunkAPI)
);

export const signOut = createAsyncThunk(
  "auth/sign-out",
  (token: string, thunkAPI) =>
    fetchHandler(`${authUrl}/singout`, "post", { token }, thunkAPI)
);

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearUserData(state) {
      (state.user = null),
        (state.loading = false),
        (state.logged = false),
        (state.error = "");
      localStorage.removeItem("admin");
      localStorage.removeItem("role");
    },
    clearError(state) {
      state.error = "";
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setConnect(state, action) {
      state.socket = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, handlePending)
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.logged = true;
        state.user = action.payload.data.user;
        state.role = action.payload.data.user.role;
      })
      .addCase(signIn.rejected, handleRejected)
      .addCase(signOut.pending, handlePending)

      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.logged = false;
      })
      .addCase(signOut.rejected, handleRejected);
  },
});

export const { clearUserData, clearError, setStatus, setConnect } =
  auth.actions;

export default auth.reducer;
