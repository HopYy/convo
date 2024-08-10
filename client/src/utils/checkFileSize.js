export const checkFileSize = (file) => {
    if (file.size > 10 * 1024 * 1024) {
      return "Please upload an image that is less than 10MB in size"
    }

    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/jpg"
    ) {
      return "Please upload an image with one of the following formats: JPEG, PNG, JPG."
    }

    return null
}