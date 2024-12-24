const tokenKey = "authToken";
const savedToken = window.localStorage.getItem(tokenKey);
const URL_BASE = "https://codeable-keep-api-auth-production.up.railway.app";

export const authProvider = {
  isAuthenticated: savedToken !== null,
  token: savedToken,
  async login(username: string, password: string) {
    const url = `${URL_BASE}/login`;
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, options);
    if (response.ok) {
      const body = await response.json();
      authProvider.isAuthenticated = true;
      authProvider.token = body.token;
      window.localStorage.setItem(tokenKey, body.token);
    } else {
      const error = await response.json();
      throw new Error(error.message || "Error en la autenticacion");
    }
  },
  logout() {
    window.localStorage.removeItem(tokenKey);
    authProvider.isAuthenticated = false;
    authProvider.token = null;
  },
};
