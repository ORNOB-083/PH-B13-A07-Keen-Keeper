import React from "react";
import { HiPlus } from "react-icons/hi2";

const Banner = () => {
    const stats = [
        { label: "Total Friends", value: 10 },
        { label: "On Track", value: 3 },
        { label: "Need Attention", value: 6 },
        { label: "Interactions This Month", value: 12 },
    ];

    return (
        <section className="bg-[#f8f9fa] py-12 px-4 md:py-20">
            <div className="container mx-auto text-center">

                <h1 className="text-3xl font-extrabold text-[#1a202c] md:text-5xl">
                    Friends to keep close in your life
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-500 md:text-base">
                    Your personal shelf of meaningful connections. Browse, tend, and nurture the
                    relationships that matter most.
                </p>

                <button className="mt-8 inline-flex items-center gap-2 rounded bg-[#1e3d37] px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105 active:scale-95">
                    <HiPlus className="text-lg" />
                    Add a Friend
                </button>

                <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
                        >
                            <span className="text-3xl font-bold text-[#1e3d37] md:text-4xl">
                                {stat.value}
                            </span>
                            <span className="mt-2 text-sm font-medium text-slate-500">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="mt-16 border-b border-gray-200"></div>
            </div>
        </section>
    );
};

export default Banner;