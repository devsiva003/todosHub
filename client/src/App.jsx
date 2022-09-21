import React, { lazy, Suspense } from "react"
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Loader from "./components/Loader"
import useUserContext from "./hooks/useUserContext"
import About from "./pages/About"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import SignUp from "./pages/SignUp"
import "./styles/App.css"

const Home = lazy(() => import("./pages/Home"))
const UserProfile = lazy(() => import("./pages/UserProfile"))

function App() {
  const { user, isLoading } = useUserContext()

  return (
    <div className="App">
      <Router>
        <Header />
        <Suspense fallback={<Loader />}>
          {isLoading && <Loader />}
          {!isLoading && (
            <Routes>
              <Route
                path="/"
                element={user ? <Home /> : <Navigate to="/login" />}
              />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/signup"
                element={!user ? <SignUp /> : <Navigate to="/" />}
              />
              <Route
                path="/profile"
                element={user ? <UserProfile /> : <Navigate to="/" />}
              />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </Suspense>
        <Footer />
      </Router>
    </div>
  )
}

export default App
