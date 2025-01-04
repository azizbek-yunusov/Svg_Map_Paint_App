import {
  ClientAddProps,
  ClientEditProps,
  ClientSearchProps,
  IRClient,
} from "@/interfaces/client";
import { fetchHandler, getData } from "@/utils/apis";
import { handlePending, handleRejected } from "@/utils/handlers";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: IRClient = {
  loading: false,
  customers: [],
  customer: null,
  error: null,
};

const api = "/api/web/client";

export const getAllCustomers = getData("customers/get-all-customers", "client");

export const addCustomer = createAsyncThunk(
  "customers/add-customer",
  (bodyData: ClientAddProps, thunkAPI) =>
    fetchHandler(api, "post", bodyData, thunkAPI)
);
export const getUserSectorClients = createAsyncThunk(
  "customers/get-sector-user-customers",
  () => fetchHandler(`${api}/my-clients`, "get")
);

export const editCustomer = createAsyncThunk(
  "customers/edit-customer",
  ({ id, bodyData }: ClientEditProps, thunkAPI) =>
    fetchHandler(`${api}/${id}`, "put", bodyData, thunkAPI)
);

export const deleteCustomer = createAsyncThunk(
  "customers/delete-customer",
  (id: number, thunkAPI) => fetchHandler(`${api}/${id}`, "delete", thunkAPI)
);
export const searchClient = createAsyncThunk(
  "customers/search-customers",
  ({ accountNumber, inn }: ClientSearchProps, thunkAPI) =>
    fetchHandler(
      `${api}/innaccontnumber?accountNumber=${accountNumber}&inn=${inn}`,
      "get",
      thunkAPI
    )
);

export const customers = createSlice({
  name: "customers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCustomers.pending, handlePending)
      .addCase(getAllCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload.data;
      })
      .addCase(getAllCustomers.rejected, handleRejected)
      .addCase(getUserSectorClients.pending, handlePending)
      .addCase(getUserSectorClients.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload.data;
      })
      .addCase(getUserSectorClients.rejected, handleRejected)
      .addCase(addCustomer.pending, handlePending)
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customers.push(action.payload.data);
      })
      .addCase(addCustomer.rejected, handleRejected)
      .addCase(editCustomer.pending, handlePending)
      .addCase(editCustomer.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCustomer = action.payload.data;
        const index = state.customers.findIndex(
          (sector) => sector.id === updatedCustomer.id
        );
        if (index !== -1) {
          state.customers[index] = updatedCustomer;
        }
      })
      .addCase(editCustomer.rejected, handleRejected)
      .addCase(deleteCustomer.pending, handlePending)
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = state.customers.filter(
          (item) => item.id !== Number(action.payload.data.id)
        );
      })
      .addCase(deleteCustomer.rejected, handleRejected);
  },
});

export default customers.reducer;
