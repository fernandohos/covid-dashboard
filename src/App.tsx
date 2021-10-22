import React from 'react';
import * as C from './styles/App';


function App() {
  return (
    <C.Container>
      <C.Title>Covid-19 Dashboard</C.Title>
      <C.WorldStats>
        <h2>World</h2>
        <C.CasesWrapper>
          <div>
            <h3>confirmed</h3>
            <p>240.630.839</p>
          </div>
          <div>
            <h3>deahts</h3>
            <p>4.890.776</p>
          </div>
        </C.CasesWrapper>
      </C.WorldStats>
    </C.Container>
  );
}

export default App;