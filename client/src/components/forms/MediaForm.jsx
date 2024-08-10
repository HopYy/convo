import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Image, Send } from "lucide-react";
import { PulseLoader } from "react-spinners";

import Modal from "components/common/Modal";
import Error from "components/common/Error";
import useUploadMedia from "hooks/useUploadMedia";
import { checkFileSize } from "utils/checkFileSize";
import {
  CLEAR_ERRORS,
  SEND_MESSAGE_FAIL,
} from "redux store/constants/conversationConstants";

const MediaForm = ({ media, setFormData }) => {
  const dispatch = useDispatch();
  const { loading, error, uploadFile } = useUploadMedia();

  const [openModal, setOpenModal] = useState(false);
  const [file, setFile] = useState(null);

  const uploadSelectedMedia = useCallback(async () => {
    try {
      const uploadedMedia = await uploadFile(file);
      setFormData((prev) => ({
        ...prev,
        body: "",
        media: uploadedMedia,
      }));
    } catch (error) {
      dispatch({
        type: SEND_MESSAGE_FAIL,
        payload: error.message,
      });
    }
  }, [file, dispatch, setFormData, uploadFile]);

  const clearMedia = () => {
    setFormData((prev) => ({
      ...prev,
      body: "",
      media: null,
    }));
  };

  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  const handleMedia = async (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const fileSizeError = checkFileSize(selectedFile);
      if (fileSizeError) {
        dispatch({
          type: SEND_MESSAGE_FAIL,
          payload: fileSizeError,
        });
        return;
      }

      setFile(selectedFile);
    }
  };

  useEffect(() => {
    setOpenModal(media ? true : false);
  }, [media]);

  useEffect(() => {
    if (file) {
      uploadSelectedMedia();
    }
  }, [file]);

  return (
    <>
      <Modal open={openModal} onClose={clearMedia}>
        <input
          type="file"
          id="media"
          className="hidden"
          onChange={handleMedia}
        />
        <div className="flex flex-wrap justify-center gap-2 max-h-[80vh] overflow-y-auto overflow-x-hidden">
          {media && (
            <div className="w-52 h-52 rounded-lg overflow-hidden flex justify-center items-center">
              {loading && <PulseLoader color="white" />}
              {!loading && (
                <img
                  src={media}
                  className="object-cover object-center w-full h-full"
                  alt="Media"
                  loading="lazy"
                />
              )}
            </div>
          )}
        </div>
        <div className="flex justify-center mt-3 pt-3 pl-3 border-t-2 border-light-gray">
          <button type="submit" disabled={loading}>
            <Send color="#258c60" />
          </button>
        </div>
      </Modal>
      <label
        htmlFor="media"
        className={`cursor-pointer ${
          loading && "pointer-events-none opacity-50"
        }`}
      >
        <Image color="#c3c5ca" />
      </label>
      {error && <Error errorMessage={error} onClick={clearErrors} />}
    </>
  );
};

export default MediaForm;
