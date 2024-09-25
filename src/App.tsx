import React from "react";
import { Route, Routes } from "react-router-dom";
import FlightBoard from "./pages/FlightBoard";
import FlightDetailPage from "./pages/FlightDetailPage";

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<FlightBoard />} />
            <Route path="/flights/:id" element={<FlightDetailPage />} />
        </Routes>
    );
};

export default App;
