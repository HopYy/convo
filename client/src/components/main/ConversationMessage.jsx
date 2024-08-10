import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ChevronDown, X } from "lucide-react";

import ConversationModal from "components/modals/ConversationModal";

const ConversationMessage = ({ message }) => {
  const user = useSelector((state) => state.auth.user);

  const [hover, setHover] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openImage, setOpenImage] = useState(false);

  const isUserSender = message.sender === user._id;

  useEffect(() => {
    let timer;
    if (hover && isUserSender) {
      timer = setTimeout(() => {
        setShowArrow(true);
      }, 200);
    } else {
      timer = setTimeout(() => {
        setShowArrow(false);
      }, 300);
    }

    return () => clearTimeout(timer);
  }, [hover, isUserSender]);

  return (
    <div
      className={`py-1.5 px-3 my-0.5 rounded-lg w-fit relative lg:max-w-xl
      ${
        isUserSender
          ? "bg-main-green rounded-tr-none"
          : "bg-light-gray rounded-tl-none"
      }`}
      onMouseEnter={() => {
        if (isUserSender) {
          setHover(true);
        }
      }}
      onMouseLeave={() => {
        if (isUserSender) {
          setHover(false);
        }
      }}
    >
      {message.media && (
        <div
          className={`rounded-lg overflow-hidden ${
            openImage
              ? "w-screen h-screen fixed z-50 inset-0 bg-light-gray"
              : "w-52 h-52"
          }`}
          onClick={() => {
            setOpenImage(true);
          }}
        >
          <img
            src={message.media}
            className={`object-center w-full h-full ${
              openImage ? "object-contain" : "object-cover cursor-pointer"
            }`}
            alt="Media"
            loading="lazy"
          />
          {openImage && (
            <div
              className="bg-dark-gray rounded-full fixed top-0 right-2 m-2 p-1 cursor-pointer"
              onClick={(event) => {
                event.stopPropagation();
                setOpenImage(false);
              }}
            >
              <X color="white" size={30} />
            </div>
          )}
        </div>
      )}
      {message.body && <p className="text-white break-words">{message.body}</p>}
      {(showArrow || openModal) && (
        <div
          className="absolute top-1/2 right-full transform -translate-x-1/2 -translate-y-1/2 text-nowrap overflow-hidden border border-white rounded-full p-0.5 cursor-pointer hover:bg-light-gray"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          <ChevronDown color="white" size={12} />
        </div>
      )}
      <ConversationModal
        message={message}
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
      />
    </div>
  );
};

export default ConversationMessage;
