import { DetailedHTMLProps, HTMLAttributes, InputHTMLAttributes } from "react";
import { useField, FieldHookConfig, ErrorMessage } from "formik";
interface TextFieldProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

const TextField = ({ ...props }: TextFieldProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);
  return (
    <div className="w-full inline-block">
      <label
        className={`inline-block w-full ${
          meta.touched && meta.error && "border-red-500 border-2"
        }`}
      >
        <input className="input" {...props} {...field} />
      </label>
      <p className="text-red-400 mt-2">
        <ErrorMessage name={field.name} />
      </p>
    </div>
  );
};

export default TextField;
