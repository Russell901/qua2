import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormFieldProps = {
  id: string;
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | string[];
};

export default function FormField({ id, label, value, onChange, error }: FormFieldProps) {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor={id} className="text-right">
        {label}
      </Label>
      <Input id={id} className="col-span-3" value={value} onChange={onChange} />
      {error && (
        <p className="text-red-500 col-span-3 col-start-2">{error[0]}</p>
      )}
    </div>
  );
}