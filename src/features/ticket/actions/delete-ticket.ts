/* eslint-disable simple-import-sort/imports */

"use server";

import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";
import { revalidatePath } from "next/cache";
import { setCookieByKey } from "@/actions/cookies";
import { fromErrorToActionState } from "@/components/form/utils/to-action-state";

export const deleteTicket = async (id: string) => {
    try {
        await prisma.ticket.delete({
            where: { id },
        });
    } catch (error) {
        return fromErrorToActionState(error);
    }

    revalidatePath(ticketsPath());
    await setCookieByKey("toast", "Ticket deleted");
    redirect(ticketsPath());
    
}
