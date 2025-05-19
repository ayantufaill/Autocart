export interface registerUser {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface loginUser {
  email: string;
  password: string;
}

export interface PostAdPayload {
  categoryId: string;
  uploadImagesForAd: string[];
  uploadImagesForStory: string[];
  vehicleLicenseNumber: string;
  itemName: string;
  status: string; // change to specific status
  condition: string;
  adType: string;
  phoneNumber: string;
  location: string;
  price: number;
  priceCurrency: string;
  descriptions: string;
  commercialModel: string;
  commercialsMake: string;
  mileageParameter: string;
  mileage: number;
  loadCapacity: number;
  yearOfProduction: number;
  engineSize: number;
}

export interface Ad extends PostAdPayload {
  id: string;
  likes: number;
  shares: number;
  views: number;
  user: {
    name: string;
    role: string;
    id: string;
  };
  createDate: string;
}

export interface Follower {
  createdAt: string;
  follower: {
    address: string;
    email: string;
    id: string;
    name: string;
    phoneNumber: string;
    profileImage: string;
  };
  followerId: string;
  followingId: string;
  id: string;
  // updatedAt: "2025-05-19T11:09:20.347Z";
}

export interface Following {
  createdAt: string;
  followerId: string;
  following: {
    address: string;
    email: string;
    id: string;
    name: string;
    phoneNumber: string;
    profileImage: string;
  };
  followingId: string;
  id: string;
}

export interface Notification {
  content: string;
  createdAt: string;
  id: string;
  isBroadcast: boolean;
  isRead: boolean;
  link: string;
  type: string;
  updatedAt: string;
  userId: string;
}

export interface notificationPayload {
  userId: string;
  content: string;
  link: string;
  type: string;
  isRead: boolean;
  isBroadcast: boolean;
}
