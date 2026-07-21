"use client";

import { useState, useEffect } from "react";
import { Tag } from "lucide-react";

interface Category {
  id: string;
  name: string;
}

const DOT_COLORS = ["#2DD4BF", "#818CF8", "#FB7185", "#FBBF24", "#60A5FA", "#A78BFA"];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  async function loadCategories() {
    const response = await fetch("/api/categories");
    setCategories(await response.json());
  }

  useEffect(() => {
    loadCategories();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const response = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.error || "Something went wrong.");
      return;
    }

    setName("");
    loadCategories();
  }

  return (
    <div className="p-10 max-w-2xl">
      <h1 className="font-[family-name:var(--font-sora)] text-2xl font-semibold text-[#F4F6F8] mb-8">
        Categories
      </h1>

      <div className="bg-[#131A22] border border-[#232E3A] rounded-2xl p-6">
        <form onSubmit={handleSubmit} className="flex gap-2 mb-5">
          <input
            type="text"
            placeholder="e.g. Food, Transport, Salary"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 bg-[#0B0F14] border border-[#232E3A] rounded-lg px-3 py-2 text-sm text-[#F4F6F8] placeholder-[#8A98A8] outline-none focus:border-[#2DD4BF]"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-[#2DD4BF] text-[#0B0F14] text-sm font-semibold"
          >
            Add
          </button>
        </form>

        {error && <p className="text-[#FB7185] text-sm mb-3">{error}</p>}

        {categories.length === 0 ? (
          <p className="text-sm text-[#8A98A8] text-center py-8">
            No categories yet. Add one above to start organizing your transactions.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {categories.map((category, i) => (
              <li
                key={category.id}
                className="flex items-center gap-3 px-4 py-3 bg-[#0B0F14] rounded-lg text-sm text-[#F4F6F8]"
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: DOT_COLORS[i % DOT_COLORS.length] }}
                />
                {category.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}