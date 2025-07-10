"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useUserContext } from "../../context/UserContext"
import { uploadService } from "../../services/upload.service"
import { photoService } from "../../services/photo.service"
import FileUploaderContent from "./FileUploaderContent"
import CollageMaker from "../photo-collage/CollageMaker"

interface FileUploaderProps {
  open: boolean
  onClose: () => void
  albumId?: number
}

// קומפוננטה ראשית עם הלוגיקה - 80 שורות
const FileUploader: React.FC<FileUploaderProps> = ({ open, onClose, albumId }) => {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [showCollageMaker, setShowCollageMaker] = useState(false)
  const dispatch = useDispatch()
  const { user } = useUserContext()

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null)
      return
    }

    const objectUrl = URL.createObjectURL(file)
    setPreviewUrl(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [file])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setError(null)
      setSuccess(false)
    }
  }

  const handleSaveCollage = (collageDataUrl: string) => {
    uploadFile(collageDataUrl)
    setShowCollageMaker(false)
    setFile(null)
    setPreviewUrl(null)
  }

  const uploadFile = async (collageDataUrl?: string) => {
    if (!file && !collageDataUrl) {
      setError("אנא בחר קובץ להעלאה")
      return
    }

    if (!albumId || !user?.UserId) {
      setError("מזהה אלבום או משתמש חסר")
      return
    }

    setUploading(true)
    setError(null)
    setSuccess(false)

    try {
      let fileToUpload = file
      let fileName = file?.name || "collage.jpg"

      if (collageDataUrl) {
        const response = await fetch(collageDataUrl)
        const blob = await response.blob()
        const uniqueFileName = `collage_${Date.now()}.jpg`
        fileToUpload = new File([blob], uniqueFileName, { type: "image/jpeg" })
        fileName = uniqueFileName
      }

      // שימוש ב-uploadService
      const { uploadUrl, fileUrl } = await uploadService.getPresignedUrl(fileName, albumId)
      await uploadService.uploadFileToS3(uploadUrl, fileToUpload!, setUploadProgress)

      // שמירת הנתונים בבסיס הנתונים
      const photoData = {
        AlbumId: albumId,
        UserId: user.UserId,
        Url: fileUrl,
        Title: fileName,
        CreatedAt: new Date().toISOString(),
        UpdatedAt: new Date().toISOString(),
      }

      const savedPhoto = await photoService.createPhoto(photoData)
      dispatch({ type: "ADD_PHOTO", payload: savedPhoto })

      setSuccess(true)
      setTimeout(() => {
        setUploadProgress(0)
        setFile(null)
        setPreviewUrl(null)
        onClose()
      }, 1500)
    } catch (error: any) {
      setError(`שגיאה בהעלאה: ${error.message}`)
    } finally {
      setUploading(false)
    }
  }

  if (!open) return null

  return (
    <>
      <FileUploaderContent
        file={file}
        previewUrl={previewUrl}
        uploadProgress={uploadProgress}
        error={error}
        uploading={uploading}
        success={success}
        onClose={onClose}
        onFileChange={handleFileChange}
        onUpload={() => uploadFile()}
        onOpenCollageMaker={() => setShowCollageMaker(true)}
        onClearFile={() => {
          setFile(null)
          setPreviewUrl(null)
        }}
      />

      {showCollageMaker && previewUrl && (
        <CollageMaker
          open={showCollageMaker}
          onClose={() => setShowCollageMaker(false)}
          imageUrl={previewUrl}
          onSaveCollage={handleSaveCollage}
        />
      )}
    </>
  )
}

export default FileUploader
