"use client";

import { useContext } from "react";
import { TimelineContext } from "@/context/timeline.context";
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

const StatsPage = () => {
    const { timeline } = useContext(TimelineContext);

    const textCount = timeline.filter((t) => t.type === "Text").length;
    const callCount = timeline.filter((t) => t.type === "Call").length;
    const videoCount = timeline.filter((t) => t.type === "Video").length;

    const data = [
        { name: "Text", value: textCount, fill: "#A855F7" },
        { name: "Call", value: callCount, fill: "#1E3D37" },
        { name: "Video", value: videoCount, fill: "#4ADE80" },
    ];

    return (
        <div className="bg-[#f8f9fa] min-h-screen py-10 px-4">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-4xl font-black text-[#1e293b] mb-10 tracking-tight">
                    Friendship Analytics
                </h2>

                <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm">
                    <h3 className="text-xl font-black text-slate-700 mb-8">
                        By Interaction Type
                    </h3>

                    <div className="w-full flex justify-center items-center" style={{ height: "400px" }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={100}
                                    outerRadius={140}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                    isAnimationActive={true}
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} cornerRadius={10} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend
                                    verticalAlign="bottom"
                                    align="center"
                                    iconType="circle"
                                    formatter={(value) => <span className="text-slate-600 font-bold px-2">{value}</span>}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsPage;