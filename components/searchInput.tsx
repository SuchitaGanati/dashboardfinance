'use client';

import { Search } from 'lucide-react';
import { useSearch } from '@/src/context/SearchContext';

export default function SearchInput() {
  const { query, setQuery } = useSearch();

  return (
    <div className="relative w-full max-w-md">
      {/* Icon */}
      <Search
        size={18}
        className="
          absolute
          inset-y-0
          my-auto
          inset-s-4
          text-gray-400
          pointer-events-none
        "
      />

      {/* Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search…"
        className="
          w-full
          h-10
          rounded-full
          border
          border-gray-300
          bg-white
          px-4
          ps-11
          text-sm
          text-gray-700
          placeholder-gray-400
          outline-none
          transition
          focus:border-blue-400
          focus:ring-2
          focus:ring-blue-100
        "
      />
    </div>
  );
}
