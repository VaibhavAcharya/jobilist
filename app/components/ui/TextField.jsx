import Input from "./Input";

export default function TextField({ id, label, ...otherProps }) {
  return (
    <fieldset className="flex flex-col items-stretch justify-start gap-2">
      <label htmlFor={id} className="font-medium text-xs uppercase text-neutral-400">{label}</label>
      <Input id={id} {...otherProps} />
    </fieldset>
  );
}
