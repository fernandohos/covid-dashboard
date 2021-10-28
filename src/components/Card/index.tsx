import React from 'react';
import * as C from './styles';
import africa from '../../assets/africa.png';
import america from '../../assets/america.png';
import asia from '../../assets/asia.png';
import europe from '../../assets/europe.png';
import oceania from '../../assets/oceania.png';
import { useHistory } from 'react-router-dom';

type Props = {
    country: string;
    abbreviation: string;
    confirmed: number;
    deaths: number;
    continent: string;
}

export function Card({ country, abbreviation, confirmed, deaths, continent }: Props) {
    const history = useHistory();

    function returnContinent(continentName: string) {
        switch (continentName) {
            case "South America":
                return america;
            case "Europe":
                return europe;
            case "Asia":
                return asia;
            case "Africa":
                return africa;
            case "Oceania":
                return oceania;
            case "North America":
                return america;
        }
    }

    function handleRedirect() {
        if(!abbreviation) {
            history.push(`/country/${abbreviation}?country=${encodeURI(country)}`);
        }
        else {
            history.push(`/country/${abbreviation}`);
        }
    }

    return (
        <C.Container onClick={() => handleRedirect()}>
            <C.Border>
            <div className="wrapper">
                <C.CountryName>{country}</C.CountryName>
                <C.CountryAbbr>{abbreviation}</C.CountryAbbr>
                <C.StatsTitle>Confirmed</C.StatsTitle>
                <C.StatsInfo color="#4f4">{confirmed}</C.StatsInfo>
                <div>
                    <div>
                        <C.StatsTitle>Deaths</C.StatsTitle>
                        <C.StatsInfo color="#f44">{deaths}</C.StatsInfo>
                    </div>
                    <img src={returnContinent(continent)} alt={continent} />
                </div>
            </div>
            </C.Border>
        </C.Container>
    );
}