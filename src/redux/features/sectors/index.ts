import {
  AddSectorProps,
  DeleteUserSectorProps,
  EditSectorProps,
  IRSector,
} from "@/interfaces/sector";
import { api, fetchHandler } from "@/utils/apis";
import { handlePending, handleRejected } from "@/utils/handlers";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: IRSector = {
  loading: false,
  sectors: [],
  sector: null,
  error: null,
};

const sectorUrl = `${api}/sector`;

export const getAllSectors = createAsyncThunk(
  "sectors/get-all-sectors",
  (_, thunkAPI) => fetchHandler(`${sectorUrl}`, undefined, "get", thunkAPI)
);
export const addSector = createAsyncThunk(
  "sectors/add-sector",
  (bodyData: AddSectorProps, thunkAPI) =>
    fetchHandler(sectorUrl, "post", bodyData, thunkAPI)
);
export const editSector = createAsyncThunk(
  "sectors/edit-sector",
  ({ id, bodyData }: EditSectorProps, thunkAPI) =>
    fetchHandler(`${sectorUrl}/${id}`, "put", bodyData, thunkAPI)
);
export const deleteSector = createAsyncThunk(
  "sectors/delete-sector",
  (id: number, thunkAPI) =>
    fetchHandler(`${sectorUrl}/${id}`, "delete", undefined, thunkAPI)
);
export const addUserSector = createAsyncThunk(
  "sectors/add-user-sector",
  (bodyData: any, thunkAPI) =>
    fetchHandler(`${api}/sector-user`, "post", bodyData, thunkAPI)
);
export const deleteUserSector = createAsyncThunk(
  "sectors/delete-user-sector",
  ({ sectorId, userId }: DeleteUserSectorProps, thunkAPI) =>
    fetchHandler(
      `${api}/sector-user?sectorId=${sectorId}&userId=${userId}`,
      "delete",
      undefined,
      thunkAPI
    )
);

export const sectors = createSlice({
  name: "sectors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSectors.pending, handlePending)
      .addCase(getAllSectors.fulfilled, (state, action) => {
        state.loading = false;
        state.sectors = action.payload.data;
      })
      .addCase(getAllSectors.rejected, handleRejected)
      .addCase(addSector.pending, handlePending)
      .addCase(addSector.fulfilled, (state, action) => {
        state.loading = false;
        state.sectors.push(action.payload.data);
      })
      .addCase(addSector.rejected, handleRejected)
      .addCase(editSector.pending, handlePending)
      .addCase(editSector.fulfilled, (state, action) => {
        state.loading = false;
        const updatedSector = action.payload.data;
        const index = state.sectors.findIndex(
          (sector) => sector.id === updatedSector.id
        );
        if (index !== -1) {
          state.sectors[index] = updatedSector;
        }
      })
      .addCase(editSector.rejected, handleRejected)
      .addCase(deleteSector.pending, handlePending)
      .addCase(deleteSector.fulfilled, (state, action) => {
        state.loading = false;
        state.sectors = state.sectors.filter(
          (item) => item.id !== Number(action.payload.data.id)
        );
      })
      .addCase(deleteSector.rejected, handleRejected);
  },
});

export default sectors.reducer;
