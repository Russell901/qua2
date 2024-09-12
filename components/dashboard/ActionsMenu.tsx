import React, { memo } from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

interface ActionsMenuProps {
  onViewDetails: () => void;
  onDeleteGuest: () => void;
}

const ActionsMenu: React.FC<ActionsMenuProps> = memo(({ onViewDetails, onDeleteGuest }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="h-8 w-8 p-0">
        <span className="sr-only">Open menu</span>
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem onClick={onViewDetails}>View details</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={onDeleteGuest}>Delete guest</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
));

ActionsMenu.displayName = 'ActionsMenu';

export { ActionsMenu };
