import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card, Container } from "react-bootstrap";
import './index.css'

function Quiz() {
    const navigate = useNavigate();
  const questions = [
    {
      id: 1,
      text: "1. India capital?",
      options: [
        { id: "a", text: "Delhi" },
        { id: "b", text: "hyderabad" },
        { id: "c", text: "bangalore" },
        { id: "d", text: "mumbai" },
      ],
      correctAnswer: "a",
    },
    {
      id: 2,
      text: "2. who is the prime minster of India?",
      options: [
        { id: "a", text: "amith shaw" },
        { id: "b", text: "Rahul Gandhi" },
        { id: "c", text: "Narendra moli" },
        { id: "d", text: "rajnadh singh" },
      ],
      correctAnswer: "c",
    },
    {
      id: 3,
      text: "3. 9+8=??",
      options: [
        { id: "a", text: "20" },
        { id: "b", text: "15" },
        { id: "c", text: "10" },
        { id: "d", text: "17" },
      ],
      correctAnswer: "d",
    },
    {
      id: 4,
      text: "4. how many planets in our solar system?",
      options: [
        { id: "a", text: "7" },
        { id: "b", text: "6" },
        { id: "c", text: "5" },
        { id: "d", text: "8" },
      ],
      correctAnswer: "a",
    },
    {
      id: 5,
      text: "5. What is the formula for water?",
      options: [
        { id: "a", text: "H2O" },
        { id: "b", text: "CO2" },
        { id: "c", text: "NaCl" },
        { id: "d", text: "HCl" },
      ],
      correctAnswer: "a",
    },
  ];

  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionChange = (event) => {
    setSelectedOptions({
      ...selectedOptions,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let score = 0;
    questions.forEach((question) => {
      if (selectedOptions[question.id] === question.correctAnswer) {
        score += 1;
      }
      console.log(score)
    });
    navigate("/", {navigate:true})
  };

  return (
 
      <Card>
        <Card.Body>
          <Form className="quiz-bg-container d-flex flex-column justify-content-center align-items-center" onSubmit={handleSubmit}>
            {questions.map((question) => (
              <Container fluid key={question.id} className="question m-3 p-3">
                <h5 className="question-heading">{question.text}</h5>
                {question.options.map((option) => (
                  <Form.Check
                    key={option.id}
                    type="radio"
                    label={option.text}
                    name={question.id}
                    value={option.id}
                    checked={selectedOptions[question.id] === option.id}
                    onChange={handleOptionChange}
                    className="question-options"
                  />
                ))}
              </Container>
            ))}
            <Button className="mt-2 " size={"lg"} type="submit">Submit</Button>
          </Form>
        </Card.Body>
      </Card>
  );
}
export default Quiz;
