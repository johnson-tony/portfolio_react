const BASE_URL = "https://portfolio-backend-w5jq.onrender.com";

export const sendMessage = async (data) => {
  const res = await fetch(`${BASE_URL}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const getProjects = async () => {
  const res = await fetch(`${BASE_URL}/projects`);
  return res.json();
};

export const getProfile = async () => {
  const res = await fetch(`${BASE_URL}/profile`);
  return res.json();
};
