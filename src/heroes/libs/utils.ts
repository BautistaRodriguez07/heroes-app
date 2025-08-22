export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "activo":
      return "bg-green-500";
    case "inactivo":
      return "bg-gray-500";
    case "retirado":
      return "bg-blue-500";
    default:
      return "bg-gray-500";
  }
};

export const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case "héroe":
      return "bg-blue-500";
    case "villano":
      return "bg-red-500";
    case "antihéroe":
      return "bg-purple-500";
    default:
      return "bg-gray-500";
  }
};
