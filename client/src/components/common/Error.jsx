import { X } from "lucide-react";

const Error = ({ errorMessage, onClick }) => {
  return (
    <div className="max-w-full p-6 m-5 bg-dark-gray rounded-lg text-center relative">
      <h1 className="text-white text-lg font-semibold">{errorMessage}</h1>
      {onClick && (
        <X
          className="cursor-pointer m-2 absolute top-0 right-0"
          size={17}
          color="white"
          onClick={onClick}
        />
      )}
    </div>
  );
};

export default Error;
