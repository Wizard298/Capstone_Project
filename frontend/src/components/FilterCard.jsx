// FilterCard.jsx
import React, { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

const filterData = [
  {
    filterType: "LOCATION",
    array: [
      "Bangalore",
      "Chennai",
      "Delhi",
      "Mumbai",
      "Pune",
      "Chandigarh",
      "Jaipur",
      "Lucknow",
      "Kolkata",
      "Bhopal",
      "Noida",
      "Hyderabad",
    ],
  },
  {
    filterType: "CATEGORY",
    array: [
      "AI Artist",
      "Logo Design",
      "Wordpress",
      "Voice Over",
      "Programming & Tech",
      "Photo Editor",
      "Content Writer",
      "Digital Marketing",
      "SEO Expert",
      "Social Media Manager",
      "Web Developer",
      "UI/UX Designer",
      "Illustration",
      "Translation",
    ],
  },
  {
    filterType: "PRICE",
    array: ["₹0 to ₹399", "₹400 to ₹999", "₹1000 to ₹1999"],
  },
];

const FilterCard = ({ onFilterChange }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const changeHandler = (value) => {
    setSelectedValue(value);
    onFilterChange(value); // Pass selected value to parent
  };

  return (
    <div className="bg-[#1e1e2f] p-5 rounded-2xl shadow-lg border border-purple-800 shadow-purple-800 transition-all duration-500 animate-fadeIn">
      <h1 className="text-xl font-bold text-white mb-4 border-b border-purple-600 pb-2">
        Filter Gigs
      </h1>
      <RadioGroup
        value={selectedValue}
        onValueChange={changeHandler}
        className="space-y-6"
      >
        {filterData.map((data, index) => (
          <div key={index} className="space-y-3">
            <h2 className="text-sm uppercase tracking-widest text-purple-400 font-semibold mb-2">
              {data.filterType}
            </h2>
            <div className="space-y-2">
              {data.array.map((item, idx) => {
                const itemId = `id${index}-${idx}`;
                return (
                  <div key={itemId} className="flex items-center gap-2 mb-2 hover:scale-105 transition-all duration-300 cursor-pointer">
                    <RadioGroupItem
                      value={item}
                      id={itemId}
                      className="h-4 w-4 border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <Label
                      htmlFor={itemId}
                      style={{ color: "white" }}
                      className="block text-sm font-medium text-gray-700 hover:text-purple-600 cursor-pointer"
                    >
                      {item}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;