import React from 'react';
import * as C from './styles';
import {Card} from '../Card';

type CardDataType = {
    name: string;
    abbreviation: string;
    confirmed: number;
    deaths: number;
    continent: string;
}

type ApiData = {
    All: {
        abbreviation: string;
        capital_city: string;
        confirmed: number;
        continent: string;
        country: string;
        deaths: number;
        elevation_in_meters: null
        iso: number;
        lat: string;
        life_expectancy: string;
        location: string;
        long: string;
        population: number;
        recovered: number;
        sq_km_area: number;
        updated: string;
    }
}

export function Cards() {
    const [countries, setCountries] = React.useState<CardDataType[]>([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        setLoading(true);
        async function getCountries() {

            fetch("https://covid-api.mmediagroup.fr/v1/cases")
            .then(res => res.json())
            .then(data => Object.values<ApiData>(data))
            .then(data => data.map(obj => {
                const {All} = obj;
                return All;
            }))
            .then(countries => {
                return countries.map(countryObj => {
                    const { abbreviation, confirmed, continent, country: name, deaths, population} = countryObj;
                    return { abbreviation, confirmed, continent, name, deaths, population};
                })
            })
            .then(formatedCountries => {
                setCountries(formatedCountries)
            });

            setLoading(false);
        }
        getCountries();

    }, [])
    return (
        <C.Container>
            {
                loading && <p>loading...</p>
            }
            {
                countries.map(country => (
                    <Card key={country.name} {...country} />
                ))
            }

            {/* <Card {...{
                name: "Brazil",
                abbreviation: "BR",
                confirmed: 5030236,
                deaths: 604356,
                continent: "South America"
            }} /> */}
        </C.Container>
    )
}