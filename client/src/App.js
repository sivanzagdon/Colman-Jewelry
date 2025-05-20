import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import HomeScreen from './screens/HomeScreen/HomeScreen.tsx'
import NecklacesScreen from './screens/NecklacesScreen/NecklacesScreen.tsx'
import RingsScreen from './screens/RingsScreen/RingsScreen.tsx'
import BraceletsScreen from './screens/BraceletsScreen/BraceletsScreen.tsx'
import EarringsScreen from './screens/EarringsScreen/EarringsScreen.tsx'
import SignInScreen from './screens/SignInScreen/SignInScreen.tsx'
// import OrdersScreen from './screens/OrdersScreen.'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/necklaces" element={<NecklacesScreen />} />
        <Route path="/rings" element={<RingsScreen />} />
        <Route path="/bracelets" element={<BraceletsScreen />} />
        <Route path="/earrings" element={<EarringsScreen />} />
        <Route path="/signin" element={<SignInScreen />} />
        {/* <Route path="/orders" element={<OrdersScreen />} /> */}
      </Routes>
    </Router>
  )
}

export default App
