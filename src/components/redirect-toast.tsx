"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

import { deleteCookieByKey, getCookieByKey } from "@/actions/cookies";

const RedirectToast = () => {

    const pathName = usePathname();
    
    async function showCookieToast() {
        const message = await getCookieByKey("toast");

        if (message != null) {
            toast.success(message);
            await deleteCookieByKey("toast");
        }
    }
    useEffect(() => {

        showCookieToast();

    }, [pathName]);

    return null;
}

export { RedirectToast };