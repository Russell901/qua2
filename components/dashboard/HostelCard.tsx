  'use client'
  import React from 'react';
  import { useRouter } from 'next/navigation';
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
  import { Badge } from "@/components/ui/badge";
  import OccupancyBar from './OccupancyBar';

  interface HostelCardProps {
    _id: string;
    name: string;
    currentOccupancy: number;
    capacity: number;
    availability: string;
  }

  const getAvailabilityColor = (availability: string) => {
    switch (availability.toLowerCase()) {
      case 'high':
        return 'bg-green-500/30';
      case 'medium':
        return 'bg-yellow-700/30';
      case 'low':
        return 'bg-orange-600/30';
      case 'full':
        return 'bg-red-500/30';
      default:
        return 'bg-gray-500/30';
    }
  };

  const HostelCard: React.FC<HostelCardProps> = ({
    _id,
    name,
    currentOccupancy,
    capacity,
    availability,
  }) => {
    const router = useRouter();

    const handleCardClick = () => {
      router.push(`/dashboard/hostels/${_id}`); // Navigate to the hostel details page
    };

    return (
      <Card
        className="w-full  border-none cursor-pointer hover:bg-white/10 transition-colors"
        onClick={handleCardClick} // Make the card clickable
      >
        <CardHeader>
          <CardTitle className="text-foreground">{name}</CardTitle> {/* Improved visibility */}
        </CardHeader>
        <CardContent>
          <div className="mt-4">
            <Badge className={`${getAvailabilityColor(availability)} text-foreground mb-2`}>
              {availability}
            </Badge>
            <OccupancyBar
              currentOccupancy={currentOccupancy}
              capacity={capacity}
            />
          </div>
        </CardContent>
      </Card>
    );
  };

  export default HostelCard;
