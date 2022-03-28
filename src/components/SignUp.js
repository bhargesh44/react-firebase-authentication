import React, { useState } from "react";

import { Alert, Button, Form, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signUp } = useUserAuth();
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="p-4 box">
        <h2 className="mb-3">Firebase Auth Signup</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <InputGroup>
              <Form.Control
                type={passwordShown ? "text" : "password"}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="search-icon">
                <FontAwesomeIcon
                  onClick={togglePassword}
                  icon={passwordShown ? faEyeSlash : faEye}
                />
              </div>
            </InputGroup>
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </div>
        </Form>
      </div>
      <div className="p-4 box mt-3 text-center">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
};

export default SignUp;
