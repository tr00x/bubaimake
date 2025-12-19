import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import client from "../api/client";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import "./admin.css";

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

    if (loading) return <div className="p-8 text-center text-gray-500">Loading inventory...</div>;

    return (
        <div className="space-y-6">
            <div className="admin-page-header">
                <div>
                    <h2 className="admin-page-title">Inventory</h2>
                    <p className="admin-page-desc">Manage your vehicle listings.</p>
                </div>
                <Link 
                    to="/admin/cars/new"
                    className="admin-action-btn"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Vehicle
                </Link>
            </div>

            <div className="admin-search-container">
                <Search className="admin-search-icon" />
                <input
                    type="text"
                    placeholder="Search by make, model..."
                    className="admin-search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="admin-table-container">
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th scope="col" className="admin-table-image-cell">
                                    Image
                                </th>
                                <th scope="col">
                                    Vehicle Details
                                </th>
                                <th scope="col">
                                    Status
                                </th>
                                <th scope="col">
                                    Price
                                </th>
                                <th scope="col" className="admin-actions-cell">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCars.map((car) => {
                                const mainImage = car.images.find(img => img.isMain) || car.images[0];
                                // Ensure we handle both relative and absolute paths correctly
                                let imageUrl = '';
                                if (mainImage) {
                                    if (mainImage.pathOrUrl.startsWith('http')) {
                                        imageUrl = mainImage.pathOrUrl;
                                    } else {
                                        // Ensure slash between domain and path
                                        const path = mainImage.pathOrUrl.startsWith('/') ? mainImage.pathOrUrl : `/${mainImage.pathOrUrl}`;
                                        
                                        // If it's in uploads, it's on the backend (port 3001)
                                        if (path.startsWith('/uploads')) {
                                            imageUrl = `http://localhost:3001${path}`;
                                        } else {
                                            // Otherwise it's likely in public/images, served by frontend (port 3000)
                                            imageUrl = path;
                                        }
                                    }
                                }

                                return (
                                    <tr key={car.id}>
                                        <td className="admin-table-image-cell">
                                            {mainImage ? (
                                                <img 
                                                    src={imageUrl} 
                                                    alt={car.title} 
                                                    className="admin-table-image"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = 'https://placehold.co/80x60?text=No+Image';
                                                    }}
                                                />
                                            ) : (
                                                <div className="admin-table-image admin-no-image">
                                                    No Img
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            <div className="admin-table-title">{car.title}</div>
                                            <div className="admin-table-subtitle">{car.year}</div>
                                        </td>
                                        <td>
                                            <span className={`admin-status-badge ${car.status === 'active' ? 'status-active' : 'status-sold'}`}>
                                                {car.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="admin-price">
                                                ${car.priceUsd.toLocaleString().replace(/,/g, ' ')}
                                            </div>
                                        </td>
                                        <td className="admin-actions-cell">
                                            <div className="admin-actions-wrapper">
                                                <Link 
                                                    to={`/admin/cars/${car.id}`} 
                                                    className="admin-action-icon-btn"
                                                    title="Edit"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(car.id)} 
                                                    className="admin-action-icon-btn delete"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}