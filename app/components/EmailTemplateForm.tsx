import React, { useState } from 'react';
import StepTemplate from './StepTemplate';
import 'react-quill/dist/quill.snow.css';
import HtmlEditor from '~/components/HtmlEditor';

type EmailTemplateFormProps = {
  onContinue: (data: { subject: string; body: string }) => void;
};

const EmailTemplateForm: React.FC<EmailTemplateFormProps> = ({ onContinue }) => {
  const [subject, setSubject] = useState<string>('');
  const [body, setBody] = useState<string>('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onContinue({ subject, body });
  };

  return (
    <StepTemplate question="Create an email template" onContinue={e => handleSubmit(e)}>
      <form className="p-8" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="subject">
            Subject:
          </label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="block w-full bg-white border hover:border-gray-500 px-4 py-2 shadow leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="body">
            Body:
          </label>
          <HtmlEditor value={body} onChange={setBody} />
        </div>
      </form>
    </StepTemplate>
  );
};

export default EmailTemplateForm;
