import api from "@/services/api";

export const fetchFollowersByIdApi = async (userId: string) => {
  const response = await api.get(`/follower/${userId}/followers`);
  return response.data;
};

export const fetchFollowingsByIdApi = async (userId: string) => {
  const response = await api.get(`/follower/${userId}/following`);
  return response.data;
};
