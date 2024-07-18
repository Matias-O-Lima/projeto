//@ts-ignore
import cookieCutter from 'cookie-cutter';
import { getCookie } from 'cookies-next';
import { del, get, set } from 'idb-keyval';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist, StateStorage } from 'zustand/middleware';
import { decrypt } from '@/lib/crypt';

interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  role: string;
}

interface ICategory {
  id: string;
  name: string;
  image: string;
}

interface IProduct {
  id: string;
  name: string;
  category: string;
  image: string;
  featured: boolean;
  popularity: number;
}

interface State {
  user: IUser;
  setUser: (_: IUser) => void;
  popularCategories: ICategory[];
  setPopularCategories: (_: ICategory[]) => void;
  featuredProducts: IProduct[];
  setFeaturedProducts: (_: IProduct[]) => void;
  popularProducts: IProduct[];
  setPopularProducts: (_: IProduct[]) => void;
}

const initialCategories: ICategory[] = [
  { id: '1', name: 'Valorant', image: 'https://example.com/valorant.jpg' },
  { id: '2', name: 'Clash of Clans', image: 'https://example.com/clash_of_clans.jpg' },
  { id: '3', name: 'Fortnite', image: 'https://example.com/fortnite.jpg' },
  { id: '4', name: 'Apex Legends', image: 'https://example.com/apex_legends.jpg' },
  { id: '5', name: 'Free Fire', image: 'https://example.com/free_fire.jpg' },
  { id: '6', name: 'Roblox', image: 'https://example.com/roblox.jpg' }
];

const initialProducts: IProduct[] = [
  { id: '1', name: 'Valorant Points', category: 'Valorant', image: 'https://example.com/valorant_points.jpg', featured: true, popularity: 95 },
  { id: '2', name: 'Clash of Clans Gems', category: 'Clash of Clans', image: 'https://example.com/clash_of_clans_gems.jpg', featured: true, popularity: 90 },
  { id: '3', name: 'Fortnite V-Bucks', category: 'Fortnite', image: 'https://example.com/fortnite_vbucks.jpg', featured: true, popularity: 85 },
  { id: '4', name: 'Apex Coins', category: 'Apex Legends', image: 'https://example.com/apex_coins.jpg', featured: false, popularity: 80 },
  { id: '5', name: 'Free Fire Diamonds', category: 'Free Fire', image: 'https://example.com/free_fire_diamonds.jpg', featured: false, popularity: 75 },
  { id: '6', name: 'Roblox Robux', category: 'Roblox', image: 'https://example.com/roblox_robux.jpg', featured: false, popularity: 70 }
];

const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    console.log(`Retrieving item ${name} from storage`);
    const item = await get(name);
    console.log(`Retrieved item ${name}:`, item);
    return item || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    try {
      console.log(`Setting item ${name} to storage with value:`, value);
      await set(name, value);
    } catch (error) {
      console.error(`Failed to set item ${name} to storage with value:`, value);
      throw error;
    }
  },
  removeItem: async (name: string): Promise<void> => {
    console.log(`Removing item ${name} from storage`);
    await del(name);
  },
};

function setCookie(
  key: any,
  value: any,
  expireDays: any,
  expireHours: any,
  expireMinutes: any,
  expireSeconds: any
) {
  var expireDate = new Date();
  if (expireDays) {
    expireDate.setDate(expireDate.getDate() + expireDays);
  }
  if (expireHours) {
    expireDate.setHours(expireDate.getHours() + expireHours);
  }
  if (expireMinutes) {
    expireDate.setMinutes(expireDate.getMinutes() + expireMinutes);
  }
  if (expireSeconds) {
    expireDate.setSeconds(expireDate.getSeconds() + expireSeconds);
  }
  document.cookie =
    key +
    "=" +
    escape(value) +
    ";domain=" +
    window.location.hostname +
    ";path=/" +
    ";expires=" +
    expireDate.toUTCString();
}

function deleteCookie(name: any) {
  setCookie(name, "", null, null, null, 1);
}

const onExit = async () => {
  cookieCutter.set("@token-client", "", {
    expires: new Date(-1),
  });
  deleteCookie("@token-client");
  indexedDB.deleteDatabase("store-client");
  window.location.replace("/login")
};

export const useStore = create<State>()(
  devtools(
    persist(
      (set, get) => ({
        user: {} as IUser,
        setUser: (user: IUser) => {
          console.log('Setting user:', user);
          set(() => ({ user }));
        },
        popularCategories: initialCategories,
        setPopularCategories: (categories: ICategory[]) => {
          console.log('Setting popular categories:', categories);
          set(() => ({ popularCategories: categories }));
        },
        featuredProducts: initialProducts.filter(product => product.featured),
        setFeaturedProducts: (products: IProduct[]) => {
          console.log('Setting featured products:', products);
          set(() => ({ featuredProducts: products }));
        },
        popularProducts: initialProducts.sort((a, b) => b.popularity - a.popularity),
        setPopularProducts: (products: IProduct[]) => {
          console.log('Setting popular products:', products);
          set(() => ({ popularProducts: products }));
        },
      }),
      {
        name: 'store', // Nome da chave de armazenamento
        storage: createJSONStorage(() => localStorage)
      }
    )
  )
);

export const useToken = () => {
  const data: any = getCookie("@token-client", {});
  if (!!data) {
    return {
      token: decrypt(data),
    };
  } else {
    return {
      token: null,
    };
  }
};

export { onExit, setCookie, deleteCookie };
