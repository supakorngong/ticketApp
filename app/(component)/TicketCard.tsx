import DeleteBlock from "./DeleteBlock";
import PriorityDisplay from "./PriorityDisplay";
import ProgressDisplay from "./ProgressDisplay";
import StatusDisplay from "./StatusDisplay";
import { Ticket } from "../page";
import { IsoToDateTime } from "../(utils)/convertTime";
import Link from "next/link";

function TicketCard(props: Ticket) {
  const convertedTime = IsoToDateTime(props.createdAt);

  return (
    <div className="flex flex-col bg-card hover:bg-card-hover rounded-md shadow-lg p-3 m-2">
      <div className="flex mb-3">
        <PriorityDisplay priority={props?.priority} />
        <div className="ml-auto">
          <DeleteBlock id={props?._id} fetchTicket={props.fetchTicket} />
        </div>
      </div>
      <Link href={`/ticketpage/${props._id}`} style={{ display: "contents" }}>
        <h4>{props?.title}</h4>
        <hr className="h-px border-0 bg-page mb-2" />
        <p className="whitespace-pre-wrap">{props?.description}</p>
        <div className="flex-grow"></div>
        <div className="flex mt-2">
          <div className="flex flex-col">
            <p className="text-xs my-1">{convertedTime}</p>
            <ProgressDisplay progress={props?.progress} />
          </div>
          <div className="ml-auto flex items-end">
            <StatusDisplay status={props?.status} />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default TicketCard;
