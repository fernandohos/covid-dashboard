import React, { useContext } from 'react';
import * as C from './styles';
import { Card } from '../Card';
import {CountriesContext} from '../../context/CountriesContext';
import {useRouteMatch} from 'react-router-dom';

type matchType = {
    page: string;
}

export function Cards() {
    const {returnCurrentPageData, loading} = useContext(CountriesContext);
    const match = useRouteMatch<matchType>();

    return (
        <C.Container>
            {
                loading && <p>loading...</p>
            }
            {
                returnCurrentPageData(Number(match.params.page)).map((country, i) => (
                    <Card key={i} {...country} />
                ))
            }
        </C.Container>
    );
}