import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

interface Item {
    id: number;
    name: string;
    imageUrl: string;
    categoryId: number;
}

const ItemPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [item, setItem] = useState<Item | null>(null);
    const [growingDetails, setGrowingDetails] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [aiLoading, setAiLoading] = useState(false);

    useEffect(() => {
        api.get<Item>(`/items/${id}`)
            .then(response => {
                setItem(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching item:', error);
                setLoading(false);
            });
    }, [id]);

    const fetchGrowingDetails = async () => {
        if (!item) return;
        setAiLoading(true);
        try {
            const response = await api.get<string>(`/items/${item.id}/growing-details`);
            setGrowingDetails(response.data);
        } catch (error) {
            console.error('Error fetching AI details:', error);
            alert('Failed to load growing details.');
        } finally {
            setAiLoading(false);
        }
    };

    if (loading) return <div className="text-center py-10" style={{ textAlign: 'center', padding: '2.5rem' }}>Loading...</div>;
    if (!item) return <div className="text-center py-10" style={{ textAlign: 'center', padding: '2.5rem' }}>Item not found</div>;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
            <div style={{ marginBottom: '1rem' }}>
                <Link to={`/category/${item.categoryId}`} style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.875rem' }}>&larr; Back to Category</Link>
            </div>

            <div className="card" style={{ padding: '2rem', borderRadius: '0.75rem', backgroundColor: 'white' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ width: '100%', height: '250px', backgroundColor: '#f3f4f6', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                        {item.imageUrl ? <img src={item.imageUrl} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ fontSize: '4rem' }}>🪴</span>}
                    </div>

                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#111827', margin: 0 }}>
                        {item.name}
                    </h1>

                    <div style={{ width: '100%', marginTop: '1rem' }}>
                        {!growingDetails && (
                            <div style={{ textAlign: 'center' }}>
                                <p style={{ color: '#4b5563', marginBottom: '1.5rem' }}>
                                    Want to know how to grow {item.name}? Ask our AI expert!
                                </p>
                                <button
                                    onClick={fetchGrowingDetails}
                                    disabled={aiLoading}
                                    className="btn"
                                    style={{
                                        padding: '0.75rem 2rem',
                                        fontSize: '1.125rem',
                                        opacity: aiLoading ? 0.7 : 1,
                                        cursor: aiLoading ? 'not-allowed' : 'pointer',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}
                                >
                                    {aiLoading ? 'Asking AI...' : '✨ Get Growing Guide'}
                                </button>
                            </div>
                        )}

                        {growingDetails && (
                            <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '0.5rem', padding: '1.5rem', marginTop: '1rem' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#166534', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    🌱 Growing Guide for {item.name}
                                </h3>
                                <div style={{ lineHeight: '1.7', color: '#14532d', whiteSpace: 'pre-wrap' }}>
                                    {growingDetails}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemPage;
