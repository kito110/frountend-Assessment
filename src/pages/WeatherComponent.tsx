import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { ReactComponent as IconCloud } from "../icons/cloudy.svg";
import { ReactComponent as IconClearDay } from "../icons/clear-day.svg";
import { ReactComponent as IconRain } from "../icons/rain.svg";

// Mapping weather conditions to icons
const WeatherComponentMap: {
    [key: string]: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
} = {
    cloudy: IconCloud,
    "clear-day": IconClearDay,
    rain: IconRain,
};

interface WeatherOptions {
    lon: string;
    lat: string;
}

interface WeatherComponentProps {
    options: WeatherOptions;
}

interface WeatherData {
    condition: string;
}

const WeatherComponent: React.FC<WeatherComponentProps> = (options) => {
    const { lat, lon } = options;
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:${process.env.SERVER_PORT ?? 3030}/integration/weather?lat=${lat}&lon=${lon}`
                );
                setWeatherData(response.data.data);
            } catch (err) {
                console.error("Failed to fetch weather data:", err);
            }
        };

        fetchWeatherData();
    }, [lat, lon]);

    const getWeatherIcon = (condition: string, height: string, width: string, style: object) => {
        const WeatherComponent = WeatherComponentMap[condition];
        if (!WeatherComponent) return null;
        return <WeatherComponent width={width} height={height} style={{ ...style }} />;
    };

    return (
        weatherData && (
            <WeatherContainer>
                <CurrentWeatherContainer>
                    <CurrentWeatherWrapper>
                        {weatherData
                            ? getWeatherIcon(weatherData.condition, "70", "70", {
                                  marginTop: "17px",
                              })
                            : "Loading..."}
                        <WeatherText>
                            <Temperature>
                                {weatherData.temperature}&deg;{(weatherData.unit || "").toUpperCase()}
                            </Temperature>
                            <ConditionName>{weatherData.conditionName}</ConditionName>
                        </WeatherText>
                    </CurrentWeatherWrapper>
                </CurrentWeatherContainer>
                <LocationTitle>{weatherData.location}</LocationTitle>
                <UpcomingWeatherWrapper>
                    {weatherData.upcomming.map((data) => {
                        return (
                            <span
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                }}
                            >
                                {getWeatherIcon(data.condition, "70", "70", {})}
                                <h4
                                    style={{
                                        fontSize: "10px",
                                        marginLeft: "30px",
                                        marginTop: "-4px",
                                        fontWeight: 100,
                                    }}
                                >
                                    {data.day}
                                </h4>
                            </span>
                        );
                    })}
                </UpcomingWeatherWrapper>
            </WeatherContainer>
        )
    );
};

export default WeatherComponent;

const WeatherContainer = styled.div`
    height: 200px;
    width: 80%;
    border-radius: 35px;
    margin: 3% auto;
    border: 2px solid #b4bbc3;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`;

const CurrentWeatherContainer = styled.div`
    position: relative;
    height: 115px;
    width: 100%;
    box-sizing: border-box;
`;

const CurrentWeatherWrapper = styled.div`
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    gap: 5px;
    alignitems: center;
`;

const LocationTitle = styled.span`
    position: absolute;
    right: 35px;
    top: 40px;
    font-size: 15px;
    font-weight: 100;
    text-align: right;
`;

const WeatherText = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const UpcomingWeatherWrapper = styled.div`
    display: flex;
    position: absolute;
    right: 10px;
    bottom: 10px;
    align-items: center;
`;

const Temperature = styled.h1`
    margin: 0;
    font-size: 30px;
    font-weight: 100;
`;

const ConditionName = styled.h4`
    margin: 0;
    font-size: 15px;
    font-weight: 100;
    margin-top: -4px;
`;
