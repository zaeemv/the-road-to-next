import { cloneElement, useState } from "react";
import { ActionState } from "./form/utils/to-action-state";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { clone } from "zod";

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
                        <Button onClick={action} variant="destructive">Continue</Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );

    return [dialogTrigger, dialog];

}

export { useConfirmDialog };