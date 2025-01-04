import {
  AddOrgProps,
  IROrg,
  OrgEditProps,
} from "@/interfaces/org";
import { api, fetchHandler } from "@/utils/apis";
import { handlePending, handleRejected } from "@/utils/handlers";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: IROrg = {
  loading: false,
  org: null,
  error: null,
};

export const getOrgData = createAsyncThunk("org/get-org-data", (_, thunkAPI) =>
  fetchHandler(`${api}/OrganizationInfo`, "get", undefined, thunkAPI)
);

export const addOrg = createAsyncThunk(
  "org/add-org-data",
  (bodyData: AddOrgProps, thunkAPI) =>
    fetchHandler(`${api}/OrganizationInfo`, "post", bodyData, thunkAPI)
);

export const editOrg = createAsyncThunk(
  "org/delete",
  ({ id, bodyData }: OrgEditProps, thunkAPI) =>
    fetchHandler(`${api}/OrganizationInfo/${id}`, "put", bodyData, thunkAPI)
);

export const org = createSlice({
  name: "org",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrgData.pending, handlePending)
      .addCase(addOrg.fulfilled, (state, action) => {
        state.loading = false;
        state.org = action.payload.data[0];
      })
      .addCase(addOrg.rejected, handleRejected)
      .addCase(addOrg.pending, handlePending)
      .addCase(getOrgData.fulfilled, (state, action) => {
        state.loading = false;
        state.org = action.payload.data[0];
      })
      .addCase(getOrgData.rejected, handleRejected)
      .addCase(editOrg.pending, handlePending)
      .addCase(editOrg.fulfilled, (state, action) => {
        state.loading = false;
        const updatedOrgData = action.payload.data;
        state.org = updatedOrgData;
      })
      .addCase(editOrg.rejected, handleRejected);
  },
});

export default org.reducer;
