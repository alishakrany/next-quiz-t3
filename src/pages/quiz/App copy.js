import React, { useState, useEffect } from 'react';
import Form from './Components';
import QuizDetails from './Components/test'
import QuizList from './Components/menu'
import './App.css'

const App = () => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  useEffect(() => {
    // يتم تحديث قيمة المكون Form عند تغيير selectedQuiz
    // هنا يمكنك استدعاء أي وظيفة أخرى تحتوي على العمليات المطلوبة لتحديث المحتوى
    updateFormContent();
  }, [selectedQuiz]);

  const updateFormContent = () => {
    // أي عمليات تحتاجها لتحديث المحتوى في المكون Form
    // يمكنك استدعاء أي دوال أو تعديل القيمة الممررة لـ Form
  };

  return (
    <div className="App">
      <Form selectedQuiz={selectedQuiz} />
      <QuizDetails />
      <QuizList setSelectedQuiz={setSelectedQuiz} />
    </div>
  );
};

export default App;
