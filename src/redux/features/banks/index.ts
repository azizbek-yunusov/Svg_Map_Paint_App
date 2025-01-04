import { AddBankProps, IRBank } from "@/interfaces/bank";
import { fetchHandler, handleAsyncActions } from "@/utils/apis";
import { handlePending, handleRejected } from "@/utils/handlers";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: IRBank = {
  loading: false,
  banks: [],
  bank: null,
  error: null,
};

const url = "/api/web/bank";

export const getAllBanks = createAsyncThunk(
  "banks/get-all-banks",
  (_, thunkAPI) => fetchHandler(url, undefined, "get", thunkAPI)
);
export const addBank = createAsyncThunk(
  "banks/add-bank",
  (bodyData: AddBankProps, thunkAPI) =>
    fetchHandler(url, "post", bodyData, thunkAPI)
);

export const deleteBank = createAsyncThunk(
  "banks/delete-bank",
  (id: number, thunkAPI) =>
    fetchHandler(`${url}/${id}`, "delete", undefined, thunkAPI)
);

export const editBanks = createAsyncThunk(
  "banks/edit-bank",
  (
    {
      id,
      values,
    }: {
      id: string | number;
      values: AddBankProps;
    },
    thunkAPI
  ) => fetchHandler(`${url}/${id}`, "put", values, thunkAPI)
);

export const banks = createSlice({
  name: "banks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleAsyncActions(builder, getAllBanks, "banks");
    builder
      .addCase(addBank.pending, handlePending)
      .addCase(addBank.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.banks.push(payload.data);
      })
      .addCase(addBank.rejected, handleRejected)
      .addCase(editBanks.pending, handlePending)
      .addCase(editBanks.fulfilled, (state, { payload }) => {
        state.loading = false;
        const updatedBank = payload.data;
        const index = state.banks.findIndex(
          (bank) => bank.id === updatedBank.id
        );
        if (index !== -1) {
          state.banks[index] = updatedBank;
        }
      })
      .addCase(editBanks.rejected, handleRejected)
      .addCase(deleteBank.pending, handlePending)
      .addCase(deleteBank.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.banks = state.banks.filter(
          (item) => item.id !== Number(payload.data.id)
        );
      })
      .addCase(deleteBank.rejected, handleRejected);
  },
});

export default banks.reducer;
