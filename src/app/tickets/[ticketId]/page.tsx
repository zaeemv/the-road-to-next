import { initialTickets } from "@/data";

type TicketPageProps = {
  params: {
    ticketId: string;
  };
};

const TicketPage = ({params}: TicketPageProps) => {
  const ticket = initialTickets.find((ticket) => ticket.id === params.ticketId);
  if (!ticket) {
    return <div className="text-red-500">Ticket not found</div>;
  }
  
  return (
    <div>
      <h1 className="text-lg">{ticket.title}</h1>
      <h2 className="text-sm">{ticket.content}</h2>
    </div>
  )
}

export default TicketPage;