import api from "@/services/api";

export const fetchUserByIdApi = async (id: string) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};
