import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PokemonsPage from "./pages/PokemonsPage";
import PokemonDetailPage from "./pages/PokemonDetailPage";
import DealsPage from "./pages/DealsPage";
import DealDetailPage from "./pages/DealDetailPage";
import FavoritesPage from "./pages/FavoritesPage";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function Layout({ children }) {
  const { user } = useAuth();
  return (
    <div style={{ minHeight: "100vh", background: "#0A1628", fontFamily: "'Sora', sans-serif" }}>
      {user && <Header />}
      <main>{children}</main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<PrivateRoute><PokemonsPage /></PrivateRoute>} />
            <Route path="/pokemons/:id" element={<PrivateRoute><PokemonDetailPage /></PrivateRoute>} />
            <Route path="/deals" element={<PrivateRoute><DealsPage /></PrivateRoute>} />
            <Route path="/deals/:id" element={<PrivateRoute><DealDetailPage /></PrivateRoute>} />
            <Route path="/favorites" element={<PrivateRoute><FavoritesPage /></PrivateRoute>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}