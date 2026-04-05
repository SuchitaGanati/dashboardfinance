"use client";

import { useEffect, useState } from "react";
import SummaryCard from "../../freatures/accounts_cards/summaryCard";
import Transaction from "../../freatures/accounts_cards/transactionItem";

export default function Dashboard() {


  useEffect(() => {
    const saved = localStorage.getItem("finTheme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const isDark = saved ? saved === "dark" : prefersDark;
   
  }, []);

 

  return (
    <div className="min-h-screen bg-[#e1eef8] dark:bg-[#0b0f1a] transition-colors">
      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-[11px] tracking-widest uppercase text-slate-400">
              Net Worth
            </p>
            <h1 className="text-4xl font-serif text-slate-900 dark:text-white">
              ₹1,73,400
            </h1>
            <div className="w-10 h-0.5 bg-slate-900 dark:bg-white mt-3 rounded" />
          </div>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-4">
          {[
            {
              name: "Main Account",
              amount: "₹ 45,200",
              color: "from-[#1a1a2e] via-[#16213e] to-[#0f3460]",
            },
            {
              name: "Savings",
              amount: "₹ 1,20,000",
              color: "from-[#0d1b2a] via-[#1b4332] to-[#2d6a4f]",
            },
            {
              name: "Wallet",
              amount: "₹ 8,200",
              color: "from-[#2d1b69] to-[#11998e]",
            },
          ].map((card, i) => (
            <div
              key={i}
              className={`rounded-2xl p-5 text-white bg-linear-to-br ${card.color} shadow-md hover:shadow-xl transition`}
            >
              <p className="text-sm font-medium">{card.name}</p>
              <p className="mt-2 text-lg opacity-80">{card.amount}</p>
              <p className="text-xs opacity-40 mt-4">**** **** **** 4821</p>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 gap-4">
          <SummaryCard label="Income" amount="₹ 13,000" type="income" />
          <SummaryCard label="Expenses" amount="₹ 3,700" type="expense" />
        </div>

        {/* Transactions */}
        <p className="mt-6 text-xs uppercase tracking-wider text-slate-400">
          Recent transactions
        </p>

        <div className="space-y-2 mt-2">
          <Transaction name="Grocery Store" date="Today" amount="-₹ 840" />
          <Transaction name="Salary Credit" date="Apr 1" amount="+₹ 13,000" />
          <Transaction
            name="Electricity Bill"
            date="Mar 31"
            amount="-₹ 1,220"
          />
        </div>
      </div>
    </div>
  );
}
