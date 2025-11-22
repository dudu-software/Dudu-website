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
  sortMode: "phone_first" | "alphabetical" | "none"
): any[] {
  const copy = [...list];
  if (sortMode === "phone_first") {
    copy.sort((a, b) => {
      const aHas = !!a.phone;
      const bHas = !!b.phone;

      if (aHas === bHas) {
        if (aHas) {
          // Both have phones - prioritize mobile numbers
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
  } else if (sortMode === "alphabetical") {
    copy.sort((a, b) =>
      (a.name || "").toLowerCase().localeCompare((b.name || "").toLowerCase())
    );
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
    "phone_first" | "alphabetical" | "none"
  >("phone_first");
  const [sortedResults, setSortedResults] = useState<any[]>([]);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  useEffect(() => {
    setSortedResults(sortResultsList(results, sortMode));
  }, [results, sortMode]);

  function changeSort(mode: "phone_first" | "alphabetical" | "none") {
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
            <div className="absolute mt-2 bg-white border rounded shadow z-20 min-w-[180px]">
              <div
                className="p-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
                onClick={() => changeSort("phone_first")}
              >
                Phone first (default)
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
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">Image</TableHead>
              <TableHead className="w-1/4">Name</TableHead>
              <TableHead className="w-1/3">Location</TableHead>
              <TableHead className="w-1/6">Phone</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedResults.map((item, i) => (
              <TableRow key={item.id || i}>
                <TableCell>
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
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    <span>{item.name}</span>
                    {item.types?.[0] && (
                      <span className="text-xs text-gray-500 mt-1">
                        {item.types[0].replaceAll("_", " ")}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-sm">{item.address}</TableCell>
                <TableCell>
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
              </TableRow>
            ))}
            {sortedResults.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
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
