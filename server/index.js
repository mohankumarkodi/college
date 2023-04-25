const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const client = require("./client");

const dbConnection = () => {
  try {
    client.connect();
    console.log("Connected to PostgreSQL server");
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

dbConnection();

// TOKEN AUTHENTICATION
const tokenAuthentication = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);

  if (authHeader === undefined) {
    res.status(401).send("Access denied. No token provided.");
  } else {
    const jwtToken = authHeader.split(" ")[1];
    jwt.verify(jwtToken, "secret_key", (error, payload) => {
      if (error) {
        res.status(401).send(error);
      } else {
        next();
      }
    });
  }
};

// TEST
app.get("/test/", (err, res) => {
  client.query("SELECT * FROM user_details", (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log(
        `Connected to user ${results.rows[0].username} from postgreSQL`
      );
      res.send("Connected to postgreSQL Database");
    }
  });
});

// LOGIN
app.post("/login/", (req, res) => {
  const { username, password } = req.body;
  // console.log(username, password);
  const query = {
    text: "SELECT * FROM user_details WHERE username=$1",
    values: [username],
  };
  // console.log(query);
  client.query(query, (error, results) => {
    if (error) {
      res.status(400).send(error);
      return;
    }
    if (results.rows.length === 0) {
      res.status(404);
      res.send("User not found");
      return;
    }
    const storedPassword = results.rows[0].password;
    bcrypt.compare(password, storedPassword, (err, result) => {
      if (err) {
        res.status(500).send("An error occurred while verifying password");
        return;
      }
      if (!result) {
        res.status(401).send("Invalid Password");
        return;
      }
      const payload = { username: username };
      const jwtToken = jwt.sign(payload, "secret_key");
      delete results.rows[0].password;
      res.send({ jwtToken, results: results.rows });
      // console.log(results.rows[0].password);
    });
  });
});

// ADD STUDENT
app.post("/addstudent/", async (req, res) => {
  const { username, fullname, email, dateOfBirth, gender } = req.body;
  const password = "123123";
  const hashedPassword = await bcrypt.hash(password, 10);
  const role = "student";

  const query = {
    text: "INSERT INTO user_details(username, fullname, email, date_of_birth, gender, role, password) VALUES($1,$2,$3,$4,$5,$6,$7)",
    values: [
      username,
      fullname,
      email,
      dateOfBirth,
      gender,
      role,
      hashedPassword,
    ],
  };

  client.query(query, (error, results) => {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).send(results);
    }
  });
});

// GET STUDENTS
app.get("/getstudents/", (req, res) => {
  const role = "student";
  const query = {
    text: "SELECT * FROM user_details WHERE role=$1",
    values: [role],
  };
  client.query(query, (error, results) => {
    if (error) {
      res.status(400).send(error);
    } else {
      const rows = results.rows;
      rows.forEach((row) => {
        delete row.password;
      });
      console.log(rows);
      res.send(rows);
    }
  });
});

// SEND MAIL
app.post("/sendmail/", (req, res) => {
  const { to, link } = req.body;
  console.log(to, link);
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_ACCOUNT,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_ACCOUNT,
      to: to,
      subject: "Exam invitation!",
      html: `<h1>Dear Student,</h1><p>We have scheduled a test for you. Please go through the link ${link} and login with your credentials to take you test.</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(400);
        res.send(error);
        // console.log(error);
      } else {
        console.log(info);
        res.send(info).status(200);
      }
    });
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

// ADD SCORE
app.post("/studentscore/", (req, res) => {
  const { testId, email, score, testDate } = req.body;
  // console.log(testId, email, score);
  const query = {
    text: "INSERT INTO test_details(test_id, student_email, test_score, test_date) VALUES($1,$2,$3,$4)",
    values: [testId, email, score, testDate],
  };
  client.query(query, (error, results) => {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).send(results);
    }
  });
});

// GET STUDENT SCORE
app.get("/getscore/", (req, res) => {
  const { email } = req.body;
  const query = {
    text: "SELECT * FROM test_details WHERE student_email = ($1)",
    values: [email],
  };
  client.query(query, (error, results) => {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).send(results.rows);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running`);
});



// const express = require("express");
// const bcrypt = require("bcrypt");
// const cors = require("cors");
// const jwt = require("jsonwebtoken");

// const app = express();
// app.use(express.json());
// app.use(cors());

// const connection = require("./connection");

// const dbConnection = () => {
//   try {
//     connection.connect();
//   } catch (e) {
//     console.log(e);
//     process.exit(1);
//   }
// };

