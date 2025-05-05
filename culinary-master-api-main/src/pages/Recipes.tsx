
import AppLayout from "@/components/AppLayout";
import { Plus } from "lucide-react";

const Recipes = () => {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="content-area">
          <div className="flex justify-between items-center mb-6">
            <h1 className="content-title">My Recipes</h1>
            <button className="action-button-primary flex items-center gap-2">
              <Plus size={18} />
              Add Recipe
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="border rounded-lg overflow-hidden bg-white shadow-md">
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-1">Topic</h3>
                  <div className="h-32 bg-gray-100 rounded mb-4"></div>
                  <div className="flex justify-between">
                    <button className="text-cook-red border border-cook-red px-4 py-2 rounded-full hover:bg-cook-red/10">
                      DELETE
                    </button>
                    <button className="text-cook-red border border-cook-red px-4 py-2 rounded-full hover:bg-cook-red/10">
                      UPDATE
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Recipes;
