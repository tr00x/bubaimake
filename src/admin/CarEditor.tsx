
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import client from "../api/client";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Label } from "../components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select";
import { Separator } from "../components/ui/separator";
import { Trash2, Upload, GripVertical, Star } from "lucide-react";
import { Badge } from "../components/ui/badge";

type CarForm = {
    title: string;
    priceUsd: number;
    year: number;
    mileage: number;
    transmission: string;
    horsepower: number;
    topSpeed: number;
    fuelType: string;
    condition: string;
    descriptionMd: string;
    status: string;
    tags: string;
    labels: string;
    images: { pathOrUrl: string; isMain: boolean; sortOrder: number }[];
    youtubeUrl: string;
};

const initialForm: CarForm = {
    title: "",
    priceUsd: 0,
    year: new Date().getFullYear(),
    mileage: 0,
    transmission: "Automatic",
    horsepower: 0,
    topSpeed: 0,
    fuelType: "Petrol",
    condition: "Used",
    descriptionMd: "",
    status: "active",
    tags: "New,Hot",
    labels: "",
    images: [],
    youtubeUrl: ""
};

export default function CarEditor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState<CarForm>(initialForm);
    const [loading, setLoading] = useState(id ? true : false);
    const [uploading, setUploading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (id) {
            client.get(`/cars/${id}`)
                .then(res => setForm(res.data))
                .catch(err => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
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
        } catch (err) {
            alert("Upload failed");
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (index: number) => {
        setForm(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const setMainImage = (index: number) => {
        setForm(prev => ({
            ...prev,
            images: prev.images.map((img, i) => ({ ...img, isMain: i === index }))
        }));
    }

    const validate = () => {
        const next: Record<string, string> = {};
        if (!form.title?.trim()) next.title = "Введите название";
        if (!form.priceUsd || Number(form.priceUsd) <= 0) next.priceUsd = "Цена должна быть больше 0";
        const y = Number(form.year);
        if (!y || y < 1900 || y > 2100) next.year = "Некорректный год";
        if (!form.condition) next.condition = "Выберите состояние";
        if (!form.status) next.status = "Выберите статус";
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            const payload = {
                ...form,
                priceUsd: Number(form.priceUsd) || 0,
                year: Number(form.year) || 0,
                mileage: Number(form.mileage) || 0,
                horsepower: Number(form.horsepower) || 0,
                topSpeed: Number(form.topSpeed) || 0
            };

            if (id) {
                await client.put(`/cars/${id}`, payload);
            } else {
                await client.post("/cars", payload);
            }
            navigate("/admin/cars");
        } catch (err) {
            alert("Save failed");
            console.error(err);
        }
    };

    if (loading) return <div className="p-8 text-center text-neutral-500">Loading editor...</div>;

    return (
        <form onSubmit={handleSubmit} className="max-w-[1200px] mx-auto pb-20 space-y-8">
            <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm py-3 border-b border-neutral-200 -mt-6 mb-6 flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 text-neutral-500 text-sm">
                        <span className="cursor-pointer hover:text-black transition-colors" onClick={() => navigate("/admin/cars")}>Inventory</span>
                        <span>/</span>
                        <span>{id ? "Edit" : "New"}</span>
                    </div>
                    <h2 className="text-xl font-bold tracking-tight text-[#141414]">{id ? `Редактирование: ${form.title || "Vehicle"}` : "Новый автомобиль"}</h2>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" type="button" onClick={() => navigate("/admin/cars")} className="h-10">
                        Отмена
                    </Button>
                    <Button type="submit" disabled={loading || uploading} className="h-10 bg-[#141414] hover:bg-black text-white px-5 min-w-[140px]">
                        {loading ? "Сохранение..." : (id ? "Сохранить" : "Создать")}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Left Column: Details */}
                <div className="xl:col-span-2 space-y-8">
                    {/* Core Info */}
                    <Card className="border-neutral-200 shadow-sm overflow-hidden">
                        <CardHeader className="bg-white border-b border-neutral-100">
                            <CardTitle className="text-lg">Core Information</CardTitle>
                            <CardDescription>Essential details about the vehicle.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6 p-6">
                            <div className="grid gap-2">
                                <Label htmlFor="title" className="text-neutral-700">Название</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    placeholder="Например: Porsche Panamera Turbo S"
                                    className={`h-11 ${errors.title ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                                    required
                                />
                                {errors.title && <p className="text-xs text-red-600">{errors.title}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="grid gap-2">
                                    <Label className="text-neutral-700">Состояние</Label>
                                    <Select value={form.condition} onValueChange={(v: string) => handleSelectChange("condition", v)}>
                                        <SelectTrigger className={`h-11 ${errors.condition ? "border-red-500" : ""}`}>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="New">New</SelectItem>
                                            <SelectItem value="Used">Used</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.condition && <p className="text-xs text-red-600">{errors.condition}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <Label className="text-neutral-700">Статус</Label>
                                    <Select value={form.status} onValueChange={(v: string) => handleSelectChange("status", v)}>
                                        <SelectTrigger className={`h-11 ${errors.status ? "border-red-500" : ""}`}>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="hidden">Hidden</SelectItem>
                                            <SelectItem value="reserved">Reserved</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.status && <p className="text-xs text-red-600">{errors.status}</p>}
                                </div>
                            </div>

                            <Separator className="bg-neutral-100" />

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="price" className="text-neutral-700">Цена</Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2.5 text-neutral-400 font-semibold">$</span>
                                        <Input
                                            id="price"
                                            name="priceUsd"
                                            type="number"
                                            className={`pl-7 h-11 ${errors.priceUsd ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                                            value={form.priceUsd}
                                            onChange={handleChange}
                                            required
                                        />
                                        <span className="absolute right-3 top-3 text-xs text-neutral-400">USD</span>
                                    </div>
                                    {errors.priceUsd && <p className="text-xs text-red-600">{errors.priceUsd}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="year" className="text-neutral-700">Год</Label>
                                    <Input
                                        id="year"
                                        name="year"
                                        type="number"
                                        className={`h-11 ${errors.year ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                                        value={form.year}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.year && <p className="text-xs text-red-600">{errors.year}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="mileage" className="text-neutral-700">Пробег</Label>
                                    <div className="relative">
                                        <Input
                                            id="mileage"
                                            name="mileage"
                                            type="number"
                                            className="pr-10 h-11"
                                            value={form.mileage}
                                            onChange={handleChange}
                                        />
                                        <span className="absolute right-3 top-3 text-xs text-neutral-400 font-medium">km</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Specs */}
                    <Card className="border-neutral-200 shadow-sm overflow-hidden">
                        <CardHeader className="bg-white border-b border-neutral-100">
                            <CardTitle className="text-lg">Specifications</CardTitle>
                            <CardDescription>Technical performance data.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-6">
                            <div className="grid gap-2">
                                <Label htmlFor="horsepower" className="text-neutral-600">Horsepower</Label>
                                <div className="relative">
                                    <Input id="horsepower" name="horsepower" type="number" value={form.horsepower} onChange={handleChange} className="pr-8" />
                                    <span className="absolute right-3 top-2.5 text-xs text-neutral-400">hp</span>
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="topSpeed" className="text-neutral-600">Top Speed</Label>
                                <div className="relative">
                                    <Input id="topSpeed" name="topSpeed" type="number" value={form.topSpeed} onChange={handleChange} className="pr-12" />
                                    <span className="absolute right-3 top-2.5 text-xs text-neutral-400">km/h</span>
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="transmission" className="text-neutral-600">Transmission</Label>
                                <Input id="transmission" name="transmission" value={form.transmission} onChange={handleChange} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="fuelType" className="text-neutral-600">Fuel Type</Label>
                                <Input id="fuelType" name="fuelType" value={form.fuelType} onChange={handleChange} />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Description */}
                    <Card className="border-neutral-200 shadow-sm overflow-hidden">
                        <CardHeader className="bg-white border-b border-neutral-100">
                            <CardTitle className="text-lg">Description</CardTitle>
                            <CardDescription>Detailed overview of features and condition.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 p-6">
                            <Textarea
                                name="descriptionMd"
                                value={form.descriptionMd}
                                onChange={handleChange}
                                className="min-h-[240px] font-mono text-sm leading-relaxed"
                                placeholder="# Features\n- Panoramic Roof\n- Sport Chrono Package..."
                            />
                            <div className="grid gap-2">
                                <Label htmlFor="tags" className="text-neutral-600">Tags</Label>
                                <Input
                                    id="tags"
                                    name="tags"
                                    value={form.tags}
                                    onChange={handleChange}
                                    placeholder="e.g. Sport, Luxury, Limited (comma separated)"
                                    className="bg-neutral-50/50"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Media */}
                <div className="space-y-8">
                    <Card className="border-neutral-200 shadow-sm overflow-hidden sticky top-24">
                        <CardHeader className="bg-white border-b border-neutral-100">
                            <CardTitle className="text-lg">Media Gallery</CardTitle>
                            <CardDescription>Manage vehicle images.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 p-6">
                            {/* Upload Area */}
                            <div className="border-2 border-dashed border-neutral-200 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-neutral-50 hover:border-neutral-300 transition-all cursor-pointer relative group">
                                <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                    <Upload className="w-6 h-6 text-neutral-400 group-hover:text-black" />
                                </div>
                                <span className="text-sm font-semibold text-[#141414]">Click to upload</span>
                                <span className="text-xs text-neutral-400 mt-1">or drag and drop images here</span>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    disabled={uploading}
                                />
                            </div>

                            <Separator className="bg-neutral-100" />

                            {/* Image Grid */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <Label className="text-neutral-600">Images ({form.images.length})</Label>
                                    <span className="text-xs text-neutral-400">First image is cover</span>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    {form.images.map((img, idx) => (
                                        <div key={idx} className={`relative rounded-lg overflow-hidden border bg-neutral-100 transition-all ${img.isMain ? 'ring-2 ring-black border-transparent' : 'border-neutral-200'}`}>
                                            <div className="aspect-[4/3]">
                                                <img src={img.pathOrUrl} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex items-center justify-between gap-2 p-2 bg-white border-t">
                                                <Button
                                                    type="button"
                                                    variant={img.isMain ? "default" : "outline"}
                                                    className="h-8 px-2"
                                                    onClick={() => setMainImage(idx)}
                                                >
                                                    {img.isMain ? "Обложка" : "Сделать обложкой"}
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    className="h-8 px-2 text-red-600 border-red-200 hover:bg-red-50"
                                                    onClick={() => removeImage(idx)}
                                                >
                                                    Удалить
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    );
}
