
import AppLayout from "@/components/AppLayout";

const Uploads = () => {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="content-area">
          <h1 className="content-title">My Uploads</h1>
          <div className="flex justify-center items-center p-12">
            <div className="text-center">
              <img 
                src="/public/lovable-uploads/6dd8dc8f-77a9-45d0-bb31-b36b499999cd.png" 
                alt="Recipe Book"
                className="max-w-xs mx-auto mb-6" 
              />
              <button className="action-button-primary px-6 py-3 text-lg">
                GO TO MY RECIPES
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Uploads;
