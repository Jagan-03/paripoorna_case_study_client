import React from "react";
import { useDispatch } from "react-redux";

// importing the actions
import { getCandidates } from "./actions/candidates";

// importing Components
import Form from "./components/Form/Form";
import Table from "./components/Table/Table";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getCandidates());
  }, [dispatch]);

  
  return (
    <div className="App">
      <div className="container home p-5">
        <h1>Registration</h1>
        <Form />
        <Table />
      </div>
    </div>
  );
}

export default App;
