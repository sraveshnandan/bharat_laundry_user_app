import { IBanner, IService } from "@/types";
import { Colors } from "./Colors";

// ✅ Multiple Start Points
const startPoints: { lat: number; lng: number }[] = [
  { lat: 25.48, lng: 85.72 }, // Start Point 2
  { lat: 25.46, lng: 85.69 }, // Start Point 3
];

const SearchPlaceHolder: string[] = [
  "Dry clean",
  "Ironing",
  "Shoe cleaning",
  "Steam clean",
  "Premium dry clean",
];

const AppBannerData: IBanner[] = [
  {
    title: "Explore new services",
    description: "& more offers on Bharat Laundry!.",
    image: require("@/assets/images/icons/flash_sale.png"),
    bg_color: Colors.Primary,
    cta_button_text: "Order Now",
    createdAt: "2021-03-10T05:30:00.000Z",
    updatedAt: "2021-03-10T05:30:00.000Z",
  },
  {
    title: "Get up to 50% off",
    description: "& more offers on shoe cleaning!.",
    image: require("@/assets/images/icons/shoe.png"),
    bg_color: Colors.Green,
    cta_button_text: "Order Now",
    sub_cta_text: "⏰ Delivery in 2 days*",
    createdAt: "2021-03-10T05:30:00.000Z",
    updatedAt: "2021-03-10T05:30:00.000Z",
  },
  {
    title: "Get up to 50% off",
    description: "& more offers on shoe cleaning!.",
    image: require("@/assets/images/icons/shoe.png"),
    bg_color: Colors.Green,
    cta_button_text: "Order Now",
    sub_cta_text: "Delivery in 2 days*",
    createdAt: "2021-03-10T05:30:00.000Z",
    updatedAt: "2021-03-10T05:30:00.000Z",
  },
];

const DummyServices: IService[] = [
  {
    _id: "682856db3bfbde45ab8e87d9",
    name: "Dry Cleaning",
    description: "",
    image: {
      public_id: "utlhd6wqb97df18rphgl",
      url: "https://res.cloudinary.com/dfgbxyj4n/image/upload/v1747473416/utlhd6wqb97df18rphgl.png",
    },
    categories: [],
    createdBy: "6827074ed2cac3e4aac29cc4",
    createdAt: "2025-05-17T09:28:59.850Z",
    updatedAt: "2025-05-17T09:28:59.850Z",
    __v: 0,
  },
  {
    _id: "682858baf059ccc7539e93cb",
    name: "Polishing",
    description: "",
    image: {
      public_id: "gogvcb5mghrc60yqkzhj",
      url: "https://res.cloudinary.com/dfgbxyj4n/image/upload/v1747474487/gogvcb5mghrc60yqkzhj.png",
    },
    categories: [],
    createdBy: "6827074ed2cac3e4aac29cc4",
    createdAt: "2025-05-17T09:36:58.655Z",
    updatedAt: "2025-05-17T09:36:58.655Z",
    __v: 0,
  },
  {
    _id: "6828591df059ccc7539e93ce",
    name: "Wash & Fold",
    description: "",
    image: {
      public_id: "l61cwbx2x2i0npymqvog",
      url: "https://res.cloudinary.com/dfgbxyj4n/image/upload/v1747474487/l61cwbx2x2i0npymqvog.png",
    },
    categories: [],
    createdBy: "6827074ed2cac3e4aac29cc4",
    createdAt: "2025-05-17T09:38:37.489Z",
    updatedAt: "2025-05-17T09:38:37.489Z",
    __v: 0,
  },
  {
    _id: "68285943f059ccc7539e93d1",
    name: "Wash & Iron",
    description: "",
    image: {
      public_id: "e2fguukxzib79ui7ypta",
      url: "https://res.cloudinary.com/dfgbxyj4n/image/upload/v1747474494/e2fguukxzib79ui7ypta.png",
    },
    categories: [],
    createdBy: "6827074ed2cac3e4aac29cc4",
    createdAt: "2025-05-17T09:39:15.030Z",
    updatedAt: " 2025-05-17T09:39:15.030Z",
    __v: 0,
  },
  {
    _id: "68285984f059ccc7539e93d8",
    name: "Shoe Cleaning",
    description: "",
    image: {
      public_id: "x0ijmpuwzq211oobcag3",
      url: "https://res.cloudinary.com/dfgbxyj4n/image/upload/v1747474487/x0ijmpuwzq211oobcag3.png",
    },
    categories: [],
    createdBy: "6827074ed2cac3e4aac29cc4",
    createdAt: "2025-05-17T09:40:20.057Z",
    updatedAt: "2025-05-17T09:40:20.057Z",
    __v: 0,
  },
  {
    _id: "68285a7ef059ccc7539e93dd",
    name: "Steam Iron",
    description: "",
    image: {
      public_id: "sp_w57usd",
      url: "https://res.cloudinary.com/dfgbxyj4n/image/upload/v1747475009/sp_w57usd.png",
    },
    categories: [],
    createdBy: "6827074ed2cac3e4aac29cc4",
    createdAt: "2025-05-17T09:44:30.660Z",
    updatedAt: "2025-05-17T09:44:30.660Z",
    __v: 0,
  },
  {
    _id: "68285aa8f059ccc7539e93e0",
    name: "Premium",
    description: "",
    image: {
      public_id: "p1_ewaigj",
      url: "https://res.cloudinary.com/dfgbxyj4n/image/upload/v1747475009/p1_ewaigj.png",
    },
    categories: [],
    createdBy: "6827074ed2cac3e4aac29cc4",
    createdAt: "2025-05-17T09:45:12.826Z",
    updatedAt: "2025-05-17T09:45:12.826Z",
    __v: 0,
  },
  {
    _id: "68285acff059ccc7539e93e3",
    name: "Starching",
    description: "",
    image: {
      public_id: "straching_kd5i5i",
      url: "https://res.cloudinary.com/dfgbxyj4n/image/upload/v1747475009/straching_kd5i5i.png",
    },
    categories: [],
    createdBy: "6827074ed2cac3e4aac29cc4",
    createdAt: "2025-05-17T09:45:52.003Z",
    updatedAt: "2025-05-17T10:11:24.586Z",
    __v: 0,
  },
];

const Profile1Menu = [
  {
    title: "Your bookings",
    icon: require("@/assets/images/icons/booking.png"),
    path: "/(tabs)/Laundry",
  },
  {
    title: "Address book",
    icon: require("@/assets/images/icons/address.png"),
    path: "/(tabs)/Laundry",
  },
  {
    title: "Help",
    icon: require("@/assets/images/icons/help.png"),
    path: "/(tabs)/Laundry",
    end: true,
  },
];

const Profile2Menu = [
  {
    title: "About us",
    icon: require("@/assets/images/icons/info.png"),
    path: "/(tabs)/Laundry",
  },
  {
    title: "Contact us",
    icon: require("@/assets/images/icons/call.png"),
    path: "/(tabs)/Laundry",
  },
  {
    title: "Settings",
    icon: require("@/assets/images/icons/setting.png"),
    path: "/(tabs)/Laundry",
  },
  {
    title: "Log out",
    icon: require("@/assets/images/icons/logout.png"),
    path: "/(tabs)/Laundry",
    end: true,
  },
];
export {
  AppBannerData,
  DummyServices,
  Profile1Menu,
  Profile2Menu,
  SearchPlaceHolder,
  startPoints,
};
