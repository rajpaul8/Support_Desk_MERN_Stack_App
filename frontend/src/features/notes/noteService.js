import axios from "axios";

const API_URL = "http://localhost:5000/api/tickets/";

// @Desc: Add new note
// @Route: POST'/tickets/:ticketId/notes'
// Access: Private
const addNote = async (ticketId, note, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    API_URL + ticketId + "/notes",
    note,
    config
  );
  return response.data;
};

// @Desc: Get notes
// @Route: GET'/tickets/:ticketId/notes'
// Access: Private
const getNotes = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL+ticketId+"/notes", config);
  return response.data;
};

const noteService = { addNote, getNotes };

export default noteService;
