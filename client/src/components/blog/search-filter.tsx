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
    <section className="rounded-3xl border border-border bg-card p-6 space-y-6 shadow-elev-2">
      <form onSubmit={handleSearchSubmit} className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
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
            className="absolute right-2 top-1/2 -translate-y-1/2 text-subtle hover:text-foreground"
            onClick={clearSearch}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </form>

      {(searchQuery || selectedTag) && (
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span>Active filters:</span>
          {searchQuery && (
            <Badge
              variant="secondary"
              className="flex items-center gap-1 border border-ring/40 bg-ring/10 text-ring"
            >
              Search: "{searchQuery}"
              <button onClick={clearSearch} className="rounded-full bg-transparent p-1 text-ring">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {selectedTag && (
            <Badge
              variant="secondary"
              className="flex items-center gap-1 border border-border bg-background/35 text-muted-foreground"
            >
              Tag: {formatTagLabel(selectedTag)}
              <button onClick={clearTag} className="rounded-full bg-transparent p-1 text-muted-foreground">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}

      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-subtle">Browse by tag</p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedTag === null ? "default" : "outline"}
            size="sm"
            className={
              selectedTag === null
                ? "bg-ring text-primary-foreground hover:bg-ring/90"
                : "text-muted-foreground"
            }
            onClick={() => onTagFilter(null)}
          >
            All posts
          </Button>
          {availableTags.map((tag) => (
            <Button
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              size="sm"
              className={
                selectedTag === tag
                  ? "bg-ring text-primary-foreground hover:bg-ring/90"
                  : "text-muted-foreground"
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
