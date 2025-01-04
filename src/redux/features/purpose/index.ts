
import { IRPurpose, PurposeEditProps } from "@/interfaces/org";
import { api, fetchHandler } from "@/utils/apis";
import { handlePending, handleRejected } from "@/utils/handlers";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: IRPurpose = {
  loading: false,
  purposes: [],
  error: null,
};

export const getPurpose = createAsyncThunk("purposes/get-purposes", (_, thunkAPI) =>
  fetchHandler(`${api}/payment/purpose`, "get", undefined, thunkAPI)
);
export const addPurpose = createAsyncThunk(
  "purposes/add-purpose",
  (bodyData: any, thunkAPI) =>
    fetchHandler(`${api}/payment/purpose`, "post", bodyData, thunkAPI)
);
export const editPurpose = createAsyncThunk(
  "purposes/edit-purpose",
  ({ id, bodyData }: PurposeEditProps, thunkAPI) =>
    fetchHandler(`${api}/payment/purpose/${id}`, "put",  bodyData, thunkAPI)
);
export const deletePurpose = createAsyncThunk(
  "purposes/delete-purpose",
  (id: number, thunkAPI) =>
    fetchHandler(`${api}/payment/purpose/${id}`, "delete", undefined, thunkAPI)
);

export const banks = createSlice({
  name: "banks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getPurpose.pending, handlePending)
    .addCase(getPurpose.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.purposes = payload.data;
    })
    .addCase(getPurpose.rejected, handleRejected)
    .addCase(addPurpose.pending, handlePending)
    .addCase(addPurpose.fulfilled, (state, action) => {
      state.loading = false;
      state.purposes.push(action.payload.data);
    })
    .addCase(addPurpose.rejected, handleRejected)
    .addCase(editPurpose.pending, handlePending)
    .addCase(editPurpose.fulfilled, (state, action) => {
      state.loading = false;
      const updatedPurpose = action.payload.data;
      const index = state.purposes.findIndex(
        (purpose) => purpose.id === updatedPurpose.id
      );
      if (index !== -1) {
        state.purposes[index] = updatedPurpose;
      }
    })
    .addCase(editPurpose.rejected, handleRejected)
    .addCase(deletePurpose.pending, handlePending)
    .addCase(deletePurpose.fulfilled, (state, action) => {
      state.loading = false;
      state.purposes = state.purposes.filter(
        (item) => item.id !== Number(action.payload.data.id)
      );
    })
    .addCase(deletePurpose.rejected, handleRejected)
  },
});

export default banks.reducer;
