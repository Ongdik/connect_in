"use client";

import { useState } from "react";

const LocationSelector = () => {
  const [location, setLocation] = useState("서울");

  return (
    <div className="flex items-center p-4">
      <span className="text-lg font-semibold mr-2">지역:</span>
      <select
        className="border border-gray-300 rounded p-2"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      >
        <option value="서울">서울</option>
        <option value="용산구">용산구</option>
        <option value="강남구">강남구</option>
        {/* 원하는 지역 추가 */}
      </select>
    </div>
  );
};

export default LocationSelector;
