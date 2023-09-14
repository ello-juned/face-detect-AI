import React, { useState, useEffect } from "react";
import locationImg from "../assets/location.png";

const Location = () => {
  const [locationData, setLocationData] = useState(null);
  const [city, setCity] = useState(""); // Use state to store the city name

  console.log("locationData", locationData);
  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await fetch("https://api.ipify.org/?format=json");
        const data = await response.json();
        await fetchLocationData(data?.ip);
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    };

    const fetchLocationData = async (ipAddress) => {
      try {
        const apiKey = import.meta.env.VITE_REACT_APP_IP_API_KEY;
        const response = await fetch(
          `https://ipgeolocation.abstractapi.com/v1/?api_key=${apiKey}&ip_address=${ipAddress}`
        );
        const data = await response.json();
        await setLocationData(data);
        await setCity(data?.city);
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };

    // Call fetchIpAddress only once when the component mounts
    if (!city) {
      fetchIpAddress();
    }
  }, [city]);

  return (
    <div className="flex flex-col justify-center items-center text-center gap-3 p-2">
      {city && locationData && (
        <>
          <h2 className="text-2xl text-blue-600 font-semibold">Location</h2>
          <img src={locationImg} width={80} height={80} />
          <h2 className="text-2xl tracking-wide">{city}</h2>
        </>
      )}
    </div>
  );
};

export default Location;
