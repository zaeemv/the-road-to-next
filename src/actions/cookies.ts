"use server";
import { cookies } from "next/headers";

export async function getCookieByKey(key: string) {

    const cookieStore = await cookies();
    return await cookieStore.get(key)?.value ?? null;
}

export async function setCookieByKey(key: string, value: string) {

    const cookieStore = await cookies();
    await cookieStore.set(key, value);
}

export async function deleteCookieByKey(key: string) {

    const cookieStore = await cookies();
    await cookieStore.delete(key);
}