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
