import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

import { useFormik } from "formik";
import * as Yup from "yup";
import "./index.css";

import {
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
  Row,
  Col,
} from "react-bootstrap";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, "Username must be at least 4 characters long")
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});

const LoginPage = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      axios
        .post("/login/", values)
        .then((response) => {
          setErrorMsg("");
          console.log(response.data);
          if (response.statusText === "OK") {
            resetForm();
            const { jwtToken, results } = response.data;
            const { role } = results[0];
            Cookies.set("jwt_token", jwtToken, { expires: 10 });
            Cookies.set("role", role, { expires: 10 });
            Cookies.set("userDetails", JSON.stringify(results[0]), {
              expires: 10,
            });
          }
        })
        .catch((e) => {
          setErrorMsg(e.response.data);
        });
      resetForm();
    },
  });

  return (
    <Row className="login-container justify-content-center">
      <Col
        className="d-flex justify-content-center"
        xs={4}
        sm={4}
        md={5}
        lg={3}
      >
        <Form
          className="login-form-card"
          onSubmit={formik.handleSubmit}
        >
          <FormGroup>
            <FormLabel className="login-labels mt-2" htmlFor="username">
              Username:
            </FormLabel>
            <FormControl
              type="text"
              {...formik.getFieldProps("username")}
              isInvalid={formik.touched.username && formik.errors.username}
            />
            <FormControl.Feedback type="invalid">
              {formik.errors.username}
            </FormControl.Feedback>
          </FormGroup>

          <FormGroup>
            <FormLabel className="login-labels mt-2" htmlFor="password">
              Password:
            </FormLabel>
            <FormControl
              type="password"
              {...formik.getFieldProps("password")}
              isInvalid={formik.touched.password && formik.errors.password}
            />
            <FormControl.Feedback type="invalid">
              {formik.errors.password}
            </FormControl.Feedback>
          </FormGroup>
          <Form.Text>{errorMsg}</Form.Text>

          <Button type="submit" variant="primary" className="w-100 mt-3">
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default LoginPage;