// dbConnection();

// // LOGIN
// app.post("/login/", (req, res) => {
//   const { username, password } = req.body;
//   // console.log(username, password);
//   connection.query(
//     "SELECT * FROM user_details WHERE name=? and role=?",
//     [username, "admin"],
//     (error, results) => {
//       if (error) {
//         res.status(400).send(error);
//         return;
//       }
//       if (results.length === 0) {
//         res.status(404);
//         res.send("User not found");
//         return;
//       }
//       const storedPassword = results[0].password;
//       bcrypt.compare(password, storedPassword, (err, result) => {
//         if (err) {
//           res.status(500).send("An error occurred while verifying password");
//           return;
//         }
//         if (!result) {
//           res.status(401).send("Invalid Password");
//           return;
//         }
//         const payload = { username: username };
//         const jwtToken = jwt.sign(payload, "secret_key");
//         delete results[0].password;
//         res.send({ jwtToken, results });
//         // console.log(results[0].password);
//       });
//     }
//   );
// });

// // add student
// app.post("/addstudent/", async (req, res) => {
//   const { fullname, email, date_of_birth, gender } = req.body;
//   const password  = "123123";
//   // console.log(username, password, role);
//   const hashedPassword = await bcrypt.hash(password, 10);
//   //   console.log(hashedPassword);
//   const role = "student";

//   connection.query(
//     "INSERT INTO user_details(fullname,email, date_of_birth,gender,role,password) values(?,?,?,?,?,?)",
//     [fullname, email, date_of_birth, gender, role,hashedPassword],
//     (error, results) => {
//       if (error) {
//         res.status(400);
//         res.send(error);
//       } else {
//         res.status(200).send(results);
//       }
//     }
//   );
// });
// const rl = "student"
// // // CREATE USER
// // app.post("/createuser/", async (req, res) => {
// //   const { id, name, email, date_of_birth, gender, role, password } = req.body;
// //   // console.log(username, password, role);
// //   const hashedPassword = await bcrypt.hash(password, 10);
// //   //   console.log(hashedPassword);
// //   connection.query(
// //     "INSERT INTO user_details(id,name,email, date_of_birth,gender,role,password) values(?,?,?,?,?,?,?)",
// //     [id, name, email, date_of_birth, gender, role, hashedPassword],
// //     (error, results) => {
// //       if (error) {
// //         res.status(400);
// //         res.send(error);
// //       } else {
// //         res.status(200).send(results);
// //       }
// //     }
// //   );
// // });

// // MIDDLEWARE AUTHENTICATION
// // const tokenAuthentication = (req, res, next) => {
// //   const authHeader = req.headers.authorization;
// //   console.log(authHeader);

// //   if (authHeader === undefined) {
// //     res.status(401).send("Access denied. No token provided.");
// //   } else {
// //     const jwtToken = authHeader.split(" ")[1];
// //     jwt.verify(jwtToken, "secret_key", (error, payload) => {
// //       if (error) {
// //         res.status(401).send(error);
// //       } else {
// //         // req.username = payload.username;
// //         next();
// //       }
// //     });
// //   }
// // };

// // GET USERS
// app.get("/getstudents/", (req, res) => {
//   connection.query("SELECT * FROM user_details where role=?",[rl], (error, results) => {
//     if (error) {
//       res.status(400);
//       res.send(error);
//     } else {
//       results.map((each) => {
//         delete each.password;
//       });
//       console.log(results);
//       res.send(results);
//     }
//   });
// });

// //send
// app.post("/sendmail/", (req, res) => {
//   let { to, link } = req.body;
//   const mailService = broker.createService({
//     mixins: [MailService],
//     settings: {
//       transport: {
//         host: "smtp.gmail.com",
//         port: 465,
//         secure: true,
//         auth: {
//           user: "naidukutility@gmail.com",
//           pass: process.env.EMAIL_PASSWORD,
//         },
//       },
//     },
//     actions: {
//       sendWelcomeEmail(ctx) {
//         const email = {
//           from: "naidukutility@gmail.com",
//           to: "siva.naidu@recykal.com",
//           subject: "Exam invitation!",
//           html: `<h1>Dear Student,</h1><p>We have scheduled a test for you. Please go through the link ${link} and login with your credentials to take you test.</p>`,
//         };
//         return this.send(email)
//           .then(() => {
//             return { message: "Exam email sent successfully!" };
//           })
//           .catch((error) => {
//             return { error: error.message };
//           });
//       },
//     },
//   });

