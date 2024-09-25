import React from "react";
import { render, screen } from "@testing-library/react";
import FlightTable from "../components/FlightTable";
import { BrowserRouter as Router } from "react-router-dom";

const mockFlights = [
  {
    id: "1",
    flightNumber: "AA123",
    airline: "American Airlines",
    origin: "JFK",
    destination: "LAX",
    departureTime: "12:00",
    status: "On Time",
  },
  {
    id: "2",
    flightNumber: "DL456",
    airline: "Delta",
    origin: "ATL",
    destination: "ORD",
    departureTime: "15:00",
    status: "Delayed",
  },
];

describe("FlightTable Component", () => {
  test("renders flight table with correct data", () => {
    render(
      <Router>
        <FlightTable flights={mockFlights} />
      </Router>
    );

    // Check that flight numbers are rendered
    expect(screen.getByText(/AA123/)).toBeInTheDocument();
    expect(screen.getByText(/DL456/)).toBeInTheDocument();

    // Check that airlines are rendered
    expect(screen.getByText(/American Airlines/)).toBeInTheDocument();
    expect(screen.getByText(/Delta/)).toBeInTheDocument();

    // Check that statuses are rendered
    expect(screen.getByText(/On Time/)).toBeInTheDocument();
    expect(screen.getByText(/Delayed/)).toBeInTheDocument();
  });
});
