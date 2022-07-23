import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { useEffect } from "react";
import { viewTickets, reset } from "../features/tickets/ticketSlice";
import { BackButton } from "../components/BackButton";
import TicketItem from "../components/TicketItem";

function ViewTickets() {
  const { tickets, isLoading, isSuccess } = useSelector(
    (state) => state.ticket
  );
  
  const dispatch = useDispatch();

  useEffect(() => {
    // On Unmount reset the state
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(viewTickets());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <>
      <BackButton url="/"></BackButton>
      <h1>Tickets</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
              </div>
              
              {tickets.map((ticket) => {
            return <TicketItem key={ticket._id} ticket={ticket}></TicketItem>;
        })}
      </div>
    </>
  );
}

export default ViewTickets;
