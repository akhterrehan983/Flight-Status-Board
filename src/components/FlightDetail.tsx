import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFlightById } from "../api/flightApi";
import ErrorMessage from "./ErrorMessage";

interface Flight {
    flightNumber: string;
    airline: string;
    origin: string;
    destination: string;
    departureTime: string;
    status: string;
}

const FlightDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [flight, setFlight] = useState<Flight | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchFlight = async () => {
            try {
                const data = await getFlightById(id!);
                setFlight(data);
            } catch (err) {
                setError("Unable to fetch flight details.");
            }
        };

        fetchFlight();
    }, [id]);

    if (error) {
        return <ErrorMessage message={error} />;
    }

    return flight ? (
        <div>
            <h1>Flight Details</h1>
            <p>Flight Number: {flight.flightNumber}</p>
            <p>Airline: {flight.airline}</p>
            <p>Origin: {flight.origin}</p>
            <p>Destination: {flight.destination}</p>
            <p>Departure Time: {flight.departureTime}</p>
            <p>Status: {flight.status}</p>
        </div>
    ) : (
        <p>Loading...</p>
    );
};

export default FlightDetail;
