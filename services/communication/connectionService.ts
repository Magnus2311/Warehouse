import { API_PATH, SSO_API_PATH } from "../../helpers/constants";

export async function get<T>(url: string, isSSO = false): Promise<T> {
  const response = await fetch(`${isSSO ? SSO_API_PATH : API_PATH}${url}`);
  if (response.ok) {
    try {
      return (await response.json()) as T;
    } catch (ex) {
      throw ex;
    }
  }

  return [] as unknown as T;
}

export async function put<T>(url: string, data: any): Promise<boolean> {
  const response = await fetch(`${API_PATH}${url}`, {
    method: "PUT",
    credentials: "omit",
    cache: "no-cache",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  });

  return response.ok;
}

export async function post<T>(
  url: string,
  data: any,
  isSSO = false
): Promise<T> {
  const response = await fetch(`${isSSO ? SSO_API_PATH : API_PATH}${url}`, {
    method: "POST",
    credentials: "omit",
    cache: "no-cache",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  });

  if (response.ok) {
    try {
      return (await response.json()) as T;
    } catch (ex) {
      throw ex;
    }
  }

  return {} as T;
}

export async function deletee(url: string, id: string): Promise<boolean> {
  const response = await fetch(`${API_PATH}${url}`, {
    method: "DELETE",
    credentials: "omit",
    cache: "no-cache",
    body: JSON.stringify(id),
    headers: {
      "content-type": "application/json",
    },
  });

  return response.ok;
}
