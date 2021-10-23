import React from 'react';
import * as C from './styles/App';
import xImg from './assets/x.png';

function App() {
  return (
    <C.Container>
      <C.Title>Covid-19 Dashboard</C.Title>
      <C.WorldStats>
        <h2>World</h2>
        <C.CasesWrapper>
          <div className="confirmed">
            <h3>confirmed</h3>
            <p>240.630.839</p>
          </div>
          <div className="deaths">
            <h3>deahts</h3>
            <p>4.890.776</p>
          </div>
        </C.CasesWrapper>
        <C.SearchBar xIcon={xImg}>
          <div>
              <input placeholder="search..." type="search" />
          </div>
        </C.SearchBar>
      </C.WorldStats>
    </C.Container>
  );
}

export default App;