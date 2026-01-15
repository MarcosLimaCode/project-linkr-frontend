import { useEffect, useState } from "react";
import { IoHeart, IoHeartOutline, IoPencil, IoTrashBin } from "react-icons/io5";
import styled from "styled-components";
import { getFeed } from "../../../services/feed-service";
import api from "../../../services/api";

export default function Timeline() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loadingFeed, setLoadingFeed] = useState(true);
  const [feedError, setFeedError] = useState(false);

  useEffect(() => {
    async function loadFeed() {
      try {
        setLoadingFeed(true);
        const data = await getFeed();
        setPosts(data);
      } catch (error) {
        console.log(error);
        setFeedError(true);
      } finally {
        setLoadingFeed(false);
      }
    }
    loadFeed();
  }, []);

  async function handleLike(postId: number) {
    const token = localStorage.getItem("token");

    try {
      const { data } = await api.post(`/post/${postId}/like`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                likesCount: data.likesCount,
                liked: data.liked,
              }
            : post
        )
      );
    } catch {
      alert("Erro ao curtir post");
    }
  }

  return (
    <>
      {loadingFeed && <StatusText>Carregando posts...</StatusText>}
      {feedError && (
        <StatusText>
          Um erro aconteceu. Atualize a página ou tente novamente em alguns
          minutos.
        </StatusText>
      )}

      {!loadingFeed && posts.length === 0 && (
        <StatusText>Nenhuma postagem no momento...</StatusText>
      )}

      {posts.map((post) => (
        <AllPostBox key={post.id}>
          <AvatarNewPost
            style={{ backgroundImage: `url(${post.user.image})` }}
          />

          <PostContent>
            <PostHeader>
              <UserPost>{post.user.username}</UserPost>
              <MenuLeft>
                <EditButton>
                  <IoPencil size={25} />
                </EditButton>
                <DeleteButton>
                  <IoTrashBin size={25} />
                </DeleteButton>
              </MenuLeft>
            </PostHeader>

            <PostBody>
              <PostDescription>{post.description}</PostDescription>

              <PostURL onClick={() => window.open(post.link, "_blank")}>
                {post.link}
              </PostURL>
            </PostBody>
          </PostContent>

          <LikeContainer
            onClick={() => {
              handleLike(post.id);
            }}
          >
            {post.liked ? (
              <IoHeart size={20} color="red" />
            ) : (
              <IoHeartOutline size={20} color="#FFFFFF" />
            )}
            <LikesCount>{post.likesCount} likes</LikesCount>
          </LikeContainer>
        </AllPostBox>
      ))}
    </>
  );
}

const EditButton = styled.div`
  margin-right: 10px;
  color: white;
`;
const DeleteButton = styled.div`
  color: white;
`;

const AllPostBox = styled.div`
  background: #171717;
  border-radius: 16px;
  padding: 18px;
  display: flex;
  margin-bottom: 20px;
  position: relative;
`;

const AvatarNewPost = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 26.5px;
  background-size: cover;
  background-position: center;
  border: 5px solid #333333;
`;

const UserPost = styled.div`
  padding: 0 16px;

  height: 39px;
  display: flex;
  align-items: center;

  font-family: "Lato";
  font-size: 19px;
  font-weight: 400;
  color: #ffffff;

  background-color: #333333;
  border-radius: 0 15px 15px 0;
  white-space: nowrap;
`;

const PostContent = styled.form`
  font-family: "Lato";
  font-weight: 300;
  flex: 1;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
`;

const MenuLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const PostBody = styled.div`
  margin-top: 8px;
  position: relative;
`;

const PostDescription = styled.div`
  min-height: 40px;
  padding: 8px 0;

  display: flex;
  align-items: center;

  font-family: "Lato";
  font-weight: 400;
  font-size: 17px;
  color: #b7b7b7;

  margin-bottom: 12px;
  line-height: 1.4;
`;

const PostURL = styled.div`
  border: 1px solid #4c4c4c;
  border-radius: 11px;
  padding: 12px;
  font-family: "Lato";
  font-size: 14px;
  color: #4d4d4d;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;

const LikesCount = styled.div`
  font-family: "Lato";
  font-size: 11px;
  color: #b7b7b7;
  margin-top: 5px;
`;

const LikeContainer = styled.div`
  position: absolute;
  bottom: 8px;
  left: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  left: 22px;
  padding-bottom: 10px;

  cursor: pointer;
`;

const StatusText = styled.div`
  color: #fff;
  font-family: "Lato";
  margin: 20px 0;
`;
