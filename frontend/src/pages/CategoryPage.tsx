import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

interface Item {
    id: number;
    name: string;
    imageUrl: string;
}

interface Category {
    id: number;
    name: string;
}

const CategoryPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [items, setItems] = useState<Item[]>([]);
    const [category, setCategory] = useState<Category | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catResponse, itemsResponse] = await Promise.all([
                    api.get<Category>(`/categories/${id}`),
                    api.get<Item[]>(`/categories/${id}/items`)
                ]);
                setCategory(catResponse.data);
                setItems(itemsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchData();
    }, [id]);

    if (loading) return <div className="text-center py-10" style={{ textAlign: 'center', padding: '2.5rem' }}>Loading items...</div>;
    if (!category) return <div className="text-center py-10" style={{ textAlign: 'center', padding: '2.5rem' }}>Category not found</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ marginBottom: '1rem' }}>
                <Link to="/" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.875rem' }}>&larr; Back to Categories</Link>
            </div>
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#111827' }}>
                    {category.name}
                </h1>
                <p style={{ marginTop: '0.75rem', fontSize: '1.25rem', color: '#6b7280' }}>
                    Explore varieties of {category.name.toLowerCase()}.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                {items.map(item => (
                    <Link key={item.id} to={`/item/${item.id}`} className="card" style={{ textDecoration: 'none', display: 'block', borderRadius: '0.5rem', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', backgroundColor: 'white' }}>
                        <div style={{ height: '10rem', backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>
                            {item.imageUrl ? <img src={item.imageUrl} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ fontSize: '2rem' }}>🌿</span>}
                        </div>
                        <div style={{ padding: '1.25rem' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#111827' }}>
                                {item.name}
                            </h3>
                        </div>
                    </Link>
                ))}
            </div>
            {items.length === 0 && (
                <div style={{ textAlign: 'center', color: '#6b7280', padding: '2rem' }}>
                    No items found in this category yet.
                </div>
            )}
        </div>
    );
};

export default CategoryPage;
