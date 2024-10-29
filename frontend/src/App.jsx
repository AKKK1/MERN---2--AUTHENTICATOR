import FloatingShape from "./components/FloatingShape";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 via-green-900 to bg-emerald-900 relative overflow-hidden">
        <FloatingShape
          color="bg-green-500"
          size="w-64 h-64"
          top="-5%"
          left="10%"
          delay={0}
        />
        <FloatingShape
          color="bg-emerald-500"
          size="w-48 h-48"
          top="70%"
          left="80%"
          delay={5}
        />
        <FloatingShape
          color="bg-lime-500"
          size="w-32 h-32"
          top="40%%"
          left="-10%"
          delay={21}
        />
        <Routes>
          <Route path="/" element={"Home"} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;