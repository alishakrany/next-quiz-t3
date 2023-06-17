import React, { useEffect, useState } from 'react';
import { firestore } from '../Services/firebaseConfig';

const segment = {
  basic: 'basic',
  medium: 'medium',
  advanced: 'advanced',
};

const quiz ={
  "questions": [
    {
      "question": "للا",
      "questionType": "text",
      "answers": [
        "21",
        "32",
        "فف"
      ],
      "correctAnswer": "1",
      "point": "44"
    }
  ],
  "quizTitle": "صثص",
  "quizSynopsis": "ثص"
};

export default quiz;
