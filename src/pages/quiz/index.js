import React from 'react';
import QuizList from '../../Components/QuizList';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import QuizRunner from '../../Components';

// import './App.css';

const App = () => {
  return (

  //   <Router>
  //   <Switch>
  //     <Route exact path="/" component={QuizList} />
  //     <Route path="/quiz/run" component={QuizRunner} />
  //   </Switch>
  // </Router>
  <div>
    <QuizList/>
    </div>
  );
};

export default App;