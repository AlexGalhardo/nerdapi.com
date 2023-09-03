export default function Button({ children, ...props }){
  return (
    <button {...props} className="fs-4 button mb-3 w-100 btn btn-outline-success btn-lg btn-block login-btn fw-bold">
      {children}
    </button>
  );
};
