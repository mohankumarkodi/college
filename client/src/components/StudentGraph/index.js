import { Container } from "react-bootstrap";
import "./index.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    test: "Test 1",
    PassedStudents: 10,
  },
  {
    test: "Test 2",
    PassedStudents: 30,
  },
  {
    test: "Test 3",
    PassedStudents: 5,
  },
  {
    test: "Test 4",
    PassedStudents: 12,
  },
  {
    test: "Test 5",
    PassedStudents: 25,
  },
];

const Charts = () => {
  const DataFormatter = (number) => {
    return number.toString();
  };

  return (
    <Container fluid className="charts-bg-container d-flex flex-row justify-content-center">
      <ResponsiveContainer
        width="20%"
        height={500}
      >
        <BarChart
          data={data}
          margin={{
            top: 10,
          }}
        >
          <XAxis
            dataKey="test"
            tick={{
              stroke: "gray",
              strokeWidth: 1,
            }}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{
              stroke: "gray",
              strokeWidth: 0,
            }}
          />
          <Legend
            wrapperStyle={{
              padding: 10,
            }}
          />
          <Bar
            dataKey="PassedStudents"
            name="TESTS"
            fill="#a1f7ae"
            barSize="20%"
          />
        </BarChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default Charts;
