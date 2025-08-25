    import React, { useEffect, useState } from "react";
    import axios from "axios";
    import "./StudentDashboard.css";

    const StudentDashboard = () => {
        const [students, setStudents] = useState([
            {
                "id": "1",
                "name": "Rahul",
                "email": "rahul@example.com",
                "phone": "9876543210",
                "paymentStatus": "PAID",
                "joinDate": "2025-08-22",
                "purchasedCourses": [{ "id": "c1", "name": "React" }]
            },
            {
                "id": "2    ",
                "name": "Rahul",
                "email": "rahul@example.com",
                "phone": "9876543210",
                "paymentStatus": "PAID",
                "joinDate": "2025-08-22",
                "purchasedCourses": [{ "id": "c1", "name": "React" }]
            },
            {
                id: "3",
                name: "Rahul",
                email: "rahul@example.com",
                phone: "9876543210",
                purchasedCourses: [{ id: "c1", name: "React" }],
                paymentStatus: "PAID",   // enum: "PAID" | "PENDING" | "FAILED"
                amountPaid: 5000,        // actual fee paid
                totalFee: 6000,          // course fee
                transactionId: "TXN123", // from payment gateway
                joinDate: "2025-08-22"
            }
        ]);
        const [courses, setCourses] = useState([]);
        const [dropdownOpen, setDropdownOpen] = useState(false);
        const [selectedCourses, setSelectedCourses] = useState([]);
        const [showModal, setShowModal] = useState(false);
        const [newStudent, setNewStudent] = useState({
            name: "",
            email: "",
            phone: "",
            courseIds: [],
        });

        // Fetch all students
        const fetchStudents = async () => {
            try {
                const res = await axios.get("/api/admin/students");
                //   setStudents(res.data);
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };

        // Fetch courses
        const fetchCourses = async () => {
            try {
                const res = await axios.get("/api/admin/courses");
                //   setCourses(res.data);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };

        useEffect(() => {
            fetchStudents();
            fetchCourses();
        }, []);

        const handleChange = (e) => {
            const { name, value } = e.target;
            setNewStudent((prev) => ({ ...prev, [name]: value }));
        };
        const handleCourseSelect = (e) => {
            const value = e.target.value;
            if (selectedCourses.includes(value)) {
                setSelectedCourses(selectedCourses.filter((id) => id !== value));
            } else {
                setSelectedCourses([...selectedCourses, value]);
            }
            setNewStudent({ ...newStudent, purchasedCourses: selectedCourses });
        };

        const handleAddStudent = async (e) => {
            e.preventDefault();
            try {
                await axios.post("/api/admin/students", newStudent);
                fetchStudents();
                setShowModal(false);
                setNewStudent({ name: "", email: "", phone: "", courseIds: [] });
            } catch (error) {
                console.error("Error adding student:", error);
            }
        };

        return (
            <div className="dashboard-container">
                <div className="dashboard-header">
                    <h2>Student Dashboard</h2>
                    <button className="primary-btn" onClick={() => setShowModal(true)}>
                        + Add Student
                    </button>
                </div>

                {/* Student Table */}
                <table className="student-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Courses</th>
                            <th>Total Fee</th>
                            <th>Paid</th>
                            <th>Payment Status</th>
                            <th>Joined Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((s) => (
                            <tr key={s.id}>
                                <td>{s.name}</td>
                                <td>{s.email}</td>
                                <td>{s.phone}</td>
                                <td>{s.purchasedCourses?.map((c) => c.name).join(", ")}</td>
                                <td>{s.totalFee}</td>
                                <td>{s.amountPaid}</td>
                                <td>{s.paymentStatus}</td>
                                <td>{new Date(s.joinDate).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>

                {/* Modal */}
                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal-box">
                            <h3>Add Student</h3>
                            <form onSubmit={handleAddStudent} className="student-form">
                                <label>
                                    Name
                                    <input
                                        type="text"
                                        name="name"
                                        value={newStudent.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                                <label>
                                    Email
                                    <input
                                        type="email"
                                        name="email"
                                        value={newStudent.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                                <label>
                                    Phone
                                    <input
                                        type="text"
                                        name="phone"
                                        value={newStudent.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                                <label>
                                    Purchased Courses
                                    <div className="dropdown">
                                        <button
                                            type="button"
                                            className="dropdown-toggle"
                                            onClick={() => setDropdownOpen(!dropdownOpen)}
                                        >
                                            {selectedCourses.length > 0
                                                ? `${selectedCourses.length} course(s) selected`
                                                : "Select Courses"}
                                        </button>
                                        {dropdownOpen && (
                                            <div className="dropdown-menu">
                                                {courses.map((c) => (
                                                    <label key={c.id} className="dropdown-item">
                                                        <input
                                                            type="checkbox"
                                                            value={c.id}
                                                            checked={selectedCourses.includes(c.id)}
                                                            onChange={handleCourseSelect}
                                                        />
                                                        {c.name}
                                                    </label>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </label>
                                <label>
                                    Total Fee
                                    <input
                                        type="number"
                                        name="totalFee"
                                        value={newStudent.totalFee}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                                <label>
                                    Payment Status
                                    <select
                                        name="paymentStatus"
                                        value={newStudent.paymentStatus}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select from dropdown</option>
                                        <option value="PAID">PAID</option>
                                        <option value="PENDING">PENDING</option>
                                        <option value="FAILED">FAILED</option>
                                    </select>
                                </label>
                                <label>
                                    Amount Paid
                                    <input
                                        type="number"
                                        name="amountPaid"
                                        value={newStudent.amountPaid}
                                        onChange={handleChange}
                                    />
                                </label>

                                <div className="form-actions">
                                    <button type="submit" className="submit-btn">
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        className="cancel-btn"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    export default StudentDashboard;
