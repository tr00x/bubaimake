import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { toast } from "sonner";

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
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (id) {
            client.get(`/cars/${id}`)
                .then(res => setForm(res.data))
                .catch(err => {
                    console.error(err);
                    toast.error("Failed to load vehicle details");
                })
                .finally(() => setLoading(false));
        }
    }, [id]);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (id) {
                await client.put(`/cars/${id}`, form);
                toast.success("Vehicle updated successfully");
            } else {
                await client.post("/cars", form);
                toast.success("Vehicle created successfully");
            }
            navigate("/admin/cars");
        } catch (err) {
            console.error(err);
            toast.error("Failed to save vehicle");
        } finally {
            setSaving(false);
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
                        <h1 className="text-2xl font-bold tracking-tight">{id ? "Edit Vehicle" : "New Vehicle"}</h1>
                        <p className="text-sm text-muted-foreground">{id ? "Update vehicle details and media" : "Add a new vehicle to your inventory"}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => navigate("/admin/cars")}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={saving}>
                        {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        {id ? "Save Changes" : "Create Vehicle"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Details */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Basic Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                            <CardDescription>Essential details about the vehicle.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Vehicle Title</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    placeholder="e.g. 2024 Rolls-Royce Spectre"
                                    required
                                    className="text-lg"
                                />
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="priceUsd">Price (USD)</Label>
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
                                    <Label htmlFor="status">Status</Label>
                                    <Select 
                                        value={form.status} 
                                        onValueChange={(val) => handleSelectChange("status", val)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="sold">Sold</SelectItem>
                                            <SelectItem value="hidden">Hidden</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Specifications */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Specifications</CardTitle>
                            <CardDescription>Technical details and features.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="year">Year</Label>
                                <Input
                                    id="year"
                                    type="number"
                                    name="year"
                                    value={form.year}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="mileage">Mileage (km)</Label>
                                <Input
                                    id="mileage"
                                    type="number"
                                    name="mileage"
                                    value={form.mileage}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="horsepower">Horsepower</Label>
                                <Input
                                    id="horsepower"
                                    type="number"
                                    name="horsepower"
                                    value={form.horsepower}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="topSpeed">Top Speed (km/h)</Label>
                                <Input
                                    id="topSpeed"
                                    type="number"
                                    name="topSpeed"
                                    value={form.topSpeed}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="transmission">Transmission</Label>
                                <Select 
                                    value={form.transmission} 
                                    onValueChange={(val) => handleSelectChange("transmission", val)}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Automatic">Automatic</SelectItem>
                                        <SelectItem value="Manual">Manual</SelectItem>
                                        <SelectItem value="Robot">Robot</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="fuelType">Fuel Type</Label>
                                <Select 
                                    value={form.fuelType} 
                                    onValueChange={(val) => handleSelectChange("fuelType", val)}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Petrol">Petrol</SelectItem>
                                        <SelectItem value="Diesel">Diesel</SelectItem>
                                        <SelectItem value="Electric">Electric</SelectItem>
                                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="condition">Condition</Label>
                                <Select 
                                    value={form.condition} 
                                    onValueChange={(val) => handleSelectChange("condition", val)}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Used">Used</SelectItem>
                                        <SelectItem value="New">New</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Description */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Detailed Description</CardTitle>
                            <CardDescription>
                                Provide a comprehensive description of the vehicle.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Textarea
                                name="descriptionMd"
                                value={form.descriptionMd}
                                onChange={handleChange}
                                placeholder="Enter full vehicle description..."
                                className="min-h-[200px]"
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Media */}
                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Media Gallery</CardTitle>
                            <CardDescription>
                                Upload photos and manage video links.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="youtubeUrl">YouTube Video URL</Label>
                                <Input
                                    id="youtubeUrl"
                                    name="youtubeUrl"
                                    value={form.youtubeUrl}
                                    onChange={handleChange}
                                    placeholder="https://youtube.com/..."
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label>Images ({form.images.length})</Label>
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
                                        Upload
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
                                        <span className="text-xs font-medium">Add Photos</span>
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