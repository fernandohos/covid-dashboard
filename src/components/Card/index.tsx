import React from 'react';
import * as C from './styles';

type Props = {
    name: string;
    abbreviation: string;
    confirmed: number;
    deaths: number;
    continent: string;
}

export function Card({name, abbreviation, confirmed, deaths, continent}: Props) {
    return (
        <C.Container>
            <p>{name}</p>
            <p>{abbreviation}</p>
            <p>{confirmed}</p>
            <p>{deaths}</p>
            <p>{continent}</p>
        </C.Container>
    );
}