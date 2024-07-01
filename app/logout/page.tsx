'use client'
import { useEffect } from "react";
// import { useRouter } from "next/router";
import deleteCookie from "@/other/deleteCoookie";
import { useRouter } from "next/navigation";

const Logout = () => {
    const router = useRouter();

    useEffect(() => {
        localStorage.removeItem('userData');
        deleteCookie();
        router.push("/"); // Redirect to the login page after logging out
    }, [router]);


    return (
        <div>
            <h1>Logging out...</h1>
        </div>
    );
};

export default Logout;