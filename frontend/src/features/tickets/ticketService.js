import axios from "axios";

const API_URL = "http://localhost:5000/api/tickets/";

// Create new tickets
const createTicket = async (ticketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, ticketData, config);
  return response.data;
};

// View Tickets
const viewTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Get Single ticket using its ID
const getTicket = async (ticketID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + ticketID, config);
  return response.data;
};

// Get Single ticket using its ID and Update the status to closed
const closeTicket = async (ticketID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + ticketID,
    { status: "closed" },
    config
  );
  return response.data;
};

const ticketService = { createTicket, viewTickets, getTicket, closeTicket };

export default ticketService;
