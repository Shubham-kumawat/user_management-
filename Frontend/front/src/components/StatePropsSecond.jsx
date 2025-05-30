export default function StatePropsSecond({ title, description, button }) {
  return (
    <div className="text-white">
      <h1>{title}</h1>
      <div>{description}</div>
      <button>{button}</button>
    </div>
  );
}
