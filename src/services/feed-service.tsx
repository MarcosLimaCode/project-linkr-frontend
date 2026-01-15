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
  const token = localStorage.getItem("token");

  const response = await api.get<PostData[]>("/feed", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function postFeed(link: string, description: string) {
  await api.post("/feed", { link, description });
}

export async function getSuggestions() {
  const token = localStorage.getItem("token");

  const response = await api.get<PostData[]>("/suggestions", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data);
  return response.data;
}
