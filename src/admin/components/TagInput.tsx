import React, { useState, KeyboardEvent } from 'react';
import { X, Plus, Tag } from 'lucide-react';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';

interface TagInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}

export function TagInput({ value, onChange, placeholder, label }: TagInputProps) {
  const [inputValue, setInputValue] = useState('');

  const tags = value ? value.split(',').filter(t => t.trim() !== '') : [];

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  const addTag = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !tags.includes(trimmed)) {
      const newTags = [...tags, trimmed];
      onChange(newTags.join(','));
      setInputValue('');
    }
  };

  const removeTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    onChange(newTags.join(','));
  };

  return (
    <div className="grid gap-2">
        {label && <Label>{label}</Label>}
        <div className="bg-background border border-input rounded-md p-2 flex flex-col gap-2 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
            {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag, idx) => (
                    <Badge key={`${tag}-${idx}`} variant="secondary" className="px-2 py-1 text-sm flex items-center gap-1 hover:bg-secondary/80 transition-colors">
                        <Tag className="w-3 h-3 opacity-50" />
                        {tag}
                        <button
                        type="button"
                        onClick={() => removeTag(idx)}
                        className="ml-1 hover:text-destructive focus:outline-none transition-colors rounded-full p-0.5 hover:bg-background/50"
                        >
                        <X className="w-3 h-3" />
                        </button>
                    </Badge>
                    ))}
                </div>
            )}
            
            <div className="flex gap-2">
                <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder || "Add tag..."}
                className="flex-1 border-0 focus-visible:ring-0 px-0 h-9"
                />
                <Button type="button" variant="ghost" size="icon" onClick={addTag} className="h-9 w-9">
                    <Plus className="w-4 h-4" />
                </Button>
            </div>
        </div>
        <p className="text-[0.8rem] text-muted-foreground">
            Press Enter to add a tag. Backspace to remove.
        </p>
    </div>
  );
}
