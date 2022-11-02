type ApiRequestOptions = {
    [key: string]: any;
};

const baseUrl = process.env.REACT_APP_API_URL || 'localhost:5000';

export async function client(endpoint: string, options: ApiRequestOptions) {
  const headers = { 'Content-Type': 'application/json' }
  const access_token = localStorage.getItem("access_token");
  const config = {
    method: options.method,
    ...options.customConfig,
    headers: {
      ...headers,
      ...options.customConfig?.headers,
      Authorization: `Bearer ${access_token}`
    },
  }
  if (options.body) {
    config.body = JSON.stringify(options.body)
  }

  let data
  try {
    const response = await window.fetch(`${baseUrl}${endpoint}`, config)
    data = await response.json()
    if (response.ok) {
      return {
        status: response.status,
        data,
        headers: response.headers,
        url: response.url,
      }
    }
    throw new Error(response.statusText)
  } catch (err: any) {
    console.error(err)
    return Promise.reject(err?.message ? err?.message : data)
  }
}

client.get = function (endpoint: string, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: 'GET' })
}

client.post = function (endpoint: string, body: any, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: 'POST', body })
}

client.put = function (endpoint: string, body: any, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: 'PUT', body })
}

client.delete = function (endpoint: string, body: any, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: 'DELETE', body })
}