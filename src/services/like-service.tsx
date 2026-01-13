import api from "./api";

export async function likePost(postId: number, token: string) {
  await api.post(`/likes/${postId}`, null, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export async function unlikePost(postId: number, token: string) {
  await api.delete(`/likes/${postId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

