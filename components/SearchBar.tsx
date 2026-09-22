"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const slug = query.trim().toLowerCase().replace(/\s+/g, "-");
    if (slug) router.push(`/slang/${slug}`);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex gap-2">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type a slang word..."
        className="flex-1 rounded border px-4 py-2"
      />
      <button
        type="submit"
        className="rounded bg-black px-4 py-2 text-white"
      >
        Decode
      </button>
    </form>
  );
}