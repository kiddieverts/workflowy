import React, { useState, ChangeEvent } from "react";
import StepTemplate from "./StepTemplate";

type SelectTriggerProps = {
  onContinue: (triggerType: string) => void;
};

const SelectTrigger: React.FC<SelectTriggerProps> = ({ onContinue }) => {
  const [triggerType, setTriggerType] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => setTriggerType(event.target.value);

  return (
    <StepTemplate onContinue={() => onContinue(triggerType)} question="Select a trigger for the workflow">
      <div className="relative">
        <select
          value={triggerType}
          onChange={handleChange}
          className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select an option</option>
          <option value="APPOINTMENT_BOOKED">When an appointment is booked</option>
          <option value="TIME_BEFORE_APPOINTMENT">Time interval before an appointment</option>
          <option value="TIME_AFTER_APPOINTMENT">Time interval after an appointment</option>
          <option value="NEW_CUSTOMER">New customer is created</option>
          <option value="TRANSACTION_CREATED">Transaction is created</option>
          <option value="STOCK_LOW">Stock is low</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M7 10l5 5 5-5H7z" />
          </svg>
        </div>
      </div>
    </StepTemplate>
  );
};

export default SelectTrigger;
