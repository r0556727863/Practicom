// import axios from "axios"
// import { BaseService } from "./base.service"

// export interface PhotoData {
//     AlbumId: number
//     UserId: number
//     Url: string
//     Title: string
//     CreatedAt: string
//     UpdatedAt: string
// }

// export interface Photo {
//     photoId: number
//     url: string
//     title: string
//     albumId: number
//     userId: number
// }

// class PhotoService extends BaseService {
//     async getPhotos(): Promise<Photo[]> {
//         const response = await axios.get(`${this.API_URL}/Photo`, {
//             headers: this.getAuthHeaders(),
//         })
//         return response.data
//     }

//     async createPhoto(photoData: PhotoData): Promise<Photo> {
//         const response = await axios.post(`${this.API_URL}/Photo/photo`, photoData, {
//             headers: this.getAuthHeaders(),
//         })
//         return response.data
//     }

//     async updatePhoto(photoId: number, photoData: Partial<Photo>): Promise<Photo> {
//         const response = await axios.put(`${this.API_URL}/Photo/${photoId}`, photoData, {
//             headers: this.getAuthHeaders(),
//         })
//         return response.data
//     }

//     async deletePhoto(photoId: number): Promise<void> {
//         await axios.delete(`${this.API_URL}/Photo/${photoId}`, {
//             headers: this.getAuthHeaders(),
//         })
//     }
// }

// export const photoService = new PhotoService()
