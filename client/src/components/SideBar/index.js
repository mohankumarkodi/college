// import React from "react";
// import { Container } from "react-bootstrap";
// import Nav from "react-bootstrap/Nav";
// import { FaHome } from "react-icons/fa";
// import { MdOutlineFormatListBulleted } from "react-icons/md";
// import { RiLogoutBoxLine } from "react-icons/ri";

// import "./index.css";
// import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";

// const SideBar = () => {
//   const [active, setActive] = React.useState(window.location.pathname);

//   const role = Cookies.get("role");
//   const { fullname, email } = JSON.parse(Cookies.get("userDetails"));


//   const navigate = useNavigate();

//   const logoutUser = () => {
//     Cookies.remove("userDetails");
//     Cookies.remove("role");
//     Cookies.remove("jwt_token");
//     navigate("/login", { replace: true });
//   };

//   const handleSelect = (selectedKey) => {
//     setActive(selectedKey);
//   };
//   const today = new Date();
//   const date = today.getDate();
//   const month = today.getMonth() + 1;
//   const year = today.getFullYear();

//   return (
//     <>
//       <Container
//         fluid
//         className="sidebar-container d-flex flex-column justify-content-between align-items-end"
//       >
//         <Nav
//           variant="tabs"
//           activeKey={active}
//           onSelect={handleSelect}
//           className="sidebar-nav-container"
//         >
//           {role === "admin" ? (
//             <>
//               <Nav.Item className="sidebar-heading">{role}</Nav.Item>
//               <Nav.Item></Nav.Item>
//               <Nav.Item className="sidebar-names">
//                 <Nav.Link eventKey="/" href="/">
//                   <span className="sidebar-icon">
//                     <FaHome />
//                   </span>
//                   <span className="name-text">Home</span>
//                 </Nav.Link>
//               </Nav.Item>
//               <Nav.Item className="sidebar-names">
//                 <Nav.Link eventKey="/admintable" href="/admintable">
//                   <span className="sidebar-icon">
//                     <MdOutlineFormatListBulleted />
//                   </span>
//                   <span className="name-text">Students</span>
//                 </Nav.Link>
//               </Nav.Item>
//               <Nav.Item className="sidebar-names" onClick={logoutUser}>
//                 <Nav.Link eventKey="/logout">
//                   <span className="sidebar-icon">
//                     <RiLogoutBoxLine />
//                   </span>
//                   <span className="name-text">Logout</span>
//                 </Nav.Link>
//               </Nav.Item>
//             </>
//           ) : (
//             <>
//               <Nav.Item className="sidebar-heading">Student</Nav.Item>
//               <Nav.Item className="sidebar-names">
//                 <Nav.Link eventKey="/" href="/">
//                   <span className="sidebar-icon">
//                     <FaHome />
//                   </span>
//                   <span className="name-text">Home</span>
//                 </Nav.Link>
//               </Nav.Item>
//               <Nav.Item className="sidebar-names">
//                 <Nav.Link eventKey="/quiz" href="/quiz">
//                   <span className="sidebar-icon">
//                     <MdOutlineFormatListBulleted />
//                   </span>
//                   <span className="name-text">Start exam</span>
//                 </Nav.Link>
//               </Nav.Item>
//               <Nav.Item className="sidebar-names" onClick={logoutUser}>
//                 <Nav.Link eventKey="/logout">
//                   <span className="sidebar-icon">
//                     <RiLogoutBoxLine />
//                   </span>
//                   <span className="name-text">Logout</span>
//                 </Nav.Link>
//               </Nav.Item>
//             </>
//           )}
//         </Nav>
//         <Container
//           fluid
//           className="side-bar-bottom-container d-flex flex-column"
//         >
//           {/* <img
//               className="sidebar-profile-icon"
//               src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80"
//             /> */}
//           <Container fluid>
//             <p className="side-bar-profile-details">{fullname}</p>
//             <p className="side-bar-profile-details">{email}</p>
//             <p className="side-bar-profile-details">
//               {date}-{month}-{year}
//             </p>
//           </Container>
//         </Container>
//       </Container>
//     </>
//   );
// };

// export default SideBar;
