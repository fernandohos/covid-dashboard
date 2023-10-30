import { countryContext } from "../context/CountryContext";
import { useContext } from "react";

export function useCountry() {
  return useContext(countryContext);
}
