"use client";
import {useEffect} from "react";
import { useRouter } from "next/navigation";
export default function AuthLayout({
                                        children,
                                    }: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    useEffect(()=>{
        const token = localStorage.getItem("loginToken");
        if (token) {
            router.push("/admin");
        }
    },[router]);
    return (
        <>{children}</>
    );
}