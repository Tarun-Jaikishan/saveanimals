export default function Button({
  name,
  onClick = () => {},
  customStyle,
  buttonType = "button",
}) {
  return (
    <button
      type={buttonType}
      onClick={onClick}
      className={`${customStyle} hover:bg-blue-950 border-2 border-blue-950 text-blue-950 hover:text-white px-10 py-1.5 duration-300 rounded-lg font-semibold`}
    >
      {name}
    </button>
  );
}
