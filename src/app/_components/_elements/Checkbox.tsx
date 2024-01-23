import { InputHTMLAttributes } from 'react';

interface Prop extends InputHTMLAttributes<HTMLInputElement> {
  _label?: string;
  _isChecked: boolean;
  _onChange: () => void;
}

const Checkbox = ({ _label, _isChecked, _onChange, ...rest }: Prop) => {
  return (
    <label htmlFor="checkbox">
      <input id="checkbox" type="checkbox" checked={_isChecked} onChange={_onChange} {...rest} />
      {_label}
    </label>
  );
};

export default Checkbox;
