import React, { useContext } from 'react';
import * as C from './styles';
import { Card } from '../Card';
import {CountriesContext} from '../../context/CountriesContext';

type Props = {
    match: {
        params: {
            page: string;
        }
    }
}

export function Cards({ match }: Props) {
    const {returnCurrentPageData, loading} = useContext(CountriesContext);
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