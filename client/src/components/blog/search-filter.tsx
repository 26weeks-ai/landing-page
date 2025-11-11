import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onTagFilter: (tag: string | null) => void;
  availableTags: string[];
  selectedTag: string | null;
  searchQuery: string;
}

export function SearchFilter({
  onSearch,
  onTagFilter,
  availableTags,
  selectedTag,
  searchQuery,
}: SearchFilterProps) {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localQuery);
  };

  const clearSearch = () => {
    setLocalQuery("");
    onSearch("");
  };

  const clearTag = () => {
    onTagFilter(null);
  };

  return (
    <section className="rounded-3xl border border-neutral-900 bg-neutral-900/40 p-6 space-y-6">
      <form onSubmit={handleSearchSubmit} className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
        <Input
          placeholder="Search posts by title, topic, or keyword"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          className="w-full border-neutral-800 bg-neutral-950/60 pl-12 pr-12 text-white placeholder:text-neutral-500"
        />
        {localQuery && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
            onClick={clearSearch}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </form>

      {(searchQuery || selectedTag) && (
        <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-400">
          <span>Active filters:</span>
          {searchQuery && (
            <Badge
              variant="secondary"
              className="flex items-center gap-1 border border-orange-500/40 bg-orange-500/10 text-orange-300"
            >
              Search: "{searchQuery}"
              <button onClick={clearSearch} className="rounded-full bg-transparent p-1 text-orange-300">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {selectedTag && (
            <Badge
              variant="secondary"
              className="flex items-center gap-1 border border-neutral-700 bg-neutral-800 text-neutral-200"
            >
              Tag: {selectedTag}
              <button onClick={clearTag} className="rounded-full bg-transparent p-1 text-neutral-300">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}

      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">Browse by tag</p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedTag === null ? "default" : "ghost"}
            size="sm"
            className={
              selectedTag === null
                ? "bg-orange-500 text-white hover:bg-orange-500/90"
                : "border border-neutral-800 bg-transparent text-neutral-300 hover:bg-neutral-900"
            }
            onClick={() => onTagFilter(null)}
          >
            All posts
          </Button>
          {availableTags.map((tag) => (
            <Button
              key={tag}
              variant={selectedTag === tag ? "default" : "ghost"}
              size="sm"
              className={
                selectedTag === tag
                  ? "bg-orange-500 text-white hover:bg-orange-500/90"
                  : "border border-neutral-800 bg-transparent text-neutral-300 hover:bg-neutral-900"
              }
              onClick={() => onTagFilter(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
