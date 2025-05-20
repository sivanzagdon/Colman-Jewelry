const models = require('../utils/db_utils/models')
const users_model = models.User

exports.signIn = async (req, res) => {
  try {
    console.log('signIn method called')
    const { username, password } = req.body
    console.log('Username:', username)
    console.log('Password:', password)
    // Check if a user with the same username exists in the database
    const existingUser = await users_model.findOne({ username: username })
    if (!existingUser) {
      // User does not exist, return an error message
      console.log('User does not exist')
      return res.status(400).json({ error: 'Username does not exist' })
    }

    if (existingUser.password !== password) {
      console.log('Incorrect password')
      return res.status(400).json({ error: 'Incorrect password' })
    }

    res.cookie('user', existingUser, { maxAge: 86400000 })

    console.log('User signed in successfully')
    return res.json({ message: 'User signed in successfully' })
  } catch (error) {
    console.error('Error Logging In:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

exports.signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body

    // Check if a user with the same username already exists
    const existingUser = await users_model.findOne({ username: username })
    if (existingUser) {
      return res.status(400).json({ error: 'Username is already taken' })
    }

    // Create a new user
    await users_model.create({
      username: username,
      email: email,
      password: password,
    })

    console.log('User created')
    return res.status(200).json({ message: 'User created successfully' })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Failed to create user' })
  }
}
exports.logout = async (req, res) => {
  try {
    // Clear the user's session
    req.session.destroy()

    // Remove the user's cookie
    res.clearCookie('user')
    res.clearCookie('order')

    // Redirect the user to the login page or any other desired page
    res.redirect('/')
  } catch (error) {
    console.error('Error Logging Out:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
