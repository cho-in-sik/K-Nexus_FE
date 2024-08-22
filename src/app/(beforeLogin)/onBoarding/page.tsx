'use client';

import { useState } from 'react';

const onBoardingData = [
  {
    id: 1,
    title: 'What is your Korean level?',
    content: [
      'first time to learn Korean',
      'Beginner(I know the letters and words)',
      'Intermediate (for simple conversations)',
      'Advanced(I want to study more conversation)',
    ],
  },
  {
    id: 2,
    title: 'Why do you want to learn Korean?',
    content: ['travel', 'work', 'culture', 'friends'],
  },
  { id: 3, title: 'How old are you?', content: ['10s', '20s', '30s', 'up 40'] },
];

export default function Page() {
  const [step, setStep] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const handleNext = () => {
    setStep(step + 1);
    setDisabled(true);
  };

  console.log(selectedValue);
  return (
    <div className="h-screen flex justify-center items-center">
      {/* <div className="flex justify-center items-center">
        <div className="flex flex-col justify-center items-center text-lg">
          <h1>Hi!</h1>
          <h1>Kolang will help you!</h1>
        </div>
      </div> */}
      <div className="flex-auto text-lg ">
        <h1 className="mb-8 leading-6">{onBoardingData[0].title}</h1>
        <div className="flex flex-col gap-2 mb-10">
          {onBoardingData[0].content.map((item, i) => (
            <button
              key={i}
              className="w-full bg-[#F5F5F6] py-3 rounded-lg border-[#E7E9EC] border-2 text-sm font-medium"
              onClick={(e) => {
                setSelectedValue(e.currentTarget.innerText);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full bottom-0 absolute px-5" onClick={handleNext}>
        <button
          disabled={disabled}
          className={`w-full py-4 text-white mb-10 rounded-lg ${
            disabled ? 'bg-[#CACACA]' : 'bg-[#2771D0]'
          }`}
        >
          Start
        </button>
      </div>
    </div>
  );
}
