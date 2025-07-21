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
    <div className="space-y-4 mb-8">
      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search blog posts..."
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            className="pl-10 pr-10"
          />
          {localQuery && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
              onClick={clearSearch}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </form>

      {/* Active Filters */}
      {(searchQuery || selectedTag) && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {searchQuery && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Search: "{searchQuery}"
              <button onClick={clearSearch} className="ml-1 hover:bg-gray-200 rounded-full p-1">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {selectedTag && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Tag: {selectedTag}
              <button onClick={clearTag} className="ml-1 hover:bg-gray-200 rounded-full p-1">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
        </div>
      )}

      {/* Tag Filter */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">Filter by topic:</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedTag === null ? "default" : "outline"}
            size="sm"
            onClick={() => onTagFilter(null)}
            className="text-xs"
          >
            All Posts
          </Button>
          {availableTags.map((tag) => (
            <Button
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              size="sm"
              onClick={() => onTagFilter(tag)}
              className="text-xs capitalize"
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}