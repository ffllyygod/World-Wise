/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

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
  const [currentCity, setCurrentCity] = useState({});
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

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;
      try {
        setIsLoading(true);
        const res = await (
          await fetch(`http://localhost:9000/cities/${id}`)
        ).json();
        setCurrentCity(res);
      } catch (err) {
        alert("cant load the city");
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    [currentCity.id]
  );
  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const res = await (
        await fetch(`http://localhost:9000/cities/`, {
          method: "POST",
          body: JSON.stringify(newCity),
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json();
      setCities((cities) => [...cities, res]);
    } catch (err) {
      alert("error in creating city");
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:9000/cities/${id}`, {
        method: "DELETE",
      });
      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (err) {
      alert("error in deleting city");
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        setIsLoading,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

export { CityProvider, useCities };
