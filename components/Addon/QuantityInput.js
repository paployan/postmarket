import { useState } from 'react';
import { number } from 'prop-types';
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";

const QuantityInput = ({ min = 1, max, value, onQuantityChange }) => {
  const [quantity, setQuantity] = useState({ value });
  const increment = () => {
    // if ((quantity.value + 1) <= max) {
    setQuantity({ value: quantity.value + 1, });
    onQuantityChange(quantity.value + 1);
    // }
  }

  const decrement = () => {
    const value = ((quantity.value - 1) === 0) ? 1 : quantity.value - 1;
    setQuantity({ value });
    onQuantityChange(value);
  }

  return (
    <div className="quantity-control">
      <button type="button"
        onClick={decrement}
        className="quantity-btn"
        data-quantity-minus="">
        <AiFillMinusCircle />
      </button>
      <input
        type="number"
        className="quantity-input"
        data-quantity-target=""
        value={quantity.value}
        step="1"
        min={min}
        max={max}
        name="quantity"
        readOnly
      />
      <button
        type="button"
        onClick={increment}
        className="quantity-btn"
        >
        <AiFillPlusCircle />
      </button>
    </div>
  );
};

QuantityInput.propTypes = {
  min: number,
  max: number,
  value: number,
};

QuantityInput.defaultProps = {
  value: 1,
};

export default QuantityInput;
