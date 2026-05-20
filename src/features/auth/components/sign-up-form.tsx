"use client";

import { SubmitButton } from "@/components/form/submit-button";
import { Input } from "@/components/ui/input";
import { signUp } from "../actions/sign-up";
import { useActionState } from "react";
import { Form } from "@/components/form/form";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";

const SignUpForm = () => {
    const [actionState, action] = useActionState(signUp, EMPTY_ACTION_STATE)
        return (
            <Form action={signUp}>
                <Input name="username" placeholder="Username" />
                <Input name="email" placeholder="Email" />
                <Input name="password" placeholder="Password" type="password" />
                <Input name="confirmPassword" placeholder="Confirm Password" type="password" />
                <SubmitButton label="Sign Up" />
            </Form>
        )
}

export { SignUpForm };