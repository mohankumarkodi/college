import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import "./index.css";

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

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionChange = (event) => {
    const { name, value } = event.target;
    setSelectedOptions({ ...selectedOptions, [name]: value });
  };
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let score = 0;
    questions.forEach((question) => {
      if (selectedOptions[question.id] === question.correctAnswer) {
        score += 1;
      }
      console.log(score);
    });
    navigate("/", { navigate: true });
  };

  const currentQuestionData = questions[currentQuestion];

  return (
    <Container
      fluid
      className="quiz-bg-container d-flex flex-column justify-content-center align-items-center"
    >
      <Form
        className="d-flex flex-column question-form-container"
        onSubmit={handleSubmit}
      >
        <h5 className="question-heading">{currentQuestionData.text}</h5>
        {currentQuestionData.options.map((option) => (
          <Form.Check
            key={option.id}
            type="radio"
            label={option.text}
            name={currentQuestionData.id}
            value={option.id}
            checked={selectedOptions[currentQuestionData.id] === option.id}
            onChange={handleOptionChange}
            className="question-options text-center"
          />
        ))}
        <div className="mt-2 d-flex justify-content-between">
          <Button
            variant="primary"
            size={"lg"}
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          <Button
            variant="primary"
            size={"lg"}
            onClick={handleNextQuestion}
            disabled={currentQuestion === questions.length - 1}
          >
            Next
          </Button>
        </div>
        {currentQuestion === questions.length - 1 && (
          <Button className="mt-2 " size={"lg"} type="submit">
            Submit
          </Button>
        )}
      </Form>
    </Container>
  );
}

export default Quiz;
