// export abstract class BaseService {
//     protected readonly API_URL = import.meta.env.VITE_API_URL

//     protected getAuthHeaders() {
//         const token = localStorage.getItem("token")
//         return {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//         }
//     }

//     protected getToken(): string | null {
//         return localStorage.getItem("token")
//     }

//     protected isAuthenticated(): boolean {
//         return !!this.getToken()
//     }
// }
