export default function TextArea({
  onChange = () => {},
  customStyle,
  value,
  name,
  ...props
}) {
  return (
    <textarea
      className={`${customStyle} rounded-lg py-1.5 px-3 border-2 outline-none h-32`}
      onChange={onChange}
      value={value}
      name={name}
      {...props}
    ></textarea>
  );
}
