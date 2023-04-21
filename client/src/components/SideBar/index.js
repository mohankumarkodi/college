import React from "react";
import Nav from "react-bootstrap/Nav";
import { FaHome } from 'react-icons/fa';
import { MdOutlineFormatListBulleted } from 'react-icons/md';
import {RiLogoutBoxLine} from "react-icons/ri"
import "./index.css";

const SideBar = () => {
  const [active, setActive] = React.useState(window.location.pathname);

  const handleSelect = (selectedKey) => {
    setActive(selectedKey);
  };

  return (
    <>
      <Nav
        className="sidebar-container d-flex flex-column justify-content-start align-items-end"
        variant="tabs"
        activeKey={active}
        onSelect={handleSelect}
      >
        <Nav.Item className="sidebar-heading">Admin</Nav.Item>
        
        <Nav.Item className="sidebar-names">
          <Nav.Link eventKey="/" href="/"><span className="sidebar-icon"><FaHome/></span><span className="name-text">HOME</span></Nav.Link>
        </Nav.Item>

        <Nav.Item className="sidebar-names">
          <Nav.Link eventKey="/admintable" href="/admintable"><span className="sidebar-icon"><MdOutlineFormatListBulleted/></span><span className="name-text">STUDENTS</span></Nav.Link>
        </Nav.Item>
        <Nav.Item className="sidebar-names">
          <Nav.Link eventKey="/logout"><span className="sidebar-icon"><RiLogoutBoxLine/></span><span className="name-text">LOG OUT</span></Nav.Link>
        </Nav.Item>
        
      </Nav>
    </>
  );
};

export default SideBar;
