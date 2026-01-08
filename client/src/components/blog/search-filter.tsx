import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";
import { formatTagLabel } from "@/lib/blog";

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

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

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
    <section className="rounded-3xl border border-border bg-card p-6 space-y-6">
      <form onSubmit={handleSearchSubmit} className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-paper-muted" strokeWidth={1.75} />
        <Input
          placeholder="Search posts by title, topic, or keyword"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          className="w-full pl-12 pr-12"
        />
        {localQuery && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-paper-muted hover:text-paper"
            onClick={clearSearch}
          >
            <X className="h-4 w-4" strokeWidth={1.75} />
          </Button>
        )}
      </form>

      {(searchQuery || selectedTag) && (
        <div className="flex flex-wrap items-center gap-2 text-sm text-paper-secondary">
          <span>Active filters:</span>
          {searchQuery && (
            <Badge
              variant="secondary"
              className="flex items-center gap-1 border border-copper-500/40 bg-copper-500/10 text-paper"
            >
              Search: "{searchQuery}"
              <button onClick={clearSearch} className="rounded-full bg-transparent p-1 text-paper-secondary hover:text-paper">
                <X className="h-3 w-3" strokeWidth={1.75} />
              </button>
            </Badge>
          )}
          {selectedTag && (
            <Badge
              variant="secondary"
              className="flex items-center gap-1 border border-border bg-background text-paper"
            >
              Tag: {formatTagLabel(selectedTag)}
              <button onClick={clearTag} className="rounded-full bg-transparent p-1 text-paper-secondary hover:text-paper">
                <X className="h-3 w-3" strokeWidth={1.75} />
              </button>
            </Badge>
          )}
        </div>
      )}

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-paper-muted">Browse by tag</p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            className={
              selectedTag === null
                ? "border-copper-500/60 bg-copper-500/10 text-paper hover:bg-copper-500/10"
                : "border-border bg-transparent text-paper-secondary hover:bg-accent hover:text-paper"
            }
            onClick={() => onTagFilter(null)}
          >
            All posts
          </Button>
          {availableTags.map((tag) => (
            <Button
              key={tag}
              variant="outline"
              size="sm"
              className={
                selectedTag === tag
                  ? "border-copper-500/60 bg-copper-500/10 text-paper hover:bg-copper-500/10"
                  : "border-border bg-transparent text-paper-secondary hover:bg-accent hover:text-paper"
              }
              onClick={() => onTagFilter(tag)}
            >
              {formatTagLabel(tag)}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
