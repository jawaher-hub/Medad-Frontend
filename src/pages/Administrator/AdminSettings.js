import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminSettings() {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    const [profile, setProfile] = useState({
        name: '',
        email: '',
        phone: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [appSettings, setAppSettings] = useState({
        allowRegistrations: true,
        requireEmailVerification: true,
        enableSafetyReports: true,
        maxListingsPerRestaurant: 10,
        notifyOnNewUser: true,
        notifyOnFlag: true
    });

    const [profileSaved, setProfileSaved] = useState(false);
    const [settingsSaved, setSettingsSaved] = useState(false);

    const handleProfileChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleToggle = (key) => {
        setAppSettings({ ...appSettings, [key]: !appSettings[key] });
    };

    const handleSaveProfile = () => {
        setProfileSaved(true);
        setTimeout(() => setProfileSaved(false), 3000);
    };

    const handleSaveSettings = () => {
        setSettingsSaved(true);
        setTimeout(() => setSettingsSaved(false), 3000);
    };

    return (
        <div style={styles.page}>
            <button onClick={() => navigate('/admin/dashboard')} style={styles.backButton}>
                ⬅ Back to Dashboard
            </button>

            <h1 style={styles.title}>App Settings & Profile</h1>
            <p style={styles.subtitle}>Manage your admin profile and application preferences.</p>

            <div style={styles.grid}>

                <div style={styles.card}>
                    <h2 style={styles.cardTitle}> Profile Information</h2>

                    <label style={styles.label}>Full Name</label>
                    <input
                        name="name"
                        value={profile.name}
                        onChange={handleProfileChange}
                        style={styles.input}
                    />

                    <label style={styles.label}>Email Address</label>
                    <input
                        name="email"
                        value={profile.email}
                        onChange={handleProfileChange}
                        style={styles.input}
                    />

                    <label style={styles.label}>Phone Number</label>
                    <input
                        name="phone"
                        value={profile.phone}
                        onChange={handleProfileChange}
                        style={styles.input}
                    />

                    <h3 style={{...styles.cardTitle, fontSize: '16px', marginTop: '20px'}}>🔒 Change Password</h3>

                    <label style={styles.label}>Current Password</label>
                    <input
                        type="password"
                        name="currentPassword"
                        value={profile.currentPassword}
                        onChange={handleProfileChange}
                        style={styles.input}
                        placeholder="Enter current password"
                    />

                    <label style={styles.label}>New Password</label>
                    <input
                        type="password"
                        name="newPassword"
                        value={profile.newPassword}
                        onChange={handleProfileChange}
                        style={styles.input}
                        placeholder="Enter new password"
                    />

                    <label style={styles.label}>Confirm New Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={profile.confirmPassword}
                        onChange={handleProfileChange}
                        style={styles.input}
                        placeholder="Confirm new password"
                    />

                    {profileSaved && <p style={styles.successMsg}>✅ Profile saved successfully!</p>}

                    <button style={styles.saveBtn} onClick={handleSaveProfile}>
                        Save Profile
                    </button>
                </div>

                <div style={styles.card}>
                    <h2 style={styles.cardTitle}>⚙️ Application Settings</h2>

                    {[
                        {key: 'allowRegistrations', label: 'Allow New Registrations'},
                        {key: 'requireEmailVerification', label: 'Require Email Verification'},
                        {key: 'enableSafetyReports', label: 'Enable Safety Reports'},
                        {key: 'notifyOnNewUser', label: 'Notify Admin on New User'},
                        {key: 'notifyOnFlag', label: 'Notify Admin on Flagged Listing'}
                    ].map(({key, label}) => (
                        <div key={key} style={styles.toggleRow}>
                            <span style={styles.toggleLabel}>{label}</span>
                            <div
                                style={{
                                    ...styles.toggleSwitch,
                                    backgroundColor: appSettings[key] ? '#7fbf4d' : '#ccc'
                                }}
                                onClick={() => handleToggle(key)}
                            >
                                <div style={{
                                    ...styles.toggleCircle,
                                    transform: appSettings[key] ? 'translateX(24px)' : 'translateX(2px)'
                                }}/>
                            </div>
                        </div>
                    ))}


                    {settingsSaved && <p style={styles.successMsg}>✅ Settings saved successfully!</p>}

                    <button style={styles.saveBtn} onClick={handleSaveSettings}>
                        Save Settings
                    </button>

                    <button style={styles.logoutBtn} onClick={handleLogout}>
                         Logout
                    </button>

                </div>
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
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '25px'
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: '14px',
        padding: '25px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        display: 'flex',
        flexDirection: 'column'
    },
    cardTitle: {
        color: '#1f3b64',
        marginBottom: '20px',
        fontSize: '18px'
    },
    label: {
        fontSize: '14px',
        color: '#555',
        marginBottom: '5px',
        display: 'block'
    },
    input: {
        width: '100%',
        padding: '10px 12px',
        borderRadius: '8px',
        border: '1px solid #ccc',
        fontSize: '14px',
        marginBottom: '15px',
        boxSizing: 'border-box'
    },
    saveBtn: {
        marginTop: 'auto',
        padding: '12px',
        backgroundColor: '#1f3b64',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '15px',
        fontWeight: '600',
        cursor: 'pointer'
    },
    successMsg: {
        color: '#7fbf4d',
        fontWeight: '600',
        marginBottom: '10px'
    },
    toggleRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '18px'
    },
    toggleLabel: {
        fontSize: '14px',
        color: '#333'
    },
    toggleSwitch: {
        width: '50px',
        height: '26px',
        borderRadius: '13px',
        cursor: 'pointer',
        position: 'relative',
        transition: 'background-color 0.3s'
    },
    toggleCircle: {
        position: 'absolute',
        top: '3px',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: '#fff',
        transition: 'transform 0.3s',
        boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
    },
    fieldRow: {
        marginBottom: '18px'
    },

    logoutBtn: {
        marginTop: '30px',
        padding: '12px 30px',
        backgroundColor: '#e74c3c',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '15px',
        fontWeight: '600',
        cursor: 'pointer',
    },
};

export default AdminSettings;