
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import client from "../api/client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Plus, Search, Pencil, Trash2, MoreHorizontal, Car as CarSymbol } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

type CarSummary = {
    id: string;
    title: string;
    priceUsd: number;
    status: string;
    year: number;
    images: { pathOrUrl: string; isMain: boolean }[];
};

export default function AdminCarList() {
    const [cars, setCars] = useState<CarSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchCars = () => {
        client.get("/cars?admin=true")
            .then(res => setCars(res.data))
            .catch(err => console.error("Failed to fetch cars", err))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchCars();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this car?")) return;
        await client.delete(`/cars/${id}`);
        fetchCars();
    };

    const filteredCars = cars.filter(car =>
        car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="p-8 text-center text-neutral-500">Loading inventory...</div>;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-200 pb-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-[#141414]">Inventory</h2>
                    <p className="text-neutral-500 text-base mt-1">Manage your vehicle listings and availability.</p>
                </div>
                <Link to="/admin/cars/new">
                    <Button className="h-10 px-4 py-2 bg-[#141414] hover:bg-black text-white rounded-md shadow-sm transition-transform active:scale-95">
                        <Plus className="w-4 h-4 mr-2" />
                        <span className="font-medium">Add Vehicle</span>
                    </Button>
                </Link>
            </div>

            <div className="flex items-center gap-4 bg-white p-3 rounded-lg border border-neutral-200 shadow-sm focus-within:ring-2 focus-within:ring-black/5 transition-all">
                <Search className="w-4 h-4 text-neutral-400" />
                <Input
                    placeholder="Search by make, model, or status..."
                    className="max-w-md border-none shadow-none focus-visible:ring-0 p-0 h-auto text-sm placeholder:text-neutral-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="bg-white rounded-lg border border-neutral-200 shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-neutral-50/50 hover:bg-neutral-50/50">
                            <TableHead className="w-[100px] py-3 pl-4">Image</TableHead>
                            <TableHead className="py-3">Vehicle Details</TableHead>
                            <TableHead className="py-3">Status</TableHead>
                            <TableHead className="text-right py-3">Price</TableHead>
                            <TableHead className="w-[120px] py-3 pr-4 text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredCars.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center text-neutral-500 text-sm">
                                    No vehicles found matching your search.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredCars.map(car => {
                                const mainImage = car.images?.find(i => i.isMain)?.pathOrUrl || car.images?.[0]?.pathOrUrl;
                                return (
                                    <TableRow key={car.id} className="hover:bg-neutral-50/80 transition-colors group">
                                        <TableCell className="pl-4 py-3">
                                            {/* Explicit style to prevent giant images if tailwind fails */}
                                            <div style={{ width: '80px', height: '56px' }} className="rounded bg-neutral-100 overflow-hidden border border-neutral-200 shrink-0">
                                                {mainImage ? (
                                                    <img src={mainImage} alt={car.title} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-neutral-400">
                                                        <CarSymbol className="w-5 h-5 opacity-20" />
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-3">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-[15px] text-[#141414]">{car.title}</span>
                                                <span className="text-xs text-neutral-500">{car.year}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-3">
                                            <Badge
                                                variant="secondary"
                                                className={`
                                                    rounded-md px-2 py-0.5 text-xs font-medium border
                                                    ${car.status === 'active'
                                                        ? 'bg-green-50 text-green-700 border-green-200'
                                                        : 'bg-neutral-50 text-neutral-600 border-neutral-200'
                                                    }
                                                `}
                                            >
                                                {car.status === 'active' ? 'Active' : 'Draft'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right font-medium text-sm py-3">
                                            ${car.priceUsd.toLocaleString()}
                                        </TableCell>
                                        <TableCell className="pr-4 py-3 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <Link to={`/admin/cars/${car.id}`}>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-500 hover:text-blue-600 hover:bg-blue-50">
                                                        <Pencil className="w-4 h-4" />
                                                        <span className="sr-only">Edit</span>
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDelete(car.id)}
                                                    className="h-8 w-8 text-neutral-500 hover:text-red-600 hover:bg-red-50"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    <span className="sr-only">Delete</span>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
