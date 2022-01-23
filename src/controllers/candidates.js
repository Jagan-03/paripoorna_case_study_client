import axios from "axios";

const CONNECTION_URL = "http://localhost:3001/candidates";

export const fetchCandidates = () => {
    const response = axios.get(CONNECTION_URL);
    return response;
}

export const addCandidates = (newCandidate) => {
    const response = axios.post(CONNECTION_URL, newCandidate);
    return response;
}

export const updateCandidates = (candidate) => {
    const response = axios.patch(CONNECTION_URL, candidate);
    return response;
}

export const deleteCandidates = (candidateID) => {
    const response = axios.delete(CONNECTION_URL, {data : {candidateID}});
    return response;    
}