import instance from "./instance";

const requestQueue = new Map();

export function getUserList() {
  const url = "/user/list";
  const existingRequest = requestQueue.get(url);
  if (existingRequest) {
    return existingRequest;
  }
  const request = instance
    .get(url)
    .then((response) => {
      requestQueue.delete(url);
      return response.data;
    })
    .catch((error) => {
      requestQueue.delete(url);
      console.log(error);
    });
  requestQueue.set(url, request);
  return request;
}
