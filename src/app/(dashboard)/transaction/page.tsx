"use client";

import { useState, useMemo } from "react";
import { useTransactions } from "@/src/context/TransactionContext";
import { useRole } from "@/src/context/RoleContext";
import { Plus } from "lucide-react";

import TransactionsTable from "../../freatures/transaction/TransactionsTable";
import TransactionsFilters from "../../freatures/transaction/TransactionsFilters";
import TransactionDialog from "../../freatures/transaction/TransactionDialog";
import { Button } from "@/components/ui/button";

export default function TransactionsPage() {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } =
    useTransactions();
  const { role } = useRole();

  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<any>(null);

  const [formData, setFormData] = useState<{
    date: string;
    amount: string;
    category: string;
    type: "income" | "expense";
    description: string;
  }>({
    date: new Date().toISOString().split("T")[0],
    amount: "",
    category: "",
    type: "expense",
    description: "",
  });

  const categories = useMemo(
    () => [...new Set(transactions.map((t) => t.category))],
    [transactions],
  );

  const filtered = useMemo(
    () =>
      transactions.filter(
        (t) =>
          (t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.description?.toLowerCase().includes(searchQuery.toLowerCase())) &&
          (typeFilter === "all" || t.type === typeFilter) &&
          (categoryFilter === "all" || t.category === categoryFilter),
      ),
    [transactions, searchQuery, typeFilter, categoryFilter],
  );

  const openAdd = () => {
    setEditingTransaction(null);
    setFormData({
      date: new Date().toISOString().split("T")[0],
      amount: "",
      category: "",
      type: "expense",
      description: "",
    });
    setDialogOpen(true);
  };

  const openEdit = (t: any) => {
    setEditingTransaction(t);
    setFormData({
      date: new Date(t.date).toISOString().split("T")[0],
      amount: t.amount.toString(),
      category: t.category,
      type: t.type,
      description: t.description,
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const payload = {
      ...formData,
      amount: Number(formData.amount),
      date: new Date(formData.date).toISOString(),
    };
    if (editingTransaction)
      await updateTransaction(editingTransaction.id, payload);
    else await addTransaction(payload);
    setDialogOpen(false);
  };

  const handleDelete = async (id: string) => {
    await deleteTransaction(id);
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-muted min-h-screen pb-24 lg:pb-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
            Transactions
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {filtered.length} of {transactions.length} records
          </p>
        </div>

        {role === "admin" && (
          <Button
            onClick={openAdd}
            className="flex items-center gap-1.5 h-9 px-3 text-sm rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shrink-0"
          >
            <Plus size={15} />
            <span className="hidden sm:inline">Add Transaction</span>
            <span className="sm:hidden">Add</span>
          </Button>
        )}
      </div>

      {/* Filters */}
      <TransactionsFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        categories={categories}
      />

      {/* Table */}
      <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
        <TransactionsTable
          data={filtered}
          role={role}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Dialog */}
      <TransactionDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        title={editingTransaction ? "Edit Transaction" : "Add Transaction"}
        onDelete={handleDelete}
      />
    </div>
  );
}
