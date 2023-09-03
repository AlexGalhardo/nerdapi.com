import { ChangeEventHandler, FocusEventHandler } from "react"

interface FormInput {
	label: string 
	type: string 
	name: string 
	value: string 
	onChange: ChangeEventHandler<HTMLInputElement> 
	error: string | null
	onBlur: FocusEventHandler<HTMLInputElement> 
	placeholder: string
}

export default function Input({ label, type, name, value, onChange, error, onBlur, placeholder }: FormInput) {
  return (
    <div className="">
		<label htmlFor={name} className="text-muted">
			{label}
		</label>
      	<input
        	id={name}
        	name={name}
			className="fs-4 form-control"
			type={type}
			value={value}
			onChange={onChange}
			onBlur={onBlur}
			placeholder={placeholder}
			required
      	/>
      	{error && <p className="alert alert-danger fs-4 fw-bold text-center">{error}</p>}
    </div>
  );
};
