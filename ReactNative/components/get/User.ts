export interface User {
  password: string;
  username: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  imageUri?: string | null;
}