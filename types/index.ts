export interface IUser {
  _id?: string;
  name?: string;
  email?: string;
  phone?: string;
  avatar?: {
    public_id?: string;
    url?: string;
  };
  phoneVerified?: boolean;
  address?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IBanner {
  _id?: string;
  title: string;
  description: string;
  image?: ImageData;
  bg_color: string;
  cta_button_text: string;
  sub_cta_text?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IService {
  _id?: string;
  name: string;
  description: string;
  image: {
    public_id: string;
    url: string;
  };
  categories?: string[];
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
