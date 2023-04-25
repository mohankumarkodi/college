import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import "./index.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Sidebar1 = () => {
  const role = Cookies.get("role");
  //const { fullname, email } = JSON.parse(Cookies.get("userDetails"));
  const navigate = useNavigate();
  // const today = new Date();
  // const date = today.getDate();
  // const month = today.getMonth() + 1;
  // const year = today.getFullYear();

  const logoutUser = () => {
    Cookies.remove("userDetails");
    Cookies.remove("role");
    Cookies.remove("jwt_token");
    navigate("/login", { replace: true });
  };

  return (
    <Container fluid className="sidebar2-container">
      <Row>
        <Col sm={4} xs={6 } md={2}>
          <CDBSidebar textColor="#fff" backgroundColor="#333">
            {role === "admin" ? (
              <>
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                  <span className="text-decoration-none" style={{ color: "inherit" }}>
                    Admin
                  </span>
                </CDBSidebarHeader>
                <CDBSidebarContent className="sidebar-content">
                  <CDBSidebarMenu>
                    <NavLink exact to="/" activeClassName="activeClicked">
                      <CDBSidebarMenuItem icon="columns">
                        Dashboard
                      </CDBSidebarMenuItem>
                    </NavLink>
                    <NavLink exact to="/admintable" activeClassName="activeClicked">
                      <CDBSidebarMenuItem icon="table">
                        StudentDetails
                      </CDBSidebarMenuItem>
                    </NavLink>
                    <NavLink
                      exact
                      to="/login"
                      activeClassName="activeClicked"
                      onClick={logoutUser}
                    >
                      <CDBSidebarMenuItem icon="user">Logout</CDBSidebarMenuItem>
                    </NavLink>
                  </CDBSidebarMenu>
                </CDBSidebarContent>
              </>
            ) : (
              <>
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                  <span className="text-decoration-none" style={{ color: "inherit" }}>
                    Student
                  </span>
                </CDBSidebarHeader>
                <CDBSidebarContent className="sidebar-content">
                  <CDBSidebarMenu>
                    <NavLink exact to="/" activeClassName="activeClicked">
                      <CDBSidebarMenuItem icon="columns">
                        Dashboard
                      </CDBSidebarMenuItem>
                    </NavLink>
                    <NavLink exact to="/quiz" activeClassName="activeClicked">
                      <CDBSidebarMenuItem icon="table">Start Exam</CDBSidebarMenuItem>
                    </NavLink>
                    <NavLink exact to="/studentmarks" activeClassName="activeClicked">
                      <CDBSidebarMenuItem icon="table">Marks Table</CDBSidebarMenuItem>
                    </NavLink>
                    <NavLink
                      exact
                      to="/login"
                      activeClassName="activeClicked"
                      onClick={logoutUser}
                    >
                      <CDBSidebarMenuItem icon="user">Logout</CDBSidebarMenuItem>
                    </NavLink>
                  </CDBSidebarMenu>
                </CDBSidebarContent>
              </>
            )}
            <CDBSidebarFooter style={{ textAlign: "center" }}>
              <Container fluid className="sidebar2-footer">
                {/* <p>{fullname}</p>
                <p>{email}</p>
                <p>{date}-{month}-{year}</p> */}
              </Container>
            </CDBSidebarFooter>
          </CDBSidebar>
        </Col>
        {/*  */}
      </Row>
    </Container>
  );
};

export default Sidebar1;


// import React from "react";
// import {
//   CDBSidebar,
//   CDBSidebarContent,
//   CDBSidebarFooter,
//   CDBSidebarHeader,
//   CDBSidebarMenu,
//   CDBSidebarMenuItem,
// } from "cdbreact";
// import { NavLink } from "react-router-dom";
// import { Container } from "react-bootstrap";
// import "./index.css";
// import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";

// const Sidebar1 = () => {
//   const role = Cookies.get("role");

//   const navigate = useNavigate();

//   const logoutUser = () => {
//     Cookies.remove("userDetails");
//     Cookies.remove("role");
//     Cookies.remove("jwt_token");
//     navigate("/login", { replace: true });
//   };

//   return (
//     <Container fluid className="sidebar2-container">
//       <CDBSidebar textColor="#fff" backgroundColor="#333">
//         <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
//           <a
//             href="/"
//             className="text-decoration-none"
//             style={{ color: "inherit" }}
//           >
//             Admin
//           </a>
//         </CDBSidebarHeader>
//         {role === "admin" ? (
//           <CDBSidebarContent className="sidebar-content">
//             <CDBSidebarMenu>
//               <NavLink exact to="/" activeClassName="activeClicked">
//                 <CDBSidebarMenuItem icon="columns">
//                   Dashboard
//                 </CDBSidebarMenuItem>
//               </NavLink>
//               <NavLink exact to="/admintable" activeClassName="activeClicked">
//                 <CDBSidebarMenuItem icon="table">
//                   StudentDetails
//                 </CDBSidebarMenuItem>
//               </NavLink>
//               <NavLink
//                 exact
//                 activeClassName="activeClicked"
//                 onClick={logoutUser}
//               >
//                 <CDBSidebarMenuItem icon="user">Logout</CDBSidebarMenuItem>
//               </NavLink>
//             </CDBSidebarMenu>
//           </CDBSidebarContent>
//         ) : (
//           <CDBSidebarContent className="sidebar-content">
//             <CDBSidebarMenu>
//               <NavLink exact to="/" activeClassName="activeClicked">
//                 <CDBSidebarMenuItem icon="columns">
//                   Dashboard
//                 </CDBSidebarMenuItem>
//               </NavLink>
//               <NavLink exact to="/quiz" activeClassName="activeClicked">
//                 <CDBSidebarMenuItem icon="table">Start Exam</CDBSidebarMenuItem>
//               </NavLink>
//               <NavLink
//                 exact
//                 activeClassName="activeClicked"
//                 onClick={logoutUser}
//               >
//                 <CDBSidebarMenuItem icon="user">Logout</CDBSidebarMenuItem>
//               </NavLink>
//             </CDBSidebarMenu>
//           </CDBSidebarContent>
//         )}
//         <CDBSidebarFooter style={{ textAlign: "center" }}>
//           <Container fluid className="sidebar2-footer">
//             Sidebar Footer
//           </Container>
//         </CDBSidebarFooter>
//       </CDBSidebar>
//     </Container>
//   );
// };

// export default Sidebar1;
