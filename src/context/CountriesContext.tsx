import React, {
  createContext,
  PropsWithChildren,
  useState,
} from "react";
import countriesDataJSON from "../countries-data.json";
import { CountryType } from "../types/CountryType";

type ApiData = {
  All: CountryType;
};

type ContextType = {
  returnCurrentPageData: (currentPage: number) => CountryType[];
  pagesCount: number;
  loading: boolean;
  returnCountryByTerm: (
    term: string,
    termType: "name" | "abbreviation"
  ) => CountryType;
  search: {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  };
  countriesSearch: CountryType[];
  globalData: {
    confirmed: number;
    deaths: number;
  };
};

export const CountriesContext = createContext({} as ContextType);

export default function CountriesProvider({ children }: PropsWithChildren) {
  const [countries, setCountries] = useState<CountryType[]>([]);
  const [loading, setLoading] = useState(false);
  const cardsPerPage = 20;

  const [countriesSearch, setCountriesSearch] = useState<CountryType[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [globalData, setGlobalData] = React.useState<{
    confirmed: number;
    deaths: number;
  }>({ confirmed: 0, deaths: 0 });

  React.useEffect(() => {
    function returnCountriesFromSearch() {
      const filteredCountries = countries.filter((country) => {
        if (searchTerm.trim() === "") return false;

        if (
          country.country
            .toLowerCase()
            .indexOf(searchTerm.trim().toLowerCase()) === 0
        )
          return true;

        const splitedCountryName = country.country.split(" ");
        return splitedCountryName.some((countryName) => {
          if (
            countryName
              .toLowerCase()
              .indexOf(searchTerm.trim().toLowerCase()) === 0
          )
            return true;
          return false;
        });
      });
      const organizedCountries = filteredCountries.sort((a, b) => {
        return a.country
          .toLowerCase()
          .indexOf(searchTerm.trim().toLowerCase()) >
          b.country.toLowerCase().indexOf(searchTerm.trim().toLowerCase())
          ? 1
          : -1;
      });
      setCountriesSearch(organizedCountries);
    }
    if (searchTerm.trim()) {
      returnCountriesFromSearch();
    }
  }, [searchTerm, countries]);

  const pagesCount = Math.ceil(countries.length / cardsPerPage);

  function returnCurrentPageData(currentPage: number): CountryType[] {
    const startIndex = currentPage > 0 ? (currentPage - 1) * cardsPerPage : 0;

    const finishIndex =
      startIndex + cardsPerPage > countries.length
        ? countries.length - 1
        : startIndex + cardsPerPage;

    return countries.slice(startIndex, finishIndex);
  }

  function returnCountryByTerm(
    term: string,
    termType: "name" | "abbreviation"
  ): CountryType {
    return countries.filter((countryFilter) => {
      if (termType === "abbreviation") {
        return countryFilter.abbreviation === term;
      } else {
        return countryFilter.country === term;
      }
    })[0];
  }

  // getCountries
  React.useEffect(() => {
    let names: string[] = [];
    let globalDataInUseEffect = { confirmed: 0, deaths: 0 };

    async function getCountriesFromApi() {
      fetch("https://covid-api.mmediagroup.fr/v1/cases")
        .then((res) => res.json())
        .then((data) => {
          const { confirmed, deaths } = data["Global"].All;
          globalDataInUseEffect = { confirmed, deaths };
          setGlobalData(globalDataInUseEffect);
          names = Object.keys(data);
          return Object.values<ApiData>(data);
        })
        .then((data) =>
          data.map((obj) => {
            const { All } = obj;
            return All;
          })
        )
        .then((countries) => {
          return countries.map((countryObj, i) => {
            const {
              abbreviation,
              confirmed,
              continent,
              deaths,
              population,
              updated,
            } = countryObj;
            const country = names[i];
            return {
              abbreviation,
              confirmed,
              continent,
              country,
              deaths,
              population,
              updated,
            };
          });
        })
        .then((formatedCountries) => {
          const lastUpdateTimeStampString = new Date().getTime().toString();
          localStorage.setItem("@LastUpdate", lastUpdateTimeStampString);
          localStorage.setItem(
            "@CountriesData",
            JSON.stringify(formatedCountries)
          );
          localStorage.setItem(
            "@GlobalData",
            JSON.stringify(globalDataInUseEffect)
          );
          setCountries(formatedCountries);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }

    function getCountriesFromLocalStorage() {
      const countriesFromLs = localStorage.getItem("@CountriesData");
      if (countriesFromLs) {
        setCountries(JSON.parse(countriesFromLs));
      }

      const globalDataFromLs = localStorage.getItem("@GlobalData");
      if (globalDataFromLs) {
        setGlobalData(JSON.parse(globalDataFromLs));
      }
    }

    const lsLastUpdateMilliseconds = Number(
      localStorage.getItem("@LastUpdate")
    );
    const secondsSinceLastUpdate =
      (new Date().getTime() - lsLastUpdateMilliseconds) / 1000;

    if (!lsLastUpdateMilliseconds || secondsSinceLastUpdate > 600) {
      // setLoading(true);
      // getCountriesFromApi();
      // setLoading(false);
    } else if (lsLastUpdateMilliseconds && secondsSinceLastUpdate < 600) {
      getCountriesFromLocalStorage();
    }
    // FOLLOWING LINE ADDED BECAUSE COVID API IS DEPRECATED
    setCountries(countriesDataJSON);
  }, []);

  return (
    <CountriesContext.Provider
      value={{
        returnCurrentPageData,
        returnCountryByTerm,
        pagesCount,
        loading,
        countriesSearch,
        globalData,
        search: { searchTerm, setSearchTerm },
      }}
    >
      {children}
    </CountriesContext.Provider>
  );
}
