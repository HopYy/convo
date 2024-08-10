import { useCallback, useEffect, useState } from "react";
import { Image, Trash2 } from "lucide-react";
import { PulseLoader } from "react-spinners";

import Error from "components/common/Error";
import useUploadMedia from "hooks/useUploadMedia";
import { checkFileSize } from "utils/checkFileSize";

const AvatarUploadForm = ({ avatar, setAvatar }) => {
  const { loading, error, uploadFile } = useUploadMedia();

  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const uploadSelectedFile = useCallback(async () => {
    try {
      const uploadedAvatar = await uploadFile(file);
      setAvatar(uploadedAvatar);
    } catch (error) {
      setAvatar("");
      setFile(null);
      setErrorMessage(
        error.response.data.error.message || "Something went wrong..."
      );
    }
  }, [file]);

  const handleFile = async (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const fileSizeError = checkFileSize(selectedFile);
      if (fileSizeError) {
        setErrorMessage(fileSizeError);
        return;
      }

      setFile(selectedFile);
      setErrorMessage(null);
    }
  };

  useEffect(() => {
    if (file) {
      uploadSelectedFile();
    }
  }, [file, uploadSelectedFile]);

  return (
    <>
      <input type="file" id="avatar" className="hidden" onChange={handleFile} />
      <label htmlFor="avatar" className="relative">
        <div className="w-32 h-32 flex flex-col justify-center items-center cursor-pointer rounded-full overflow-hidden bg-dark-gray">
          {loading && <PulseLoader size={8} color="white" />}
          {avatar && !loading && (
            <img
              src={avatar}
              className="object-cover object-center w-full h-full"
              alt="avatar"
              loading="lazy"
            />
          )}
          {!file && !avatar && !loading && (
            <>
              <Image size={35} color="rgb(156 163 175)" />
              <h1 className="text-md text-gray-400 font-semibold">
                Add avatar
              </h1>
            </>
          )}
        </div>
        {(file || avatar) && (
          <div
            className="p-3 rounded-full absolute top-0 right-0 bg-light-gray cursor-pointer"
            onClick={(event) => {
              event.preventDefault();
              setAvatar("");
              setFile(null);
            }}
          >
            <Trash2 color="white" size={18} />
          </div>
        )}
      </label>
      {(error || errorMessage) && (
        <Error errorMessage={error || errorMessage} />
      )}
    </>
  );
};

export default AvatarUploadForm;
