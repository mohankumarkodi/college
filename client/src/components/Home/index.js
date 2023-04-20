import React from "react";
import { Container } from "react-bootstrap";
import SideBar from "../SideBar";
import Charts from "../StudentGraph";
import "./index.css";

function Home() {
  return (
    <>
      <Container fluid className="d-flex flex-row">
        <SideBar />
        <div
          fluid
          className=" home-bg-container mr-5 d-flex flex-column justify-content-center"
        >
          <div className="d-flex flex-row justify-content-around">
            <div className="home-invites-card"></div>
            <div className="home-invites-card"></div>
          </div>
          <div className="home-chartss-align d-flex flex-row">
            <Charts />
          </div>
        </div>
      </Container>
    </>
  );
}

export default Home;
