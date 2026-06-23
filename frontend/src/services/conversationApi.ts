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
  prompt: string,
  provider: string
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
        provider,
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

export async function uploadFile(
  conversationId: number,
  file: File
) {

  console.log(
    "conversationId =",
    conversationId
  );

  console.log(
    "file =",
    file
  );

  const url =
    `http://localhost:8081/api/files/upload/${conversationId}`;

  console.log(
    "URL =",
    url
  );

  const formData =
    new FormData();

  formData.append(
    "file",
    file
  );

  const response =
    await fetch(
      url,
      {
        method: "POST",
        body: formData,
      }
    );

  if (!response.ok) {
    throw new Error(
      "File upload failed"
    );
  }

  return response.text();
}

export async function getFiles(
  conversationId: number
) {
  const response =
    await fetch(
      `http://localhost:8081/api/files/${conversationId}`
    );

  if (!response.ok) {
    throw new Error(
      "Failed to load files"
    );
  }

  return response.json();
}

export async function deleteFile(
  fileId: number
) {

  const response =
    await fetch(
      `http://localhost:8081/api/files/${fileId}`,
      {
        method: "DELETE",
      }
    );

  if (!response.ok) {
    throw new Error(
      "Failed to delete file"
    );
  }
}