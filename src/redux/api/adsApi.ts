import api from "@/services/api";
import { PostAdPayload } from "@/types/type";

export const postAdApi = async (payload: PostAdPayload) => {
  const response = await api.post("/ads", payload);
  return response.data;
};

export const fetchAdsApi = async (skipToken: boolean) => {
  const response = await api.get("/ads", { headers: { skipToken } });
  return response.data;
};

export const postImagesApi = async (images: File[]) => {
  const formData = new FormData();

  for (let i = 0; i < images.length; i++) {
    formData.append(`files`, images[i]);
  }

  const response = await api.post("/cloudinary/upload/multiple", formData);
  return response.data;
};

export const fetchSearchAdsApi = async ({
  search,
  status,
}: {
  search: string;
  status?: string;
}) => {
  const response = await api.get("/ads", {
    params: { itemName: search, status: status },
    // headers: { Authorization: null },
  });
  return response.data;
};

export const fetchAdByIdApi = async (id: string) => {
  const response = await api.get(`/ads/${id}`);
  return response.data;
};

export const deleteAdByIdApi = async (id: string) => {
  const response = await api.delete(`/ads/${id}`);
  return response.data;
};
