import React, { ReactNode } from 'react';

type StepTemplateProps = {
  onContinue: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  question: string;
  children: ReactNode;
};

const StepTemplate: React.FC<StepTemplateProps> = ({ onContinue, question, children }) => {
  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="p-6 max-w-3xl w-full">
        <div className="questionnaire active" id="question1">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">{question}</h2>
          <div className="bg-white shadow-lg rounded-lg my-4">
            <div className="relative">
              {children}
            </div>
          </div>
          <div>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-200"
              onClick={onContinue}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StepTemplate;
