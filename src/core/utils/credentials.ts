import { GOLANG_API_BASE_URL } from "../../utils/Constant";

import { isExpired } from "react-jwt";
import { CredentialsToken } from "../../domains/Credentials";

export async function deleteCredentials(key: string) {
  await localStorage.deleteItem(key);
}

export async function setCredentials(key: string, value: string) {
  await localStorage.setItem(key, value);
}

export async function getCredentials() {
  try {
    const accessToken = await localStorage.getItem("accessToken");

    if (accessToken !== null) {
      const credentials: CredentialsToken = { accessToken };
      checkTokenValidity(credentials);
      return credentials;
    }
  } catch (error) {
    throw new Error("Error getting credentials" + " : " + error);
  }
}

// On a pas besoin de check le token pour le projet ?
async function getAccessTokenUsingRefresh(
  refreshToken: CredentialsToken["refreshToken"]
) {
  const BASE_URL = GOLANG_API_BASE_URL;

  const response = await fetch(`${BASE_URL}/auth/refreshToken`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(refreshToken),
  });

  return response.json().then((json) => {
    return {
      success: true,
      accessToken: json.accessToken,
      refreshToken: json.refreshToken,
    };
  });
}

function isTokenExpired(token: string) {
  try {
    const ismyTokenExpired = isExpired(token);

    if (ismyTokenExpired) {
      return true;
    }
    return false;
  } catch (error) {
    throw new Error("Error checking token expiration");
  }
}

export async function checkTokenValidity(credentials: CredentialsToken) {
  if (!isTokenExpired(credentials.accessToken)) {
    return credentials;
  }

  if (!isTokenExpired(credentials.accessToken)) {
    const response = await getAccessTokenUsingRefresh(credentials.refreshToken);
    await localStorage.setItem("accessToken", response.accessToken);
    await localStorage.setItem("refreshToken", response.refreshToken);

    return response;
  }
  console.log("access not available please login");
  return null;
}

export async function getUser(userId: string) {
  const BASE_URL = GOLANG_API_BASE_URL;

  const accessToken = await localStorage.getItem("accessToken");

  const response = await fetch(`${BASE_URL}/customer/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  });

  return response.json().then((json) => {
    return {
      success: true,
      message: json.message,
      data: json.data,
    };
  });
}
