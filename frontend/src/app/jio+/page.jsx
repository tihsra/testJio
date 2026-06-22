"use client";

import { Lock } from "lucide-react";
import { useSelector } from "react-redux";

export default function Jio() {
    const userData = useSelector((store) => store.user);
    const isPremium = userData?.userObject?.isPremium;

    if (isPremium) {
        return <h1 className="text-2xl font-medium">This is your premium page</h1>
    }

    return (
        <div className="flex flex-col items-center justify-center gap-4 text-gray-400 h-[calc(100vh-75px)]">
            <Lock size={48} strokeWidth={1.5} />
            <p>Premium content locked</p>
        </div>
    );
}