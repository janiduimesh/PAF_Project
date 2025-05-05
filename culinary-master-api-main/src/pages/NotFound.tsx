
import { Link } from "react-router-dom";
import AppLayout from "@/components/AppLayout";

const NotFound = () => {
  return (
    <AppLayout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-cook-red mb-4">404</h1>
          <p className="text-2xl mb-8">Oops! Page not found</p>
          <Link to="/" className="action-button-primary px-6 py-3 inline-block">
            Return to Home
          </Link>
        </div>
      </div>
    </AppLayout>
  );
};

export default NotFound;
