import {
  createContext,
  PropsWithChildren,
  useState,
  useEffect,
} from "react";

enum Historic {
  CONFIRMED = "confirmed",
  DEATHS = "deaths",
}

type DataApi = {
  All: {
    dates: {
      [tag: string]: number;
    };
  };
};

type DataCountryChart = {
  cases: number[];
  casesPerWeek: number[];
  deaths: number[];
  deathsPerWeek: number[];
};

type CountryContextType = {
  dates: string[];
  data: DataCountryChart;
};

export const countryContext = createContext({} as CountryContextType);

const mockData = {
  dates: ["2020-12-25", "2020-12-24", "2020-12-23", "2020-12-22", "2020-12-21"],
  data: {
    cases: [27110, 28096, 28909, 29330, 29580],
    casesPerWeek: [29580, 27110, 28909, 28096, 29330],
    deaths: [27110, 28096, 28909, 29330, 29580],
    deathsPerWeek: [29580, 27110, 28909, 28096, 29330],
  },
};

export function CountryProvider({ children }: PropsWithChildren) {
  const [dates, setDates] = useState<string[]>([]);
  const [data, setData] = useState<DataCountryChart>({} as DataCountryChart);

  useEffect(() => {
    async function getHistoric(country: string, type: Historic) {
      try {
        const response = await fetch(
          `https://covid-api.mmediagroup.fr/v1/history?country=${country}&status=${type}`
        );

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
            setData((prev) => ({
              ...prev,
              cases: newDataApi,
              casesPerWeek,
            }));
          } else if (type === Historic.DEATHS) {
            setData((prev) => ({
              ...prev,
              deaths: newDataApi,
              deathsPerWeek: casesPerWeek,
            }));
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
    // getHistoric(country.country, Historic.CONFIRMED);
    // getHistoric(country.country, Historic.DEATHS);
  }, []);

  return (
    <countryContext.Provider value={mockData}>
      {children}
    </countryContext.Provider>
  );
}
