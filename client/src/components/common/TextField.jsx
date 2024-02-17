export default function TextField({
  type = "text",
  customStyle,
  onChange = () => {},
  value,
  name,
  ...props
}) {
  return (
    <input
      type={type}
      className={`${customStyle} rounded-lg py-1.5 px-3 border-2 outline-none`}
      onChange={onChange}
      value={value}
      name={name}
      {...props}
    />
  );
}
