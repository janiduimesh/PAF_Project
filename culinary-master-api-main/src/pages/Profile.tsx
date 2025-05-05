
import AppLayout from "@/components/AppLayout";

const Profile = () => {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="content-area max-w-2xl mx-auto">
          <h1 className="content-title">My Profile</h1>
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-8">
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-4xl">👤</span>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">John Doe</h2>
              <p className="text-gray-600 mb-4">
                Cooking enthusiast passionate about sharing delicious recipes
              </p>
              <button className="action-button-secondary">
                Edit Profile
              </button>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Account Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 text-sm">Email</label>
                  <div className="font-medium">john.doe@example.com</div>
                </div>
                <div>
                  <label className="block text-gray-600 text-sm">Member Since</label>
                  <div className="font-medium">January 1, 2023</div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Activity Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-cook-yellow/20 p-4 rounded-lg">
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-gray-600">Recipes Posted</div>
                </div>
                <div className="bg-cook-orange/20 p-4 rounded-lg">
                  <div className="text-2xl font-bold">45</div>
                  <div className="text-gray-600">Comments</div>
                </div>
                <div className="bg-cook-red/20 p-4 rounded-lg">
                  <div className="text-2xl font-bold">156</div>
                  <div className="text-gray-600">Likes Received</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
