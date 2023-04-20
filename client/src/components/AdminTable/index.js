import { Container, Row, Col, Button, Form } from "react-bootstrap";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import SideBar from "../SideBar";
import "./index.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  name: Yup.string().required("Required").matches("^[A-Za-z]+(?:[A-Za-z]+)?$","needed alphabets only")  ,
  email: Yup.string().email("Invalid email").required("Required"),
  dateOfBirth: Yup.date().required("Required"),
  gender: Yup.string().required("Required"),
});

const data = [
  {
    id: 1,
    studentName: 'John Doe',
    gender: 'Male',
    dateOfBirth: '1995-01-01',
  },
  {
    id: 2,
    studentName: 'Jane Smith',
    gender: 'Female',
    dateOfBirth: '1998-03-15',
  },
  {
    id: 3,
    studentName: 'Bob Johnson',
    gender: 'Male',
    dateOfBirth: '2000-07-20',
  },
];

function MyVerticallyCenteredModal(props) {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username:"",
      name: "",
      email: "",
      dateOfBirth: "",
      gender: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      axios
        .post("/addstudent", formik.values)
        .then((response) => {
          setErrorMsg("");
          if (response.statusText === "OK") {
            navigate("/", { replace: true });
          }
        })
        .catch((e) => {
          console.log(e);
          const data = e.response.data;
          console.log(data);
          if (data.errno === 1062) {
            setErrorMsg(
              "email already exists. Please try with a different email"
            );
          }
        });
    },
  });
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Student form
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="justify-content-center mt-5">
          <Col md={5}>
            <Form noValidate onSubmit={formik.handleSubmit}>
            <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  {...formik.getFieldProps("username")}
                  isInvalid={formik.touched.username && formik.errors.username}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.username}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  {...formik.getFieldProps("name")}
                  isInvalid={formik.touched.name && formik.errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label className="mt-3">Email</Form.Label>
                <Form.Control
                  type="email"
                  {...formik.getFieldProps("email")}
                  isInvalid={formik.touched.email && formik.errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="dateOfBirth">
                <Form.Label className="mt-3">Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  {...formik.getFieldProps("dateOfBirth")}
                  isInvalid={
                    formik.touched.dateOfBirth && formik.errors.dateOfBirth
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.dateOfBirth}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="gender">
                <Form.Label className="mt-3">Gender</Form.Label>
                <Form.Control
                  as="select"
                  {...formik.getFieldProps("gender")}
                  isInvalid={formik.touched.gender && formik.errors.gender}
                >
                  <option value="">-- Select --</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.gender}
                </Form.Control.Feedback>
              </Form.Group>
              <Row className="justify-content-md-center">
                <Col md="auto">
                  <Button variant="primary" type="submit" className="mt-3">
                    submit
                  </Button>
                </Col>
                <Form.Text>{errorMsg}</Form.Text>
              </Row>
            </Form>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function AdminTable() {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <Container fluid className="d-flex flex-row">
    <SideBar />
      <Container fluid className="p-5 admin-table-container">
        
        <Container fluid className="d-flex d-row justify-content-around mb-3">
          <h1 className="align-center">StudentDetails</h1>
          <Button variant="primary" onClick={() => setModalShow(true)}>
            Add Student
          </Button>
        </Container>

        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />

<Table responsive striped bordered hover className="admin-table admin-nowrap">
      <thead>
        <tr>
          <th>ID</th>
          <th>Student Name</th>
          <th>Gender</th>
          <th>Date of Birth</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.studentName}</td>
            <td>{item.gender}</td>
            <td>{item.dateOfBirth}</td>
            <td>
              <Button variant="primary" className="admin-invite-btn ">Invite</Button>
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
