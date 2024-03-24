export interface AuthPayload {
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

export interface LogoutResponse {
  message: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  start_date: string;
  finish_date: string;
  rating: string;
}

export interface BookInput {
  title: string;
  author: string;
  start_date: string;
  finish_date: string;
  rating: string;
}

export interface Movie {
  id: string;
  title: string;
  director: string;
  watch_date: string;
  rating: string;
  viewer: string;
}

export interface MovieInput {
  title: string;
  director: string;
  watch_date: string;
  rating: string;
  viewer: string;
}

// Interface for the TV show entity
export interface TVShow {
  id: string;
  title: string;
  start_date: string; // Assuming date format
  finish_date: string; // Assuming date format
  rating: string;
  viewer: string; // Assuming viewer ID
}

// Interface for the TV show input payload
export interface TVShowInput {
  title: string;
  start_date: string; // Assuming date format
  finish_date: string; // Assuming date format
  rating: string;
  viewer: string; // Assuming viewer ID
}

// Interface for the user entity
export interface User {
  id: string;
  username: string;
  email: string;
  date_of_birth: string;
  profilePicture: string;
  role: string;
  status: string;
  createdAt: string;
  lastLoginAt: string;
}

// Interface for the user input payload
export interface UserInput {
  username: string;
  email: string;
  password: string;
}
