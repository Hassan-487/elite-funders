

const BASE_URL = "/api";


export async function resumeApplicationByEmail(email) {
  const url = `${BASE_URL}/resume?email=${encodeURIComponent(email)}`;

  const res = await fetch(url, {
    method: "GET",
    // headers: {
    //   "ngrok-skip-browser-warning": "true",
    // },
  });

  if (!res.ok) return null;

  return res.json();
}