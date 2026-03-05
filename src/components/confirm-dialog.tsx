import { Sub } from "@radix-ui/react-dropdown-menu";
import { cloneElement, useActionState, useState } from "react";
import { clone } from "zod";

import { Form } from "./form/form";
import { SubmitButton } from "./form/submit-button";
import { ActionState, EMPTY_ACTION_STATE } from "./form/utils/to-action-state";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Button } from "./ui/button";

type useConfirmDialogProps = {
    title?: string;
    description?: string;
    action: () => Promise<ActionState>;
    trigger: React.ReactElement;
}

const useConfirmDialog = ({
    title = "Are you absolutely sure?",
    description = "This action cannot be undone. Make sure you understand the consequences.",
    action,
    trigger
}: useConfirmDialogProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const dialogTrigger = cloneElement(trigger as React.ReactElement<{ onClick?: () => void }>, {
        onClick: () => setIsOpen(state => !state)
    });

    const [actionState, formAction] = useActionState(action, EMPTY_ACTION_STATE);

    const handleSuccess = () => {
        setIsOpen(false);
    }

    const dialog = (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent >
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Form
                            action={formAction}
                            actionState={actionState}
                            onSuccess={handleSuccess}
                        >
                            <SubmitButton label="Confirm" />
                        </Form>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );

    return [dialogTrigger, dialog];

}

export { useConfirmDialog };