export interface SignInData {
  username: string | null | FormDataEntryValue
  password: string | null | FormDataEntryValue
}

export interface SignInResult {
  username: string
  token?: string // אם יש טוקן למשל
  error?: string
}

export async function signIn(data: SignInData): Promise<SignInResult> {
  try {
    const response = await fetch('/users/signIn', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
      credentials: 'include',
    })
    console.log(data.username, data.password)

    if (!response.ok) {
      const errorText = await response.text()
      return { username: '', error: errorText }
    }

    const result = await response.json()

    return { username: result.username, token: result.token }
  } catch (error) {
    return { username: '', error: (error as Error).message }
  }
}
