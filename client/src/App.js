import React, { useEffect, useState } from 'react';

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
    <div className="App">
      <p>Oh yeah! {state.data}</p>
      
      
    </div>
  );
}

export default App;
