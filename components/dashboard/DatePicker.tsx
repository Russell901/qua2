import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { FormControl } from '@/components/ui/form'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { ControllerRenderProps, FieldValues } from 'react-hook-form'

const DatePicker = ({ field }: { field: ControllerRenderProps<FieldValues, string> }) => {

	return (
		<Popover>
			<PopoverTrigger asChild>
				<FormControl>
					<Button
						variant={"outline"}
						className={cn(
							"w-[240px] pl-3 text-left font-normal",
							!field.value && "text-muted-foreground"
						)}
					>
						{field.value ? (
							format(new Date(field.value), "PPP")
						) : (
							<span>Pick a date</span>
						)}
						<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
					</Button>
				</FormControl>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar
					mode="single"
					selected={field.value ? new Date(field.value) : undefined}
					onSelect={(date) => field.onChange(date?.toISOString())}
					disabled={(date) =>
						date > new Date() || date < new Date("1900-01-01")
					}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	)
}

export default DatePicker
