  'use client'
  import React from 'react';
  import { useRouter } from 'next/navigation';
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
  import { Badge } from "@/components/ui/badge";
  import OccupancyBar from './OccupancyBar';
  import { Building, Users } from 'lucide-react';

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
        return 'bg-green-500 text-green-100';
      case 'medium':
        return 'bg-yellow-500 text-yellow-100';
      case 'low':
        return 'bg-orange-500 text-orange-100';
      case 'full':
        return 'bg-red-500 text-red-100';
      default:
        return 'bg-gray-500 text-gray-100';
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
      router.push(`/dashboard/hostels/${_id}`);
    };

    return (
      <Card
        className="w-full border-none cursor-pointer transition-all duration-300 shadow-lg md:hover:bg-white/10 md:hover:scale-105"
        onClick={handleCardClick}
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-foreground flex items-center">
            <Building className="mr-2 h-5 w-5" />
            {name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mt-2 space-y-4">
            <Badge className={`${getAvailabilityColor(availability)} px-2 py-1 text-xs font-semibold rounded-full`}>
              {availability}
            </Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="mr-2 h-4 w-4" />
              <span>{currentOccupancy} / {capacity} guests</span>
            </div>
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
