import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, Chip, Box, Divider } from "@mui/material";
import { getFlightById } from "../api/flightApi";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader"; // Import the loader component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane, faClock, faMapMarkerAlt, faPlaneArrival } from "@fortawesome/free-solid-svg-icons";

interface Flight {
    flightNumber: string;
    airline: string;
    origin: string;
    destination: string;
    departureTime: string;
    status: string;
}

const FlightDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [flight, setFlight] = useState<Flight | null>(null);
    const [loading, setLoading] = useState(true); // Add a loading state
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchFlight = async () => {
            try {
                const data = await getFlightById(id!);
                setFlight(data);
            } catch (err) {
                setError("Unable to fetch flight details.");
            } finally {
                setLoading(false); // Stop loading once the fetch is complete
            }
        };

        fetchFlight();
    }, [id]);

    if (error) {
        return <ErrorMessage message={error} />;
    }

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                backgroundImage: "linear-gradient(to bottom, #ffffff, #d5cfda, #ffffff)",
                position: "relative",
                padding: "50px", // Add some padding for better spacing
            }}
        >
            {/* Loader will be visible but slightly transparent when the data has loaded */}
            <Box
                sx={{
                    marginTop: -50,
                    paddingBottom: -600,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Loader />
            </Box>

            {/* Flight Details Card */}
            {flight && (
                <Card
                    sx={{
                        marginTop:25,
                        paddingTop:200,
                        maxWidth: 600,
                        padding: 4, // Add more padding for separation
                        borderRadius: 3,
                        boxShadow: 4,
                        backgroundImage: "linear-gradient(to bottom, #c8e5ff, #ecd6ff, #383637)",
                    }}
                >
                    <CardContent>
                        <Typography variant="h4" gutterBottom align="center">
                            Flight Details
                        </Typography>
                        <Divider />
                        <Box sx={{ padding: "20px 0" }}>
                            <Typography variant="body1">
                                <FontAwesomeIcon icon={faPlane} /> <strong>Flight Number:</strong> {flight.flightNumber}
                            </Typography>
                            <Typography variant="body1">
                                <FontAwesomeIcon icon={faPlaneArrival} /> <strong>Airline:</strong> {flight.airline}
                            </Typography>
                            <Typography variant="body1">
                                <FontAwesomeIcon icon={faMapMarkerAlt} /> <strong>Origin:</strong> {flight.origin}
                            </Typography>
                            <Typography variant="body1">
                                <FontAwesomeIcon icon={faMapMarkerAlt} /> <strong>Destination:</strong> {flight.destination}
                            </Typography>
                            <Typography variant="body1">
                                <FontAwesomeIcon icon={faClock} /> <strong>Departure Time:</strong>{" "}
                                {new Date(flight.departureTime).toLocaleString()}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Status:</strong>{" "}
                                <Chip
                                    label={flight.status}
                                    color={
                                        flight.status.toLowerCase() === "on-time"
                                            ? "success"
                                            : flight.status.toLowerCase() === "delayed"
                                            ? "warning"
                                            : "primary"
                                    }
                                    sx={{ fontWeight: "bold", padding: "5px", fontSize: "1rem" }}
                                />
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            )}
        </Box>
    );
};

export default FlightDetailPage;
