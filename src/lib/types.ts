export interface User {
  userId: string;
  email: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
}

export interface comlpeteRegistrationInterface {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  otp: string;
}
