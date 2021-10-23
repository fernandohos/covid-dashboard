import React from 'react';
import * as C from './styles/App';
import xImg from './assets/x.png';
import {Cards} from './components/Cards';

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
          <form>
              <input placeholder="search..." type="search" />
          </form>
        </C.SearchBar>
      </C.WorldStats>

      <Cards />
      
    </C.Container>
  );
}

export default App;