export interface registerUser {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface loginUser {
  email: string;
  password: string;
}
