import React, { useEffect, useState } from 'react';
import { firestore } from '../Services/firebaseConfig';
import Quiz from 'react-quiz-component';


const QuizDetails = ({ quizId }) => {
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    // استرجاع الاختبار من قاعدة البيانات Firebase
    const fetchQuiz = async () => {
      try {
        const docRef = await firestore.collection('quizzes').doc('4eeOkps87FFAIbdXumMr').get();
        if (docRef.exists) {
          setQuiz(docRef.data());
        } else {
          console.log('الاختبار غير موجود', docRef.data());
        }
      } catch (error) {
        console.error('حدث خطأ ما أثناء استرجاع الاختبار:', error);
      }
    };

    fetchQuiz();
  }, [quizId]);

  if (!quiz) {
    return <p>جارٍ التحميل...</p>;
  }

  // قم بتعديل الجزء التالي وفقًا لهيكل البيانات المخصص للاختبار في قاعدة البيانات
  const {
    category,
    quizTitle,
    quizSynopsis,
    questions
  } = quiz;

 return (
    <div>
             	    <Quiz
      quiz={quiz}
      shuffle
      // showInstantFeedback
      // continueTillCorrect
      // onComplete={setQuizResult}
      onQuestionSubmit={(obj) => console.log('user question results:', obj)}
      disableSynopsis
      // revealAnswerOnSubmit
      // allowNavigation
    />


    </div>
  ); 
};

export default QuizDetails;
