import "./Input.css";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const Input = ({
  value,
  onChange,
  placeholder,
}: InputProps) => {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      className="input-ui-component"
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
