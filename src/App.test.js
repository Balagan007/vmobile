import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


<DashBoard setSelectedClass={setSelectedClass} classList={classList} selectedClass={selectedClass}
        selectedQuiz={selectedQuiz} setSelectedQuiz={setSelectedQuiz} quizes={quizes} exams={exams}
        selectedExam={selectedExam} setSelectedExam={setSelectedExam} />
