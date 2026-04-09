import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserManagement() {
    const navigate = useNavigate();

    const [users, setUsers] = useState([
        {
            id: 1,
            name: 'Dominos Restaurant',
            role: 'Restaurant',
            email: 'Dominos@gmail.com',
            joined: '2025-11-10',
            status: 'Active'
        },
        {
            id: 2,
            name: 'Hope Charity',
            role: 'Charity',
            email: 'hope@gmail.com',
            joined: '2025-12-01',
            status: 'Active'
        },
        {
            id: 3,
            name: 'Alromasiah',
            role: 'Restaurant',
            email: 'Alromasiah@gmail.com',
            joined: '2026-01-15',
            status: 'Suspended'
        },
        {
            id: 4,
            name: 'Ehsan Charity',
            role: 'Charity',
            email: 'Ehsan@gmail.com',
            joined: '2026-02-20',
            status: 'Active'
        },
        {
            id: 5,
            name: 'Kfupm Restaurant',
            role: 'Restaurant',
            email: 'Kfupm@gmail.com',
            joined: '2026-03-01',
            status: 'Active'
        }
    ]);

    const [search, setSearch] = useState('');
    const [filterRole, setFilterRole] = useState('All');

    const toggleStatus = (id) => {
        setUsers(users.map(user =>
            user.id === id
                ? { ...user, status: user.status === 'Active' ? 'Suspended' : 'Active' }
                : user
        ));
    };

    const filtered = users.filter(user => {
        const matchRole = filterRole === 'All' || user.role === filterRole;
        const matchSearch = user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase());
        return matchRole && matchSearch;
    });

    return (
        <div style={styles.page}>
            <button onClick={() => navigate('/admin/dashboard')} style={styles.backButton}>
                ⬅ Back to Dashboard
            </button>

            <h1 style={styles.title}>User Management</h1>
            <p style={styles.subtitle}>Suspend or reactivate restaurant and charity accounts.</p>

            <div style={styles.toolbar}>
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={styles.searchInput}
                />
                <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    style={styles.select}
                >
                    <option value="All">All Roles</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Charity">Charity</option>
                </select>
            </div>

            <div style={styles.table}>
                <div style={styles.headerRow}>
                    <span>Name</span>
                    <span>Role</span>
                    <span>Email</span>
                    <span>Joined</span>
                    <span>Status</span>
                    <span>Action</span>
                </div>

                {filtered.map(user => (
                    <div key={user.id} style={styles.row}>
                        <span>{user.name}</span>
                        <span>{user.role}</span>
                        <span>{user.email}</span>
                        <span>{user.joined}</span>
                        <span style={{
                            ...styles.badge,
                            backgroundColor: user.status === 'Active' ? '#7fbf4d' : '#e74c3c'
                        }}>
                            {user.status}
                        </span>
                        <button
                            style={{
                                ...styles.toggleBtn,
                                backgroundColor: user.status === 'Active' ? '#e74c3c' : '#7fbf4d'
                            }}
                            onClick={() => toggleStatus(user.id)}
                        >
                            {user.status === 'Active' ? 'Suspend' : 'Reactivate'}
                        </button>
                    </div>
                ))}

                {filtered.length === 0 && (
                    <p style={styles.emptyMsg}>No users found.</p>
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
    toolbar: {
        display: 'flex',
        gap: '15px',
        marginBottom: '20px',
        flexWrap: 'wrap'
    },
    searchInput: {
        padding: '10px 14px',
        borderRadius: '8px',
        border: '1px solid #ccc',
        fontSize: '14px',
        width: '280px'
    },
    select: {
        padding: '10px 14px',
        borderRadius: '8px',
        border: '1px solid #ccc',
        fontSize: '14px'
    },
    table: {
        backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
    },
    headerRow: {
        display: 'grid',
        gridTemplateColumns: '1.5fr 1fr 1.5fr 1fr 1fr 1fr',
        fontWeight: 'bold',
        marginBottom: '15px',
        color: '#1f3b64'
    },
    row: {
        display: 'grid',
        gridTemplateColumns: '1.5fr 1fr 1.5fr 1fr 1fr 1fr',
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
        textAlign: 'center',
        width: 'fit-content'
    },
    toggleBtn: {
        border: 'none',
        padding: '7px 14px',
        borderRadius: '6px',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: '600'
    },
    emptyMsg: {
        marginTop: '20px',
        color: '#555'
    }
};

export default UserManagement;