import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from '@mui/material/Avatar';

// importing actions
import { deleteCandidates } from "../../actions/candidates";

// Stylesheet
import "./table.css";

const Table = () => {

  const dispatch = useDispatch();

  const candidates = useSelector((state) => state.candidates);

  const editCandidate = (candidate) => {
    dispatch({type : "EDIT_CANDIDATE", payload : candidate})
  }

  // Candidate Search
  const [searchKey, setSearchKey] = React.useState("");
  const searchValue = (value) => {
    setSearchKey(value.toLowerCase());
  }

  return (
    <div className="dataTable mt-5">
      <div>
        <h3>Registered Candidates</h3>
      </div>
      <div className="input-group rounded mt-3">
        <input type="search" className="form-control rounded mb-4" placeholder="Search Candidate" aria-label="Search" aria-describedby="search-addon" value={searchKey} onChange={(e) => searchValue(e.target.value)}/>
      </div>
      {candidates.length > 0 ? (
        <table className="table table-sm table-striped">
          <thead className="table-dark">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Profile</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile</th>
              <th scope="col">DOB</th>
              <th scope="col">Job Type</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => {
              return (
                candidate.name.toLowerCase().indexOf(searchKey) > -1 ?
                <tr key={candidate._id}>
                  <th scope="row">{candidate.name}</th>
                  <td><Avatar className="border" alt={candidate.name} src={candidate.profileImg} sx={{ width: 56, height: 56 }}/></td>
                  <td>{candidate.email}</td>
                  <td>{candidate.mobile}</td>
                  <td>{candidate.dob}</td>
                  <td>{candidate.jobType}</td>
                  <td>
                    <button onClick={() => editCandidate(candidate)} className="btn btn-dark"><i className="fas fa-pen"></i></button>
                    <button onClick={() => dispatch(deleteCandidates(candidate._id))} className="btn btn-danger ms-2"><i className="fas fa-trash-alt"></i></button>
                  </td>
                </tr> : <tr key={0}><td colSpan={7} className="text-center">No Candidates to Display</td></tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Table;
