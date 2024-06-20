import { Outlet } from "react-router-dom";
import { LoginHeader } from "../Components/LoginHeader";
import { Footer } from "../Components/Footer";

const LoginLayout: React.FC = () => {
  return (
    <>
      <LoginHeader />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default LoginLayout;
