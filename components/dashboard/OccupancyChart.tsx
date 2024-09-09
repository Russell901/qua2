import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OccupancyData {
  name: string;
  occupancy: number;
}

interface OccupancyChartProps {
  data: OccupancyData[];
}

const OccupancyChart: React.FC<OccupancyChartProps> = ({ data }) => {
  return (
    <Card className=' bg-white/5 border-none'>
      <CardHeader>
        <CardTitle className='text-primary-foreground'>Occupancy by Hostel</CardTitle>
      </CardHeader>
      <CardContent className='text-primary-foreground'>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="occupancy" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default OccupancyChart;