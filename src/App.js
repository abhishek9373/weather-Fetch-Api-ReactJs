
import './App.css';
import Signup from './Signup';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from './Login';

import Weather from './Weather';
import { useState } from 'react';
// import Navigate from './Navigate';

function App() {
  const [aut,setaut] = useState(false);
  function data(dt){
    setaut(dt);
  }
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/'  element={<Login con = {data}/>}></Route>
          <Route path='/Signup' element={<Signup con ={data}/>}></Route>
          <Route path='/Afterlogin' element={aut?<Weather con = {data}/>:<Login con = {aut}/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
