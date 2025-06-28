"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { HomeHeader } from "@/components/home-header";
import { SearchResults } from "@/components/search-results";

export default function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (!query) return;
    setIsLoading(true);
    const fetchResults = async () => {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data);
      setIsLoading(false);
    };

    fetchResults();
  }, [query]);

  return (
    <div className="min-h-screen bg-background">
      <HomeHeader />
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">
              {query ? `Search results for "${query}"` : "Search"}
            </h1>
            {query && (
              <p className="text-muted-foreground">
                Found results across music, artists, albums, and users
              </p>
            )}
          </div>

          {query && (
            <SearchResults query={query} isLoading={isLoading} results={results} />
          )}

          {!query && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Enter a search term to find music, artists, albums, and users
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

