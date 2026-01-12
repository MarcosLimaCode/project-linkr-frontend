import api from "./api";

export type PostData = {
  id: number;
  link: string;
  description: string;
  createdAt: string;
  user: {
    id: number;
    username: string;
    image: string;
  };
  likes: { userId: number }[];
};

export async function getFeed() {
  const response = await api.get<PostData[]>("/feed");
  return response.data;
}

export async function postFeed(link: string, description: string) {
  await api.post("/feed", { link, description });
}
