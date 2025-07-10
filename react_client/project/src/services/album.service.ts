import axios from "axios"
import { BaseService } from "./base.service"

export interface AlbumData {
    title: string
    description: string
    userId: number
}

export interface Album {
    albumId: number
    title: string
    userId: number
    description: string
}

class AlbumService extends BaseService {
    async createAlbum(albumData: AlbumData): Promise<Album> {
        const response = await axios.post(`${this.API_URL}/Album/album`, albumData, {
            headers: this.getAuthHeaders(),
        })
        return response.data
    }

    async getAlbums(): Promise<Album[]> {
        const response = await axios.get(`${this.API_URL}/album`, {
            headers: this.getAuthHeaders(),
        })
        return response.data
    }

    async getAlbumById(albumId: number): Promise<Album> {
        const response = await axios.get(`${this.API_URL}/Album/${albumId}`, {
            headers: this.getAuthHeaders(),
        })
        return response.data
    }

    async updateAlbum(albumId: number, albumData: Partial<Album>): Promise<Album> {
        const response = await axios.put(`${this.API_URL}/album/${albumId}`, albumData, {
            headers: this.getAuthHeaders(),
        })
        return response.data
    }

    async deleteAlbum(albumId: number): Promise<void> {
        await axios.delete(`${this.API_URL}/album/${albumId}`, {
            headers: this.getAuthHeaders(),
        })
    }
}

export const albumService = new AlbumService()
