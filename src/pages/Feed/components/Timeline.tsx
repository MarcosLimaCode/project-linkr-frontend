import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect, useState } from "react";
import { IoHeart, IoHeartOutline, IoPencil, IoTrashBin } from "react-icons/io5";
import styled from "styled-components";
import {
  deletePost,
  getFeed,
  getUserId,
  updatePost,
} from "../../../services/feed-service";
import api from "../../../services/api";
import { Link, useNavigate } from "react-router-dom";

export default function Timeline() {
  const [editingPost, setEditingPost] = useState<any | null>(null);
  const [deletingPost, setDeletingPost] = useState<any | null>(null);
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [posts, setPosts] = useState<any[]>([]);
  const [loadingFeed, setLoadingFeed] = useState(true);
  const [feedError, setFeedError] = useState(false);
  const navigate = useNavigate();
  const imageError =
    "https://lojaintegrada.com.br/hub//wp-content/uploads/2023/05/erro-404-1024x684.webp";
  const [loginId, setLoginId] = useState(true);

  useEffect(() => {
    if (editingPost) {
      setLink(editingPost.link);
      setDescription(editingPost.description);
    }
  }, [editingPost]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setEditingPost(null);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [editingPost]);

  useEffect(() => {
    async function loadFeed() {
      try {
        setLoadingFeed(true);
        const data = await getFeed();
        const id = await getUserId();
        setLoginId(id);
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
      <SkeletonTheme
        baseColor="#202020"
        highlightColor="#444"
        width={620}
        height={340}
        borderRadius={25}
      >
        {loadingFeed && <StyledPostSkeleton count={20} />}
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
            <UserHeader>
              <UserBox to={`/user/${post.userId}`}>
                <AvatarNewPost
                  style={{ backgroundImage: `url(${post.user.image})` }}
                />
                <UserPost>{post.user.username}</UserPost>
              </UserBox>
              <PostHeader>
                {post.userId === loginId && (
                  <MenuLeft>
                    <EditButton onClick={() => setEditingPost(post)}>
                      <IoPencil size={25} />
                    </EditButton>
                    {editingPost && (
                      <EditContainer onClick={() => setEditingPost(null)}>
                        <Box onClick={(e) => e.stopPropagation()}>
                          <TitleEdit>Link do post:</TitleEdit>
                          <InputLink
                            type="text"
                            defaultValue={editingPost.link}
                            onChange={(e) => setLink(e.target.value)}
                          />
                          <DescriptionEdit>Descrição do post:</DescriptionEdit>
                          <InputDescription
                            defaultValue={editingPost.description}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                          <ButtonBox>
                            <CloseButton onClick={() => setEditingPost(null)}>
                              Fechar
                            </CloseButton>
                            <UpdateButton
                              onClick={async () => {
                                await updatePost(
                                  editingPost.id,
                                  link,
                                  description
                                );
                                setEditingPost(null);
                                navigate(0);
                              }}
                            >
                              Atualizar
                            </UpdateButton>
                          </ButtonBox>
                        </Box>
                      </EditContainer>
                    )}
                    <DeleteButton onClick={() => setDeletingPost(post)}>
                      <IoTrashBin size={25} />
                    </DeleteButton>
                    {deletingPost && (
                      <DeleteContainer onClick={() => setDeletingPost(null)}>
                        <BoxDelete onClick={(e) => e.stopPropagation()}>
                          <TitleDelete>
                            Você tem certeza que gostaria de remover a postagem?
                          </TitleDelete>
                          <ButtonBoxDelete>
                            <CancelButton onClick={() => setDeletingPost(null)}>
                              Cancelar
                            </CancelButton>
                            <ConfirmButton
                              onClick={async () => {
                                await deletePost(deletingPost.id);
                                setDeletingPost(null);
                                navigate(0);
                              }}
                            >
                              Confirmar
                            </ConfirmButton>
                          </ButtonBoxDelete>
                        </BoxDelete>
                      </DeleteContainer>
                    )}
                  </MenuLeft>
                )}
              </PostHeader>
            </UserHeader>
            <PostContent>
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
                <LikesCount>
                  {post.likesCount} {post.likesCount === 1 ? "like" : "likes"}
                </LikesCount>
              </LikeContainer>
              <PostBody>
                <PostDescription>{post.description}</PostDescription>

                <PostURL onClick={() => window.open(post.link, "_blank")}>
                  <Content>
                    <Title>
                      {post.metadata.title || "Título indisponível"}
                    </Title>
                    <Description>
                      {post.metadata.description || "Descrição indisponível"}
                    </Description>
                    <Url>{post.link}</Url>
                  </Content>
                  <Image src={post.metadata.images[0] || imageError} />
                </PostURL>
              </PostBody>
            </PostContent>
          </AllPostBox>
        ))}
      </SkeletonTheme>
    </>
  );
}

