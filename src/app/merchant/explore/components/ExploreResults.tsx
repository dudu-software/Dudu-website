/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { buildPhotoUrl } from "@/lib/exploreApi";

interface ExploreTableProps {
  results: any[];
  apiKey: string;
  onNextPage: () => void;
  onPrevPage: () => void;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  pageNumber: number;
  loading: boolean;
}

function isMobileLikePhone(phone?: string | null): boolean {
  if (!phone) return false;
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 9 && digits.length <= 15;
}

function sortResultsList(
  list: any[],
  sortMode: "phone_first" | "phone_rating" | "alphabetical" | "rating" | "none"
): any[] {
  const copy = [...list];
  if (sortMode === "phone_first") {
    copy.sort((a, b) => {
      const aHas = !!a.phone;
      const bHas = !!b.phone;

      if (aHas === bHas) {
        if (aHas) {
          const aMobile = isMobileLikePhone(a.phone);
          const bMobile = isMobileLikePhone(b.phone);
          if (aMobile !== bMobile) {
            return bMobile ? 1 : -1;
          }
        }
        const an = (a.name || "").toLowerCase();
        const bn = (b.name || "").toLowerCase();
        return an.localeCompare(bn);
      }
      return aHas ? -1 : 1;
    });
  } else if (sortMode === "phone_rating") {
    // Phone first, then by rating within phone groups
    copy.sort((a, b) => {
      const aHas = !!a.phone;
      const bHas = !!b.phone;

      if (aHas === bHas) {
        // Both have phone or both don't - sort by rating
        const aRating = a.rating || 0;
        const bRating = b.rating || 0;
        if (aRating !== bRating) {
          return bRating - aRating; // Higher rating first
        }
        // If ratings are equal, sort alphabetically
        const an = (a.name || "").toLowerCase();
        const bn = (b.name || "").toLowerCase();
        return an.localeCompare(bn);
      }
      return aHas ? -1 : 1; // Phone first
    });
  } else if (sortMode === "alphabetical") {
    copy.sort((a, b) =>
      (a.name || "").toLowerCase().localeCompare((b.name || "").toLowerCase())
    );
  } else if (sortMode === "rating") {
    copy.sort((a, b) => {
      const aRating = a.rating || 0;
      const bRating = b.rating || 0;
      return bRating - aRating;
    });
  }
  return copy;
}

export default function ExploreTable({
  results,
  apiKey,
  onNextPage,
  onPrevPage,
  hasNextPage,
  hasPrevPage,
  pageNumber,
  loading,
}: ExploreTableProps) {
  const [sortMode, setSortMode] = useState<
    "phone_first" | "phone_rating" | "alphabetical" | "rating" | "none"
  >("phone_rating");
  const [sortedResults, setSortedResults] = useState<any[]>([]);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  useEffect(() => {
    setSortedResults(sortResultsList(results, sortMode));
  }, [results, sortMode]);

  function changeSort(
    mode: "phone_first" | "phone_rating" | "alphabetical" | "rating" | "none"
  ) {
    setSortMode(mode);
    setSortDropdownOpen(false);
  }

  if (loading) {
    return <p className="mt-6 text-gray-600">Loading...</p>;
  }

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <div className="relative inline-block">
          <button
            className="flex items-center gap-2 px-3 py-2 border rounded hover:bg-gray-50"
            onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
          >
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M3 7h18M6 12h12M10 17h4"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-sm">Sort</span>
          </button>

          {sortDropdownOpen && (
            <div className="absolute mt-2 bg-white border rounded shadow z-20 min-w-[220px]">
              <div
                className="p-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
                onClick={() => changeSort("phone_rating")}
              >
                Phone + Rating (default)
              </div>
              <div
                className="p-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
                onClick={() => changeSort("phone_first")}
              >
                Phone only
              </div>
              <div
                className="p-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
                onClick={() => changeSort("rating")}
              >
                Highest rating
              </div>
              <div
                className="p-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
                onClick={() => changeSort("alphabetical")}
              >
                Alphabetical
              </div>
              <div
                className="p-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
                onClick={() => changeSort("none")}
              >
                None (API order)
              </div>
            </div>
          )}
        </div>

        <div className="text-sm text-gray-600">
          Page {pageNumber} • Up to 20 results per page
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table className="w-full border rounded-md">
          <colgroup>
            <col style={{ width: "100px" }} />
            <col style={{ width: "200px" }} />
            <col style={{ width: "280px" }} />
            <col style={{ width: "150px" }} />
            <col style={{ width: "120px" }} />
          </colgroup>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedResults.map((item, i) => (
              <TableRow key={item.id || i}>
                <TableCell style={{ maxWidth: "100px", width: "100px" }}>
                  <div className="w-20 h-16 bg-gray-100 rounded overflow-hidden">
                    {item.photoReference ? (
                      <img
                        src={
                          buildPhotoUrl(item.photoReference, 400, apiKey) || ""
                        }
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                        No image
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell
                  className="font-medium"
                  style={{
                    maxWidth: "200px",
                    width: "200px",
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                    whiteSpace: "normal",
                  }}
                >
                  <div
                    style={{
                      wordBreak: "break-word",
                      overflowWrap: "break-word",
                    }}
                  >
                    <div>{item.name}</div>
                    {item.types?.[0] && (
                      <div className="text-xs text-gray-500 mt-1">
                        {item.types[0].replaceAll("_", " ")}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell
                  className="text-sm"
                  style={{
                    maxWidth: "280px",
                    width: "280px",
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                    whiteSpace: "normal",
                  }}
                >
                  {item.address}
                </TableCell>
                <TableCell
                  style={{
                    maxWidth: "150px",
                    width: "150px",
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                    whiteSpace: "normal",
                  }}
                >
                  {item.phone ? (
                    <a
                      href={`tel:${item.phone}`}
                      className="text-blue-600 text-sm"
                    >
                      {item.phone}
                    </a>
                  ) : (
                    <span className="text-gray-400 text-sm">No phone</span>
                  )}
                </TableCell>
                <TableCell
                  style={{
                    maxWidth: "120px",
                    width: "120px",
                  }}
                >
                  {item.rating ? (
                    <div className="flex items-center gap-1 flex-wrap">
                      <svg
                        className="w-4 h-4 text-yellow-500 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-medium">{item.rating}</span>
                      {item.userRatingsTotal && (
                        <span className="text-xs text-gray-500">
                          ({item.userRatingsTotal})
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-400 text-sm">No rating</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {sortedResults.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-6 text-gray-500"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {results.length > 0 && (
        <div className="flex justify-end gap-3 mt-4">
          <Button
            variant="outline"
            disabled={!hasPrevPage || loading}
            onClick={onPrevPage}
          >
            Prev
          </Button>
          <Button
            variant="outline"
            disabled={!hasNextPage || loading}
            onClick={onNextPage}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
