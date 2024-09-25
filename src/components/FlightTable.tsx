import React from "react";
import { useNavigate } from "react-router-dom";

interface Flight {
    id: string;
    flightNumber: string;
    airline: string;
    origin: string;
    destination: string;
    departureTime: string;
    status: string;
}

interface Props {
    flights: Flight[];
}

const FlightTable: React.FC<Props> = ({ flights }) => {
    const navigate = useNavigate(); // Hook for programmatic navigation

    const handleRowClick = (flightId: string) => {
        navigate(`/flights/${flightId}`); // Navigate to the flight details page when row is clicked
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Flight Number</th>
                    <th>Airline</th>
                    <th>Origin</th>
                    <th>Destination</th>
                    <th>Departure Time</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {flights.map((flight) => (
                    <tr key={flight.id} className="clickable-row" onClick={() => handleRowClick(flight.id)}>
                        <td>{flight.flightNumber}</td>
                        <td>{flight.airline}</td>
                        <td>{flight.origin}</td>
                        <td>{flight.destination}</td>
                        <td>{new Date(flight.departureTime).toLocaleString()}</td>
                        {/* Conditionally apply classes based on flight status */}
                        <td className={`status ${flight.status.toLowerCase().replace(" ", "-")}`}>{flight.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default FlightTable;
