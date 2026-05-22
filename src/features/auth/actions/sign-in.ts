"use server";

import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import {z} from "zod";

const signInSchema = z.object({
    email: z.email().min(1, {message: "Email is required"}).max(191),
    password: z.string().min(6).max(191),
});

export const signIn = async (_actionState: ActionState, formData: FormData) => {
    try {
        const { email, password } = signInSchema.parse(
            Object.fromEntries(formData.entries())
        );

        // TODO Implement sign in logic} catch (error) {
    } catch (error) {
        return fromErrorToActionState(error, formData)
    }

    return toActionState("SUCCESS", "Sign in successful");
}