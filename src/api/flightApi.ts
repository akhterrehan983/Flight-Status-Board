import axios from "axios";

const API_BASE_URL = "https://flight-status-mock.core.travelopia.cloud/flights";

export const getFlights = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}`);
        return response.data;
    } catch (error) {
        throw new Error("Error fetching flights");
    }
};

export const getFlightById = async (id: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error("Error fetching flight details");
    }
};
