import { useEffect, useRef } from "react";
import { ActionState } from "../utils/to-action-state";

type OnArgs = {
    actionState: ActionState;
}
type UseActionFeedbackOptions = {
    onError?: (onArgs: OnArgs) => void;
    onSuccess?: (onArgs: OnArgs) => void;
}

const useActionFeedback = (actionState: ActionState, options: UseActionFeedbackOptions) => {
    const prevTimestamp = useRef(actionState.timestamp);
    const isUpdate = prevTimestamp.current !== actionState.timestamp;

    useEffect(() => {
        if (!isUpdate) {
            return;
        }

        if (actionState.status === "ERROR") {
            options.onError?.({ actionState });
        }

        if (actionState.status === "SUCCESS") {
            options.onSuccess?.({ actionState });
        }
        prevTimestamp.current = actionState.timestamp;
    }, [isUpdate, actionState, options]);
    
}

export { useActionFeedback };