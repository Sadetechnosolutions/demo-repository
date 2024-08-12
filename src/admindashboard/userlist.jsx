import React, { useState, useEffect } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';


const UserList = () => {
    const [users, setUsers] = useState([]);
    const [otps, setOtps] = useState([]);

    // Fetch user data
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/auth/users/descending');
            const usersData = response.data.map(user => ({
                id: user.id,
                UserName: user.name,
                Email: user.email,
                Phonenumber: user.phoneNumber,
                Role:user.role,
                Status:user.enabled === true ? 'Active' : 'Disabled'
            }));
            setUsers(usersData);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    // Fetch OTP data
    const fetchOtps = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/auth/otps/descending');
            const otpsData = response.data.map(otp => ({
                id: otp.id, // Ensure this matches the key in the OTP response that links to the user
                Joined: otp.createdAt
            }));
            setOtps(otpsData);
        } catch (error) {
            console.error("Error fetching OTP data:", error);
        }
    };

    const userdata = users.map(user => {
        const otpData = otps.find(otp => otp.id === user.id);
        return {
            ...user,
            Joined: otpData ? new Date(otpData.Joined).toLocaleString()  : 'N/A'
        };
    });

    useEffect(() => {
        fetchUsers();
        fetchOtps();
    });

    return (
        <div className="p-4">
            <div className="border  border-gray-300 rounded-lg overflow-hidden">
                <DataTable value={userdata} paginator rows={10} className="datatable-basic custom-header">
                    <Column field="id" header="ID" className="border border-gray-300" />
                    <Column field="UserName" header="UserName" className="border border-gray-300" />
                    <Column field="Email" header="Email" className="border border-gray-300" />
                    <Column field="Phonenumber" header="Phonenumber" className="border border-gray-300" />
                    <Column field="Role" header="Role" className="border border-gray-300" />
                    <Column field="Joined" header="Joined" className="border border-gray-300" />
                    <Column field="Status" header="Status" className="border border-gray-300" />
                </DataTable>
            </div>
        </div>
    );
};

export default UserList;
