import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Cookies from "js-cookie";
import axios from "axios";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import * as yup from "yup";
import "./index.css";

const { Formik } = formik;

const schema = yup.object({
  username: yup.string().required(),
  password: yup.string().required().min(8, "min 8 characters needed"),
});

function LoginPage() {
  const [errorMsg, setErrorMsg] = useState("");
  return (
    <div className="d-flex align-items-center justify-content-center login-container">
      <Formik
        validationSchema={schema}
        onSubmit={(values, {resetForm}) => {
          console.log(values);
          axios
            .post("/login/", values)
            .then((response) => {
              setErrorMsg("");
              console.log(response.data);
              if (response.statusText === "OK") {
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
            resetForm()
        }}
        initialValues={{
          password: "",
          username: "",
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors,
        }) => (
          <Form
            className="d-flex flex-column align-items-center justify-content-center"
            noValidate
            onSubmit={handleSubmit}
          >
          {/* <Form.Text>Login</Form.Text> */}
            <Row className="login-card-continer">
              <Form.Group
                xl={9}
                as={Col}
                controlId="validationFormikUsername"
                xs={9}
              >
                <Form.Label className="login-label-names">Username</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={!!errors.username && touched.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group className="mt-3" xl={9} as={Col} xs={9}>
                <Form.Label className="login-label-names">Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={!!errors.password && touched.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Button
                size={"xl"}
                className="mt-3 ml-3 login-submit-btn"
                variant="warning"
                type="submit"
              >
                Login
              </Button>
            </Row>
            <Form.Text className="login-error-msg mt-3">{errorMsg}</Form.Text>
          </Form>          
        )}
      </Formik>
    </div>
  );
}

export default LoginPage;
