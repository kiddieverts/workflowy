import React from "react";

type BoxWithCheckboxProps = {
  text: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const BoxWithCheckbox: React.FC<BoxWithCheckboxProps> = ({ text, checked, onChange }) => {
  return (
    <div className="flex items-center my-2 border rounded p-4 hover:bg-gray-100">
      <input
        type="checkbox"
        className="form-checkbox h-5 w-5 text-blue-600"
        checked={checked}
        onChange={onChange}
      />
      <span className="ml-2">{text}</span>
    </div>
  );
};

export default BoxWithCheckbox;
