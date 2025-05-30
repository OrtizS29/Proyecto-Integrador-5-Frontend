export interface LoginResponse {
  success: boolean;
  user: {
    id: number,
    FirebaseUid: string,
    Email: string,
    Nombre: string,
    createdAt: string,
    updatedAt: string,
    Roll: string
  }
}
