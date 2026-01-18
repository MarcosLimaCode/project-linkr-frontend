import api from "./api";
import axios from "axios";

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

export async function getUserId() {
  const token = localStorage.getItem("token");

  const result = await api.get("/user/my-profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return result.data.id;
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
  return response.data;
}

export async function updatePost(
  id: number,
  link: string,
  description: string
) {
  const backendUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  try {
    await axios.put(
      `${backendUrl}/post/${id}`,
      {
        link,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (err) {
    console.log(err);
    alert("Não foi possível atualizar o post. Tente novamente mais tarde.");
  }
}

export async function deletePost(id: number) {
  const backendUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  try {
    await axios.delete(`${backendUrl}/post/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    console.log(err);
    alert("Não foi possível apagar o post. Tente novamente mais tarde.");
  }
}
