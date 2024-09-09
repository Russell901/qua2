import React from 'react';
import { Badge } from "@/components/ui/badge";

interface AvailabilityBadgeProps {
  availability: string;
}

const AvailabilityBadge: React.FC<AvailabilityBadgeProps> = ({ availability }) => {
  const getAvailabilityColor = (availability: string) => {
    switch (availability.toLowerCase()) {
      case 'high':
        return 'bg-green-500'
      case 'medium':
        return 'bg-yellow-500'
      case 'low':
        return 'bg-red-500'

    }
  }

  return (
    <Badge className={`${getAvailabilityColor(availability)} text-white`}>
      {availability}
    </Badge>
  );
};

export default AvailabilityBadge;