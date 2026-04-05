"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface Transaction {
  id: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  description?: string;
  date: string;
  created_at: string;
  updated_at: string;
}

interface TransactionsContextType {
  transactions: Transaction[];
  loading: boolean;
  addTransaction: (
    transaction: Omit<Transaction, "id" | "created_at" | "updated_at">,
  ) => Promise<void>;
  updateTransaction: (
    id: string,
    transaction: Partial<Transaction>,
  ) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  refreshTransactions: () => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(
  undefined,
);

const STORAGE_KEY = "transactions";

export function TransactionsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const INITIAL_TRANSACTIONS: Transaction[] = [
    {
      id: crypto.randomUUID(),
      type: "income",
      category: "Salary",
      description: "Monthly salary",
      amount: 5000,
      date: new Date("2026-04-04").toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      type: "expense",
      category: "Entertainment",
      description: "Movies and entertainment",
      amount: 200,
      date: new Date("2026-04-02").toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      type: "expense",
      category: "Food",
      description: "Groceries and dining",
      amount: 150,
      date: new Date("2026-04-02").toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      type: "expense",
      category: "Healthcare",
      description: "Medical expenses",
      amount: 300,
      date: new Date("2026-04-01").toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      type: "expense",
      category: "Bills",
      description: "Utilities and rent",
      amount: 800,
      date: new Date("2026-03-31").toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      type: "expense",
      category: "Transport",
      description: "Fuel and transportation",
      amount: 80,
      date: new Date("2026-03-31").toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      type: "expense",
      category: "Shopping",
      description: "Clothing and accessories",
      amount: 500,
      date: new Date("2026-03-31").toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      type: "income",
      category: "Freelance",
      description: "Freelance project payment",
      amount: 1500,
      date: new Date("2026-03-30").toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  // ✅ Load from localStorage
  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        const parsed = JSON.parse(stored);

        // ✅ Merge + avoid duplicates
        const merged = [...parsed];

        INITIAL_TRANSACTIONS.forEach((initTx) => {
          const exists = parsed.some(
            (t: Transaction) => t.category === initTx.category,
          );
          if (!exists) {
            merged.push(initTx);
          }
        });

        setTransactions(merged);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      } else {
        setTransactions(INITIAL_TRANSACTIONS);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TRANSACTIONS));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Save to localStorage
  const persist = (data: Transaction[]) => {
    setTransactions(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      fetchTransactions();
    }
  }, []);

  // ✅ Add
  const addTransaction = async (
    transaction: Omit<Transaction, "id" | "created_at" | "updated_at">,
  ) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const updated = [newTransaction, ...transactions];
    persist(updated);
  };

  // ✅ Update
  const updateTransaction = async (
    id: string,
    updates: Partial<Transaction>,
  ) => {
    const updated = transactions.map((t) =>
      t.id === id
        ? { ...t, ...updates, updated_at: new Date().toISOString() }
        : t,
    );

    persist(updated);
  };

  // ✅ Delete
  const deleteTransaction = async (id: string) => {
     setTransactions((prev) => prev.filter((t) => t.id !== id));
    
  };

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        loading,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        refreshTransactions: fetchTransactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error("useTransactions must be used within TransactionsProvider");
  }
  return context;
}
