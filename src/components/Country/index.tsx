import { useContext, useEffect, useState } from 'react';
import { CountriesContext } from '../../context/CountriesContext';
import { useRouteMatch, useLocation } from 'react-router-dom';
import * as C from './styles';
import * as Continents from '../Continents';
import { Line } from 'react-chartjs-2';
import { useQuery } from '../../hooks/useQuery';

type RouteMatchType = {
    country: string;
}

enum Historic {
    CONFIRMED = "confirmed",
    DEATHS = "deaths",
}

type DataApi = {
    All: {
        dates: {
            [tag: string]: number;
        }
    }
}

type DataCountryChart = {
    cases: number[];
    casesPerWeek: number[];
    deaths: number[];
    deathsPerWeek: number[];
}

export function Country() {
    const { returnCountryByTerm } = useContext(CountriesContext);
    const match = useRouteMatch<RouteMatchType>();
    let country = returnCountryByTerm(match.params.country, "abbreviation");
    const query = useQuery(useLocation().search);
    const [dates, setDates] = useState<string[]>([]);
    const [data, setData] = useState<DataCountryChart>({} as DataCountryChart);

    useEffect(() => {
        async function getHistoric(country: string, type: Historic) {

            try {
                const response = await fetch(`https://covid-api.mmediagroup.fr/v1/history?country=${country}&status=${type}`)

                const data: DataApi = await response.json();
                if (!data || data === undefined) {
                    return {};
                }
                if (data.All !== undefined) {

                    const { dates } = data.All;
                    const datesApi = Object.keys(dates);
                    const dataApi = Object.values(dates);
                    const newDataApi = dataApi.filter((data, i) => i % 7 === 0).reverse();
                    const newDatesApi = datesApi.filter((data, i) => i % 7 === 0);
                    const casesPerWeek = newDataApi.map((totalCases, i) => {
                        return totalCases - newDataApi[i - 1];
                    });
                    setDates(newDatesApi.reverse());
                    if (type === Historic.CONFIRMED) {
                        setData(prev => ({
                            ...prev,
                            cases: newDataApi,
                            casesPerWeek
                        }));
                    }
                    else if (type === Historic.DEATHS) {
                        setData(prev => ({
                            ...prev,
                            deaths: newDataApi,
                            deathsPerWeek: casesPerWeek
                        }));
                    }
                }

            } catch (err) {
                console.log(err);
            }
        }
        getHistoric(country.country, Historic.CONFIRMED);
        getHistoric(country.country, Historic.DEATHS);
    }, [country.country])

    function returnContinent() {
        switch (country.continent) {
            case "North America":
            case "South America":
                return <Continents.America />;
            case "Europe":
                return <Continents.Europe />;
            case "Africa":
                return <Continents.Africa />;
            case "Oceania":
                return <Continents.Oceania />;
            case "Asia":
                return <Continents.Asia />;
        }
    }

    if (!country.country) {
        const countryNameFromQuery = query.get("country");
        if (countryNameFromQuery) {
            country = returnCountryByTerm(decodeURI(countryNameFromQuery), "name");
        }
    }

    return (
        <C.Container>
            <div className="container">
                <C.Main>
                    <div>
                        <C.Title>{country.country}</C.Title>
                        <p>{country.abbreviation}</p>
                    </div>
                    <div>
                        <h2>Population</h2>
                        <p>{country.population.toLocaleString()}</p>
                    </div>
                    <div>
                        <h3>Confirmed</h3>
                        <C.Cases color="#4f4" className="cases">{country.confirmed.toLocaleString()}</C.Cases>
                    </div>
                    <div>
                        <h3>Deaths</h3>
                        <C.Cases color="#f44" className="cases">{country.deaths.toLocaleString()}</C.Cases>
                    </div>

                    <C.Chart>
                        <Line
                            data={{
                                labels: dates,
                                datasets: [
                                    {
                                        data: data.cases,
                                        label: 'covid cases (weekly)',
                                        borderColor: '#4f4'
                                    }
                                ]
                            }}
                            options={{
                                elements: {
                                    point: {
                                        radius: 1
                                    }
                                }
                            }}
                        />
                    </C.Chart>
                    <C.Chart>
                        <Line
                            data={{
                                labels: dates,
                                datasets: [
                                    {
                                        data: data.casesPerWeek,
                                        label: 'covid cases per week',
                                        borderColor: '#4f4'
                                    }
                                ]
                            }}
                            options={{
                                elements: {
                                    point: {
                                        radius: 1
                                    }
                                }
                            }}
                        />
                    </C.Chart>
                    <C.Chart>
                        <Line
                            data={{
                                labels: dates,
                                datasets: [
                                    {
                                        data: data.deaths,
                                        label: 'covid deaths (weekly)',
                                        borderColor: '#f44'
                                    }
                                ]
                            }}
                            options={{
                                elements: {
                                    point: {
                                        radius: 1
                                    }
                                }
                            }}
                        />
                    </C.Chart>
                    <C.Chart>
                        <Line
                            data={{
                                labels: dates,
                                datasets: [
                                    {
                                        data: data.deathsPerWeek,
                                        label: 'covid deaths per week',
                                        borderColor: '#f44'
                                    }
                                ]
                            }}
                            options={{
                                elements: {
                                    point: {
                                        radius: 1
                                    }
                                }
                            }}
                        />
                    </C.Chart>
                </C.Main>
                <aside>
                    {returnContinent()}
                    {country.abbreviation && <img className="country-flag" src={`https://flagcdn.com/${country.abbreviation.toLowerCase()}.svg`} alt={country.country} />
                    }
                    {country.updated && (
                        <>
                            <p>last update</p>
                            <p>{new Date(country.updated).toLocaleString()}</p>
                        </>)
                    }
                </aside>
            </div>
        </C.Container>
    )
}