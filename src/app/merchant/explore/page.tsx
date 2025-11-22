"use client";
import { useState } from "react";
import ExploreSearchBar from "./components/ExploreSearchBar";
import ExploreTable from "./components/ExploreResults";
import { fetchPlacesWithDetails } from "@/lib/exploreApi";

export default function ExplorePage() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY!;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageTokens, setPageTokens] = useState<string[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [currentSearchParams, setCurrentSearchParams] = useState<{
    country: string;
    city: string;
    keyword: string;
    additionalKeyword: string;
  } | null>(null);

  async function handleSearch(params: {
    country: string;
    city: string;
    keyword: string;
    additionalKeyword: string;
  }) {
    if (!params.keyword) return;
    setCurrentSearchParams(params);
    setPageTokens([]);
    setPageIndex(0);
    setNextPageToken(null);
    await performSearch(params, null, 0);
  }

  async function performSearch(
    params: {
      country: string;
      city: string;
      keyword: string;
      additionalKeyword: string;
    },
    pagetoken: string | null,
    tokenIndex: number
  ) {
    setLoading(true);
    try {
      const location = `${params.city || ""}, ${params.country || ""}`.trim();
      const data = await fetchPlacesWithDetails({
        location,
        keyword: params.keyword,
        additionalKeyword: params.additionalKeyword,
        apiKey,
        pagetoken,
      });
      setResults(data.results);
      setNextPageToken(data.nextPageToken);
      if (pagetoken) {
        const copyTokens = [...pageTokens];
        copyTokens[tokenIndex] = pagetoken;
        setPageTokens(copyTokens);
        setPageIndex(tokenIndex);
      }
    } catch (e) {
      console.error(e);
      setResults([]);
    }
    setLoading(false);
  }

  async function goToNextPage() {
    if (!nextPageToken || !currentSearchParams) return;
    const newIndex = pageIndex + 1;
    const newTokens = [...pageTokens];
    newTokens[newIndex] = nextPageToken;
    setPageTokens(newTokens);
    await performSearch(currentSearchParams, nextPageToken, newIndex);
  }

  async function goToPrevPage() {
    if (pageIndex <= 0 || !currentSearchParams) return;
    const prevIndex = pageIndex - 1;
    const prevToken = pageTokens[prevIndex] || null;
    await performSearch(
      currentSearchParams,
      prevIndex === 0 ? null : prevToken,
      prevIndex
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Explore</h1>
      <ExploreSearchBar apiKey={apiKey} onSearch={handleSearch} />
      <ExploreTable
        results={results}
        apiKey={apiKey}
        onNextPage={goToNextPage}
        onPrevPage={goToPrevPage}
        hasNextPage={!!nextPageToken}
        hasPrevPage={pageIndex > 0}
        pageNumber={pageIndex + 1}
        loading={loading}
      />
    </div>
  );
}
