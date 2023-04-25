import React, {useEffect,useState}from "react";
import { Container, Card } from "react-bootstrap";
import Sidebar1 from "../SampleSideBar";
import Cookies from "js-cookie";
import axios from "axios";
import Charts from "../StudentGraph";
import "./index.css";


function Home() {
  const [studentScoresList,setStudentScoresList] = useState([]);
  const role = Cookies.get("role");
  const { email } = JSON.parse(Cookies.get("userDetails"));
  const data = {
    email: email,
  };
  useEffect(() => {
    axios
      .post("/getscore", data)
      .then((response) => {
        console.log(response);
        setStudentScoresList(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []); 
  return (
    <>
      <Container fluid className="d-flex flex-row">
        <Sidebar1/>
        <Container
          fluid
          className=" home-bg-container mr-5 d-flex flex-column justify-content-center"
        >
          <Container fluid className="d-flex flex-row justify-content-around">
            <Card className="home-invites-card mx-3">
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <i className="fa fa-envelope fa-2x mb-3"></i>
                {role === "student" ? (<h5>Total Tests</h5>):(<h5>Total Invites</h5>)}
                <h1>127</h1>
              </Card.Body>
            </Card>
            <Card className="home-invites-card mx-3">
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <i className="fa fa-envelope fa-2x mb-3"></i>
                {role === "student" ? (<h5>Total pass</h5>):(<h5>Total Non Invites</h5>)}
                <h1>155</h1>
              </Card.Body>
            </Card>
          </Container>
          <div className="home-chartss-align d-flex flex-row">
            <Charts />
          </div>
        </Container>
      </Container>
    </>
  );
}

export default Home;

// import React from "react";
// import { Container } from "react-bootstrap";
// import Sidebar1 from "../SampleSideBar";
// //import SideBar from "../SideBar";
// import Charts from "../StudentGraph";
// import "./index.css";

// function Home() {
//   return (
//     <>
//       <Container fluid className="d-flex flex-row">
//         {/* <SideBar /> */}
//         <Sidebar1/>
//         <div
//           fluid
//           className=" home-bg-container mr-5 d-flex flex-column justify-content-center"
//         >
//           <div className="d-flex flex-row justify-content-around">
//             <div className="home-invites-card"></div>
//             <div className="home-invites-card"></div>
//           </div>
//           <div className="home-chartss-align d-flex flex-row">
//             <Charts />
//           </div>
//         </div>
//       </Container>
//     </>
//   );
// }

// export default Home;
