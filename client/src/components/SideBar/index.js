/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { FaHome } from "react-icons/fa";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";
import "./index.css";

const SideBar = () => {
  const [active, setActive] = React.useState(window.location.pathname);

  const handleSelect = (selectedKey) => {
    setActive(selectedKey);
  };
  const today = new Date();
  const date = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  return (
    <>
    <Container fluid className="sidebar-container d-flex flex-column justify-content-between align-items-end">
    <Nav
        
        variant="tabs"
        activeKey={active}
        onSelect={handleSelect}
        className="sidebar-nav-container"
      >
        <Nav.Item className="sidebar-heading">Admin</Nav.Item>
        <Nav.Item>
          
        </Nav.Item>

        <Nav.Item className="sidebar-names">
          <Nav.Link eventKey="/" href="/">
            <span className="sidebar-icon">
              <FaHome />
            </span>
            <span className="name-text">HOME</span>
          </Nav.Link>
        </Nav.Item>

        <Nav.Item className="sidebar-names">
          <Nav.Link eventKey="/admintable" href="/admintable">
            <span className="sidebar-icon">
              <MdOutlineFormatListBulleted />
            </span>
            <span className="name-text">STUDENTS</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="sidebar-names">
          <Nav.Link eventKey="/logout">
            <span className="sidebar-icon">
              <RiLogoutBoxLine />
            </span>
            <span className="name-text">LOG OUT</span>
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Container fluid className="side-bar-bottom-container d-flex flex-column">
            {/* <img
              className="sidebar-profile-icon"
              src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80"
            /> */}
            <Container fluid>
              <p className="side-bar-profile-details">Mohan kumar</p>
              <p className="side-bar-profile-details">mohankumar2634@gmail.com</p>
              <p className="side-bar-profile-details" >{date}-{month}-{year}</p>
            </Container>
          </Container>
    </Container>
      
      
    </>
  );
};

export default SideBar;
