
import { Link } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { ChefHat } from "lucide-react";

const Index = () => {
  return (
    <AppLayout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 max-w-3xl">
          <h1 className="text-5xl font-bold mb-6">Welcome to Let's Cook</h1>
          <p className="text-xl text-gray-700 mb-8">
            Your platform for discovering amazing recipes and talented chefs
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <Link to="/recipes" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">🍳</div>
              <h2 className="text-xl font-bold mb-2">Recipes</h2>
              <p className="text-gray-600">Discover and share delicious recipes</p>
            </Link>
            
            <Link to="/chefs" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">
                <ChefHat size={48} className="mx-auto text-cook-red" />
              </div>
              <h2 className="text-xl font-bold mb-2">Chefs</h2>
              <p className="text-gray-600">Meet our talented culinary masters</p>
            </Link>
            
            <Link to="/uploads" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">📤</div>
              <h2 className="text-xl font-bold mb-2">Uploads</h2>
              <p className="text-gray-600">Share your cooking creations</p>
            </Link>
          </div>
          
          <Link 
            to="/chefs" 
            className="action-button-primary px-6 py-3 text-lg inline-block"
          >
            Browse Chefs
          </Link>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
