import React, { useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import './PopupQuiz.scss';
import useFetch from '../../../hooks/useFetch';
import { formatTime } from '../../../utils/functionCusom/functionCusom';

function PopupQuiz({ classSelect, changeDisplayQuiz }) {
    const [questions, setQuestions] = useState([]);
    const [statusDoing, setStatusDoing] = useState(true);
    const [point, setPoint] = useState(0);

    // Những câu hỏi
    const { listData: quiz, loading } = useFetch(
        `http://localhost:8080/student/class/quiz?classCode=20230001&lessionNumber=17`,
    );

    console.log(classSelect);

    useEffect(() => {
        if (quiz.infoQuiz) {
            setQuestions(JSON.parse(quiz.infoQuiz));
        }
    }, [quiz]);

    // Đáp án mẫu
    const answerOptions = ['A', 'B', 'C', 'D'];
    const [selectedAnswers, setSelectedAnswers] = useState([]);

    const handleAnswerChange = (questionId, answerIndex) => {
        const updatedSelectedAnswers = selectedAnswers.map((selectedAnswer) => {
            if (selectedAnswer.questionId === questionId) {
                return { ...selectedAnswer, answerIndex };
            }
            return selectedAnswer;
        });

        // Nếu câu hỏi chưa có đáp án được chọn, thêm đáp án mới vào selectedAnswers
        if (!selectedAnswers.some((selectedAnswer) => selectedAnswer.questionId === questionId)) {
            updatedSelectedAnswers.push({ questionId, answerIndex });
        }

        setSelectedAnswers(updatedSelectedAnswers);
    };

    const handleSubmitQuiz = () => {
        // Xử lý logic khi nộp bài kiểm tra
        let totalCorrectAnswer = 0;

        for (let i = 0; i < questions.length; i++) {
            try {
                if (questions[i].correctAnswer === selectedAnswers[i].answerIndex) {
                    totalCorrectAnswer++;
                }
            } catch (error) {
                continue;
            }
        }

        setPoint(totalCorrectAnswer);
        setStatusDoing(false);
    };

    return (
        <div className="popup-quiz">
            <div className="container">
                <AiOutlineCloseCircle className="icon" onClick={changeDisplayQuiz} />
                <div className="time">
                    Thời gian làm bài từ: {formatTime(quiz.timeStart)} - {formatTime(quiz.timeEnd)}
                </div>
                {statusDoing ? (
                    <>
                        <div className="items">
                            {questions.length !== 0 &&
                                questions.map((question) => (
                                    <div key={question.id}>
                                        <h3>
                                            {question.id}. {question.question}
                                        </h3>
                                        <ul>
                                            {question.answers.map((answer, index) => (
                                                <li key={index}>
                                                    <input
                                                        type="radio"
                                                        name={`question-${question.id}`}
                                                        checked={selectedAnswers.some(
                                                            (selectedAnswer) =>
                                                                selectedAnswer.questionId === question.id &&
                                                                selectedAnswer.answerIndex === index,
                                                        )}
                                                        onChange={() => handleAnswerChange(question.id, index)}
                                                    />
                                                    <span>{answerOptions[index]}</span> {answer}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                        </div>
                        <button className="btn-add-question" onClick={handleSubmitQuiz}>
                            Nộp bài
                        </button>
                    </>
                ) : (
                    <>
                        <div className="title-point">Bạn đã hoàn thành kiểm tra</div>
                        <div className="point">Điểm số của bạn là {point}</div>
                        <button className="btn-add-question" onClick={changeDisplayQuiz}>
                            Xác nhận
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default PopupQuiz;
