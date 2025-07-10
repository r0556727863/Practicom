import axios from "axios"
import { BaseService } from "./base.service"

export interface PresignedUrlResponse {
    uploadUrl: string
    fileUrl: string
}

class UploadService extends BaseService {
    async getPresignedUrl(fileName: string, albumName: number): Promise<PresignedUrlResponse> {
        const response = await axios.get(`${this.API_URL}/UploadFile/presigned-url`, {
            params: { fileName, albumName },
            headers: this.getAuthHeaders(),
        })
        return response.data
    }

    async uploadFileToS3(uploadUrl: string, file: File, onProgress?: (progress: number) => void): Promise<void> {
        await axios.put(uploadUrl, file, {
            headers: {
                "Content-Type": file.type,
                "x-amz-acl": "bucket-owner-full-control",
            },
            onUploadProgress: (progressEvent) => {
                if (onProgress && progressEvent.total) {
                    const percentage = Math.round((progressEvent.loaded / progressEvent.total) * 100)
                    onProgress(percentage)
                }
            },
        })
    }
}

export const uploadService = new UploadService()
