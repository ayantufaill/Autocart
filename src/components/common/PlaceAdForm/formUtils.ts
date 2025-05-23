export interface PlaceAdState {
  category: string;
  phone: string;
  location: string;
  currency: string;
  price: string;
  description: string;
  status: string;
  adType: string;
  licenseNumber: string;
  mileage: string;
  mileageUnit: string;
  motStatus: string;
  commercialMake: string;
  commercialModel: string;
  yearOfProduction: string;
  engineSize: string;
  loadCapacity: string;
}

export interface FormData {
  adImages: File[];
  storyImages: File[];
}
