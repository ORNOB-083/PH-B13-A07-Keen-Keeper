"use client";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { SyncLoader } from "react-spinners";
import { toast } from "react-toastify";
import {
  HiOutlineBellAlert, HiOutlineArchiveBox, HiOutlineTrash
} from "react-icons/hi2";

import callIcon from "@/assets/call.png";
import textIcon from "@/assets/text.png";
import videoIcon from "@/assets/video.png";

import { TimelineContext } from "@/context/timeline.context";

const FriendDetails = () => {
  const { id } = useParams();
  const [friend, setFriend] = useState(null);
  const [loading, setLoading] = useState(true);

  const { timeline, setTimeline } = useContext(TimelineContext);

  useEffect(() => {
    const fetchFriend = async () => {
      try {
        const res = await fetch("/friends.json");
        const data = await res.json();

        const found = data.find((f) => f.id === parseInt(id));

        setTimeout(() => {
          setFriend(found);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Failed to fetch friend data", error);
        setLoading(false);
      }
    };
    fetchFriend();
  }, [id]);

  const handleAction = (actionType) => {
    if (!friend) return;

    const newEntry = {
      id: Date.now(),
      type: actionType,
      title: `${actionType} with ${friend.name}`,
      date: new Date().toLocaleDateString(),
    };

    setTimeline([newEntry, ...timeline]);

    toast.success(`${actionType} logged for ${friend.name}`);
  };

  if (loading) return (
    <div className="flex flex-col justify-center items-center min-h-[70vh]">
      <SyncLoader color="#1e3d37" />
      <p className="mt-4 text-slate-500 text-sm italic ">Loading profile...</p>
    </div>
  );

  if (!friend) return <div className="text-center py-50 font-bold text-4xl">Friend not found!</div>;

  return (
    <main className="bg-[#f8f9fa] py-8 md:py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
              <div className="relative inline-block mb-4">
                <img
                  src={friend.picture}
                  alt={friend.name}
                  className="w-28 h-28 rounded-full border-4 border-gray-50 object-cover mx-auto"
                />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">{friend.name}</h2>

              <div className="flex flex-col items-center gap-2 mt-3">
                {(() => {
                  const statusColors = {
                    "Overdue": "bg-[#ef4444]",
                    "Almost Due": "bg-[#f59e0b]",
                    "On-Track": "bg-[#10b981]"
                  };
                  const badgeClass = statusColors[friend.status] || "bg-gray-500";

                  return (
                    <span className={`text-white text-[10px] px-4 py-1 rounded-full font-bold uppercase shadow-sm ${badgeClass}`}>
                      {friend.status}
                    </span>
                  );
                })()}

                <span className="bg-emerald-50 text-emerald-600 text-[10px] px-4 py-1 rounded-full font-bold uppercase border border-emerald-100">
                  {friend.tags?.[0] || "Friend"}
                </span>
              </div>

              <p className="mt-6 text-slate-500 italic text-sm px-4 line-clamp-3">
                "{friend.bio}"
              </p>
              <p className="mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Preferred: email
              </p>
            </div>

            <div className="space-y-3">
              <button className="flex items-center justify-center gap-3 w-full py-4 bg-white border border-gray-100 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
                <HiOutlineBellAlert className="text-xl text-slate-400" /> Snooze 2 Weeks
              </button>
              <button className="flex items-center justify-center gap-3 w-full py-4 bg-white border border-gray-100 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
                <HiOutlineArchiveBox className="text-xl text-slate-400" /> Archive
              </button>
              <button className="flex items-center justify-center gap-3 w-full py-4 bg-white border border-gray-100 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-colors shadow-sm">
                <HiOutlineTrash className="text-xl" /> Delete
              </button>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center">
                <p className="text-4xl font-black text-[#244D3F]">{friend.days_since_contact}</p>
                <p className="text-xs font-bold text-slate-400 mt-2 uppercase">Days Since Contact</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center">
                <p className="text-4xl font-black text-[#244D3F]">{friend.goal}</p>
                <p className="text-xs font-bold text-slate-400 mt-2 uppercase">Goal (Days)</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center">
                <p className="text-2xl font-black text-[#244D3F] leading-tight">
                  {friend.next_due_date ? new Date(friend.next_due_date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  }) : "N/A"}
                </p>
                <p className="text-xs font-bold text-slate-400 mt-2 uppercase">Next Due</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center">
              <div>
                <h3 className="text-xl text-[#244D3F] font-bold mt-2">Relationship Goal</h3>
                <p className="text-slate-500 text-medium mt-5">
                  Connect every <span className="font-bold text-[#244D3F]">{friend.goal} days</span>
                </p>
              </div>
              <button className="p-2 px-3 bg-slate-50 rounded-xl border border-gray-100 hover:bg-slate-100 text-slate-600 font-bold transition-colors">
                Edit
              </button>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#244D3F] mb-8">Quick Check-In</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { icon: callIcon, label: "Call" },
                  { icon: textIcon, label: "Text" },
                  { icon: videoIcon, label: "Video" },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleAction(item.label)}
                    className="flex flex-col items-center justify-center p-4 bg-[#f8f9fa] rounded-2xl border border-transparent hover:border-emerald-200 hover:bg-emerald-50 transition-all group"
                  >
                    <div className="w-12 h-12 relative mb-4 transition-transform group-hover:scale-110">
                      <Image src={item.icon} alt={item.label} fill className="object-contain" />
                    </div>
                    <span className="text-sm font-bold text-slate-600 group-hover:text-emerald-700">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FriendDetails;