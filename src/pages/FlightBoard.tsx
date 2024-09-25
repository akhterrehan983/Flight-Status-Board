import React, { useEffect, useState } from "react";
import FlightTable from "../components/FlightTable";
import ErrorMessage from "../components/ErrorMessage";
import { getFlights } from "../api/flightApi";
import './FlightBoard.css'; // Link to the new CSS file for enhanced styling

interface Flight {
    id: string;
    flightNumber: string;
    airline: string;
    origin: string;
    destination: string;
    departureTime: string;
    status: string;
}

const REFRESH_INTERVAL_SECONDS = 10; // Interval in seconds

const FlightBoard: React.FC = () => {
    const [flights, setFlights] = useState<Flight[]>([]);
    const [error, setError] = useState("");
    const [countdown, setCountdown] = useState(REFRESH_INTERVAL_SECONDS);

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const data = await getFlights();
                setFlights(data);
            } catch (err) {
                setError("Unable to fetch flight data.");
            }
        };

        // Initial fetch
        fetchFlights();

        // Interval to fetch flight data every REFRESH_INTERVAL_SECONDS
        const intervalId = setInterval(() => {
            fetchFlights();
            setCountdown(REFRESH_INTERVAL_SECONDS); // Reset countdown after fetching new data
        }, REFRESH_INTERVAL_SECONDS * 1000);

        // Countdown timer to update every second
        const countdownId = setInterval(() => {
            setCountdown((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : 0));
        }, 1000);

        // Cleanup intervals when the component unmounts
        return () => {
            clearInterval(intervalId);
            clearInterval(countdownId);
        };
    }, []);

    if (error) {
        return <ErrorMessage message={error} />;
    }

    return (
        <div>
            <h1 className="flight-board-title"><i className="fas fa-plane"></i> Real-Time Flight Status Board</h1>
            <p className="countdown-text">Refreshing in {countdown} seconds...</p> {/* Countdown in center */}
            <FlightTable flights={flights} />
        </div>
    );
};

export default FlightBoard;
