import React, { useState } from 'react';
import StepTemplate from './StepTemplate';
import BoxWithCheckbox from '~/components/BoxWithCheckbox';

type SelectStockProps = {
  onContinue: (selectedProducts: string[]) => void;
};

const SelectStock: React.FC<SelectStockProps> = ({ onContinue }) => {
  const [products, setProducts] = useState<string[]>([]);

  const handleCheckboxChange = (product: string) => {
    setProducts(prevProducts =>
      prevProducts.includes(product)
        ? prevProducts.filter(p => p !== product)
        : [...prevProducts, product]
    );
  };

  return (
    <StepTemplate onContinue={() => onContinue(products)} question="Select products">
      <div className="relative p-4">
        <BoxWithCheckbox
          text="Product A"
          checked={products.includes("Product A")}
          onChange={() => handleCheckboxChange("Product A")}
        />
        <BoxWithCheckbox
          text="Product B"
          checked={products.includes("Product B")}
          onChange={() => handleCheckboxChange("Product B")}
        />
      </div>
    </StepTemplate>
  );
};

export default SelectStock;
