import React, { createContext, ReactNode } from 'react';

type Prop = {
    children: ReactNode;
}

type CountryType = {
    country: string;
    abbreviation: string;
    confirmed: number;
    deaths: number;
    continent: string;
    updated: string;
    population: number;
}

type ApiData = {
    All: CountryType;
}

type ContextType = {
    returnCurrentPageData: (currentPage: number) => CountryType[];
    pagesCount: number;
    loading: boolean;
}

export const CountriesContext = createContext({} as ContextType);

export default function CountriesProvider({ children }: Prop) {

    const [countries, setCountries] = React.useState<CountryType[]>([]);
    const [loading, setLoading] = React.useState(false);
    const cardsPerPage = 20;

    const pagesCount = Math.ceil(countries.length / cardsPerPage);

    function returnCurrentPageData(currentPage: number): CountryType[] {
        const startIndex = currentPage > 0 ? (currentPage - 1) * cardsPerPage : 0;

        const finishIndex = (startIndex + cardsPerPage) > countries.length ? countries.length - 1 : startIndex + cardsPerPage

        return countries.slice(startIndex, finishIndex);
    }

    // getCountries 
    React.useEffect(() => {
        let names:string[] = [];

        async function getCountriesFromApi() {
            fetch("https://covid-api.mmediagroup.fr/v1/cases")
                .then(res => res.json())
                .then(data => {
                    names = Object.keys(data);
                    return Object.values<ApiData>(data);
                })
                .then(data => data.map(obj => {
                    const { All } = obj;
                    return All;
                }))
                .then(countries => {
                    return countries.map((countryObj, i) => {
                        const { abbreviation, confirmed, continent, deaths, population, updated } = countryObj;
                        const country = names[i];
                        return { abbreviation, confirmed, continent, country, deaths, population, updated };
                    })
                })
                .then(formatedCountries => {
                    const lastUpdateTimeStampString = new Date().getTime().toString();
                    localStorage.setItem('@LastUpdate', lastUpdateTimeStampString);
                    localStorage.setItem('@CountriesData', JSON.stringify(formatedCountries));
                    setCountries(formatedCountries);
                    setLoading(false);
                });
        }

        function getCountriesFromLocalStorage() {
            console.log('data from localStorage');
            const countriesFromLs = localStorage.getItem('@CountriesData');
            if(countriesFromLs) {
                setCountries(JSON.parse(countriesFromLs));
            }
        }

        const lsLastUpdateMilliseconds = Number(localStorage.getItem('@LastUpdate'));
        const secondsSinceLastUpdate = (new Date().getTime() - lsLastUpdateMilliseconds) / 1000;
        
        if(!lsLastUpdateMilliseconds || secondsSinceLastUpdate > 600) {
            console.log('data from api');
            getCountriesFromApi();
            setLoading(true);
        }
        else if(lsLastUpdateMilliseconds && secondsSinceLastUpdate < 600) {
            getCountriesFromLocalStorage();
        }

    }, []);

    return (
        <CountriesContext.Provider value={{ returnCurrentPageData, pagesCount, loading }}>
            {children}
        </CountriesContext.Provider>
    )
}