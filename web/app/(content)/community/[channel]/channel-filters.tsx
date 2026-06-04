"use client";

import { useState } from "react";

export function ChannelFilters({ locations }: { locations: string[] }) {
  const [sort, setSort] = useState("popular");
  const [location, setLocation] = useState("all");

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Location filter */}
      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="rounded-xl border border-black/5 bg-white px-3 py-2 text-sm text-charcoal/70 focus:border-swedish-blue/30 focus:outline-none focus:ring-2 focus:ring-swedish-blue/10"
      >
        <option value="all">All of Sweden</option>
        {locations.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>

      {/* Sort */}
      <div className="flex rounded-xl border border-black/5 bg-white p-0.5">
        <SortButton
          label="Popular"
          active={sort === "popular"}
          onClick={() => setSort("popular")}
        />
        <SortButton
          label="Newest"
          active={sort === "newest"}
          onClick={() => setSort("newest")}
        />
        <SortButton
          label="Most discussed"
          active={sort === "discussed"}
          onClick={() => setSort("discussed")}
        />
      </div>
    </div>
  );
}

function SortButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
        active
          ? "bg-swedish-blue/10 text-swedish-blue"
          : "text-charcoal/40 hover:text-charcoal/60"
      }`}
    >
      {label}
    </button>
  );
}
