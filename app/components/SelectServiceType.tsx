import React, { useState } from 'react';
import StepTemplate from './StepTemplate';
import BoxWithCheckbox from '~/components/BoxWithCheckbox';

type EventType = {
  id: string;
  title: string;
};

type SelectServiceTypeProps = {
  onContinue: (serviceTypes: string[]) => void;
  eventTypes: EventType[];
};

const SelectServiceType: React.FC<SelectServiceTypeProps> = ({ onContinue, eventTypes }) => {
  const [serviceTypes, setServiceTypes] = useState<string[]>([]);

  const handleCheckboxChange = (type: string) => {
    setServiceTypes(prevTypes =>
      prevTypes.includes(type)
        ? prevTypes.filter(t => t !== type)
        : [...prevTypes, type]
    );
  };

  return (
    <StepTemplate onContinue={() => onContinue(serviceTypes)} question="Select service types">
      <div className="relative p-4">
        {eventTypes.map(type => (
          <BoxWithCheckbox
            key={type.id}
            text={type.title}
            checked={serviceTypes.includes(type.id)}
            onChange={() => handleCheckboxChange(type.id)}
          />
        ))}
      </div>
    </StepTemplate>
  );
};

export default SelectServiceType;
