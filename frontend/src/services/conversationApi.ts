const API_URL = "http://localhost:8081/api/conversations";

export async function getConversations() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to load conversations");
  }

  return response.json();
}

export async function createConversation() {
  const response = await fetch(API_URL, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to create conversation");
  }

  return response.json();
}

export async function getMessages(id: number) {
  const response = await fetch(
    `${API_URL}/${id}/messages`
  );

  if (!response.ok) {
    throw new Error("Failed to load messages");
  }

  return response.json();
}

export async function sendMessage(
  conversationId: number,
  prompt: string
) {
  const response = await fetch(
    `${API_URL}/${conversationId}/message`,
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

  return response.text();
}

export async function deleteConversation(
  id: number
) {
  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to delete conversation"
    );
  }
}

export async function renameConversation(
  id: number,
  title: string
) {
  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        title,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to rename conversation"
    );
  }

  return response.json();
}