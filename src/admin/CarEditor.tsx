import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import client from "../api/client";
import { Trash2, Upload, ArrowLeft, Save, Star, Loader2, Plus, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { toast } from "sonner";
import { LocalizedSelect } from "./components/LocalizedSelect";
import { TagInput } from "./components/TagInput";

type CarForm = {
    title: string;
    title_ru?: string;
    title_en?: string;
    priceUsd: number;
    year: number;
    mileage: number;
    transmission: string;
    transmission_ru?: string;
    transmission_en?: string;
    horsepower: number;
    topSpeed: number;
    fuelType: string;
    fuelType_ru?: string;
    fuelType_en?: string;
    condition: string;
    condition_ru?: string;
    condition_en?: string;
    descriptionMd: string;
    description_ru?: string;
    description_en?: string;
    status: string;
    tags: string;
    tags_ru?: string;
    tags_en?: string;
    labels: string;
    images: { pathOrUrl: string; isMain: boolean; sortOrder: number }[];
    youtubeUrl: string;
};

const initialForm: CarForm = {
    title: "",
    title_ru: "",
    title_en: "",
    priceUsd: 0,
    year: new Date().getFullYear(),
    mileage: 0,
    transmission: "Automatic",
    transmission_ru: "",
    transmission_en: "",
    horsepower: 0,
    topSpeed: 0,
    fuelType: "Petrol",
    fuelType_ru: "",
    fuelType_en: "",
    condition: "Used",
    condition_ru: "",
    condition_en: "",
    descriptionMd: "",
    description_ru: "",
    description_en: "",
    status: "active",
    tags: "New,Hot",
    tags_ru: "",
    tags_en: "",
    labels: "",
    images: [],
    youtubeUrl: ""
};

export default function CarEditor() {
    const { t } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState<CarForm>(initialForm);
    const [loading, setLoading] = useState(id ? true : false);
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (id) {
            client.get(`/cars/${id}`)
                .then(res => {
                    const data = res.data;
                    // Fallback for legacy data
                    if (!data.title_ru && data.title) data.title_ru = data.title;
                    if (!data.description_ru && data.descriptionMd) data.description_ru = data.descriptionMd;
                    if (!data.tags_ru && data.tags) data.tags_ru = data.tags;
                    if (!data.tags_en && data.tags) data.tags_en = data.tags;
                    
                    // Fallback for specs if missing (assuming stored in legacy fields if localized ones are empty)
                    // Note: If specs are completely missing in DB, we can't do much.
                    
                    setForm({ ...initialForm, ...data });
                })
                .catch(err => {
                    console.error("Failed to fetch car", err);
                    toast.error(t('admin.fetch_error'));
                })
                .finally(() => setLoading(false));
        }
    }, [id, t]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setForm(prev => ({ 
            ...prev, 
            [name]: type === 'number' ? Number(value) : value 
        }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;
        const formData = new FormData();
        Array.from(e.target.files).forEach(file => formData.append("images", file));

        setUploading(true);
        try {
            const res = await client.post("/upload/images", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            const newImages = res.data.paths.map((path: string, idx: number) => ({
                pathOrUrl: path,
                isMain: form.images.length === 0 && idx === 0,
                sortOrder: form.images.length + idx
            }));
            setForm(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
            toast.success("Images uploaded successfully");
        } catch (err) {
            toast.error("Upload failed");
        } finally {
            setUploading(false);
            // Reset input
            e.target.value = '';
        }
    };

    const handleRemoveImage = (index: number) => {
        setForm(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleSetMainImage = (index: number) => {
        setForm(prev => ({
            ...prev,
            images: prev.images.map((img, i) => ({ ...img, isMain: i === index }))
        }));
    };

    const [activeTab, setActiveTab] = useState("ru");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        
        // Ensure legacy/required fields are populated
        // If "Custom" is selected for dropdowns, try to use the English value as the fallback for the main column
        const processCustomField = (val: string, valEn?: string, valRu?: string) => {
            if (val === "Custom") {
                return valEn || valRu || "Custom";
            }
            return val;
        };

        const submissionData = {
            ...form,
            title: form.title || form.title_en || form.title_ru || "Untitled",
            descriptionMd: form.descriptionMd || form.description_en || form.description_ru || "",
            tags: form.tags_en || form.tags || "", // Prefer EN tags for main field
            
            transmission: processCustomField(form.transmission, form.transmission_en, form.transmission_ru),
            fuelType: processCustomField(form.fuelType, form.fuelType_en, form.fuelType_ru),
            condition: processCustomField(form.condition, form.condition_en, form.condition_ru),
        };

        try {
            if (id) {
                await client.put(`/cars/${id}`, submissionData);
                toast.success(t('admin.save_success'));
            } else {
                await client.post("/cars", submissionData);
                toast.success(t('admin.save_success'));
            }
            // Delay navigation slightly so user can see the success message
            setTimeout(() => {
                navigate("/admin/cars");
            }, 1000);
        } catch (err) {
            console.error(err);
            toast.error(t('admin.save_error'));
            setSaving(false); // Only reset saving if error, otherwise keep disabled until navigation
        }
    };

    const getImageUrl = (pathOrUrl: string) => {
        if (pathOrUrl.startsWith('http')) return pathOrUrl;
        const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
        if (path.startsWith('/uploads')) return `http://localhost:3001${path}`;
        return path;
    };

    if (loading) return (
        <div className="flex items-center justify-center h-96">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
    );

    return (
        <form onSubmit={handleSubmit} className="space-y-8 pb-20">
            {/* Header with Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-[64px] z-30 bg-background/95 backdrop-blur py-4 border-b -mx-8 px-8 mt-[-2rem]">
                <div className="flex items-center gap-4">
                    <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon"
                        onClick={() => navigate("/admin/cars")}
                        className="shrink-0"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">{id ? t('admin.edit_vehicle') : t('admin.new_vehicle')}</h1>
                        <p className="text-sm text-muted-foreground">{id ? t('admin.edit_vehicle_desc') : t('admin.new_vehicle_desc')}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => navigate("/admin/cars")}
                    >
                        {t('admin.cancel')}
                    </Button>
                    <Button type="submit" disabled={saving}>
                        {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        {id ? t('admin.save_changes') : t('admin.create_vehicle')}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Details */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Basic Info */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>{t('admin.basic_info')}</CardTitle>
                                    <CardDescription>{t('admin.basic_info_desc')}</CardDescription>
                                </div>
                                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[200px]">
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="ru">RU</TabsTrigger>
                                        <TabsTrigger value="en">EN</TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            </div>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                <TabsContent value="ru" className="mt-0 space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="title_ru">{t('admin.vehicle_title_ru')}</Label>
                                        <Input
                                            id="title_ru"
                                            name="title_ru"
                                            value={form.title_ru || ""}
                                            onChange={handleChange}
                                            placeholder={t('admin.vehicle_title_ru')}
                                            className="text-lg"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <TagInput 
                                            label={`${t('admin.tags')} (RU)`}
                                            value={form.tags_ru || ""}
                                            onChange={(val) => setForm(prev => ({ ...prev, tags_ru: val }))}
                                            placeholder={t('admin.tags_placeholder')}
                                        />
                                    </div>
                                </TabsContent>
                                <TabsContent value="en" className="mt-0 space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="title_en">{t('admin.vehicle_title_en')}</Label>
                                        <Input
                                            id="title_en"
                                            name="title_en"
                                            value={form.title_en || ""}
                                            onChange={handleChange}
                                            placeholder={t('admin.vehicle_title_en')}
                                            className="text-lg"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <TagInput 
                                            label={`${t('admin.tags')} (EN)`}
                                            value={form.tags_en || ""}
                                            onChange={(val) => setForm(prev => ({ ...prev, tags_en: val }))}
                                            placeholder={t('admin.tags_placeholder')}
                                        />
                                    </div>
                                </TabsContent>
                            </Tabs>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="priceUsd">{t('admin.price_usd')}</Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                                        <Input
                                            id="priceUsd"
                                            type="number"
                                            name="priceUsd"
                                            value={form.priceUsd}
                                            onChange={handleChange}
                                            className="pl-7"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="status">{t('admin.status')}</Label>
                                    <Select 
                                        value={form.status} 
                                        onValueChange={(val) => handleSelectChange("status", val)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder={t('admin.select_status')} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">{t('admin.status_active')}</SelectItem>
                                            <SelectItem value="sold">{t('admin.status_sold')}</SelectItem>
                                            <SelectItem value="hidden">{t('admin.status_hidden')}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            
                        </CardContent>
                    </Card>

                    {/* Specifications */}
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('admin.specifications')}</CardTitle>
                            <CardDescription>{t('admin.specifications_desc')}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="year">{t('admin.year')}</Label>
                                    <Input
                                        id="year"
                                        type="number"
                                        name="year"
                                        value={form.year}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="mileage">{t('admin.mileage')}</Label>
                                    <Input
                                        id="mileage"
                                        type="number"
                                        name="mileage"
                                        value={form.mileage || ""}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="horsepower">{t('admin.horsepower')}</Label>
                                    <Input
                                        id="horsepower"
                                        type="number"
                                        name="horsepower"
                                        value={form.horsepower || ""}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="topSpeed">{t('admin.top_speed')}</Label>
                                    <Input
                                        id="topSpeed"
                                        type="number"
                                        name="topSpeed"
                                        value={form.topSpeed || ""}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                <LocalizedSelect
                                    label={t('admin.transmission')}
                                    value={form.transmission}
                                    valueRu={form.transmission_ru}
                                    valueEn={form.transmission_en}
                                    fieldName="transmission"
                                    options={[
                                        { value: "Automatic", label: t('filter_auto') },
                                        { value: "Manual", label: t('filter_manual') },
                                        { value: "Robot", label: t('filter_robot') },
                                    ]}
                                    onChange={handleSelectChange}
                                    t={t}
                                />
                                <LocalizedSelect
                                    label={t('admin.fuel_type')}
                                    value={form.fuelType}
                                    valueRu={form.fuelType_ru}
                                    valueEn={form.fuelType_en}
                                    fieldName="fuelType"
                                    options={[
                                        { value: "Petrol", label: t('filter_petrol') },
                                        { value: "Diesel", label: t('filter_diesel') },
                                        { value: "Electric", label: t('filter_electric') },
                                        { value: "Hybrid", label: t('filter_hybrid') },
                                    ]}
                                    onChange={handleSelectChange}
                                    t={t}
                                />
                                <LocalizedSelect
                                    label={t('admin.condition')}
                                    value={form.condition}
                                    valueRu={form.condition_ru}
                                    valueEn={form.condition_en}
                                    fieldName="condition"
                                    options={[
                                        { value: "Used", label: t('filter_used') },
                                        { value: "New", label: t('filter_new') },
                                    ]}
                                    onChange={handleSelectChange}
                                    t={t}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Description */}
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('admin.detailed_description')}</CardTitle>
                            <CardDescription>
                                {t('admin.detailed_description_desc')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                <TabsContent value="ru" className="mt-0">
                                    <Textarea
                                        name="description_ru"
                                        value={form.description_ru || ""}
                                        onChange={handleChange}
                                        placeholder={t('admin.description_placeholder_ru')}
                                        className="min-h-[200px]"
                                    />
                                </TabsContent>
                                <TabsContent value="en" className="mt-0">
                                    <Textarea
                                        name="description_en"
                                        value={form.description_en || ""}
                                        onChange={handleChange}
                                        placeholder={t('admin.description_placeholder_en')}
                                        className="min-h-[200px]"
                                    />
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Media */}
                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('admin.media_gallery')}</CardTitle>
                            <CardDescription>
                                {t('admin.media_gallery_desc')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label>{t('admin.images')} ({form.images.length})</Label>
                                    <Button type="button" variant="outline" size="sm" className="cursor-pointer relative" disabled={uploading}>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            onChange={handleImageUpload}
                                            disabled={uploading}
                                        />
                                        {uploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                                        {t('admin.upload')}
                                    </Button>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {form.images.map((img, idx) => (
                                        <div 
                                            key={idx} 
                                            className={`relative group aspect-[4/3] rounded-lg overflow-hidden border bg-muted ${img.isMain ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                                        >
                                            <img 
                                                src={getImageUrl(img.pathOrUrl)}
                                                alt="" 
                                                className="w-full h-full object-cover"
                                            />
                                            
                                            {/* Overlay Actions */}
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    variant={img.isMain ? "default" : "secondary"}
                                                    onClick={() => handleSetMainImage(idx)}
                                                    className="h-8 w-8 p-0"
                                                    title="Set as Main"
                                                >
                                                    <Star className={`w-4 h-4 ${img.isMain ? 'fill-current' : ''}`} />
                                                </Button>
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() => handleRemoveImage(idx)}
                                                    className="h-8 w-8 p-0"
                                                    title="Remove"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                            
                                            {img.isMain && (
                                                <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-[10px] px-2 py-0.5 rounded-full font-medium">
                                                    Main
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    
                                    {/* Upload Placeholder */}
                                    <div className="relative aspect-[4/3] rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-2 text-muted-foreground bg-muted/30">
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            onChange={handleImageUpload}
                                            disabled={uploading}
                                        />
                                        <Plus className="w-8 h-8" />
                                        <span className="text-xs font-medium">{t('admin.add_photos')}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    );
}