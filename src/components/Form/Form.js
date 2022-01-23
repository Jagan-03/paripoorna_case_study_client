import React from "react";
import { useFormik } from 'formik';
import { useDispatch, useSelector } from "react-redux";

//Importing the actions
import { addCandidates, updateCandidates } from "../../actions/candidates";

// Cities data for location selection
import cities from "../../lib/cities";

// Material UI components
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

// Stylesheet
import "./form.css";

const Form = () => {

  const dispatch = useDispatch();
  
  // Formik
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      jobType : "Full Time",
      dob : "",
      prefferedLocation : [],
      profileImg : "https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png",
    },
    onSubmit: values => {
      if(values.prefferedLocation.length === 0) alert("Please select a location");
      else if(values.jobType === "") alert("Please select a job type");
      else {
        if(editCandidate){
          dispatch(updateCandidates(values));
          dispatch({type : "REMOVE_EDIT_CANDIDATE"});
        } else dispatch(addCandidates(values));

        // Setting everything back to default
        document.getElementById("profile").setAttribute('src', "https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png");
        setCityName([]);
        formik.setValues(formik.initialValues);
      }
    },
  });

  const editCandidate = useSelector(state => state.editCandidate);

  React.useEffect(() => {
    if(editCandidate){
      formik.setValues(editCandidate);
      document.getElementById("profile").setAttribute('src', editCandidate.profileImg);
      setCityName(editCandidate.prefferedLocation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editCandidate]);

  // Profile image upload function
  const readURL = (e) => {
    const input = document.getElementById("imageUpload");
      var reader = new FileReader();
  
      reader.onload = function (e) {
        document.getElementById("profile").setAttribute('src', e.target.result);
        formik.setValues({...formik.values, profileImg: e.target.result});
      };
      
      reader.readAsDataURL(input.files[0]);
  }
  const handleProfileUpload = (e, data) => {
    e.preventDefault();
    if(data) document.getElementById("imageUpload").click();
    else {
      document.getElementById("profile").setAttribute('src', "https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png");
      formik.setValues({...formik.values, profileImg: "https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png"});
    } 
  }


  // Preferred city functions
  const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
  const [cityName, setCityName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCityName(
      typeof value === 'string' ? value.split(',') : value,
    );
    formik.setValues({...formik.values, prefferedLocation : value});
  };

  return (
    <div className="form d-flex flex-column justify-content-center">
      <form className="border" onSubmit={formik.handleSubmit}>
        <div className="row p-3">
          <div className="col-lg-6 d-flex flex-column justify-content-end">
            <label className="form-label" htmlFor="typeText">
              Full Name
            </label>
            <input type="text" id="typeText" className="form-control" name="name" onChange={formik.handleChange} value={formik.values.name} required/>
          </div>
          <div className="col-lg-6 d-flex align-items-center">
            <label className="form-label" htmlFor="typeText">
              Profile Image
            </label>
              <img className="mx-3" id="profile" src="https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png" alt="candidate_profile" width={100}></img>
            <input
              id="imageUpload"
              type="file"
              name="profileImg"
              placeholder="Photo"
              onChange={readURL}
              hidden={true}
            />
            <button className="btn btn-outline-dark ms-2" onClick={(e) => handleProfileUpload(e, true)}>Upload</button>
            <button className="btn btn-outline-danger ms-2" onClick={(e) => handleProfileUpload(e, false)}>Remove</button>
          </div>
        </div>
        <div className="row p-3">
          <div className="col-lg-6">
            <label className="form-label" htmlFor="phone">
              Mobile
            </label>
            <input type="tel" id="phone" name="mobile" onChange={formik.handleChange} value={formik.values.mobile} className="form-control" required/>
          </div>
          <div className="col-lg-6">
            <label className="form-label" htmlFor="typeText">
              Email
            </label>
            <input type="email" id="typeText" name="email" onChange={formik.handleChange} value={formik.values.email} className="form-control" required/>
          </div>
        </div>
        <div className="row p-3">
          <div className="col-lg-6 d-flex flex-column">
            <label className="form-label" htmlFor="typeText">
              Job Type
            </label>
            <div className="d-flex">
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="jobType" onChange={formik.handleChange} id="inlineRadio1" checked={formik.values.jobType === "Full Time" ? true : false} value="Full Time"/>
              <label className="form-check-label" htmlFor="inlineRadio1">Full Time</label>
            </div>

            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="jobType" onChange={formik.handleChange} id="inlineRadio2" checked={formik.values.jobType === "Part Time" ? true : false} value="Part Time" />
              <label className="form-check-label" htmlFor="inlineRadio2">Part Time</label>
            </div>

            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="jobType" onChange={formik.handleChange} id="inlineRadio2" checked={formik.values.jobType === "Consultant" ? true : false} value="Consultant" />
              <label className="form-check-label" htmlFor="inlineRadio3">Consultant</label>
            </div>
            </div>
          </div>
          <div className="col-lg-6">
            <label className="form-label" htmlFor="typeText">
              DOB
            </label>
            <input type="date" id="typeText" name="dob" onChange={formik.handleChange} value={formik.values.dob} className="form-control" required/>
          </div>
        </div>
        <div className="row p-3">
          <div className="col-lg-6 d-flex align-items-center">
            <InputLabel id="demo-multiple-checkbox-label">Preferred Location</InputLabel>
            <Select
            className="ms-2"
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={cityName}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {cities.map(({name}) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={cityName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
          </div>
          <div className="col-lg-6 text-end">
            <button type="submit" className="btn btn-primary">+ Add / Update</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
