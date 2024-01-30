import { CheckboxProps } from '@/types/element';

const Checkbox = ({ _label, ...rest }: CheckboxProps) => {
  return (
    <label htmlFor="checkbox">
      <input id="checkbox" type="checkbox" {...rest} />
      {_label}
    </label>
  );
};

export default Checkbox;
