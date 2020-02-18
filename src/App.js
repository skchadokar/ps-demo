import React from 'react';
import Home from './home';
import AssLine from './asmLine';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import './App.css';



function App() {
  return (

    <div className="App">
      <h1 style={{marginLeft: "5%",fontSize:'26px',color: "#2A0A0A",textDecorationLine: 'underline'  }}>FIFO & Assembly Line Demo!</h1>
       <Router>
              <div>
              
                <nav>
                  <ul>
                    <li style={{marginLeft: "3%",fontSize:'13px',textDecorationLine:'none'}}>
                      <Link to="/" style={{textDecorationLine:'none',fontWeight:'bold'}}>FIFO Room</Link>
                    </li>
                    <li style={{marginLeft: "3%",fontSize:'13px'}}>
                      <Link to="/asline" style={{textDecorationLine:'none',fontWeight:'bold'}}>Assembly Line</Link>
                    </li>
                   
                  </ul>
                </nav>

                <Route path="/" exact component={Home} />
                <Route path="/asline" component={AssLine} />
               
              </div>
        </Router>
    </div>
  );
}

export default App;
