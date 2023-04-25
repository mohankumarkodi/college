import { Row, Col, Button, Form } from "react-bootstrap";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  fullname: Yup.string()
    .required("Required")
    .matches("^[a-zA-Z]+(?:[ ]?[a-zA-Z]+)*$", "needed alphabets only"),
  email: Yup.string().email("Invalid email").required("Required"),
  dateOfBirth: Yup.date().required("Required"),
  gender: Yup.string().required("Required"),
});
function MyVerticallyCenteredModal(props) {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      fullname: "",
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
            toast.success("Student added successfully")
            props.onHide(false);
            navigate("/admintable", { replace: true });
          }
        })
        .catch((e) => {
          // console.log(e);
          const data = e.response.data;
          console.log(data);
          if (data.constraint === "user_details_email_key") {
            setErrorMsg(
              "Email already exists. Please try with a different Email"
            );
          }
          if (data.constraint === 
            "user_details_username_key") {
            setErrorMsg(
              "Username already exists. Please try with a different Username"
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
          <Col md={6}>
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
              <Form.Group controlId="fullname">
                <Form.Label>FullName</Form.Label>
                <Form.Control
                  type="text"
                  {...formik.getFieldProps("fullname")}
                  isInvalid={formik.touched.fullname && formik.errors.fullname}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.fullname}
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
                <ToastContainer/>
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
export default MyVerticallyCenteredModal;
