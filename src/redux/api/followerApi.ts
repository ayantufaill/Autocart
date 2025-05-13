import api from "@/services/api";

export const fetchFollowersByIdApi = async (userId: string) => {
  const response = await api.get(`/follower/${userId}/followers`);
  return response.data;
};

export const fetchFollowingsByIdApi = async (userId: string) => {
  const response = await api.get(`/follower/${userId}/following`);
  return response.data;
};

export const followByIdApi = async (followerId: string, followingId: string) => {
  const response = await api.post(
    `/follower/${followerId}/follow/${followingId}`
  );
  return response.data;
};

export const unfollowByIdApi = async (followerId: string, followingId: string) => {
  const response = await api.delete(
    `/follower/${followerId}/unfollow/${followingId}`
  );
  return response.data;
};