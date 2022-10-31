import { createSlice } from "@reduxjs/toolkit";
import professionsService from "../services/professions.service";
import { isOutData } from "../utils/isOutData";

const professionsSlice = createSlice({
    name: "professions",
    initialState: {
        entities: null,
        isLoading: true,
        errors: null,
        lastFetch: null
    },
    reducers: {
        professionsRequested: (state) => {
            state.isLoading = true;
        },
        professionsReceived: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        professionsRequestedFailed: (state, action) => {
            state.errors = action.payload;
            state.isLoading = false;
        }
    }
});

const { actions, reducer: professionsReducer } = professionsSlice;
const {
    professionsRequested,
    professionsReceived,
    professionsRequestedFailed
} = actions;

export const loadProfessionsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().qualities;
    if (isOutData(lastFetch, 10)) {
        dispatch(professionsRequested());
        try {
            const data = await professionsService.fetchAll();
            dispatch(professionsReceived(data));
        } catch (error) {
            dispatch(professionsRequestedFailed(error.message));
        }
    }
};

export const getProfessions = () => (state) => state.professions.entities;

export const getProfessionsLoadingStatus = () => (state) =>
    state.professions.isLoading;

export default professionsReducer;
