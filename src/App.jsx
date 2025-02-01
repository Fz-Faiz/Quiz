import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { useThemeStore } from "./store/useThemeStore";
import { Checkmark } from 'react-checkmark'

function App() {
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [page, setPage] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [questionNumber, setQuestionNumber] = useState(0)

  const{theme} = useThemeStore();

  useEffect(() => {
    axios
      .get("/api")
      .then((response) => {
        console.log(response.data);
        setQuestions(response.data.questions);
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false)
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    )
  }

  const handleOptionSelect = (questionId, optionId) => {
    const updatedSelection = [...selectedOptions];
    updatedSelection[questionId] = optionId;
    setQuestionNumber(questionId++)
    setSelectedOptions(updatedSelection);
  };

  const handleSubmit = () => {
    setQuizCompleted(true);
  };

  const handleNext = (index) => {
    const qn = index;
    setQuestionNumber(qn+1)
    
    let increasedByOne = index + 1;
    if (index === questions.length - 1) {
      increasedByOne = questions.length - 1;
    }
    setPage(increasedByOne);
  };

  const handlePrevious = (index) => {

    let decreasedByOne = 0;
    if (index > 0) {
      decreasedByOne = index - 1;
    }
    setPage(decreasedByOne);
  };

  const handleCorrectAnswer = () => {
    setCorrectAnswer(correctAnswer+1)

  }

  return (
    <div className="h-screen bg-gray-300" data-theme={theme}>
      <Navbar/>
      <div className="min-h-screen flex justify-center items-center bg-base-100/70 p-4">
      {!quizCompleted ? (
        <div className="w-full max-w-2xl bg-base-100/60 shadow-md p-8 rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Question: {page+1}</h1>
          <div className="text-lg mb-4">
            {questions.map((question, index) => (
              <div
                key={question.id}
                className={page === index ? "block" : "hidden"}
              >
                <div className="mb-4">
                  <p className="font-semibold">{question.description}</p>
                  <ul className="space-y-2">
                    {question.options.map((option,index) => (
                      <li
                       
                        key={option.id}
                        onClick={() => {
                          handleOptionSelect(index, option.id);
                          if(option.is_correct) handleCorrectAnswer()
                          
                        }}
                        className={`cursor-pointer p-2 rounded-md border transition-all ${
                          selectedOptions[index] === option.id
                            ? "bg-blue-500 text-white"
                            : "hover:bg-gray-200"
                        }`}
                      >
                        {index+1}: {option.description}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between mt-4">
                  {index > 0 && (
                    <button
                      onClick={() => {
                        handlePrevious(index)
                      }}
                      className="px-4 py-2 bg-base-300 rounded-lg hover:bg-gray-400"
                    >
                      Previous
                    </button>
                  )}
                  {index < questions.length - 1 ? (
                    <button
                      onClick={() => handleNext(index)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full max-w-2xl bg-base-100/60 shadow-md p-8 rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Quiz Summary</h1>
          <p className="mb-4">
            You answered {correctAnswer} out of {questions.length} questions
            correctly.
          </p>
          <Checkmark size='128px' color='blue' />
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Retry Quiz
          </button>
        </div>
      )}
    </div>

    </div>
  );
}

export default App;
