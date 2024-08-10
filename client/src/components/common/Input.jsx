import React from "react";

const Input = React.forwardRef(({ errorMessage, className, ...props }, ref) => {
  return (
    <>
      <input
        ref={ref}
        className={`w-full bg-dark-gray outline-none px-4 py-2 rounded-md text-sm text-white font-medium ${
          className && className
        }`}
        {...props}
      />
      {errorMessage && (
        <span className="text-red-500 text-sm">{errorMessage}</span>
      )}
    </>
  );
});
export default Input;
