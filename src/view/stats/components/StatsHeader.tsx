"use client";

interface StatsHeaderProps {
  onEdit: (stats: any) => void;
}

export const StatsHeader: React.FC<StatsHeaderProps> = ({ onEdit }) => {
  const handleEdit = () => {
    // Create a placeholder stats object for editing
    const placeholderStats = {
      fedPeople: { amount: 0, description: "people fed", _id: "" },
      providedWithClothing: {
        amount: 0,
        description: "provided with clothing",
        _id: "",
      },
      providedWithWater: {
        amount: 0,
        description: "supplied with water",
        _id: "",
      },
      receivedMedications: {
        amount: 0,
        description: "received medicines",
        _id: "",
      },
      fedAnimals: { amount: 0, description: "fed animals", _id: "" },
      providedWithElectricity: {
        amount: 0,
        description: "provided with electricity",
        _id: "",
      },
    };
    onEdit(placeholderStats);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <button
          onClick={handleEdit}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Edit Statistics
        </button>
      </div>
    </div>
  );
};
