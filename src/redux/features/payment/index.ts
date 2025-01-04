import { IPayment, IRPayment, PaymentAddProps } from "@/interfaces/payment";
import { api, fetchHandler, handleAsyncActions } from "@/utils/apis";
import { handlePending, handleRejected } from "@/utils/handlers";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IRPayment = {
  loading: false,
  payments: [],
  payment: null as IPayment,
  newPayments: [],
  notify: null as IPayment,
  error: null,
};

const paymentUrl = `${api}/payment`;

export const getPayments = createAsyncThunk(
  "payment/get-daily-payments",
  (_, thunkAPI) => fetchHandler(`${paymentUrl}/daily`, "get", undefined, thunkAPI)
);

export const getByIdPayment = createAsyncThunk(
  "payment/get-payment",
  (id: string | number, thunkAPI) =>
    fetchHandler(`${paymentUrl}/${id}`, "get", undefined, thunkAPI)
);
export const getPaymentsHistory = createAsyncThunk(
  "payment/get-history-payments",
  ({ startDate, endDate }: { startDate: any; endDate: any }, thunkAPI) =>
    fetchHandler(
      `${paymentUrl}/history?startDate=${startDate}&endDate=${endDate}`,
      "get",
      undefined,
      thunkAPI
    )
);
export const paying = createAsyncThunk(
  "payment/paying",
  (bodyData: PaymentAddProps, thunkAPI) =>
    fetchHandler(paymentUrl, "post", bodyData, thunkAPI)
);

export const updatePaymentStatus = createAsyncThunk(
  "payment/update-payment",
  ({ id, status }: { id: number | string; status: boolean }, thunkAPI) =>
    fetchHandler(
      `${paymentUrl}/${id}`,
      "put",
      {
        status: Boolean(!status),
      },
      thunkAPI
    )
);
export const checkPayStatus = createAsyncThunk(
  "payment/check-status-payment",
  (ids: number[], thunkAPI) =>
    fetchHandler(
      `${paymentUrl}/updatepaystatus`,
      "put",
      {
        ids: ids,
      },
      thunkAPI
    )
);

export const payment = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setNewPayment(state, action: PayloadAction<IPayment>) {
      const newPayment = action.payload;
      state.notify = newPayment;
      state.newPayments.push(newPayment);
      state.payments.push(newPayment);
    },
    setSeeAll(state) {
      state.notify = null;
      state.newPayments = [];
    },
  },
  extraReducers: (builder) => {
    handleAsyncActions(builder, getPaymentsHistory, "payments");
    handleAsyncActions(builder, getByIdPayment, "payment");

    builder
      .addCase(getPayments.pending, handlePending)
      .addCase(getPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload.data.reverse()
      })
      .addCase(getPayments.rejected, handleRejected)
      .addCase(updatePaymentStatus.pending, handlePending)
      .addCase(updatePaymentStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPayment = action.payload.data;
        const index = state.payments.findIndex(
          (payment) => payment.id === updatedPayment.id
        );
        if (index !== -1) {
          state.payments[index] = updatedPayment;
        }
      })
      .addCase(updatePaymentStatus.rejected, handleRejected)
      .addCase(checkPayStatus.pending, handlePending)
      .addCase(checkPayStatus.fulfilled, (state, action) => {
        state.loading = false;
        const checkedIds = action.payload.data;
        state.payments = state.payments.filter(
          (item) =>
            !checkedIds.some((secondItem: any) => secondItem.id === item.id)
        );
      })
      .addCase(checkPayStatus.rejected, handleRejected);
  },
});
export const { setNewPayment, setSeeAll } = payment.actions;

export default payment.reducer;
