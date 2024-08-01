'use client';

const useDecodedToken = () => {
    const isBrowser = typeof window !== "undefined";
    const token = isBrowser ? localStorage.getItem("token") ?? "" : "";
    let decodedJwt = null;
  
    if (token) {
      const [header, payload, sign] = token.split(".");
      const base64UrlPayload = payload;
      const base64Payload = base64UrlPayload.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = atob(base64Payload);
  
      decodedJwt = JSON.parse(jsonPayload);
    } else {
      console.error("No JWT found in local storage");
    }
  
    return { token, decodedJwt };
  };
  
  export default useDecodedToken;