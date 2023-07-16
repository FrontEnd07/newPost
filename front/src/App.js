import React from 'react';
import View from "./view";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return <div className="App">
    <View />
    <ToastContainer position="bottom-right" autoClose={5000} />
  </div>
}

export default App;
