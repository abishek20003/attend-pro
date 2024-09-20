import React, { useState } from 'react';
import axiosInstance from '../components/axiosConfig';

const AttendanceForm = ({ addRecord }) => {
    const [employeeName, setEmployeeName] = useState('');
    const [employeeID, setEmployeeID] = useState('');
    const [department, setDepartment] = useState('');
    const [attendanceDate, setAttendanceDate] = useState('');
    const [inTime, setInTime] = useState('');
    const [outTime, setOutTime] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const workHours = calculateWorkHours(inTime, outTime);
        const data = {
            employeeName,
            employeeID,
            department,
            attendanceDate,
            inTime,
            outTime,
            workHours,
        };

        try {
            const response = await axiosInstance.post('/add-attendance', data);
            if (response.status === 201) {
                alert('Attendance added successfully');
                clearForm();
                addRecord(data); // Update parent state with new record
            } else {
                alert('Failed to add attendance');
            }
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            alert('Error adding attendance');
        }
    };

    const calculateWorkHours = (inTime, outTime) => {
        const inTimeDate = new Date(`1970-01-01T${inTime}:00`);
        const outTimeDate = new Date(`1970-01-01T${outTime}:00`);
        const diff = (outTimeDate - inTimeDate) / (1000 * 60 * 60);
        return diff > 0 ? diff : 0;
    };

    const clearForm = () => {
        setEmployeeName('');
        setEmployeeID('');
        setDepartment('');
        setAttendanceDate('');
        setInTime('');
        setOutTime('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <table>
                <tbody>
                    <tr>
                        <td><label>Employee Name:</label></td>
                        <td><input type="text" value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} required /></td>
                    </tr>
                    <tr>
                        <td><label>Employee ID:</label></td>
                        <td><input type="text" value={employeeID} onChange={(e) => setEmployeeID(e.target.value)} required /></td>
                    </tr>
                    <tr>
                        <td><label>Department:</label></td>
                        <td><input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} required /></td>
                    </tr>
                    <tr>
                        <td><label>Attendance Date:</label></td>
                        <td><input type="date" value={attendanceDate} onChange={(e) => setAttendanceDate(e.target.value)} required /></td>
                    </tr>
                    <tr>
                        <td><label>In Time:</label></td>
                        <td><input type="time" value={inTime} onChange={(e) => setInTime(e.target.value)} required /></td>
                    </tr>
                    <tr>
                        <td><label>Out Time:</label></td>
                        <td><input type="time" value={outTime} onChange={(e) => setOutTime(e.target.value)} required /></td>
                    </tr>
                    <tr>
                        <td colSpan="2"><button type="submit">Add Record</button></td>
                    </tr>
                </tbody>
            </table>
        </form>
    );
};

export default AttendanceForm;
