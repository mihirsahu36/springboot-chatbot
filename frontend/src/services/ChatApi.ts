export async function sendPrompt(
  prompt: string
): Promise<string> {

  const response = await fetch(
    "http://localhost:8081/api/chat",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get response");
  }

  return await response.text();
}