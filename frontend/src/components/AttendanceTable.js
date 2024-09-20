import React from 'react';

const AttendanceTable = ({ records }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Employee Name</th>
                    <th>Employee ID</th>
                    <th>Department</th>
                    <th>Attendance Date</th>
                    <th>In Time</th>
                    <th>Out Time</th>
                    <th>Work Hours</th>
                </tr>
            </thead>
            <tbody>
                {records.map((record, index) => (
                    <tr key={index}>
                        <td>{record.employeeName}</td>
                        <td>{record.employeeID}</td>
                        <td>{record.department}</td>
                        <td>{new Date(record.attendanceDate).toLocaleDateString()}</td>
                        <td>{record.inTime}</td>
                        <td>{record.outTime}</td>
                        <td>{record.workHours}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default AttendanceTable;
