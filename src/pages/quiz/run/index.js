// ======================Working============
import React, { useState, useEffect } from 'react';
import { firestore } from '../../../server/Services/firebaseConfig';
import Quiz from '../../../Components/lib/Quiz';
import { useRouter } from 'next/router';

const QuizRunner = ({}) => {
  const router = useRouter();
  const CollectionID = router.query.CollectionID;
  const QuizID = router.query.QuizID;
  const [quizData, setQuizData] = useState(null);
  const [quizNotFound, setQuizNotFound] = useState(false);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const quizDoc = await firestore.collection(CollectionID).doc(QuizID).get();
        const quizData = quizDoc.data();
        if (quizData) {
          setQuizData(quizData);
        } else {
          setQuizNotFound(true);
        }
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
      {quizData ? (
        <Quiz
          quiz={quizData}
          shuffle
          onQuestionSubmit={(obj) => console.log('user question results:', obj)}
          onComplete={setResult}
          disableSynopsis
        />
      ) : (
        quizNotFound ? (
          <p>الاختبار غير موجود</p>
        ) : (
          <p>جارٍ تحميل الاختبار...</p>
        )
      )}
    </div>
  );
};

export default QuizRunner;


//=============Not Working=============
// import React, { useState, useEffect } from 'react';
// import { firestore } from '../Services/firebaseConfig';
// import Quiz from './lib/Quiz';
// import { useRouter } from 'next/router';

// const QuizRunner = ({}) => {
//   const router = useRouter();
//   const CollectionID = router.query.CollectionID;
//   const QuizID = router.query.QuizID;
//   const [quizData, setQuizData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchQuizData = async () => {
//       try {
//         const quizDoc = await firestore.collection(CollectionID).doc(QuizID).get();
//         const quizData = quizDoc.data();
//         if (quizData) {
//           setQuizData(quizData);
//           setLoading(false);
//         } else {
//           setLoading(false);
//           setError('الاختبار غير موجود');
//         }
//       } catch (error) {
//         console.error('حدث خطأ أثناء استرجاع بيانات الاختبار:', error);
//         setLoading(false);
//         setError('حدثت مشكلة في الخادم');
//       }
//     };

//     fetchQuizData();
//   }, [CollectionID, QuizID]);

//   const setResult = (values) => {
//     console.log(JSON.stringify(values, null, 2));
//   };

//   return (
//     <div className="App">
//       {loading ? (
//         <p>جارٍ تحميل الاختبار...</p>
//       ) : error ? (
//         <p>{error}</p>
//       ) : quizData ?  (
//         <Quiz
//           quiz={quizData}
//           shuffle
//           onQuestionSubmit={(obj) => console.log('user question results:', obj)}
//           onComplete={setResult}
//           disableSynopsis
//         />
//       )}
//     </div>
//   );
// };

// export default QuizRunner;