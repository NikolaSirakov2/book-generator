const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface DecodedToken {
  id: string;
}

export const createUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  repeatPassword: string
) => {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      passwordConfirmation: repeatPassword,
    }),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
}

export async function loginUser(email: string, password: string): Promise<string> {
  const response = await fetch('https://test-website-api.inkastle.studio/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    if (response.status === 401) {
      throw new Error("Wrong password!");
    } else if (response.status === 404) {
      throw new Error("User with this email doesn't exist!");
    } else {
      throw new Error(errorData.message || "An unexpected error occurred");
    }
  }

  const data = await response.json();
  return data.access_token;
}

export const fetchUsers = async (token: string) => {
  const response = await fetch(`${API_URL}/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
};

export const fetchUser = async (decodedToken: DecodedToken, token: string) => {
  const response = await fetch(
    `${API_URL}/users/${decodedToken.id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
};

export const changeUser = async (
  decodedToken: DecodedToken, 
  token: string, 
  userInfo: { firstName: string, lastName: string, email: string, password: string, passwordConfirmation: string }
) => {
  const response = await fetch(
    `${API_URL}/users/${decodedToken.id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
};

export const fetchUserDashboard = async (token: string) => {
  const response = await fetch(
    `${API_URL}/users/dashboard`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
};

export const fetchBooks = async (token: string) => {
  const response = await fetch(
    `${API_URL}/books`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
};

export const fetchBook = async (userId: string, bookId: string, token: string) => {
  const response = await fetch(
    `${API_URL}/books/${userId}/${bookId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
}

export const createBook = async (
  title: string,
  outline: string,
  pages: number,
  token: string
): Promise<void> => {
  try {
    console.error(token);
    const response = await fetch(`${API_URL}/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title,
        outline: outline,
        pages: pages,
      }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error; 
  }
};

export const likeBook = async (bookId: string, token: string) => {
  console.error(bookId);
  const response = await fetch(
    `${API_URL}/users/like`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({
        bookId: bookId,
      }),
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
}

export const dislikeBook = async (bookId: string, token: string) => {
  const response = await fetch(
    `${API_URL}/users/like`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({
        bookId: bookId,
      }),
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
}

export const readBook = async (userId: string, bookId: string, token: string) => {
  const response = await fetch(
    `${API_URL}/users/${userId}/read/${bookId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({
        userId: userId,
        bookId: bookId,
      }),
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
}