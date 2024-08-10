export const isTokenValid = () => {
  const token = localStorage.getItem('token');
  const tokenTimestamp = localStorage.getItem('tokenTimestamp');
  if (!token || !tokenTimestamp) {
    return false;
  }

  const currentTime = new Date().getTime();
  const tokenTime = parseInt(tokenTimestamp, 10);
  const oneHour = 60 * 60 * 1000;

  return currentTime - tokenTime < oneHour;
};