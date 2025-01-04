import { AddUserProps, EditUserProps, IRUser } from "@/interfaces/user";
import { api, fetchHandler } from "@/utils/apis";
import { handlePending, handleRejected } from "@/utils/handlers";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: IRUser = {
  loading: false,
  users: [],
  statusUsers: [],
  user: null,
  error: null,
};

const userUrl = `${api}/user`;

export const getAllUsers = createAsyncThunk(
  "users/get-all-users",
  (_, thunkAPI) => fetchHandler(userUrl, "get", undefined, thunkAPI)
);

export const addUser = createAsyncThunk(
  "users/add-user",
  (bodyData: AddUserProps, thunkAPI) =>
    fetchHandler(userUrl, "post", bodyData, thunkAPI)
);
export const editUser = createAsyncThunk(
  "users/edit-user",
  ({ id, bodyData }: EditUserProps, thunkAPI) =>
    fetchHandler(`${userUrl}/${id}`, "put", bodyData, thunkAPI)
);
export const deleteUser = createAsyncThunk(
  "users/delete-user",
  (id: number, thunkAPI) => fetchHandler(`${userUrl}/${id}`, "delete", undefined, thunkAPI)
);

export const users = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserNewStatus(state, action) {
      const newStatusUser = action.payload;
      const existingStatusIndex = state.statusUsers.findIndex(
        (item) => item.userId === newStatusUser.userId
      );
      if (existingStatusIndex !== -1) {
        state.statusUsers[existingStatusIndex] = newStatusUser;
      } else {
        state.statusUsers.push(newStatusUser);
      }
    },
    setUsersNewStatus(state, action) {
      state.users = action.payload;
    },
    clearError(state) {
      (state.error = ""), (state.loading = false);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, handlePending)
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
      })
      .addCase(getAllUsers.rejected, handleRejected)
      .addCase(addUser.pending, handlePending)
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload.data);
      })
      .addCase(addUser.rejected, handleRejected)
      .addCase(editUser.pending, handlePending)
      .addCase(editUser.fulfilled, (state, action) => {
        state.loading = false;
        const updated_user = action.payload.data;
        const index = state.users.findIndex((user) => user.id === updated_user.id);
        if (index !== -1) {
          state.users[index] = updated_user;
        }
      })
      .addCase(editUser.rejected, handleRejected)
      .addCase(deleteUser.pending, handlePending)
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(
          (admin) => admin.id !== action.payload.data.id
        );
      })
      .addCase(deleteUser.rejected, handleRejected);
  },
});
export const { clearError, setUserNewStatus, setUsersNewStatus } =
  users.actions;

export default users.reducer;
