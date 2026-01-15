import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getFeed } from "../services/feed-service";
import api from "../services/api";
import axios from "axios";
import { IoPencil, IoTrashBin } from "react-icons/io5";
import { FaUserMinus, FaUserPlus } from "react-icons/fa";

function UsersProfile() {
  const followsYou = true;

  const [menuOpen, setMenuOpen] = useState(false);

  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [posts, setPosts] = useState<any[]>([]);
  const [loadingFeed, setLoadingFeed] = useState(true);
  const [feedError, setFeedError] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const backendUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const image = localStorage.getItem("image");
  const navigate = useNavigate();

  const [isFollowing, setIsFollowing] = useState(false);

  function handleFollowToggle() {
  setIsFollowing(prev => !prev);
}


  const isDisabled = !link;

  useEffect(() => {
    async function loadFeed() {
      try {
        setLoadingFeed(true);
        const data = await getFeed();
        setPosts(data);
      } catch (error) {
        setFeedError(true);
      } finally {
        setLoadingFeed(false);
      }
    }

    loadFeed();
  }, []);

  async function handlePost(e: React.FormEvent) {
    e.preventDefault();

    try {
      await axios.post(
        `${backendUrl}/feed`,
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
      navigate(0);
    } catch (err) {
      console.log(err);
      alert("Erro inesperado. Tente novamente mais tarde.");
    }
  }

  const userId = Number(localStorage.getItem("userId"));

  function hasUserLiked(likes?: { userId: number }[]) {
    if (!likes || likes.length === 0) return false;

    return likes.some((like) => like.userId === userId);
  }

  async function handleLike(postId: number) {
    try {
      const { data } = await api.post(`/likes/${postId}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.id === postId) {
            const likes = post.likes ?? [];
            if (data.liked) {
              return {
                ...post,
                likes: [
                  ...likes,
                  { userId: Number(localStorage.getItem("userId")) },
                ],
              };
            } else {
              return {
                ...post,
                likes: likes.filter(
                  (like: any) =>
                    like.userId !== Number(localStorage.getItem("userId"))
                ),
              };
            }
          }
          return post;
        })
      );
    } catch (err) {
      console.log(err);
      alert("Erro ao curtir/descurtir o post");
    }
  }

  async function handleSearch(e?: React.FormEvent) {
    if (e) e.preventDefault();
  }

  return (
    <Container>
      <Top>
        <Title>Linkr</Title>
        <SearchBar as="form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Procurar linkrs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchIcon onClick={() => handleSearch()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#C6C6C6"
            >
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </svg>
          </SearchIcon>
        </SearchBar>
        <MenuContainer onClick={() => setMenuOpen(!menuOpen)}>
          <Avatar
            style={{
              backgroundImage: `url(${image})`,
            }}
          />
          <MenuButton>☰</MenuButton>

          {menuOpen && (
            <Dropdown>
              <DropdownItem to="/user/my-profile">Meu perfil</DropdownItem>
              <DropdownItem to="/">Sair</DropdownItem>
            </Dropdown>
          )}
        </MenuContainer>
      </Top>

      <Body>
        <ContentWrapper>

          <UserContainer>
            <UserProfileCard>
                <UserCover
                style={{ backgroundImage: `url(${image})` }}
                />

                <UserNameCard>Nome do Usuário</UserNameCard>

                <FollowSection>
                <FollowButton
                isFollowing={isFollowing}
                onClick={handleFollowToggle}
                >
                {isFollowing ? "Parar de seguir" : "Seguir"}

                {isFollowing ? (
                    <FaUserMinus size={16} />
                ) : (
                    <FaUserPlus size={16} />
                )}

                {followsYou && !isFollowing && (
                    <FollowBackInfo>Segue você</FollowBackInfo>
                )}
                </FollowButton>


                <FollowNumbers>
                    <FollowInfo>
                        <span>123 seguidores</span>
                    </FollowInfo>
                    <FollowInfo>
                        <span>87 seguindo</span>
                    </FollowInfo>
                </FollowNumbers>
                </FollowSection>

                <UserInfoSection>
                <UserInfoItem>
                    <strong>Sobre mim</strong>
                    <p>Texto sobre o usuário</p>
                </UserInfoItem>

                <UserInfoItem>
                    <strong>Idade</strong>
                    <p>31 anos</p>
                </UserInfoItem>

                <UserInfoItem>
                    <strong>Usuário desde</strong>
                    <p>2023</p>
                </UserInfoItem>
                </UserInfoSection>
            </UserProfileCard>
        </UserContainer>

        <FeedContainer>

        {loadingFeed && <StatusText>Carregando posts...</StatusText>}

        {feedError && (
            <StatusText>
            Um erro aconteceu. Atualize a página ou tente novamente em
            alguns minutos.
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

            <LikeContainer onClick={() => handleLike(post.id)}>
                <HeartIcon liked={hasUserLiked(post.likes)} />
                <LikesCount>{post.likes?.length ?? 0}</LikesCount>
            </LikeContainer>
            </AllPostBox>
        ))}
        </FeedContainer>


        </ContentWrapper>
      </Body>
        <BottomBar>
        <BottomTitle>Perfil</BottomTitle>

        <BottomActionButton
            isFollowing={isFollowing}
            onClick={handleFollowToggle}
        >
            {isFollowing ? "−" : "+"}
        </BottomActionButton>

        <BottomIconButton onClick={handleSearch}>
            🔍
        </BottomIconButton>

        <BottomAvatar
            style={{ backgroundImage: `url(${image})` }}
        />
        </BottomBar>


    </Container>
  );
}

export default UsersProfile;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Top = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: var(--bg-header);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  z-index: 10;
  @media (max-width: 768px) {
  display: none;
}

`;
const Title = styled.div`
  font-family: "Passion One";
  font-size: 49px;
  color: #fff;
`;

const SearchBar = styled.div`
  position: relative;
  width: 563px;
  height: 45px;
  background: #fff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0 10px;

  input {
    width: 100%;
    height: 90%;
    border-radius: 8px;
    border: none;
    outline: none;
    font-family: "Lato";
    font-size: 19px;
    font-weight: 400;
    color: #c6c6c6;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 10px;
  font-size: 20px;
`;

const EditButton = styled.div`
  margin-right: 10px;
  color: white;
`;
const DeleteButton = styled.div`
  color: white;
`;

const MenuContainer = styled.div`
  font-family: "Lato";
  display: flex;
  gap: 10px;
  align-items: center;
  background: #333;
  padding: 5px 8px;
  border-radius: 10px;
  position: relative;
  cursor: pointer;
`;

const MenuButton = styled.div`
  font-size: 28px;
  color: #fff;
`;

const Avatar = styled.div`
  width: 53px;
  height: 53px;
  border-radius: 10%;
  background-size: cover;
  background-position: center;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 65px;
  right: 0;
  background: #333;
  padding: 4px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;

const DropdownItem = styled(Link)`
  background: #151515;
  color: #fff;
  text-align: center;
  text-decoration: none;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;

  &:hover {
    background: #555;
  }
`;

const Body = styled.div`
  background: var(--bg-main);
  background: #333;
  flex: 1;
  display: flex;
  justify-content: center;
    @media (max-width: 768px) {
    padding-bottom: 120px;
    }
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 24px;
  width: 100%;
  max-width: 940px;
  padding-top: 100px;

  flex-direction: row-reverse;

  @media (max-width: 768px) {
    flex-direction: column;
    padding-top: 0;
    align-items: center;
  }
`;



const FeedContainer = styled.div`
  width: 615px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0 16px;
  }
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


const UserContainer = styled.div`
  position: sticky;
  top: 165px;
  width: 237px;

  @media (max-width: 768px) {
    position: static;
    width: 100%;
    background: #333;
  }
`;




const StatusText = styled.div`
  color: #fff;
  font-family: "Lato";
  margin: 20px 0;
`;

const LikesCount = styled.div`
  font-family: "Lato";
  font-size: 11px;
  color: #b7b7b7;
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

  cursor: pointer;
`;

const HeartIcon = styled.div<{ liked: boolean }>`
  font-size: 20px;
  line-height: 1;
  user-select: none;

  color: ${({ liked }) => (liked ? "#AC0000" : "#FFFFFF")};

  &:before {
    content: "${({ liked }) => (liked ? "❤️" : "🤍")}";
  }
`;

const UserProfileCard = styled.div`
  width: 237px;
  height: 600px;

  background: var(--bg-card);
  border-radius: 16px;

  display: flex;
  flex-direction: column;
  align-items: center;

  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    border-radius: 0;
  }
`;



const UserCover = styled.div`
  width: 100%;
  height: 200px;

  background-size: cover;
  background-position: center;

  @media (max-width: 768px) {
    width: 100vw;
    height: 300px;
    border-radius: 0;
  }
`;


const UserNameCard = styled.div`
  width: 237px;
  height: 106px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-family: "Lato";
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  text-align: center;

    @media (max-width: 768px) {
    text-align: center;
  }
`;

const FollowSection = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FollowButton = styled.button<{ isFollowing: boolean }>`
  width: 199px;
  height: 42px;
  background: ${({ isFollowing }) =>
    isFollowing ? "#949494" : "#1877f2"};
  border: none;
  border-radius: 5px;
  color: ${({ isFollowing }) =>
    isFollowing ? "#0B0B0B" : "#ffffff"};
  font-family: "Lato";
  font-size: 16px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: none;
  }
`;

const FollowBackInfo = styled.span`
  font-family: "Lato";
  font-size: 12px;
  color: #e0e0e0;

  @media (max-width: 768px) {
    display: none;
  }
`;



const FollowNumbers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: center;
    gap: 16px;
  }
`;


const FollowInfo = styled.span`
  width: 199px;
  height: 21px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Lato";
  font-size: 14px;
  font-weight: 400;
  color: #ffffff;
  background-color: #333333;
  border-radius: 5px;

    @media (max-width: 768px) {
    font-size: 15px;
    font-weight: 500;
  }
`;

const UserInfoSection = styled.div`
  width: 237px;
  height: 158px;

  background: var(--bg-section);
  border-radius: 6px;

  padding: 16px 16px;

  display: flex;
  flex-direction: column;
  gap: 10px;

  justify-content: center;

  @media (max-width: 768px) {
  margin: 20px auto;
    width: 100%;

}
`;


const UserInfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;

  padding-left: 4px;

  font-family: "Lato";
  font-size: 13px;
  color: #c6c6c6;

  strong {
    min-width: 78px; 
    color: #ffffff;
    font-weight: 700;
    white-space: nowrap;
  }

  p {
    margin: 0;
    line-height: 1.3;
    word-break: break-word;
  }
`;

const BottomBar = styled.div`
  display: none;

  @media (max-width: 768px) {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);

    width: 92%;
    height: 60px;

    background: rgba(21, 21, 21, 0.9);
    backdrop-filter: blur(6px);

    border-radius: 30px;

    display: flex;
    align-items: center;
    justify-content: space-around;

    z-index: 20;
  }
`;

const BottomTitle = styled.div`
  color: #fff;
  font-family: "Passion One";
  font-size: 20px;
`;

const BottomActionButton = styled.button<{ isFollowing: boolean }>`
  width: 36px;
  height: 36px;

  border-radius: 50%;
  border: none;

  background: ${({ isFollowing }) =>
    isFollowing ? "#949494" : "#1877f2"};

  color: ${({ isFollowing }) =>
    isFollowing ? "#0B0B0B" : "#ffffff"};

  font-size: 24px;
  font-weight: bold;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
`;

const BottomIconButton = styled.button`
  width: 36px;
  height: 36px;

  border-radius: 50%;
  border: none;

  background: #333;
  color: #fff;

  font-size: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
`;

const BottomAvatar = styled.div`
  width: 36px;
  height: 36px;

  border-radius: 50%;
  background-size: cover;
  background-position: center;

  border: 2px solid #1877f2;
`;
