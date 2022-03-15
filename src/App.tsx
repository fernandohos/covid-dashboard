import React, { FormEvent, useContext } from 'react';
import * as C from './styles/App';
import xImg from './assets/x.png';
import { Cards } from './components/Cards';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Country } from './components/Country';
import {Pagination} from './components/Pagination';
import { CountriesContext } from './context/CountriesContext';

function App() {
  const {search, globalData} = useContext(CountriesContext);

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
  }
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
                  <p>{globalData.confirmed.toLocaleString()}</p>
                </div>
                <div className="deaths">
                  <h3>deahts</h3>
                  <p>{globalData.deaths.toLocaleString()}</p>
                </div>
              </C.CasesWrapper>
              <C.SearchBar xIcon={xImg}>
                <form onSubmit={handleFormSubmit}>
                  <input placeholder="search..." type="search" value={search.searchTerm} onChange={e => search.setSearchTerm(e.target.value)} />
                </form>
              </C.SearchBar>
            </C.WorldStats>
            <Cards />
            {
              search.searchTerm === '' && <Pagination />
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