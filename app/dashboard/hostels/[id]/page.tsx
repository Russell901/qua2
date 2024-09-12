"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AvailabilityBadge from "@/components/dashboard/AvailabilityBadge";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import { ArrowLeft, Info, Users } from "lucide-react";

export default function HostelDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  // Fetch the hostel by id from Convex
  const hostel = useQuery(api.hostels.get, { _id: id as Id<"hostels"> });

  if (!hostel || !("name" in hostel)) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-foreground">
          Hostel not found or invalid data
        </p>
      </div>
    );
  }

  const handleBackClick = () => {
    router.back(); // Navigate back to the previous page
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <Button
        onClick={handleBackClick}
        className="mb-6 text-foreground hover:bg-white/10 transition-colors duration-200"
        variant="ghost"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Hostels
      </Button>
      <h1 className="text-3xl font-bold mb-8 text-foreground">{hostel.name}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-none bg-white/5 shadow-lg hover:bg-white/10 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center">
              <Info className="mr-2 h-5 w-5" />
              About this Hostel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed">
              {hostel.description}
            </p>
          </CardContent>
        </Card>
        <Card className="border-none bg-white/5 shadow-lg hover:bg-white/10 transition-all duration-300">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-foreground flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Occupancy
            </CardTitle>
            <AvailabilityBadge availability={hostel.availability} />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">
              {hostel.currentOccupancy ?? 0} / {hostel.capacity} beds occupied
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-4">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{
                  width: `${((hostel.currentOccupancy ?? 0) / hostel.capacity) * 100}%`,
                }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
