"use client";

import { useContext, useState } from "react";
import { TimelineContext } from "@/context/timeline.context";
import Image from "next/image";

import callIcon from "@/assets/call.png";
import textIcon from "@/assets/text.png";
import videoIcon from "@/assets/video.png";

const TimelinePage = () => {
    const { timeline } = useContext(TimelineContext);
    const [filter, setFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredData = timeline.filter((item) => {
        const matchesFilter = filter === "All" || item.type === filter;

        const matchesSearch =
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.type.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const getIcon = (type) => {
        if (type === "Call")
            return callIcon;
        if (type === "Text")
            return textIcon;
        if (type === "Video")
            return videoIcon;
        return callIcon;
    };

    return (
        <div className="bg-[#f8f9fa] px-4 pt-20 pb-20">
            <div className="container mx-auto max-w-6xl">
                <h2 className="text-4xl font-black text-[#1e293b] mb-8 tracking-tight">
                    Timeline
                </h2>

                <div className="flex flex-col md:flex-row gap-4 mb-10">
                    <div className="w-full md:w-[240px]">
                        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="w-full p-4 rounded-xl border border-slate-200 bg-white text-slate-500 font-bold text-sm outline-none cursor-pointer shadow-sm">
                            <option value="All">Filter Timeline</option>
                            <option value="Call">Call</option>
                            <option value="Text">Text</option>
                            <option value="Video">Video</option>
                        </select>
                    </div>

                    <div className="flex-1 flex bg-white rounded-xl border border-slate-200 overflow-hidden">
                        <input
                            type="text"
                            placeholder="Search by friend name or interaction type..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-1 p-4 outline-none font-medium text-slate-600 placeholder:text-slate-400 bg-transparent"
                        />
                        <button className="bg-green-900 text-white px-8 font-bold hover:bg-green-700 transition-colors">
                            Search
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    {filteredData.length === 0 ? (
                        <div className="bg-white px-10 py-40 rounded-3xl border border-gray-300 text-center">
                            <p className="text-slate-400 text-2xl font-medium">
                                {searchQuery ? "No results found for your search." : "No activity yet..."}
                            </p>
                        </div>
                    ) : (
                        filteredData.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center gap-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="w-12 h-12 relative shrink-0">
                                    <Image
                                        src={getIcon(item.type)}
                                        alt={item.type}
                                        fill
                                        className="object-contain"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <p className="font-black text-xl text-[#1e293b]">
                                        {item.title}
                                    </p>
                                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.1em] mt-1">
                                        {item.date}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div >
    );
};

export default TimelinePage;