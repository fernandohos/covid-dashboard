import React, { useContext } from 'react';
import * as C from './styles/App';
import xImg from './assets/x.png';
import { Cards } from './components/Cards';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Country } from './components/Country';
import {Pagination} from './components/Pagination';
import { CountriesContext } from './context/CountriesContext';

function App() {
  const {loading} = useContext(CountriesContext);
  return (
    <C.Container>
      <C.Title>Covid-19 Dashboard</C.Title>
      <Router>
        <Switch>
          <Route path="/page/:page">
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
            {
              !loading && <Pagination />
            }
          </Route>
          <Route path="/country/:country" component={Country} />
          <Route path="*">
            <Redirect to="/page/1" />
          </Route>
        </Switch>
      </Router>

    </C.Container>
  );
}

export default App;