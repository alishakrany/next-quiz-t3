import React, { useState, useEffect } from 'react';
import { firestore } from '../Services/firebaseConfig';
import Quiz from './lib/Quiz';
import { useRouter } from 'next/router';


const QuizRunner = ({}) => {

  const router  = useRouter();
  const CollectionID = router.query.CollectionID;
  const QuizID = router.query.QuizID;
  const [quizData, setQuizData] = useState(null);





  useEffect(() => {
    const fetchQuizData = async () => {
        try {
          const quizDoc = await firestore.collection(CollectionID).doc(`${QuizID}`).get();
          const quizData = quizDoc.data();
          setQuizData(quizData);
        } catch (error) {
          console.error('حدث خطأ أثناء استرجاع بيانات الاختبار:', error);
      }
    };
  
    fetchQuizData();
  }, [CollectionID, QuizID]);


  const setResult = (values) => {
    console.log(JSON.stringify(values, null, 2));
  };

  return (
    <div className="App">
      <Quiz
        quiz={quizData}
        shuffle
        onQuestionSubmit={(obj) => console.log('user question results:', obj)}
        onComplete={setResult}
        disableSynopsis
      />
      {console.log(QuizID,CollectionID, quizData)}
    </div>
  );
};

export default QuizRunner;
