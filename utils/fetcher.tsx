import { BASE_URL, HttpMethod } from "@const/uri";

const fetcher = async (...args: Parameters<typeof fetch>) => {
  const res = await fetch(...args);
  return await res.json();
};

export const SEND_FORM = async (URI: string, method: HttpMethod, data: URLSearchParams) => {
 await fetch(BASE_URL + URI, {
  method: method,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-XSS-Protection': '1; mode=block', // Enable XSS protection in modern browsers
    'X-Content-Type-Options': 'nosniff', // Prevent MIME-type sniffing
    'X-Frame-Options': 'DENY', // Prevent clickjacking attacks
    // TODO: Add other security-related headers if required --- TOKEN JWT
  },
  body: data.toString(),
})
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    if (data.error) {
      return false; // TODO: Improve response.
    }
    return true;  // TODO: Improve response.
  })
  .catch((error) => {
    console.log(error);
    return false;  // TODO: Improve response.
  });}

export default fetcher;