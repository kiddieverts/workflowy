import { useState } from 'react';
import StepTemplate from "./StepTemplate";

type SelectNameProps = { onContinue: (workflowName: string) => void; };

const SelectName = ({ onContinue }: SelectNameProps) => {
  const [workflowName, setWorkflowName] = useState('');

  const handleInputChange = (e) => {
    setWorkflowName(e.target.value);
  };

  return (
    <StepTemplate question="Workflow name" onContinue={() => onContinue(workflowName)}>
      <div className="p-4">
        <input
          type="text"
          autoFocus
          value={workflowName}
          onChange={handleInputChange}
          placeholder="Enter workflow name"
          className="border-2 h-12 p-2 w-full rounded-md"
        />
      </div>
    </StepTemplate>
  );
}

export default SelectName;
