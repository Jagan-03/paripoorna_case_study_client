import * as api from "../controllers/candidates";

export const getCandidates = () => async(dispatch) => {
    try {
        const { data } = await api.fetchCandidates();
        dispatch({ type : "FETCH_CANDIDATES", payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const addCandidates = (newCandidate) => async(dispatch) => {
    try {
        const { data } = await api.addCandidates(newCandidate);
        dispatch({ type : "ADD_CANDIDATES", payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const updateCandidates = (candidate) => async(dispatch) => {
    try {
        await api.updateCandidates(candidate);
        dispatch({type : "UPDATE_CANDIDATES", payload : candidate});
    } catch (error) {
        console.log(error);
    }
}

export const deleteCandidates = (candidateID) => async(dispatch) => {
    try {
        await api.deleteCandidates(candidateID);
        dispatch({type : "DELETE_CANDIDATES", payload : candidateID});
    } catch (error) {
        console.log(error);
    }
}