import decode from "jwt-decode";

// access token
export const getAccessToken = () => {
  let accessToken = null;
  if (
    typeof window !== undefined &&
    window.localStorage.getItem("access-token")
  ) {
    accessToken = window.localStorage.getItem("access-token");
  } else {
    removeAccessToken();
  }
  return accessToken;
};

export const setAccessToken = (token) => {
  window.localStorage.setItem("access-token", token);
};

export const removeAccessToken = () => {
  window.localStorage.removeItem("access-token");
};

export const isAuthenticate = () => {
  const accessToken = getAccessToken();

  if (!accessToken) {
    return false;
  }
  try {
    const { exp } = decode(accessToken);
    if (exp < new Date().getTime() / 1000) {
      return false;
    }
  } catch (error) {
    return false;
  }
  return true;
};
