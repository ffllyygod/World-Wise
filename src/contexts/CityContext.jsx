/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const CityContext = createContext();

function useCities() {
  const context = useContext(CityContext);
  if (context === undefined)
    throw new Error("The CityContext was used outside of CityProvider");
  return context;
}

function CityProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(function () {
    const fetchData = async function () {
      try {
        setIsLoading(true);
        const res = await (await fetch("http://localhost:9000/cities")).json();
        setCities(res);
      } catch (err) {
        alert("nigga u on a wrong crib");
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        setCities,
        setIsLoading,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

export { CityProvider, useCities };
