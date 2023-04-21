import { Container, Button} from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import MyVerticallyCenteredModal from "../AddStudentForm";
import SideBar from "../SideBar";
import "./index.css";
import axios from "axios";




function AdminTable() {
  const [modalShow, setModalShow] = React.useState(false);
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    axios
      .get("/getstudents")
      .then((respone) => {
        console.log(respone);
        setStudentList(respone.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  console.log(studentList);
  return (
    <Container fluid className="d-flex flex-row">
      <SideBar />
      <Container fluid className="p-5 admin-table-container">
        <Container fluid className="d-flex d-row justify-content-between mr-2 mb-4 ml-5">
          <h1 className="align-center">StudentDetails</h1>
          <Button className="admin-addstudent-btn" variant="primary" onClick={() => setModalShow(true)}>
            Add Student
          </Button>
        </Container>

        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />

        <Table
          responsive
          striped
          bordered
          hover
          className="admin-table admin-nowrap"
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Student Name</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Date of Birth</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {studentList.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.fullname}</td>
                <td>{item.gender}</td>
                <td>{item.email}</td>
                <td>
                  {new Date(item.date_of_birth).toLocaleDateString("en-GB")}
                </td>
                <td>
                  <Button variant="primary" className="admin-invite-btn ">
                    Invite
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </Container>
  );
}

export default AdminTable;
