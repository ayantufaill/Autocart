import api from "@/services/api";
import { notificationPayload } from "@/types/type";

export const fetchNotificationsApi = async () => {
  const response = await api.get("/notification");
  return response.data;
};

export const postNotificationsApi = async (
  notificationPayload: notificationPayload
) => {
  const response = await api.post("/notification", notificationPayload);
  return response.data;
};
