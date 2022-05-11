import React, { useEffect, useState } from 'react';

// Routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
// import SignIn from './components/SignIn';
import Layout from './components/Layout';
import JobList from './components/JobList';

// Styles
import { GlobalStyle } from './GlobalStyle';


function App() {

  const [state, setState] = useState({data: null});

  const callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  useEffect(() => {
    callBackendAPI()
     .then(res => setState({data: res.express}) )
     .catch(err => console.log(err));
  }, []);


  return (
    <Router>
      <Routes>
        <Route element={<Layout />} >
          <Route path='/' element={<JobList/>} />
        </Route>
      </Routes>
      <GlobalStyle />
    </Router>
  );
}

export default App;
