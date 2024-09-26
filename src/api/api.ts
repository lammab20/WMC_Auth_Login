import axios from 'axios';

const AUTH_API_URL = 'http://localhost:5000'; 
const POSTS_API_URL = 'http://localhost:3000'; 


interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export const login = async (username: string): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${AUTH_API_URL}/login`, { username });
    return response.data;
  } catch (error) {
    throw new Error('Login fehlgeschlagen: ' + error);
  }
};

export const refreshAccessToken = async (
  refreshToken: string
): Promise<string> => {
  try {
    const response = await axios.post(`${AUTH_API_URL}/token`, {
      token: refreshToken,
    });
    return response.data.accessToken;
  } catch (error) {
    throw new Error('Token-Aktualisierung fehlgeschlagen: ' + error);
  }
};

export const logout = async (accessToken: string): Promise<void> => {
  try {
    await axios.delete(`${AUTH_API_URL}/logout`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    throw new Error('Logout fehlgeschlagen: ' + error);
  }
};

export const getPosts = async (accessToken: string) => {
  try {
    const response = await axios.get(`${POSTS_API_URL}/post`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Fehler beim Abrufen der Posts: ' + error);
  }
};