const AllPostBox = styled.div`
  display: flex;
  flex-direction: column;
  background: #171717;
  border-radius: 25px;
  padding: 25px;
  display: flex;
  margin-bottom: 20px;
  position: relative;
`;

const AvatarNewPost = styled.div`
  width: 50px;
  height: 50px;

  position: absolute;
  border-radius: 26.5px;
  background-size: cover;
  background-position: center;
  border: 5px solid #333333;
`;

const UserHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const UserBox = styled(Link)`
  display: inline-flex;
  align-items: center;
  border-radius: 26.5px;
  text-decoration: none;
`;

const UserPost = styled.div`
  padding: 0 15px;

  margin-left: 55px;
  height: 39px;
  display: flex;
  align-items: center;

  font-family: "Lato";
  font-size: 19px;
  font-weight: 400;
  color: #ffffff;
  background: #333333;
  border-radius: 0 15px 15px 0;
  white-space: nowrap;
  border-right: 8px solid #333333;
`;

const PostContent = styled.form`
  display: flex;
  flex-direction: row;
  padding-bottom: 10px;
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
  width: 100vw;
  margin-top: 8px;
  margin-left: 10px;
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

  line-height: 1.4;
`;

const PostURL = styled.div`
  min-height: max-content;
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  border: 1px solid #4c4c4c;
  border-radius: 8px;
  font-family: "Lato";
  font-size: 14px;
  color: #4d4d4d;
  word-break: break-all;
  overflow-wrap: break-word;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const Image = styled.img`
  width: 153px;
  max-height: fit-content;
  object-fit: cover;
  margin-left: 12px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
`;

const Content = styled.div`
  max-width: 70%;
  max-height: fit-content;
  display: flex;
  flex-direction: column;
  margin: 12px;
`;

const Title = styled.div`
  font-weight: 400;
  font-size: 16px;
  margin-bottom: 15px;
  color: #cecece;
`;

const Description = styled.div`
  font-size: 11px;
  color: #555;
  margin-bottom: 8px;
`;

const Url = styled.div`
  font-size: 11px;
  font-style: italic;
  color: #555;
  margin-bottom: 8px;
`;

const LikesCount = styled.div`
  font-family: "Lato";
  font-size: 11px;
  color: #b7b7b7;
  margin-top: 5px;
`;

const LikeContainer = styled.div`
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  margin-right: 10px;
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

const EditContainer = styled.div`
  font-family: "Lato", sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(12px);
`;

const EditButton = styled.div`
  margin-right: 10px;
  color: white;
  cursor: pointer;
`;

const Box = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  height: 400px;
  background-color: #333333;
  border-radius: 12px;
  z-index: 11;
`;

const TitleEdit = styled.h2`
  color: white;
  margin: 37px 50px 10px 50px;
`;

const InputLink = styled.input`
  width: 80%;
  height: 40px;
  border-radius: 8px;
  margin: 0px 50px 10px 50px;

  border: none;
  padding: 0 10px;
  font-size: 16px;
`;

const DescriptionEdit = styled.h2`
  color: white;
  margin: 40px 50px 10px 50px;
`;

const InputDescription = styled.textarea`
  width: 80%;
  height: 100px;
  margin: 0px 50px 10px 50px;
  border-radius: 8px;
  border: none;
  padding: 10px;
  font-size: 16px;
`;

const ButtonBox = styled.div`
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 80px;
`;

const CloseButton = styled.button`
  width: 130px;
  height: 31px;
  background: #ffffff;
  color: #1877f2;
  margin-right: 30px;
  border-radius: 5px;
  border: none;
  font-weight: 700;
  cursor: pointer;
`;

const UpdateButton = styled.button`
  width: 130px;
  height: 31px;
  background: #1877f2;
  color: #ffffff;
  border-radius: 5px;
  border: none;
  font-weight: 700;
  cursor: pointer;
`;

const DeleteContainer = styled.div`
  font-family: "Lato", sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(12px);
`;

const DeleteButton = styled.div`
  margin-right: 10px;
  color: white;
  cursor: pointer;
`;

const BoxDelete = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 260px;
  background-color: #333333;
  border-radius: 20px;
  z-index: 100;
`;

const TitleDelete = styled.h2`
  color: white;
  font-size: 34px;
  text-align: center;
  margin: 37px 50px 10px 50px;
`;

const ButtonBoxDelete = styled.div`
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 80px;
`;

const CancelButton = styled.button`
  width: 130px;
  height: 31px;
  background: #ffffff;
  color: #1877f2;
  margin-right: 30px;
  border-radius: 5px;
  border: none;
  font-weight: 700;
  cursor: pointer;
`;

const ConfirmButton = styled.button`
  width: 130px;
  height: 31px;
  background: #1877f2;
  color: #ffffff;
  border-radius: 5px;
  border: none;
  font-weight: 700;
  cursor: pointer;
`;

const StyledPostSkeleton = styled(Skeleton)`
  margin-bottom: 5px;
  display: block;
`;
