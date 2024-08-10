import { useState } from 'react'
import axios from 'axios'

const useUploadMedia = () => {
  const presentKey = process.env.REACT_APP_PRESENT_KEY
  const cloudName = process.env.REACT_APP_CLOUD_NAME

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const uploadFile = async (file) => {
    setLoading(true)
    setError(null)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', presentKey)
      const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData)
      setLoading(false)
      return data.secure_url
    } catch (error) {
      setError(error.message)
      setLoading(false)
      throw error
    }
  }

  return { loading, error, uploadFile }
}

export default useUploadMedia
