import React, { useState } from "react";
import StepTemplate from "./StepTemplate";
import { AtSign, MessageSquare, Webhook, Blocks } from 'lucide-react';

const allActions = [
  { id: 'email', icon: <AtSign />, text: "Send custom email" },
  { id: 'sms', icon: <MessageSquare />, text: "Send SMS message" },
  { id: 'zapier', icon: (<img src="https://cdn.iconscout.com/icon/free/png-256/zapier-282557.png" alt="Zapier logo" className="h-10 w-10" />), text: "Trigger a Zapier action" },
  { id: 'google', icon: (<img src="https://developers.google.com/static/identity/images/branding_guideline_sample_lt_rd_sl.svg" alt="Google Hangout logo" className="h-10 w-10" />), text: "Create a Google Hangout" },
  { id: 'zoom', icon: (<img src="https://logowik.com/content/uploads/images/zoom-icon8997.jpg" alt="Zoom logo" className="h-10 w-15" />), text: "Create a Zoom meeting" },
  { id: 'webhook', icon: <Webhook />, text: "Trigger custom webhook" },
  { id: 'survey', icon: <Blocks />, text: "Send NPS survey" },
  { id: 'mailchimp', icon: <Blocks />, text: "Add to mailchimp" },
  { id: 'klaviyo', icon: <Blocks />, text: "Add to Klaviyo" },
  { id: 'payday', icon: <Blocks />, text: "Send invoice to Payday" },
];

type ActionsProps = {
  onContinue: (selectedAction: string | null) => void;
  actions: string[];
};

const Actions: React.FC<ActionsProps> = ({ onContinue, actions }) => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const handleActionClick = (action: string) => setSelectedAction(action);
  const availableActions = allActions.filter(x => actions.includes(x.id));

  return (
    <StepTemplate question="Choose an action" onContinue={() => onContinue(selectedAction)}>
      <div className="grid grid-cols-3 gap-4 p-8">
        {availableActions.map((action, index) => (
          <div
            key={index}
            className={`border hover:bg-gray-100 transition border-gray-300 rounded-lg ${selectedAction === action.id ? 'border-2 border-gray-700' : ''}`}
            onClick={() => handleActionClick(action.id)}
          >
            <ActionButton icon={action.icon} text={action.text} />
          </div>
        ))}
      </div>
    </StepTemplate>
  );
};

type ActionButtonProps = {
  icon: React.ReactNode;
  text: string;
};

const ActionButton: React.FC<ActionButtonProps> = ({ icon, text }) => (
  <div className="flex flex-col items-center justify-center p-4 w-25 h-[150px] cursor-pointer">
    <div className="text-gray-700 my-4">{icon}</div>
    <div className="text-gray-700 text-center text-sm">{text}</div>
  </div>
);

export default Actions;
