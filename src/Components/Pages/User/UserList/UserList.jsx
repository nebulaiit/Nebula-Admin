import React, { useEffect, useState } from 'react'
import './UserList.css'

import EditIcon from "@mui/icons-material/Edit";
import { Form,Modal} from "react-bootstrap";
import { Button } from '@mui/material';
import { getUserList, registerUser } from '../../../APIService/apiservice';

export default function UserList() {
    const [employees ,setEmployees] = useState([]);
    const [show, setShow] = useState(false);
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

  // Functions to show/hide modal
  const handleShow = () => setShow(true);
  const handleClose = () =>{ 
    
    console.log()
    setShow(false)
  };

 
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password:"",
        confirmPassword: "",
        phoneNumber: "",
        roleCode: ""
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try{
          const response = await registerUser(formData);
          setToastMessage(response.message || "User Created Successfully!");
          setToastVisible(true);
          setShow(false)
    
        }
        catch (err) {
          console.log(err.response?.data?.message || "Failed to send message.");
        } 
      };

      useEffect(()=>{

        const fetchUserList = async () =>{
          try {

            const response = await getUserList();
            console.log(response);
            setEmployees(response);
            
          } catch (error) {
            console.error("Error fetching documents:", error);
          }
        };
        fetchUserList();
      }, [])
  return (
    <>  
    <div className="user-list-wrapper">
        <div className="container row2">
            <div className='emp-list-contrainer mt-2'>
              <h5>Users List</h5>
              <div className="container-addemp">
                {/* Add Employee Button */}
                <Button  className="add-employee-btn" variant="warning" onClick={handleShow}>
                  + Add Employee
                </Button>

                {/* Modal */}
                <Modal show={show} onHide={handleClose} size="lg" centered className='add-userform'>
                  <Modal.Header closeButton>
                    <Modal.Title>Add New Employee</Modal.Title>
                  </Modal.Header>
                  <Modal.Body >
                    <Form >
                      <div className="row">
                        <div className="col-md-6">
                          <Form.Group className="mb-3">
                            <Form.Label>First Name *</Form.Label>
                            <Form.Control type="text" name="firstName" value={formData.firstName} onChange={handleChange} required placeholder='Enter your First Name' />
                          </Form.Group>
                        </div>
                        <div className="col-md-6">
                          <Form.Group className="mb-3">
                            <Form.Label>Last Name *</Form.Label>
                            <Form.Control type="text" name="lastName" value={formData.lastName} onChange={handleChange} required placeholder='Enter your Last Name' />
                          </Form.Group>
                        </div>
                        <div className="col-md-6">
                          <Form.Group className="mb-3">
                            <Form.Label>Username *</Form.Label>
                            <Form.Control type="text" name="email" value={formData.email} onChange={handleChange} required placeholder='Enter your Email Address'/>
                          </Form.Group>
                        </div>
                    
                      
                        <div className="col-md-6">
                          <Form.Group className="mb-3">
                            <Form.Label>Password *</Form.Label>
                            <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required placeholder='Enter your Password' />
                          </Form.Group>
                        </div>
                        <div className="col-md-6">
                          <Form.Group className="mb-3">
                            <Form.Label>Confirm Password *</Form.Label>
                            <Form.Control type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required placeholder='Enter your New Password' />
                          </Form.Group>
                        </div>
                        <div className="col-md-6">
                          <Form.Group className="mb-3">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder='Enter your New Passowrd' />
                          </Form.Group>
                        </div>
                      
                        <div className="col-12">
                          <Form.Group className="mb-3">
                            <Form.Label>Role Code *</Form.Label>
                            <Form.Control type="text"  name="roleCode" value={formData.roleCode} onChange={handleChange} required placeholder='Enter Role Code' />
                          </Form.Group>
                        </div>
                        <div className="col-12 text-center">
                        <Button variant="secondary" onClick={handleClose}>
                        Cancel
                      </Button>
                          <Button type="submit" className='submit-button' onClick={handleSubmit}>Submit</Button>
                        </div>
                      </div>
                    </Form>
                  </Modal.Body>
                </Modal>
              </div>
            </div>

            <div className="table-responsive emp-table mt-4">
                <table className="table table-hover align-middle">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp, index) => (
                            <tr key={index}>

                                <td><p className='emp-title my-0'>{emp.name}</p></td>
                                <td style={{ color: 'gray' }}>{emp.email}</td>
                                <td>
                                    <span
                                        className="badge"
                                        style={{
                                            backgroundColor: "#ffffff",
                                            fontSize: "14px",
                                            color: emp.roleCode === "HR" ? "#483b53f4" : "#a9064da5"
                                        }}
                                    >
                                        {emp.role}
                                    </span>
                                </td>
                                <td>
                                    <EditIcon className="fs-5 me-2 cursor-pointer" onClick={() => openEditModal(emp)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="d-flex justify-content-end align-items-end me-3">
                <button style={{ border: 'none', paddingRight: '10px', color: 'gray' }}>&lt;</button>
                <span style={{
                    backgroundColor: 'orangered',
                    borderRadius: '70px',
                    width: '25px',
                    color: 'white',
                    paddingLeft: '7px'
                }}> 1</span>
                <button style={{ border: 'none', paddingLeft: '10px', color: 'gray' }}>&gt;</button>
            </div>

            {/* Toast Notification */}
            <div  aria-live="polite"  aria-atomic="true" className='toast-notification' >
              <div className="toast-container position-static">
                <div  className={`toast ${toastVisible ? "show" : "hide"}`}  role="alert"  aria-live="assertive"  aria-atomic="true"  onAnimationEnd={() => setToastVisible(false)}  >
                  <div className="toast-header">
                    <strong className="me-auto">Notification</strong>

                    <button  type="button"  className="btn-close"  onClick={() => setToastVisible(false)} ></button>
                  </div>
                  <div className="toast-body">
                    {toastMessage}
                  </div>
                </div>
              </div>
            </div>

        </div>
    </div>
    </>
  )
}