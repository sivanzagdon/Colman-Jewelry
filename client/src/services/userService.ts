// Interfaces
export interface SignInData {
  username: string;
  password: string;
}

export interface SignUpData {
  username: string;
  email: string;
  password: string;
}

export interface AuthResult {
  username?: string;
  token?: string;
  success: boolean;
  error?: string;
}

// Sign In Function
export async function signIn(data: SignInData): Promise<AuthResult> {
  try {
    const response = await fetch('http://localhost:4000/api/users/signIn', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { success: false, error: errorText };
    }

    const result = await response.json();
    return {
      success: true,
      username: result.username,
      token: result.token,
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message,
    };
  }
}

// Sign Up Function
export async function signUp(data: SignUpData): Promise<AuthResult> {
  try {
    const response = await fetch('http://localhost:4000/api/users/signUp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { success: false, error: errorText };
    }

    const result = await response.json();
    return {
      success: true,
      username: result.username,
      token: result.token,
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message,
    };
  }
}
