export default function Input({ label, type, name, value, onChange, error, onBlur, placeholder }) {
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
