import { createSlice } from "@reduxjs/toolkit";
import qualityService from "../services/quality.service";
import { isOutData } from "../utils/isOutData";

const qualitiesSlice = createSlice({
    name: "qualities",
    initialState: {
        entities: null,
        isLoading: true,
        errors: null,
        lastFetch: null
    },
    reducers: {
        qualitiesRequested: (state) => {
            state.isLoading = true;
        },
        qualitiesReceived: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        qualitiesRequestedFailed: (state, action) => {
            state.errors = action.payload;
            state.isLoading = false;
        }
    }
});

const { actions, reducer: qualitiesReducer } = qualitiesSlice;
const { qualitiesRequested, qualitiesReceived, qualitiesRequestedFailed } =
    actions;

export const loadQualitiesList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().qualities;
    if (isOutData(lastFetch, 10)) {
        dispatch(qualitiesRequested());
        try {
            const data = await qualityService.fetchAll();
            dispatch(qualitiesReceived(data));
        } catch (error) {
            dispatch(qualitiesRequestedFailed(error.message));
        }
    }
};

export const getQualities = () => (state) => state.qualities.entities;

export const getQualitiesLoadingStatus = () => (state) =>
    state.qualities.isLoading;

export default qualitiesReducer;
