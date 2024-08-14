import React, { useState, useEffect } from 'react';
import './Styles/AdminUsers.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const [editedUserData, setEditedUserData] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
                toast.error('Failed to fetch users.');
            }
        };

        fetchUsers();
    }, []);
    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };
    const handleDelete = async () => {
        try {
            if (userToDelete) {
                await axios.delete(`http://localhost:8080/users/${userToDelete}`);
                setUsers(users.filter(user => user.id !== userToDelete));
                setUserToDelete(null);
                setShowPopup(false);
                toast.success("User successfully removed!");
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Failed to remove user.');
        }
    };
    const openDeletePopup = (userId) => {
        setUserToDelete(userId);
        setShowPopup(true);
    };
    const closeDeletePopup = () => {
        setShowPopup(false);
        setUserToDelete(null);
    };
    const startEditing = (user) => {
        setEditingUser(user.id);
        setEditedUserData({
            username: user.username,
            email: user.email,
            role: user.role,
        });
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUserData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:8080/users/update/${editingUser}`, editedUserData);
            setUsers(users.map(user => user.id === editingUser ? { ...user, ...editedUserData } : user));
            setEditingUser(null);
            toast.success("User details updated successfully!");
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error('Failed to update user details.');
        }
    };
    const cancelEditing = () => {
        setEditingUser(null);
    };
    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(search.toLowerCase())
    );
    return (
        <div className='admin-body'>
            <div className="admin-dashboard-container">
                <aside className="admin-sidebar">
                    <div className="admin-sidebar-header">
                        <h2>Farm Fresh</h2>
                    </div>
                    <nav className="admin-sidebar-nav">
                        <ul>
                            <li onClick={() => navigate("/admin")}><i className="fas fa-tachometer-alt"></i> Dashboard</li>
                            <li><i className="fas fa-users"></i> Users</li> 
                            <li onClick={() => navigate("/adminproducts")}><i className="fas fa-box"></i> Products</li>
                        </ul>
                    </nav>
                    <div className="admin-logout" onClick={() => navigate("/")}>
                        <i className="fas fa-sign-out-alt"></i> Logout
                    </div>
                </aside>
                <main className="admin-main-content">
                    <div className='admin-heading'>
                        <h1>Manage Users on Farm Fresh</h1>
                    </div>
                    <div className="admin-search-bar">
                        <input
                            type="text"
                            placeholder="Search by username..."
                            value={search}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <br />
                    <table className="admin-users-table">
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>
                                        {editingUser === user.id ? (
                                            <input 
                                                type="text" 
                                                name="username" 
                                                value={editedUserData.username} 
                                                onChange={handleInputChange} 
                                            />
                                        ) : (
                                            user.username
                                        )}
                                    </td>
                                    <td>
                                        {editingUser === user.id ? (
                                            <input 
                                                type="email" 
                                                name="email" 
                                                value={editedUserData.email} 
                                                onChange={handleInputChange} 
                                            />
                                        ) : (
                                            user.email
                                        )}
                                    </td>
                                    <td>
                                        {editingUser === user.id ? (
                                            <input 
                                                type="text" 
                                                name="role" 
                                                value={editedUserData.role} 
                                                onChange={handleInputChange} 
                                            />
                                        ) : (
                                            user.role
                                        )}
                                    </td>
                                    <td>
                                        {editingUser === user.id ? (
                                            <>
                                                <button className="admin-button admin-save-button" onClick={handleUpdate}>Update</button>
                                                <button className="admin-button admin-cancel-button" onClick={cancelEditing}>Cancel</button>
                                            </>
                                        ) : (
                                            <>
                                                <button className="admin-button admin-save-button" onClick={() => startEditing(user)}>Edit</button>
                                                <button className="admin-button admin-delete-button" onClick={() => openDeletePopup(user.id)}>Remove</button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                </main>
            </div>
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-box">
                        <h2>Confirm Deletion</h2>
                        <p>Are you sure you want to remove this user?</p>
                        <div className="popup-buttons">
                            <button className="popup-button popup-yes" onClick={handleDelete}>Yes</button>
                            <button className="popup-button popup-no" onClick={closeDeletePopup}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default AdminUsers;