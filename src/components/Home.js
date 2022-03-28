import React, { useState } from "react";
import {
  Col,
  Container,
  Navbar,
  Row,
  Button,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import AddBook from "./AddBook";
import BooksList from "./BooksList";

const Home = () => {
  const { user, logOut } = useUserAuth();

  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (err) {
      console.log("err::", err.message);
    }
  };

  const [bookId, setBookId] = useState("");

  const getBookIdHandler = (id) => {
    console.log("id edited....", id);
    setBookId(id);
  };

  return (
    <>
      {/* <div className="p-4 box mt-3 text-center">
        Hello Welcome
        <br /> {(user && user.email) || (user && user.phoneNumber)}
      </div>
      <div className="d-grid gap-2">
        <Button variant="primary" onClick={handleLogOut}>
          Log Out
        </Button>
      </div> */}
      <Navbar bg="dark" variant="dark" className="mb-2">
        <Container>
          <Navbar.Brand href="/">Library - Firebase CRUD</Navbar.Brand>

          <DropdownButton id="dropdown-basic-button" title="Profile">
            <Dropdown.Item>
              {(user && user.email) || (user && user.phoneNumber)}
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogOut}>Log Out</Dropdown.Item>
          </DropdownButton>
        </Container>
      </Navbar>

      <Container style={{ width: "400px" }} className="mb-2">
        <Row>
          <Col>
            <AddBook id={bookId} setBookId={setBookId} />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <BooksList getBookId={getBookIdHandler} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
