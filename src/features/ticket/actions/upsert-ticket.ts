/* eslint-disable simple-import-sort/imports */

"use server";

import { z } from "zod"
import { prisma } from "@/lib/prisma";
import { ticketPath, ticketsPath } from "@/paths";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { setCookieByKey } from "@/actions/cookies";
import { fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";

const upsertTicketSchema = z.object({
    title: z.string().min(1).max(191),
    content: z.string().min(1).max(1024),
    deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Is required"),
    bounty: z.coerce.number().positive(),
})

export const upsertTicket = async (
    id: string | undefined,
    _actionState: { message: string; payload?: FormData },
    formData: FormData
) => {
    try {
        const data = upsertTicketSchema.parse({
            title: formData.get("title") as string,
            content: formData.get("content") as string,
            bounty: formData.get("bounty") as string,
            deadline: formData.get("deadline") as string,
        })
        
        const dbData = {
            ...data,
            bounty: data.bounty * 100, // convert to cents
        }

        await prisma.ticket.upsert({
            where: { id: id || "" },
            update: dbData,
            create: dbData,
        })
    } catch (error) {
        return fromErrorToActionState(error, formData);
        
    }

    revalidatePath(ticketsPath());

    if (id) {
        await setCookieByKey("toast", "Ticket updated");
        redirect(ticketPath(id));
    }

    return toActionState("SUCCESS", "Ticket created successfully");
}

