export const candidates = (candidates = [], action) => {
  switch (action.type) {
    case "FETCH_CANDIDATES":
        return action.payload;
    case "ADD_CANDIDATES":
        return [...candidates, action.payload];
    case "UPDATE_CANDIDATES":
        let updatedCandidates = candidates.map(candidate => {
          if(candidate._id === action.payload._id) candidate = action.payload;
          return candidate;
        })
        return updatedCandidates;
    case "DELETE_CANDIDATES":
      return candidates.filter(candidate => candidate._id !== action.payload);
    default:
      return candidates;
  }
};

export const editCandidate = (editCandidate = null, action) => {
  switch (action.type) {
    case "EDIT_CANDIDATE":
      console.log(action.payload);
      return action.payload;
    case "REMOVE_EDIT_CANDIDATE":
      return null;
    default:
     return editCandidate;
  }
};
