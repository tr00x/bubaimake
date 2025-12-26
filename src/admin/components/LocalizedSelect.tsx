
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select";
import { TFunction } from "i18next";
import { Languages } from "lucide-react";

interface LocalizedSelectProps {
    label: string;
    value: string;
    valueRu?: string;
    valueEn?: string;
    options: { value: string; label: string }[];
    onChange: (field: string, val: string) => void;
    fieldName: string; // e.g., "transmission"
    t: TFunction;
}

export function LocalizedSelect({
    label,
    value,
    valueRu,
    valueEn,
    options,
    onChange,
    fieldName,
    t
}: LocalizedSelectProps) {
    const isCustom = !options.some(opt => opt.value === value) && value !== "";
    // If value is empty, it's not custom, it's just empty. But we default to first option usually.
    // If value is "Custom" or some other string not in options, treat as custom.
    
    // We add "Custom" to options for the dropdown
    let effectiveValue = isCustom ? "Custom" : value;
    if (effectiveValue === "" && options.some(o => o.value === "_empty")) {
        effectiveValue = "_empty";
    }

    const hasCustomInOptions = options.some((opt) => opt.value === "Custom");
    const dedupedOptions = (() => {
        const seen = new Set<string>();
        const result: { value: string; label: string }[] = [];
        for (const opt of options) {
            if (seen.has(opt.value)) continue;
            seen.add(opt.value);
            result.push(opt);
        }
        return result;
    })();

    const handleSelectChange = (val: string) => {
        if (val === "Custom") {
            // Switch to custom mode. We keep existing RU/EN values if any, or init them.
            // We set the main field to "Custom" (or keep it if it was already a custom string, but "Custom" is safer to toggle UI)
            onChange(fieldName, "Custom");
        } else {
            // Switch to standard mode. Clear RU/EN values.
            onChange(fieldName, val);
            onChange(`${fieldName}_ru`, "");
            onChange(`${fieldName}_en`, "");
        }
    };

    return (
        <div className="space-y-3">
            <div className="grid gap-2">
                <Label>{label}</Label>
                <Select 
                    value={effectiveValue} 
                    onValueChange={handleSelectChange}
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {dedupedOptions.map((opt, idx) => (
                            <SelectItem key={`${opt.value}-${idx}`} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                        {!hasCustomInOptions && (
                            <SelectItem key="__custom__" value="Custom">{t('admin.custom_value')}</SelectItem>
                        )}
                    </SelectContent>
                </Select>
            </div>

            {isCustom && (
                <div className="relative rounded-md border border-input bg-background/50 p-3 shadow-sm animate-in slide-in-from-top-2 duration-200">
                    <div className="absolute -top-2.5 left-2 bg-background px-1.5 py-0.5 rounded text-[10px] font-medium text-muted-foreground flex items-center gap-1 border border-border/50">
                        <Languages className="w-3 h-3" />
                        {t('admin.custom_translations')}
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-1">
                        <div className="space-y-1.5">
                            <Label htmlFor={`${fieldName}_ru`} className="text-xs text-muted-foreground">RU</Label>
                            <Input
                                id={`${fieldName}_ru`}
                                value={valueRu || ""}
                                onChange={(e) => onChange(`${fieldName}_ru`, e.target.value)}
                                className="h-8 text-sm"
                                placeholder="На русском"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor={`${fieldName}_en`} className="text-xs text-muted-foreground">EN</Label>
                            <Input
                                id={`${fieldName}_en`}
                                value={valueEn || ""}
                                onChange={(e) => onChange(`${fieldName}_en`, e.target.value)}
                                className="h-8 text-sm"
                                placeholder="In English"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
