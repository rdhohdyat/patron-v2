import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Label } from "./ui/label";

export function SelectInput({ label, data, onChange, value }) {
    return (
        <div className="grid gap-3">
            <Label className="text-start">{label}</Label>
            <Select onValueChange={onChange} value={value}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={`Pilih ${label}`} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>{label}</SelectLabel>
                        {data.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
