"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useTransactions } from "./TransactionContext";
import { v4 as uuidv4 } from "uuid";

/* -------------------------------------------------------------------------- */
/* TYPES */
/* -------------------------------------------------------------------------- */

export type AccountType = "bank" | "wallet";

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  initialBalance: number;
}

export interface AccountWithBalance extends Account {
  balance: number;
}

interface AccountContextType {
  accounts: Account[];
  getAccountsWithBalance: () => AccountWithBalance[];
  getTotalBalance: () => number;
}

/* -------------------------------------------------------------------------- */
/* CONTEXT */
/* -------------------------------------------------------------------------- */

const AccountContext = createContext<AccountContextType | undefined>(
  undefined
);

/* -------------------------------------------------------------------------- */
/* HOOK */
/* -------------------------------------------------------------------------- */

export const useAccounts = (): AccountContextType => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccounts must be used within AccountProvider");
  }
  return context;
};

/* -------------------------------------------------------------------------- */
/* INITIAL DATA */
/* -------------------------------------------------------------------------- */

const initialAccounts: Account[] = [
  {
    id: uuidv4(),
    name: "Main Account",
    type: "bank",
    initialBalance: 10000,
  },
  {
    id: uuidv4(),
    name: "Savings",
    type: "bank",
    initialBalance: 50000,
  },
  {
    id: uuidv4(),
    name: "Wallet",
    type: "wallet",
    initialBalance: 2000,
  },
];

/* -------------------------------------------------------------------------- */
/* PROVIDER */
/* -------------------------------------------------------------------------- */

export const AccountProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const { transactions } = useTransactions();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedAccounts = localStorage.getItem("accounts");

    if (savedAccounts) {
      setAccounts(JSON.parse(savedAccounts));
    } else {
      setAccounts(initialAccounts);
      localStorage.setItem("accounts", JSON.stringify(initialAccounts));
    }
  }, []);

  /* -------------------------------------------------------------------------- */
  /* LOGIC */
  /* -------------------------------------------------------------------------- */

  const getAccountsWithBalance = (): AccountWithBalance[] => {
    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    const netChange = totalIncome - totalExpense;

    const totalInitialBalance = accounts.reduce(
      (sum, acc) => sum + acc.initialBalance,
      0
    );

    if (totalInitialBalance === 0) return [];

    return accounts.map((account) => {
      const proportion = account.initialBalance / totalInitialBalance;
      const accountChange = netChange * proportion;

      return {
        ...account,
        balance: account.initialBalance + accountChange,
      };
    });
  };

  const getTotalBalance = (): number => {
    return getAccountsWithBalance().reduce(
      (sum, acc) => sum + acc.balance,
      0
    );
  };

  /* -------------------------------------------------------------------------- */
  /* VALUE */
  /* -------------------------------------------------------------------------- */

  const value: AccountContextType = {
    accounts,
    getAccountsWithBalance,
    getTotalBalance,
  };

  return (
    <AccountContext.Provider value={value}>
      {children}
    </AccountContext.Provider>
  );
};