import * as C from "./styles";
import { Line } from "react-chartjs-2";
import { useQuery } from "../../hooks/useQuery";
import { useLocation, useRouteMatch } from "react-router-dom";
import { useCountry } from "../../hooks/useCountry";
import { useContext } from "react";
import { CountriesContext } from "../../context/CountriesContext";
import Continent from "../Continent";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";

Chart.register(CategoryScale);

type RouteMatchType = {
  country: string;
};

export function Country() {
  let { dates, data } = useCountry();
  const query = useQuery(useLocation().search);
  const { returnCountryByTerm } = useContext(CountriesContext);
  const match = useRouteMatch<RouteMatchType>();
  let country = returnCountryByTerm(match.params.country, "abbreviation");

  if (!country) return <p>loading...</p>;

  if (!country.country) {
    const countryNameFromQuery = query.get("country");
    if (countryNameFromQuery) {
      country = returnCountryByTerm(decodeURI(countryNameFromQuery), "name");
    }
  }

  if (Object.keys(country).length === 0) {
    return <p>api down :&#40;</p>;
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
            <C.Cases color="#4f4" className="cases">
              {country.confirmed.toLocaleString()}
            </C.Cases>
          </div>
          <div>
            <h3>Deaths</h3>
            <C.Cases color="#f44" className="cases">
              {country.deaths.toLocaleString()}
            </C.Cases>
          </div>

          <C.Chart>
            <Line
              data={{
                labels: dates,
                datasets: [
                  {
                    data: data.cases,
                    label: "covid cases (weekly)",
                    borderColor: "#4f4",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
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
                    label: "covid cases per week",
                    borderColor: "#4f4",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
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
                    label: "covid deaths (weekly)",
                    borderColor: "#f44",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
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
                    label: "covid deaths per week",
                    borderColor: "#f44",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
          </C.Chart>
        </C.Main>
        <aside>
          <Continent continent={country.continent} />
          {country.abbreviation && (
            <img
              className="country-flag"
              src={`https://flagcdn.com/${country.abbreviation.toLowerCase()}.svg`}
              alt={country.country}
            />
          )}
          {country.updated && (
            <>
              <p>last update</p>
              <p>{new Date(country.updated).toLocaleString()}</p>
            </>
          )}
        </aside>
      </div>
    </C.Container>
  );
}
