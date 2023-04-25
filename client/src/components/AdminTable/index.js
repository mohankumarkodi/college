import {
  Container,
  Button,
  Pagination,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormControl,
} from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import MyVerticallyCenteredModal from "../AddStudentForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import axios from "axios";
import Sidebar1 from "../SampleSideBar";

function AdminTable() {
  const [modalShow, setModalShow] = React.useState(false);
  const [inviteModal, setInviteModal] = useState(false);
  const [studentList, setStudentList] = useState([]);
  const [sendMailInfo, setSendMailInfo] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [selectedMail, setSelectedMail] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  //const [filteredStudentList, setFilteredStudentList] = useState([]);
  const ITEMS_PER_PAGE = 5;

  const onclickInvite = (email) => {
    toggleInviteModal();
    setSelectedMail(email);
  };

  const sendInvite = () => {
    const email = selectedMail;
    const link = "http://192.168.1.249:3000";
    console.log(email, link);
    const body = { to: email, link };
    console.log(body);
    axios
      .post("/sendmail", body)
      .then((response) => {
        console.log(response.data);
        if (response.statusText === "OK") {
          toast.success("Mail sent successfully ");
          setSendMailInfo(response.data);
        }
      })
      .catch((e) => {
        setSendMailInfo(e);
        toast.warning("Mail not sent");
      });
    toggleInviteModal();
  };

  // console.log(sendMailInfo);

  const toggleInviteModal = () => {
    setInviteModal(!inviteModal);
  };

  const emailModal = () => {
    return (
      <Modal centered size="lg" show={inviteModal} onHide={toggleInviteModal}>
        <ModalHeader>
          <ModalBody>
            <h5>Do you want to send exam Invitation to {selectedMail} ?</h5>
            <Container className="d-flex flex-row justify-content-center mt-5 m-auto">
              <Button className="invite-model-btn-yes" onClick={sendInvite}>
                Yes
              </Button>
              <Button onClick={toggleInviteModal}>No</Button>
            </Container>
          </ModalBody>
        </ModalHeader>
      </Modal>
    );
  };

  useEffect(() => {
    axios
      .get("/getstudents")
      .then((response) => {
        console.log(response);
        setStudentList(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredStudentList = studentList.filter((student) =>
    student.fullname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = activePage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredStudentList.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const totalPages = Math.ceil(studentList.length / ITEMS_PER_PAGE);
    const ellipsis = <Pagination.Ellipsis disabled />;

    for (let i = 1; i <= totalPages; i++) {
      if (totalPages > 10 && i !== 1 && i !== totalPages) {
        if (i < activePage - 2 || i > activePage + 2) {
          if (!pageNumbers.includes(ellipsis)) {
            pageNumbers.push(ellipsis);
          }
          continue;
        }
      }
      pageNumbers.push(
        <Pagination.Item
          key={i}
          active={i === activePage}
          onClick={() => setActivePage(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    const prevButton = (
      <Pagination.Prev
        disabled={activePage === 1}
        onClick={() => setActivePage(activePage - 1)}
      />
    );
    const nextButton = (
      <Pagination.Next
        disabled={activePage === totalPages}
        onClick={() => setActivePage(activePage + 1)}
      />
    );

    return [prevButton, pageNumbers, nextButton];
  };
  return (
    <Container fluid className="d-flex flex-row">
      {/* <SideBar /> */}
      <Sidebar1 />
      <Container fluid className="p-5 admin-table-container">
        <Container
          fluid
          className="d-flex d-row justify-content-between mr-2 mb-4 ml-5"
        >
          <h1 className="align-center">StudentDetails</h1>
          <Button
            className="admin-addstudent-btn"
            variant="primary"
            onClick={() => setModalShow(true)}
          >
            Add Student
          </Button>
        </Container>

        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
        <Container fluid className="admin-table-align">
          <Form className=" mb-3 admin-table-search-input">
            <FormControl
              type="text"
              placeholder="Search by student name"
              className="mr-sm-2"
              value={searchQuery}
              onChange={handleSearch}
            />
          </Form>
          <Table
            responsive
            striped
            bordered
            hover
            className="admin-table admin-nowrap"
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Student Name</th>
                <th>Gender</th>
                <th>Email</th>
                <th>Date of Birth</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.fullname}</td>
                  <td>{item.gender}</td>
                  <td>{item.email}</td>
                  <td>
                    {new Date(item.date_of_birth).toLocaleDateString("en-GB")}
                  </td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => onclickInvite(item.email)}
                    >
                      Invite
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
        <Container fluid className="d-flex justify-content-center">
          <Pagination>{renderPageNumbers()}</Pagination>
        </Container>
      </Container>
      {emailModal()}
      <ToastContainer />
    </Container>
  );
}
export default AdminTable;

// import React, { useState, useEffect } from "react";
// import Table from "react-bootstrap/Table";
// import MyVerticallyCenteredModal from "../AddStudentForm";
// import SideBar from "../SideBar";
// import "./index.css";
// import axios from "axios";

// function AdminTable() {
//   const [modalShow, setModalShow] = React.useState(false);
//   const [studentList, setStudentList] = useState([]);
//   const [sendMailInfo, setSendMailInfo] = useState("");
//   const [activePage, setActivePage] = useState(1);
//   const ITEMS_PER_PAGE = 5;

//   const onclickInvite = (email) => {
//     const link = "http://localhost:3000/quiz";
//     // console.log(email, link);
//     const body = { to: email, link };
//     console.log(body);
//     axios
//       .post("/sendmail", body)
//       .then((response) => {
//         console.log(response.data);
//         if (response.statusText === "OK") {
//           setSendMailInfo(response.data);
//         }
//       })
//       .catch((e) => {
//         setSendMailInfo(e);
//       });
//   };
//   console.log(sendMailInfo);

//   useEffect(() => {
//     axios
//       .get("/getstudents")
//       .then((response) => {
//         console.log(response);
//         setStudentList(response.data);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   }, []);

//   const indexOfLastItem = activePage * ITEMS_PER_PAGE;
//   const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
//   const currentItems = studentList.slice(indexOfFirstItem, indexOfLastItem);

//   const renderPageNumbers = () => {
//     const pageNumbers = [];
//     for (let i = 1; i <= Math.ceil(studentList.length / ITEMS_PER_PAGE); i++) {
//       pageNumbers.push(
//         <Pagination.Item
//           key={i}
//           active={i === activePage}
//           onClick={() => setActivePage(i)}
//         >
//           {i}
//         </Pagination.Item>
//       );
//     }
//     return pageNumbers;
//   };

//   return (
//     <Container fluid className="d-flex flex-row">
//       <SideBar />
//       <Container fluid className="p-5 admin-table-container">
//         <Container
//           fluid
//           className="d-flex d-row justify-content-between mr-2 mb-4 ml-5"
//         >
//           <h1 className="align-center">StudentDetails</h1>
//           <Button
//             className="admin-addstudent-btn"
//             variant="primary"
//             onClick={() => setModalShow(true)}
//           >
//             Add Student
//           </Button>
//         </Container>

//         <MyVerticallyCenteredModal
//           show={modalShow}
//           onHide={() => setModalShow(false)}
//         />
//         <Container fluid className="admin-table-align">
//           <Table
//             responsive
//             striped
//             bordered
//             hover
//             className="admin-table admin-nowrap"
//           >
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Student Name</th>
//                 <th>Gender</th>
//                 <th>Email</th>
//                 <th>Date of Birth</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentItems.map((item) => (
//                 <tr key={item.id}>
//                   <td>{item.id}</td>
//                   <td>{item.fullname}</td>
//                   <td>{item.gender}</td>
//                   <td>{item.email}</td>
//                   <td>
//                     {new Date(item.date_of_birth).toLocaleDateString("en-GB")}
//                   </td>
//                   <td>
//                     <Button
//                       variant="primary"
//                       onClick={() => onclickInvite(item.email)}
//                     >
//                       Invite
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Container>
//         <Pagination className="justify-content-center">
//           {renderPageNumbers()}
//         </Pagination>
//       </Container>
//     </Container>
//   );
// }

// export default AdminTable;
// import { Container, Button } from "react-bootstrap";
// import React, { useState, useEffect } from "react";
// import Table from "react-bootstrap/Table";
// import MyVerticallyCenteredModal from "../AddStudentForm";
// import SideBar from "../SideBar";
// import "./index.css";
// import axios from "axios";

// function AdminTable() {
//   const [modalShow, setModalShow] = React.useState(false);
//   const [studentList, setStudentList] = useState([]);
//   const [sendMailInfo, setSendMailInfo] = useState("");

//   const onclickInvite = (email) => {
//     const link = "http://localhost:3000/quiz";
//     // console.log(email, link);
//     const body = { to: email, link };
//     console.log(body);
//     axios
//       .post("/sendmail", body)
//       .then((response) => {
//         console.log(response.data);
//         if (response.statusText === "OK") {
//           setSendMailInfo(response.data);
//         }
//       })
//       .catch((e) => {
//         setSendMailInfo(e);
//       });
//   };
//   console.log(sendMailInfo);

//   useEffect(() => {
//     axios
//       .get("/getstudents")
//       .then((respone) => {
//         console.log(respone);
//         setStudentList(respone.data);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   }, []);
//   // console.log(studentList);
//   return (
//     <Container fluid className="d-flex flex-row">
//       <SideBar />
//       <Container fluid className="p-5 admin-table-container">
//         <Container
//           fluid
//           className="d-flex d-row justify-content-between mr-2 mb-4 ml-5"
//         >
//           <h1 className="align-center">StudentDetails</h1>
//           <Button
//             className="admin-addstudent-btn"
//             variant="primary"
//             onClick={() => setModalShow(true)}
//           >
//             Add Student
//           </Button>
//         </Container>

//         <MyVerticallyCenteredModal
//           show={modalShow}
//           onHide={() => setModalShow(false)}
//         />

//         <Table
//           responsive
//           striped
//           bordered
//           hover
//           className="admin-table admin-nowrap"
//         >
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Student Name</th>
//               <th>Gender</th>
//               <th>Email</th>
//               <th>Date of Birth</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {studentList.map((item) => (
//               <tr key={item.id}>
//                 <td>{item.id}</td>
//                 <td>{item.fullname}</td>
//                 <td>{item.gender}</td>
//                 <td>{item.email}</td>
//                 <td>
//                   {new Date(item.date_of_birth).toLocaleDateString("en-GB")}
//                 </td>
//                 <td>
//                   <Button
//                     onClick={() => onclickInvite(item.email)}
//                     variant="primary"
//                     className="admin-invite-btn "
//                   >
//                     Invite
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </Container>
//     </Container>
//   );
// }

// export default AdminTable;
