import React, { useContext } from 'react';
import * as C from './styles';
import { Card } from '../Card';
import {CountriesContext} from '../../context/CountriesContext';
import {useRouteMatch} from 'react-router-dom';
import {Loader} from '../Loader';

type matchType = {
    page: string;
}

export function Cards() {
    const {returnCurrentPageData, loading, countriesSearch, search} = useContext(CountriesContext);
    const match = useRouteMatch<matchType>();
    console.log("RETURN CURRENT PAGE DATA", returnCurrentPageData(Number(match.params.page)));

    return !loading ? (
        <C.Container>
            {
                returnCurrentPageData(1).length === 0 && <p>api down :&#40;</p>
            }
            {
                countriesSearch && countriesSearch && [] && search.searchTerm !== '' ?
                countriesSearch.map((country, i) => {
                    console.log(countriesSearch);
                    return <Card key={i} {...country} />
                })
                :
                returnCurrentPageData(Number(match.params.page)).map((country, i) => (
                    <Card key={i} {...country} />
                ))
            }
        </C.Container>
    ) : <C.LoaderContainer><Loader /></C.LoaderContainer>;
}