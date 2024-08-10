const CardContainer = ({ onClick, children }) => {
  return (
    <div
      className="cursor-pointer px-5 transition-colors hover:bg-dark-gray"
      onClick={onClick}
    >
      <div className="flex items-center py-5 justify-between border-b border-white/10 max-w-full">
        {children}
      </div>
    </div>
  );
};

export default CardContainer;
