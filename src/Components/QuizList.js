// import React, { useEffect, useState } from 'react';
// import { firestore } from '../Services/firebaseConfig';
// import Link from 'next/link';

// const QuizList = () => {
//   const [collections, setCollections] = useState([]);
//   const [selectedCollection, setSelectedCollection] = useState('');
//   const [selectedQuiz, setSelectedQuiz] = useState('');
//   const [quizzes, setQuizzes] = useState([]);
//   const [quizData, setQuizData] = useState(null);

//   useEffect(() => {
//     const fetchCollections = async () => {
//       try {
//         const collectionSnapshot = await firestore.collection('collections').get();
//         const collectionList = collectionSnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setCollections(collectionList);
//       } catch (error) {
//         console.error('حدث خطأ أثناء استرجاع المجموعات:', error);
//       }
//     };

//     fetchCollections();
//   }, []);

//   useEffect(() => {
//     const fetchQuizzes = async () => {
//       if (selectedCollection) {
//         try {
//           const quizCollection = await firestore.collection(selectedCollection).get();
//           const quizList = quizCollection.docs.map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//           }));
//           setQuizzes(quizList);
//         } catch (error) {
//           console.error('حدث خطأ أثناء استرجاع الاختبارات:', error);
//         }
//       }
//     };

//     fetchQuizzes();
//   }, [selectedCollection]);

//   useEffect(() => {
//     const fetchQuizData = async () => {
//       if (selectedQuiz) {
//         try {
//           const quizDoc = await firestore.collection(selectedCollection).doc(`${selectedQuiz}`).get();
//           const quizData = quizDoc.data();
//           setQuizData(quizData);
//         } catch (error) {
//           console.error('حدث خطأ أثناء استرجاع بيانات الاختبار:', error);
//         }
//       }
//     };
  
//     fetchQuizData();
//   }, [selectedCollection, selectedQuiz]);
  

//   const handleCollectionSelect = (collection) => {
//     setSelectedCollection(collection);
//     setSelectedQuiz('');
//   };

//   const handleQuizSelect = (quiz) => {
//     setSelectedQuiz(quiz);
//   };

//   const CollectionID = selectedCollection ;
//   const QuizID = selectedQuiz ;


//   return (
//     <div>
//       <h2>المجموعات</h2>
//       <select value={selectedCollection} onChange={(e) => handleCollectionSelect(e.target.value)}>
//         <option value="">اختر مجموعة</option>
//         {collections.map((collection) => (
//           <option key={collection.id} value={collection.id}>
//             {collection.name}
//           </option>
//         ))}
//       </select>

//       {selectedCollection && (
//         <div>
//           <h2>الاختبارات</h2>
//           <select value={selectedQuiz} onChange={(e) => handleQuizSelect(e.target.value)}>
//             <option value="">اختر اختبار</option>
//             {quizzes.map((quiz) => (
//               <option key={quiz.id} value={quiz.id}>
//                 {quiz.quizTitle}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}
//       {quizData && (
//         <div>
//           {console.log(quizData)}
//            <Link href={`quiz/Components?CollectionID=${CollectionID}&QuizID=${QuizID}`}>
//        الانتقال إلى الصفحة الثان
//       </Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuizList;


import React, { useEffect, useState } from 'react';
import { firestore } from '../server/Services/firebaseConfig';
import Link from 'next/link';

const QuizList = () => {
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState('');
  const [selectedQuiz, setSelectedQuiz] = useState('');
  const [quizzes, setQuizzes] = useState([]);
  const [quizData, setQuizData] = useState(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const collectionSnapshot = await firestore.collection('collections').get();
        const collectionList = collectionSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCollections(collectionList);
      } catch (error) {
        console.error('حدث خطأ أثناء استرجاع المجموعات:', error);
      }
    };

    fetchCollections();
  }, []);

  useEffect(() => {
    const fetchQuizzes = async () => {
      if (selectedCollection) {
        try {
          const quizCollection = await firestore.collection(selectedCollection).get();
          const quizList = quizCollection.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setQuizzes(quizList);
        } catch (error) {
          console.error('حدث خطأ أثناء استرجاع الاختبارات:', error);
        }
      }
    };

    fetchQuizzes();
  }, [selectedCollection]);

  useEffect(() => {
    const fetchQuizData = async () => {
      if (selectedQuiz) {
        try {
          const quizDoc = await firestore.collection(selectedCollection).doc(`${selectedQuiz}`).get();
          const quizData = quizDoc.data();
          setQuizData(quizData);
        } catch (error) {
          console.error('حدث خطأ أثناء استرجاع بيانات الاختبار:', error);
        }
      }
    };

    fetchQuizData();
  }, [selectedCollection, selectedQuiz]);

  const handleCollectionSelect = (collection) => {
    setSelectedCollection(collection);
    setSelectedQuiz('');
  };

  const handleQuizSelect = (quiz) => {
    setSelectedQuiz(quiz);
  };

  const CollectionID = selectedCollection;
  const QuizID = selectedQuiz;

  return (
    <div>
      <h2>المجموعات</h2>
      <select value={selectedCollection} onChange={(e) => handleCollectionSelect(e.target.value)}>
        <option value="">اختر مجموعة</option>
        {collections.map((collection) => (
          <option key={collection.id} value={collection.id}>
            {collection.name}
          </option>
        ))}
      </select>

      {selectedCollection && (
        <div>
          <h2>الاختبارات</h2>
          <select value={selectedQuiz} onChange={(e) => handleQuizSelect(e.target.value)}>
            <option value="">اختر اختبار</option>
            {quizzes.map((quiz) => (
              <option key={quiz.id} value={quiz.id}>
                {quiz.quizTitle}
              </option>
            ))}
          </select>
        </div>
      )}

      {quizData && (
        <div>
          <Link href={`quiz/run?CollectionID=${CollectionID}&QuizID=${QuizID}`} className='btn correct'>
            <span style={' background: #3F51B5;'} className='btn correct'> إنتقال للإختبار</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default QuizList;
