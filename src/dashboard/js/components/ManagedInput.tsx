import React, { useCallback, useEffect, useRef, useState } from 'react';

type ManagedInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const ManagedInput: React.FC<ManagedInputProps> = props => {
  const [internalValue, setInternalValue] = useState(props.value);
  const previousValue = useRef(props.value);
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(event.target.value);
  }, []);

  useEffect(() => {
    if (previousValue.current !== props.value) {
      setInternalValue(props.value);

      previousValue.current = props.value;
    }
  }, [props.value]);
  
  return (
    <input
      {...props}
      value={internalValue}
      onChange={handleChange}
      onBlur={props.onChange}
    />
  )
};