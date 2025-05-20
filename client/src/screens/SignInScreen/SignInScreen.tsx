import React, { useState } from 'react'
import logoImage from '../../assets/img/updatelogo.png'
import { Link } from 'react-router-dom'
import { signIn } from '../../services/userService.ts'

interface UserProfileProps {
  username: string | null
}

const SignInScreen: React.FC<UserProfileProps> = ({
  username: initialUsername,
}) => {
  const [username, setUsername] = useState<string | null>(initialUsername)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage(null)

    const form = e.currentTarget
    const formData = new FormData(form)
    const username = formData.get('username')
    const password = formData.get('password')

    const result = await signIn({ username, password })

    if (result.error) {
      setErrorMessage(result.error)
    } else if (result.username) {
      alert(`Welcome ${result.username}!`)
      setUsername(result.username)
      // כאן אפשר להוסיף ניתוב לדף אחר, לדוגמה:
      // navigate('/')
    }
  }

  const styles = {
    body: {
      background:
        'linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(/image/backimage.jpg)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      margin: 0,
      fontFamily: 'Arial, sans-serif',
      color: '#fff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column' as 'column',
    },
    banner: {
      position: 'relative' as 'relative',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '100vw',
      height: '20vh',
      top: 0,
      left: 0,
      overflow: 'hidden',
    },
    navbar: {
      width: '85%',
      margin: 'auto',
      padding: '20px 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      listStyle: 'none',
      color: '#fff',
    },
    logo: {
      width: '160px',
      cursor: 'pointer',
    },
    ul: {
      display: 'flex',
      padding: 0,
      margin: 0,
      listStyle: 'none',
      alignItems: 'center',
      gap: '20px',
    },
    link: {
      color: '#fff',
      textDecoration: 'none',
      textTransform: 'uppercase' as 'uppercase',
      position: 'relative' as 'relative',
      paddingBottom: '5px',
    },
    content: {
      marginTop: '20px',
      marginBottom: '20px',
      textAlign: 'center' as 'center',
      color: '#fff',
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column' as 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: '30px',
      minHeight: 'calc(100vh - 20vh)',
    },
    formContainer: {
      width: '320px',
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(15px)',
      WebkitBackdropFilter: 'blur(15px)',
      borderRadius: '20px',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      boxShadow: '0 8px 32px 0 rgba(0,0,0,0.5)',
      padding: '25px',
      marginTop: 0,
      display: 'flex',
      flexDirection: 'column' as 'column',
      alignItems: 'center',
      color: '#fff',
    },
    formTitle: {
      marginBottom: '15px',
      fontSize: '1.8em',
      fontWeight: 'bold',
      fontFamily: "'Bebas Neue', cursive",
      userSelect: 'none' as React.CSSProperties['userSelect'],
    },
    socialButtons: {
      display: 'flex',
      flexDirection: 'column' as 'column',
      gap: '12px',
      width: '100%',
      marginBottom: '15px',
    },
    socialButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '12px',
      gap: '8px',
      borderRadius: '6px',
      fontSize: '1em',
      cursor: 'pointer',
      color: '#fff',
      border: 'none',
      boxShadow: '0 0 3px rgba(0,0,0,0.08), 0 2px 3px rgba(0,0,0,0.17)',
      width: '100%',
    },
    facebookButton: {
      backgroundColor: '#1778f2',
    },
    appleButton: {
      backgroundColor: '#000',
    },
    line: {
      height: '1px',
      backgroundColor: '#e0e0e0',
      width: '100%',
      margin: '10px 0',
      opacity: 0.4,
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column' as 'column',
      width: '100%',
      marginBottom: '10px',
    },
    label: {
      marginBottom: '7px',
      marginTop: '7px',
      fontWeight: 'bold',
    },
    input: {
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #e0e0e0',
      fontSize: '1em',
    },
    submitBtn: {
      marginTop: '10px',
      padding: '12px',
      width: '100%',
      borderRadius: '6px',
      border: 'none',
      fontSize: '1.1em',
      backgroundColor: '#1778f2',
      color: '#fff',
      cursor: 'pointer',
      fontWeight: 'bold',
    },
    signupLink: {
      marginTop: '12px',
      fontSize: '0.9em',
      color: '#bbb',
      textAlign: 'center' as 'center',
    },
    signupAnchor: {
      color: '#1778f2',
      textDecoration: 'none',
      cursor: 'pointer',
      marginLeft: '5px',
    },
    welcomeMessage: {
      marginTop: '10vh',
      fontSize: '1.4em',
      fontFamily: "'Bebas Neue', cursive",
      textAlign: 'center' as 'center',
      color: '#fff',
    },
    errorMessage: {
      color: '#ff4d4d',
      marginTop: '10px',
      fontWeight: 'bold',
    },
  }

  return (
    <div style={styles.body}>
      <header style={styles.banner}>
        <div style={styles.navbar}>
          <li>
            <Link to="/graf">
              <img src={logoImage} style={styles.logo} alt="Logo" />
            </Link>
          </li>
          <ul style={styles.ul}>
            <li>
              <form
                className="d-flex"
                role="search"
                action="/searchResult"
                method="GET"
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <input
                  className="form-control me-2"
                  type="search"
                  name="query"
                  placeholder="Search"
                  aria-label="Search"
                  style={{
                    padding: '5px 10px',
                    borderRadius: '5px',
                    border: 'none',
                  }}
                />
                <button
                  className="btn btn-outline-success"
                  type="submit"
                  style={{
                    padding: '6px 12px',
                    borderRadius: '5px',
                    border: '2px solid #e85d9e',
                    background: 'transparent',
                    color: '#fff',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  Search
                </button>
              </form>
            </li>
            <li>
              <Link to="/" style={styles.link}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/Necklaces" style={styles.link}>
                Necklaces
              </Link>
            </li>
            <li>
              <Link to="/Rings" style={styles.link}>
                Rings
              </Link>
            </li>
            <li>
              <Link to="/Bracelets" style={styles.link}>
                Bracelets
              </Link>
            </li>
            <li>
              <Link to="/earrings" style={styles.link}>
                Earrings
              </Link>
            </li>
            <li>
              <Link to="/orders" style={styles.link}>
                <i className="fas fa-shopping-cart" />
              </Link>
            </li>
          </ul>
        </div>
      </header>

      <main style={styles.content}>
        {!username ? (
          <div style={styles.formContainer}>
            <h1 style={styles.formTitle}>Welcome back!</h1>
            <div className="logo-container"></div>

            <div style={styles.socialButtons}>
              <button
                style={{ ...styles.socialButton, ...styles.facebookButton }}
                type="button"
                aria-label="Sign in with Facebook"
              >
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  width="22px"
                  height="22px"
                >
                  <path d="M12.001 2C6.47813 2 2.00098 6.47715 2.00098 12C2.00098 16.9913 5.65783 21.1283 10.4385 21.8785V14.8906H7.89941V12H10.4385V9.79688C10.4385 7.29063 11.9314 5.90625 14.2156 5.90625C15.3097 5.90625 16.4541 6.10156 16.4541 6.10156V8.5625H15.1931C13.9509 8.5625 13.5635 9.33334 13.5635 10.1242V12H16.3369L15.8936 14.8906H13.5635V21.8785C18.3441 21.1283 22.001 16.9913 22.001 12C22.001 6.47715 17.5238 2 12.001 2Z" />
                </svg>
                <span>Sign in with Facebook</span>
              </button>

              <button
                style={{ ...styles.socialButton, ...styles.appleButton }}
                type="button"
                aria-label="Sign in with Apple"
              >
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  width="22px"
                  height="22px"
                >
                  <path d="M11.6734 7.2221C10.7974 7.2221 9.44138 6.2261 8.01338 6.2621C6.12938 6.2861 4.40138 7.3541 3.42938 9.0461C1.47338 12.4421 2.92538 17.4581 4.83338 20.2181C5.76938 21.5621 6.87338 23.0741 8.33738 23.0261C9.74138 22.9661 10.2694 22.1141 11.9734 22.1141C13.6654 22.1141 14.1454 23.0261 15.6334 22.9901C17.1454 22.9661 18.1054 21.6221 19.0294 20.2661C20.0974 18.7061 20.5414 17.1941 20.5654 17.1101C20.5294 17.0981 17.6254 15.9821 17.5894 12.6221C17.5654 9.8141 19.8814 8.4701 19.9894 8.4101C18.6694 6.4781 16.6414 6.2621 15.9334 6.2141C14.0854 6.0701 12.5374 7.2221 11.6734 7.2221ZM14.7934 4.3901C15.5734 3.4541 16.0894 2.1461 15.9454 0.850098C14.8294 0.898098 13.4854 1.5941 12.6814 2.5301C11.9614 3.3581 11.3374 4.6901 11.5054 5.9621C12.7414 6.0581 14.0134 5.3261 14.7934 4.3901Z" />
                </svg>
                <span>Sign in with Apple</span>
              </button>
            </div>

            <div style={styles.line}></div>

            <form
              className="form"
              id="signInForm"
              action="/backend/routes/users.js"
              method="POST"
              onSubmit={submitForm}
              style={{ width: '100%' }}
            >
              <div style={styles.formGroup}>
                <label htmlFor="username" style={styles.label}>
                  Username
                </label>
                <input
                  required
                  placeholder="Enter your username"
                  name="username"
                  id="username"
                  type="text"
                  defaultValue={username ?? ''}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="password" style={styles.label}>
                  Password
                </label>
                <input
                  required
                  name="password"
                  placeholder="Enter your password"
                  id="password"
                  type="password"
                  style={styles.input}
                />
              </div>
              <button
                type="submit"
                className="form-submit-btn"
                id="signInBtn"
                style={styles.submitBtn}
              >
                Sign In
              </button>
            </form>

            {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
          </div>
        ) : (
          <div style={styles.welcomeMessage}>Now connected: {username}</div>
        )}
      </main>
    </div>
  )
}

export default SignInScreen
