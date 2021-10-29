import React, { useContext } from 'react';
import * as C from './styles';
import { Card } from '../Card';
import {CountriesContext} from '../../context/CountriesContext';
import {useRouteMatch} from 'react-router-dom';

type matchType = {
    page: string;
}

export function Cards() {
    const {returnCurrentPageData, loading, countriesSearch, search} = useContext(CountriesContext);
    const match = useRouteMatch<matchType>();

    React.useEffect(() => {
        console.log('mudou');
    })

    return (
        <C.Container>
            {
                loading && <p>loading...</p>
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
    );
}