//   broker.start().then(() => {
//     broker
//       .call("mail.sendWelcomeEmail")
//       .then((response) => console.log(response))
//       .catch((error) => console.error(error));
//   });
// });

// // GET PRODUCTS
// app.get("/getproducts/", (req, res) => {
//   const { category } = req.query;

//   let query = "SELECT * FROM products";

//   if (category) {
//     query += ` WHERE category LIKE '${category}'`;
//   }

//   connection.query(query, (error, results) => {
//     if (error) {
//       res.status(400).send(error);
//     } else {
//       res.send(results);
//     }
//   });
// });

// // CREATE USER
// app.post("/createuser/", async (req, res) => {
//   const { id, username, password, fullname, mobile, email, role } = req.body;
//   // console.log(username, password, role);
//   const hashedPassword = await bcrypt.hash(password, 10);
//   //   console.log(hashedPassword);
//   connection.query(
//     "INSERT INTO user_details(id, username, password, fullname, mobile, email, role) values(?,?,?,?,?,?,?)",
//     [id, username, hashedPassword, fullname, mobile, email, role],
//     (error, results) => {
//       if (error) {
//         res.status(400);
//         res.send(error);
//       } else {
//         // connection.query("SELECT * FROM user_details", (error, results) => {
//         //   if (error) {
//         //     res.status(500);
//         //     res.send(error);
//         //   } else {
//         //     res.send(results);
//         //   }
//         // });
//         // res.status(200);
//         res.status(200).send(results);
//       }
//     }
//   );
// });

// // UPDATE USER
// app.patch("/updateuser/", tokenAuthentication, (req, res) => {
//   const { username } = req.query;
//   const { fullname, email, mobile } = req.body;

//   connection.query(
//     "UPDATE user_details SET fullname=?, email=?, mobile=? WHERE username=?",
//     [fullname, email, mobile, username],
//     (error, results) => {
//       if (error) {
//         res.status(400);
//         res.send(error);
//       } else {
//         res.send(results);
//       }
//     }
//   );
// });

// // UPDATE PASSWORD
// app.patch("/changepassword/", tokenAuthentication, (req, res) => {
//   const { username } = req.query;
//   const { currentPassword, newPassword } = req.body;
//   console.log(currentPassword, newPassword, username);
//   connection.query(
//     "SELECT * FROM user_details WHERE username=?",
//     [username],
//     (error, results) => {
//       if (error) {
//         res.status(400).send(error);
//         return;
//       }
//       if (results.length === 0) {
//         res.status(404).send("User not found");
//         return;
//       }
//       if (currentPassword === newPassword) {
//         res.status(400).send("Old password and new password cannot be same");
//         return;
//       }
//       const oldHashedPassword = results[0].password;
//       bcrypt.compare(
//         currentPassword,
//         oldHashedPassword,
//         async (err, result) => {
//           if (err) {
//             console.error(err);
//             res
//               .status(500)
//               .send("An error occurred while changing the password.");
//             return;
//           }
//           if (!result) {
//             res.status(401).send("The old password is incorrect.");
//             return;
//           }
//           const newHashedPassword = await bcrypt.hash(newPassword, 10);
//           connection.query(
//             "UPDATE user_details SET password=? WHERE username=?",
//             [newHashedPassword, username],
//             (err, result) => {
//               if (err) {
//                 console.error(err);
//                 res
//                   .status(500)
//                   .send("An error occurred while changing the password.");
//               } else {
//                 // console.log(result);
//                 res.send("Password changed successfully.");
//               }
//             }
//           );
//         }
//       );
//     }
//   );
// });

// // LOGIN
// app.post("/login/", (req, res) => {
//   const { username, password } = req.body;
//   // console.log(username, password);
//   connection.query(
//     "SELECT * FROM user_details WHERE username=?",
//     [username],
//     (error, results) => {
//       if (error) {
//         res.status(400).send(error);
//         return;
//       }
//       if (results.length === 0) {
//         res.status(404);
//         res.send("User not found");
//         return;
//       }
//       const storedPassword = results[0].password;
//       bcrypt.compare(password, storedPassword, (err, result) => {
//         if (err) {
//           res.status(500).send("An error occurred while verifying password");
//           return;
//         }
//         if (!result) {
//           res.status(401).send("Invalid Password");
//           return;
//         }
//         const payload = { username: username };
//         const jwtToken = jwt.sign(payload, "secret_key");
//         delete results[0].password;
//         res.send({ jwtToken, results });
//         // console.log(results[0].password);
//       });
//     }
//   );
// });

