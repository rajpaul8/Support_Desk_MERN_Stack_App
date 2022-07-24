import Modal from "react-modal";
import { BackButton } from "../components/BackButton";
import { useSelector, useDispatch } from "react-redux";
import { reset, getTicket, closeTicket } from "../features/tickets/ticketSlice";
import { getNotes, addNote } from "../features/notes/noteSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import NoteItem from "../components/NoteItem";
import { FaPlus } from "react-icons/fa";

Modal.setAppElement("#root");

function Ticket() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.ticket
  );
  // Get notes from the state:
  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.notes
  );
  const navigate = useNavigate();
  const { ticketID } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicket(ticketID));
    dispatch(getNotes(ticketID));
    //eslint-disable-next-line
  }, [isError, message, ticketID]);

  const onTicketClose = () => {
    dispatch(closeTicket(ticketID));
    toast.success("Ticket Closed");
    navigate("/tickets");
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  // Submit Modal Form to raise Note with respect to a ticket
  const onNoteSubmit = (e) => {
    e.preventDefault();
    dispatch(addNote({ noteText, ticketID }));
    // toast.success('Note Text Added')
    closeModal();
  };

  if (isLoading) {
    return <Spinner></Spinner>;
  }
  if (notesIsLoading) {
    return <Spinner></Spinner>;
  }
  if (isError) {
    return <h1> Something went wrong</h1>;
  }
  return (
    <>
      <div className="ticket-page">
        <header className="ticket-header">
          <BackButton url="/tickets"></BackButton>
          <h2>
            Ticket ID: {ticketID}
            <span className={`status status-${ticket.status}`}>
              {ticket.status}
            </span>
          </h2>
          <h3>
            Date Submitted: {new Date(ticket.createdAt).toLocaleString("US-en")}
          </h3>
          <h3>Product: {ticket.product}</h3>
          <hr />
          <div className="ticket-desc">
            <h3>Description of Issue</h3>
            <p>{ticket.description}</p>
          </div>
          <h2>Notes</h2>
        </header>
        {ticket.status !== "closed" && (
          <button className="btn" onClick={openModal}>
            <FaPlus /> Add Note
          </button>
        )}

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="modal-content"
          contentLabel="Add Note"
        >
          <h2>Add Note</h2>
          <button className="btn-close" onClick={closeModal}>
            X
          </button>
          <form onSubmit={onNoteSubmit}>
            <div className="form-group">
              <textarea
                name="noteText"
                id="noteText"
                className="form-control"
                value={noteText}
                placeholder="Note Text"
                onChange={(e) => setNoteText(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <button className="btn" type="submit">
                Submit
              </button>
            </div>
          </form>
        </Modal>
        {notes.map((note) => {
          return <NoteItem key={note._id} note={note}></NoteItem>;
        })}
        {ticket.status !== "closed" && (
          <button onClick={onTicketClose} className="btn btn-block btn-danger">
            Close Ticket
          </button>
        )}
      </div>
    </>
  );
}

export default Ticket;
