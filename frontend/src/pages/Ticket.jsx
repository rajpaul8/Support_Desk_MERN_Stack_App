import React from "react";
import { BackButton } from "../components/BackButton";
import { useSelector, useDispatch } from "react-redux";
import { reset, getTicket, closeTicket } from "../features/tickets/ticketSlice";
import { getNotes, reset as notesReset } from "../features/notes/noteSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import NoteItem from "../components/NoteItem";

function Ticket() {
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
