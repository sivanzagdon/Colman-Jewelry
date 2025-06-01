const { createApp } = require('./app')

createApp()
  .then((app) => {
    const port = app.get('port') || 4000

    app.listen(port, () => {
      console.log(` Server is running on http://localhost:${port}`)
    })
  })
  .catch((error) => {
    console.error(' Error creating the app:', error)
    process.exit(1)
  })
