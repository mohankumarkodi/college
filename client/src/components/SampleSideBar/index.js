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
import { Container } from "react-bootstrap";
import "./index.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Sidebar1 = () => {
  const role = Cookies.get("role");

  const navigate = useNavigate();

  const logoutUser = () => {
    Cookies.remove("userDetails");
    Cookies.remove("role");
    Cookies.remove("jwt_token");
    navigate("/login", { replace: true });
  };

  return (
    <Container fluid className="sidebar2-container">
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <span className="text-decoration-none" style={{ color: "inherit" }}>
            Admin
          </span>
        </CDBSidebarHeader>
        {role === "admin" ? (
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
              <NavLink exact to="/login" activeClassName="activeClicked" onClick={logoutUser}>
                <CDBSidebarMenuItem icon="user">Logout</CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>
        ) : (
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
              <NavLink exact to="/login" activeClassName="activeClicked" onClick={logoutUser}>
                <CDBSidebarMenuItem icon="user">Logout</CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>
        )}
        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <Container fluid className="sidebar2-footer">
            Sidebar Footer
          </Container>
        </CDBSidebarFooter>
      </CDBSidebar>
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
