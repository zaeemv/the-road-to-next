import { useEffect, useRef } from "react";

import { ActionState } from "../utils/to-action-state";

type OnArgs = {
    actionState: ActionState;
}
type UseActionFeedbackOptions = {
    onError?: (onArgs: OnArgs) => void;
    onSuccess?: (onArgs: OnArgs) => void;
}

const useActionFeedback = (actionState: ActionState | undefined, options: UseActionFeedbackOptions) => {
    // Defensive: handle undefined actionState or timestamp
    const timestamp = actionState?.timestamp ?? 0;
    const prevTimestamp = useRef(timestamp);
    const isUpdate = prevTimestamp.current !== timestamp;

    useEffect(() => {
        if (!isUpdate || !actionState) {
            return;
        }

        if (actionState.status === "ERROR") {
            options.onError?.({ actionState });
        }

        if (actionState.status === "SUCCESS") {
            options.onSuccess?.({ actionState });
        }
        prevTimestamp.current = timestamp;
    }, [isUpdate, actionState, options, timestamp]);
}

export { useActionFeedback };