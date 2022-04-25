import Input from "./Input";

export default function Field({
  component: Component = Input,
  id,
  label,
  optional = false,
  ...otherProps
}) {
  return (
    <fieldset className="flex flex-col items-stretch justify-start gap-1">
      <label
        htmlFor={id}
        className="flex flex-row items-baseline justify-start gap-2"
      >
        <span className="font-medium text-xs uppercase">{label}</span>
        {optional ? (
          <span className="text-xs text-neutral-400">(Optional)</span>
        ) : null}
      </label>
      <Component id={id} {...otherProps} />
    </fieldset>
  );
}
