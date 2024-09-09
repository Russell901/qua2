import React from "react";

interface OccupancyBarProps {
  currentOccupancy: number;
  capacity: number;
}

const OccupancyBar: React.FC<OccupancyBarProps> = ({
  currentOccupancy,
  capacity,
}) => {
  const getOccupancyColor = (currentOccupancy: number, capacity: number) => {
    const occupancyPercentage = currentOccupancy / capacity;

    if (occupancyPercentage > 0.75) {
      return "bg-red-500"; // Red for high occupancy (low availability)
    } else if (occupancyPercentage > 0.5) {
      return "bg-yellow-500"; // Yellow for medium-high occupancy
    } else {
      return "bg-green-500"; // Green for low occupancy (high availability)
    }
  };

  return (
    <div className="w-full">
     
      <div
        className="relative w-full bg-gray-200 h-4 rounded-md overflow-hidden"
        aria-label={`Current occupancy: ${currentOccupancy} out of ${capacity}`}
      >
        <div
          className={`h-full ${getOccupancyColor(
            currentOccupancy,
            capacity
          )} transition-all duration-300`}
          style={{
            width: `${(currentOccupancy / capacity) * 100}%`,
          }}
        />
      </div>
      <p className="text-xs mt-1 text-muted-foreground">
        {((currentOccupancy / capacity) * 100).toFixed(0)}% occupancy
      </p>
    </div>
  );
};

export default OccupancyBar
