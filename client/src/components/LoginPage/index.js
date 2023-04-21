import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Container,
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
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

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
          setTimeout(() => {
            navigate("/", { replace: true });
          });
        })
        .catch((e) => {
          setErrorMsg(e.response.data);
        });
    },
  });

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Container className="d-flex">
      <Row className="login-container m-0 justify-content-center">
        <Col className="d-flex justify-content-center m-0" sm={6} md={4}>
          <Form className="login-form-card" onSubmit={formik.handleSubmit}>
            <FormGroup className="login-input-container">
              <FormLabel className="login-labels mb-1" htmlFor="username">
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
            <FormGroup className="login-input-container">
              <FormLabel className="login-labels mt-2" htmlFor="password">
                Password:
              </FormLabel>

              <FormControl
                type={showPassword ? "text" : "password"}
                {...formik.getFieldProps("password")}
                isInvalid={formik.touched.password && formik.errors.password}
             
              />
              <FormControl.Feedback type="invalid">
                {formik.errors.password}
              </FormControl.Feedback>
            </FormGroup>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check className="mt-3"
                type="checkbox"
                label="Show password"
                onChange={handleShowPasswordChange}
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100 mt-3 mb-2">
              Submit
            </Button>
            {errorMsg && (
              <Form.Text className="text-danger">{errorMsg}</Form.Text>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
