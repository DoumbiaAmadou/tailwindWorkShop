const secret_key = process.env.SECRETKEY;

export const request = async <T>(url: string) => {
  const res = await fetch(`${url}api_key=${secret_key}`, {
    headers: {
      "Content-Type": "application/json",
      // ...(process.env.secret_key && { "API-Key": process.env.secret_key }),
    },
  });
  return res.json();
};
