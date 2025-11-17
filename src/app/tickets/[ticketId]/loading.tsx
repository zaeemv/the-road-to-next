
import { Placeholder } from "@/components/placeholder";
import { Spinner } from "@/components/spinner";

export default function Loading() {
    return (
        <Placeholder label="Loading Ticket" icon={<Spinner />} />
    );
}