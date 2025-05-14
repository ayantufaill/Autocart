import api from "@/services/api";

export const fetchNotificationsApi = async () => {
  const response = await api.get("/notification");
  return response.data;
};

export const postNotificationsApi = async (notificationPayload: any) => {
  const response = await api.post("/notification", notificationPayload);
  return response.data;
};
