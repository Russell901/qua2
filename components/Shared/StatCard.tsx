import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  description: string;
  value: string | number;
}

const StatCard: React.FC<StatCardProps> = ({ title, description, value }) => {
  return (
    <Card className=' bg-white/5 border-none'>
      <CardHeader>
        <CardTitle className='text-primary-foreground'>{title}</CardTitle>
        <CardDescription className='text-muted-foreground'>{description}</CardDescription>
      </CardHeader>
      <CardContent className='text-primary-foreground'>
        <p className="text-4xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
};

export default StatCard;