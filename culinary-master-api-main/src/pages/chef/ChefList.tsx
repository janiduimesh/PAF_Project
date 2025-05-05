import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ChefModel } from "@/types/ChefModel";
import { getAllChefs, deleteChef } from "@/services/chefService";
import { ChefHat, Plus, Edit, Trash2 } from "lucide-react";
import AppLayout from "@/components/AppLayout";

const ChefList = () => {
  const [chefs, setChefs] = useState<ChefModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchChefs();
  }, []);

  const fetchChefs = async () => {
    try {
      setLoading(true);
      const data = await getAllChefs();
      setChefs(data);
    } catch (error) {
      console.error("Error fetching chefs:", error);
      toast({
        title: "Error",
        description: "Failed to load chef data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteChef = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this chef?")) return;
    
    try {
      await deleteChef(id);
      toast({
        title: "Success",
        description: "Chef deleted successfully",
      });
      fetchChefs();
    } catch (error) {
      console.error("Error deleting chef:", error);
      toast({
        title: "Error",
        description: "Failed to delete chef",
        variant: "destructive",
      });
    }
  };

  const handleAddChef = () => {
    navigate("/chefs/add");
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="content-area">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Chefs</h1>
            <button 
              onClick={handleAddChef}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              <Plus size={18} /> Add Chef
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : chefs.length === 0 ? (
            <div className="text-center py-10">
              <ChefHat className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <p className="text-xl">No chefs found</p>
              <p className="text-gray-500 mt-2">Add a chef to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {chefs.map((chef) => (
                <div key={chef.id} className="border rounded-lg overflow-hidden shadow-md">
                  <div className="h-48 overflow-hidden bg-gray-200">
                    {chef.photoUrl ? (
                      <img 
                        src={chef.photoUrl} 
                        alt={chef.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <ChefHat size={64} className="text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-1">{chef.name}</h3>
                    <p className="text-blue-600 font-medium">{chef.company}</p>
                    <p className="text-sm text-gray-600 mt-2">{chef.contactNumber}</p>
                    <p className="text-sm text-gray-600">{chef.email}</p>
                    <p className="text-sm text-gray-600 mb-4">{chef.address}</p>
                    <div className="flex justify-between">
                      <button 
                        onClick={() => navigate(`/chefs/edit/${chef.id}`)}
                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 flex items-center gap-1"
                      >
                        <Edit size={16} /> Update
                      </button>
                      <button 
                        onClick={() => chef.id && handleDeleteChef(chef.id)}
                        className="bg-white text-red-500 border border-red-500 px-4 py-2 rounded-md hover:bg-red-50 flex items-center gap-1"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default ChefList;
