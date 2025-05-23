import api from "@/services/api";

export const fetchStoiresApi = async () => {
  const response = await api.get("/story");
  return response.data;
};

export const fetchTrendingStoriesApi = async () => {
  const response = await api.get("/story/trending");
  return response.data;
};

export const fetchViewedStoriesApi = async () => {
  const response = await api.get("/story/viewed-stories"); // change
  return response.data;
};

export const fetchFollowingStroiesApi = async () => {
  const response = await api.get("/story/following-stories"); // change
  return response.data;
};
