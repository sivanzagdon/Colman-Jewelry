import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../services/userService.ts';
import backgroundImage from '../../assets/img/backimage.jpg';
import logoImage from '../../assets/img/updatelogo.png';
import { Link } from 'react-router-dom';

const SignUpScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError('All fields are required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }

    const result = await signUp({ username, email, password });

    if (!result.success) {
      setError(result.error || 'Signup failed');
      return;
    }

    setError('');
    setSuccess(true);
    localStorage.setItem('username', username);
    navigate('/');
  };

  const styles = {
    body: {
      backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      color: '#fff',
    },
    navbar: {
      backgroundColor: '#00000080',
      padding: '10px 40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    logo: {
      width: 160,
      cursor: 'pointer'
    },
    ul: {
      display: 'flex',
      listStyle: 'none',
      gap: '20px',
      margin: 0,
      padding: 0,
      alignItems: 'center'
    },
    navLink: {
      color: '#fff',
      textDecoration: 'none',
      fontFamily: 'Arial, serif',
      fontSize: '16px',
      letterSpacing: '1px',
      fontWeight: '600'
    },
    container: {
      width: '320px',
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(15px)',
      WebkitBackdropFilter: 'blur(15px)',
      borderRadius: '20px',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      boxShadow: '0 8px 32px 0 rgba(0,0,0,0.5)',
      padding: '25px',
      margin: '80px auto',
      display: 'flex',
      flexDirection: 'column' as 'column',
      alignItems: 'center',
      color: '#fff',
    },
    title: {
      marginBottom: '15px',
      fontSize: '1.8em',
      fontWeight: 'bold',
      fontFamily: 'Arial, sans-serif'
    },
    label: {
      marginBottom: '5px',
      fontWeight: 'bold',
      alignSelf: 'flex-start'
    },
    input: {
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      fontSize: '1em',
      marginBottom: '12px',
      width: '100%'
    },
    button: {
      marginTop: '10px',
      padding: '12px',
      width: '100%',
      borderRadius: '6px',
      border: 'none',
      fontSize: '1.1em',
      backgroundColor: '#e85d9e',
      color: '#fff',
      cursor: 'pointer',
      fontWeight: 'bold'
    },
    footer: {
      marginTop: '12px',
      fontSize: '0.9em',
      color: '#eee',
      textAlign: 'center' as 'center'
    },
    link: {
      color: '#fff',
      textDecoration: 'underline',
      marginLeft: '5px'
    },
    error: {
      color: '#ff4d4d',
      marginTop: '10px',
      fontWeight: 'bold'
    },
    success: {
      color: '#4CAF50',
      marginTop: '10px',
      fontWeight: 'bold'
    }
  };

  return (
    <div style={styles.body}>
      <header style={styles.navbar}>
        <Link to="/">
          <img src={logoImage} alt="Logo" style={styles.logo} />
        </Link>
        <ul style={styles.ul}>
          <li><Link to="/" style={styles.navLink}>Home</Link></li>
          <li><Link to="/necklaces" style={styles.navLink}>Necklaces</Link></li>
          <li><Link to="/rings" style={styles.navLink}>Rings</Link></li>
          <li><Link to="/bracelets" style={styles.navLink}>Bracelets</Link></li>
          <li><Link to="/earrings" style={styles.navLink}>Earrings</Link></li>
          <li><Link to="/orders" style={styles.navLink}><i className="fas fa-shopping-cart" /></Link></li>
        </ul>
      </header>

      <div style={styles.container}>
        <h1 style={styles.title}>Create Your Account</h1>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <label htmlFor="username" style={styles.label}>Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
            style={styles.input}
          />

          <label htmlFor="email" style={styles.label}>Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
            style={styles.input}
          />

          <label htmlFor="password" style={styles.label}>Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
            style={styles.input}
          />

          {error && <p style={styles.error}>{error}</p>}
          {success && <p style={styles.success}>Signup successful!</p>}

          <button type="submit" style={styles.button}>Sign Up</button>
<p style={styles.footer}>
  Already have an account?
  <Link to="/signin" style={styles.link}>Sign in</Link>
</p>

        </form>
      </div>
    </div>
  );
};

export default SignUpScreen;
