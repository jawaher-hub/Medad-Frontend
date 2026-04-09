import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SafetyMonitor() {
    const navigate = useNavigate();

    const [listings, setListings] = useState([
        {
            id: 1,
            foodName: 'Checken Pizza ',
            restaurant: 'Dominos Restaurant',
            reportedBy: 'Ehsan',
            reason: 'Expired expiry date',
            date: '2026-03-05',
            status: 'Flagged'
        },
        {
            id: 2,
            foodName: 'Vegetable Soup',
            restaurant: 'Alromasiah',
            reportedBy: 'Hope Charity',
            reason: 'Incorrect allergen info',
            date: '2026-03-06',
            status: 'Flagged'
        },
        {
            id: 3,
            foodName: 'Rice',
            restaurant: 'Alromasiah',
            reportedBy: 'Hope Charity',
            reason: 'Poor packaging reported',
            date: '2026-03-07',
            status: 'Flagged'
        }
    ]);

    const handleRemove = (id) => {
        setListings(listings.filter(item => item.id !== id));
    };

    const handleClearFlag = (id) => {
        setListings(listings.map(item =>
            item.id === id ? { ...item, status: 'Cleared' } : item
        ));
    };

    return (
        <div style={styles.page}>
            <button onClick={() => navigate('/admin/dashboard')} style={styles.backButton}>
                ⬅ Back to Dashboard
            </button>

            <h1 style={styles.title}>Safety Monitor</h1>
            <p style={styles.subtitle}>Review flagged food listings and take action.</p>

            <div style={styles.table}>
                <div style={styles.headerRow}>
                    <span>Food Name</span>
                    <span>Restaurant</span>
                    <span>Reported By</span>
                    <span>Reason</span>
                    <span>Date</span>
                    <span>Status</span>
                    <span>Actions</span>
                </div>

                {listings.map(item => (
                    <div key={item.id} style={styles.row}>
                        <span>{item.foodName}</span>
                        <span>{item.restaurant}</span>
                        <span>{item.reportedBy}</span>
                        <span>{item.reason}</span>
                        <span>{item.date}</span>
                        <span style={{
                            ...styles.badge,
                            backgroundColor: item.status === 'Cleared' ? '#7fbf4d' : '#e74c3c'
                        }}>
                            {item.status}
                        </span>
                        <div style={styles.actions}>
                            {item.status !== 'Cleared' && (
                                <button style={styles.clearBtn} onClick={() => handleClearFlag(item.id)}>
                                    Clear
                                </button>
                            )}
                            <button style={styles.removeBtn} onClick={() => handleRemove(item.id)}>
                                Remove
                            </button>
                        </div>
                    </div>
                ))}

                {listings.length === 0 && (
                    <p style={styles.emptyMsg}>No flagged listings 🎉</p>
                )}
            </div>
        </div>
    );
}

const styles = {
    page: {
        padding: '30px',
        backgroundColor: '#f5f7fb',
        minHeight: '100vh'
    },
    backButton: {
        marginBottom: '20px',
        padding: '10px 15px',
        backgroundColor: '#1f3b64',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer'
    },
    title: {
        color: '#1f3b64',
        marginBottom: '5px'
    },
    subtitle: {
        color: '#777',
        marginBottom: '25px'
    },
    table: {
        backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        overflowX: 'auto'
    },
    headerRow: {
        display: 'grid',
        gridTemplateColumns: '1.5fr 1.2fr 1.2fr 1.5fr 1fr 0.8fr 1.2fr',
        fontWeight: 'bold',
        marginBottom: '15px',
        color: '#1f3b64'
    },
    row: {
        display: 'grid',
        gridTemplateColumns: '1.5fr 1.2fr 1.2fr 1.5fr 1fr 0.8fr 1.2fr',
        padding: '12px 0',
        borderTop: '1px solid #eee',
        alignItems: 'center',
        fontSize: '14px'
    },
    badge: {
        display: 'inline-block',
        padding: '4px 10px',
        borderRadius: '20px',
        color: '#fff',
        fontSize: '12px',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    actions: {
        display: 'flex',
        gap: '8px'
    },
    clearBtn: {
        backgroundColor: '#7fbf4d',
        border: 'none',
        padding: '6px 10px',
        borderRadius: '6px',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '13px'
    },
    removeBtn: {
        backgroundColor: '#e74c3c',
        border: 'none',
        padding: '6px 10px',
        borderRadius: '6px',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '13px'
    },
    emptyMsg: {
        marginTop: '20px',
        color: '#555'
    }
};

export default SafetyMonitor;