import api from "./api";

export async function likePost(postId: number) {
  await api.post(`/likes/${postId}`);
}

export async function unlikePost(postId: number) {
  await api.delete(`/likes/${postId}`);
}
