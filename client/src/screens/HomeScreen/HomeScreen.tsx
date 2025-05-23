import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import backgroundImage from '../../assets/img/backimage.jpg'
import logoImage from '../../assets/img/updatelogo.png'

interface NavLink {
  label: string
  path: string
}

const navLinks: NavLink[] = [
  { label: 'Home', path: '/' },
  { label: 'Necklaces', path: '/necklaces' },
  { label: 'Rings', path: '/rings' },
  { label: 'Bracelets', path: '/bracelets' },
  { label: 'Earrings', path: '/earrings' },
]

const HomePage: React.FC = () => {
const username = localStorage.getItem('username')
const navigate = useNavigate()

const handleLogout = () => {
  localStorage.removeItem('username') 
  navigate('/') 
}


  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -1,
        }}
      />

      <header
        style={{
          backgroundColor: '#00000080',
          padding: '10px 40px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div
          style={{
            backgroundColor: '#e85d9e',
            padding: '5px 0',
            textAlign: 'center',
            fontSize: '12px',
            color: '#fff',
          }}
        >
          Free Shipping on Orders Over $500
        </div>

        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '10px',
          }}
        >
          <Link to="/graf">
            <img
              src={logoImage}
              alt="Logo"
              style={{ width: 160, cursor: 'pointer' }}
            />
          </Link>

          <form
            className="d-flex"
            role="search"
            action="/searchResult"
            method="GET"
            style={{
              flex: 1,
              marginLeft: 20,
              marginRight: 40,
              display: 'flex',
            }}
          >
            <input
              type="search"
              name="query"
              placeholder="Search"
              aria-label="Search"
              style={{
                width: '100%',
                padding: '6px 12px',
                borderRadius: 20,
                border: '2px solid #e85d9e',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              style={{
                marginLeft: 10,
                padding: '6px 16px',
                borderRadius: 20,
                border: '2px solid #e85d9e',
                backgroundColor: 'transparent',
                color: '#e85d9e',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Search
            </button>
          </form>

          <ul
            style={{
              display: 'flex',
              listStyle: 'none',
              gap: '20px',
              margin: 0,
              padding: 0,
              alignItems: 'center',
            }}
          >
            {navLinks.map(({ label, path }) => (
              <li key={label}>
                <Link
                  to={path}
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    fontFamily: 'Arial, serif',
                    fontSize: '16px',
                    letterSpacing: '1px',
                    fontWeight: '600',
                  }}
                >
                  {label}
                </Link>
              </li>
            ))}

            <li>
              <Link to="/orders" style={{ color: 'white' }}>
                <i className="fas fa-shopping-cart" />
              </Link>
            </li>

            {username && (
              <li style={{ display: 'flex', alignItems: 'center' }}>
                <span
                  style={{
                    color: '#fff',
                    marginRight: 10,
                    fontWeight: 'bold',
                  }}
                >
                  Hi, {username}
                </span>
                <button
                  onClick={handleLogout}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#e85d9e',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      </header>

      <main
        style={{
          color: 'white',
          textAlign: 'center',
          paddingTop: 150,
          position: 'relative',
          zIndex: 10,
        }}
      >
        <h1
          style={{
            fontSize: 70,
            marginBottom: 10,
            fontWeight: '500',
            textShadow: '0 0 8px rgba(232, 93, 158, 0.8)',
            fontFamily: '"Times New Roman", serif',
            letterSpacing: '2px',
            color: '#ffffff',
          }}
        >
          Colman Jewlery
        </h1>
        <p
          style={{
            fontWeight: 300,
            fontSize: 20,
            marginBottom: 40,
            fontFamily: 'Arial, sans-serif',
            color: '#ffffff',
          }}
        >
          We are here to make you happy in finding the jewel of your dreams
          <br />
          since 2021
        </p>

        {username ? (
          <div style={{ fontSize: 24, fontWeight: 'bold', color: '#e85d9e' }}>
            Welcome, {username}!
          </div>
        ) : (
          <>
            <div style={{ display: 'inline-flex', gap: 20 }}>
              <Link to="/signin">
                <button
                  style={{
                    borderRadius: 25,
                    border: '2px solid #e85d9e',
                    background: 'transparent',
                    color: '#fff',
                    padding: '10px 40px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontFamily: 'Arial, sans-serif',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = '#e85d9e')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = 'transparent')
                  }
                >
                  Sign In
                </button>
              </Link>

              <Link to="/signup">
                <button
                  style={{
                    borderRadius: 25,
                    border: '2px solid #e85d9e',
                    background: 'transparent',
                    color: '#fff',
                    padding: '10px 40px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontFamily: 'Arial, sans-serif',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = '#e85d9e')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = 'transparent')
                  }
                >
                  Sign Up
                </button>
              </Link>
            </div>

            <div style={{ marginTop: 40 }}>
              <Link to="/contact">
                <button
                  style={{
                    borderRadius: 25,
                    border: '2px solid #e85d9e',
                    background: 'transparent',
                    color: '#fff',
                    padding: '10px 60px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontFamily: 'Arial, sans-serif',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = '#e85d9e')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = 'transparent')
                  }
                >
                  Contact Us
                </button>
              </Link>
            </div>
          </>
        )}
      </main>
    </>
  )
}

export default HomePage
