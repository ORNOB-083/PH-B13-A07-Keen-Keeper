"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SyncLoader } from "react-spinners";

const FriendGrid = () => {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetch("/friends.json")
                .then((res) => res.json())
                .then((data) => {
                    setFriends(data);
                    setLoading(false);
                })
                .catch((err) => console.error("Error loading friends:", err));
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const statusConfig = {
        "Overdue": "bg-red-500",
        "Almost Due": "bg-orange-400",
        "On-Track": "bg-[#244D3F]",
    };

    if (loading) return (
        <div className="bg-[#f8f9fa] flex flex-col items-center justify-center py-20">
            <SyncLoader color="#1e3d37" size={15} margin={5} />
            <p className="mt-4 text-slate-500 text-sm font-medium animate-pulse">
                Loading connections...
            </p>
        </div>
    );

    return (
        <section className="bg-[#f8f9fa] min-h-screen mx-auto px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 pb-10">
            <h2 className="text-2xl font-bold text-slate-800 mb-8">Your Friends</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {friends.map((friend) => {
                    const badgeColor = statusConfig[friend.status] || "bg-gray-400";

                    return (
                        <Link
                            href={`/apps/${friend.id}`}
                            key={friend.id}
                            className="group bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl transition-all duration-300 text-center hover:-translate-y-1">
                            <div className="relative inline-block">
                                <img
                                    src={friend.picture}
                                    alt={friend.name}
                                    className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-50 object-cover shadow-sm group-hover:border-emerald-50 transition-colors"
                                />
                            </div>

                            <h3 className="text-lg font-bold text-slate-800 group-hover:text-[#1e3d37] transition-colors">
                                {friend.name}
                            </h3>
                            <p className="text-xs text-gray-400 mt-1 font-medium">
                                {friend.days_since_contact}d ago
                            </p>

                            <div className="flex flex-wrap justify-center gap-2 mt-4">
                                {friend.tags?.map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1 text-[10px] font-bold tracking-wider rounded-full bg-[#CBFADB] text-slate-500 uppercase border border-slate-100"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-4">
                                <span className={`inline-block px-5 py-1 rounded-full text-[10px] font-bold text-white uppercase shadow-sm ${badgeColor}`}>
                                    {friend.status}
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};

export default FriendGrid;