// // ADD NEW PRODUCT TO TABLE
// app.post("/addproduct/", tokenAuthentication, (req, res) => {
//   const { title, category, imageUrl, price, brand } = req.body;

//   connection.query(
//     "INSERT INTO products (title, category, image_url, price, brand) VALUES (?, ?, ?, ?, ?)",
//     [title, category, imageUrl, price, brand],
//     (error, results) => {
//       if (error) {
//         res.status(400).send(error);
//         return;
//       }
//       const message = "Product added successfully";
//       res.send({ results, message });
//     }
//   );
// });

// // ADD TO CART
// app.post("/addtocart/", tokenAuthentication, (req, res) => {
//   // const { username } = req.query;
//   const { item, quantity, username } = req.body;
//   const { id, category, title, imageUrl, brand, price } = item;
//   // console.log(id, category, title, imageUrl, brand, price, quantity);
//   connection.query(
//     "INSERT INTO cart(id, username, title, brand, category, price, image_url, quantity) VALUES(?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)",
//     [id, username, title, brand, category, price, imageUrl, quantity],
//     (error, results) => {
//       if (error) {
//         res.status(400).send(error);
//         return;
//       }
//       const message = "Product successfully added";
//       res.send({ results, message });
//     }
//   );
// });

// // GET PRODUCTS FROM CART
// app.get("/getitems/", (req, res) => {
//   const { username } = req.query;
//   // console.log(username);
//   connection.query(
//     `SELECT * FROM cart WHERE username='${username}'`,
//     (error, results) => {
//       if (error) {
//         res.status(400).send(error);
//         return;
//       }
//       console.log(results);
//       res.send(results);
//     }
//   );
// });

// // CREATE NEW ORDER
// app.post("/createorder/", (req, res) => {
//   const {
//     id,
//     username,
//     category,
//     title,
//     fullname,
//     email,
//     mobileNumber,
//     address,
//     postalCode,
//     state,
//     quantity,
//     deliveryDate,
//   } = req.body;

//   const date = new Date(deliveryDate);
//   console.log(date.toLocaleDateString("en-GB"));

//   connection.query(
//     "SELECT image_url, price FROM products WHERE title=?",
//     [title],
//     (error, results) => {
//       if (error) {
//         res.send(error).status(400);
//         return;
//       }
//       // console.log(results);
//       const { image_url, price } = results[0];

//       // console.log(image_url);

//       connection.query(
//         "INSERT INTO orders(id, username, category, title, image_url, price, fullname, email, mobile, address, pincode, state, quantity, delivery_date) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
//         [
//           id,
//           username,
//           category,
//           title,
//           image_url,
//           price,
//           fullname,
//           email,
//           mobileNumber,
//           address,
//           postalCode,
//           state,
//           quantity,
//           date,
//         ],
//         (error, results) => {
//           if (error) {
//             res.status(400).send(error);
//             return;
//           }
//           // console.log(results);
//           res.send("Order successfully created");
//         }
//       );
//     }
//   );
// });

// // GET ORDERS
// app.get("/getorders/", (req, res) => {
//   const { username } = req.query;

//   if (username) {
//     connection.query(
//       `SELECT * FROM orders WHERE username='${username}'`,
//       (error, results) => {
//         if (error) {
//           res.status(400).send(error);
//           return;
//         }
//         console.log(results);
//         res.send(results);
//       }
//     );
//   } else {
//     connection.query("SELECT * FROM orders", (error, results) => {
//       if (error) {
//         res.status(400).send(error);
//         return;
//       }
//       console.log(results);
//       res.send(results);
//     });
//   }
// });

// // REMOVE ITEM FROM CART
// app.delete("/deleteitem/", (req, res) => {
//   const { id } = req.body;
//   const { username } = req.query;
//   console.log(id, username);

//   let query = "";

//   if (id) {
//     query = "DELETE FROM cart WHERE id=? AND username=?";
//     connection.query(query, [id, username], (error, results) => {
//       if (error) {
//         res.status(400).send(error);
//       } else {
//         const message = "Product successfully deleted";
//         res.send({ results, message });
//       }
//     });
//   } else {
//     query = "DELETE FROM cart WHERE username=?";
//     connection.query(query, [username], (error, results) => {
//       if (error) {
//         res.status(400).send(error);
//       } else {
//         const message = "All products for the user successfully deleted";
//         res.send({ results, message });
//       }
//     });
//   }
// });

// app.listen(5000, () => {
//   console.log("Server running at http://localhost:5000");
// });
