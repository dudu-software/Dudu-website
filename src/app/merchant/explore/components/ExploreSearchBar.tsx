"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ExploreSearchBarProps {
  apiKey: string;
  onSearch: (params: {
    country: string;
    city: string;
    keyword: string;
    additionalKeyword: string;
  }) => void;
}

export default function ExploreSearchBar({ onSearch }: ExploreSearchBarProps) {
  const predefinedCountries = [
    "Nepal",
    "India",
    "China",
    "United Kingdom",
    "Bangladesh",
  ];

  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");

  const [city, setCity] = useState("");
  const [keyword, setKeyword] = useState("");
  const [additionalKeyword, setAdditionalKeyword] = useState("");
  const [keywordDropdownOpen, setKeywordDropdownOpen] = useState(false);

  const quickCategories = [
    { label: "Men's Wear", value: "mens clothing store" },
    { label: "Women's Wear", value: "womens clothing store" },
    { label: "Electronics", value: "electronics store" },
    { label: "Kitchen Items", value: "kitchen items store" },
    { label: "Robotics/Equipment", value: "robotics equipment store" },
    { label: "Computer Store", value: "computer store" },
    { label: "Motorcycle Parts", value: "motorcycle parts store" },
    { label: "Cars", value: "car dealer" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-start">
        {/* Country */}
        <div className="relative w-full sm:w-1/5">
          <label className="text-sm text-gray-600">Country</label>
          <div
            onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
            className="border p-2 rounded w-full cursor-pointer bg-white hover:bg-gray-50"
          >
            {selectedCountry || "Select country"}
          </div>

          {countryDropdownOpen && (
            <div className="absolute left-0 right-0 bg-white border rounded shadow z-20 max-h-64 overflow-y-auto mt-1">
              {predefinedCountries.map((country) => (
                <div
                  key={country}
                  onClick={() => {
                    setSelectedCountry(country);
                    setCountryDropdownOpen(false);
                  }}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {country}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* City */}
        <div className="w-full sm:w-1/6">
          <label className="text-sm text-gray-600">City</label>
          <Input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
          />
        </div>

        {/* Keyword  */}
        <div className="relative w-full sm:w-1/5">
          <label className="text-sm text-gray-600">Category</label>
          <div
            onClick={() => setKeywordDropdownOpen(!keywordDropdownOpen)}
            className="border p-2 rounded w-full cursor-pointer bg-white hover:bg-gray-50"
          >
            {keyword
              ? quickCategories.find((c) => c.value === keyword)?.label ||
                keyword
              : "Select category"}
          </div>

          {keywordDropdownOpen && (
            <div className="absolute left-0 right-0 bg-white border rounded shadow z-20 max-h-64 overflow-y-auto mt-1">
              {quickCategories.map((c) => (
                <div
                  key={c.value}
                  onClick={() => {
                    setKeyword(c.value);
                    setKeywordDropdownOpen(false);
                  }}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {c.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Additional Keyword */}
        <div className="w-full sm:w-1/5">
          <label className="text-sm text-gray-600">Additional Keywords</label>
          <Input
            value={additionalKeyword}
            onChange={(e) => setAdditionalKeyword(e.target.value)}
            placeholder="Optional refinement"
          />
        </div>

        <div className="flex items-end w-full sm:w-auto">
          <Button
            className="h-[42px]"
            onClick={() =>
              onSearch({
                country: selectedCountry,
                city,
                keyword,
                additionalKeyword,
              })
            }
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
