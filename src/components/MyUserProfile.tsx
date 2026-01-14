import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import api from "../services/api";
import { getFeed } from "../services/feed-service";

function MyUserProfile() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [loadingFeed, setLoadingFeed] = useState(true);
  const [feedError, setFeedError] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const image = localStorage.getItem("image");

  const [userData, setUserData] = useState({
    name: "",
    age: "",
    image: "",
    about: "",
  });

  const [editedData, setEditedData] = useState({
    name: "",
    age: "",
    image: "",
    about: "",
  });

  const token = localStorage.getItem("token");
  const userId = Number(localStorage.getItem("userId"));
  const avatarImage = localStorage.getItem("image");


  async function loadProfile() {
    try {
      const { data } = await api.get("/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUserData(data);
      setEditedData(data);
    } catch {
      alert("Erro ao carregar perfil");
    }
  }


  async function loadMyPosts() {
    try {
      setLoadingFeed(true);
      const data = await getFeed();
      setPosts(data.filter((post: any) => post.user.id === userId));
    } catch {
      setFeedError(true);
    } finally {
      setLoadingFeed(false);
    }
  }

  useEffect(() => {
    loadProfile();
    loadMyPosts();
  }, []);


  function handleEdit() {
    setIsEditing(true);
  }

  function handleCancel() {
    setEditedData(userData);
    setIsEditing(false);
  }

  async function handleSave() {
    try {
      await api.put("/users/me", editedData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUserData(editedData);
      setIsEditing(false);
    } catch {
      alert("Erro ao salvar alterações");
    }
  }

      async function handleSearch(e?: React.FormEvent) {
      if (e) e.preventDefault();
  
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }
  
      try {
        setIsSearching(true);
        const { data } = await api.get("/feed", { params: { search: searchQuery } });
        setSearchResults(data);
      } catch (err) {
        console.error(err);
        alert("Erro ao buscar posts");
      } finally {
        setIsSearching(false);
      }
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
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#C6C6C6">
                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
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
              <DropdownItem to="/profile">Meu perfil</DropdownItem>
              <DropdownItem to="/">Sair</DropdownItem>
            </Dropdown>
          )}
        </MenuContainer>
      </Top>

      <Body>
        <ContentWrapper>
          <ProfileActions>
            {!isEditing ? (
              <ActionButton onClick={handleEdit}>Editar</ActionButton>
            ) : (
              <>
                <CancelButton onClick={handleCancel}>Cancelar</CancelButton>
                <SaveButton onClick={handleSave}>Salvar</SaveButton>
              </>
            )}
          </ProfileActions>

          <ProfileBox>
            <LeftProfile>
              <ProfileAvatar
                style={{ backgroundImage: `url(${editedData.image})` }}
              />
              <ProfileName>{editedData.name}</ProfileName>
            </LeftProfile>

            <RightProfile>
              <FieldRow>
                <Label>Nome</Label>
                <Input
                  disabled={!isEditing}
                  value={editedData.name}
                  onChange={(e) =>
                    setEditedData({ ...editedData, name: e.target.value })
                  }
                />
              </FieldRow>

              <FieldRow>
                <Label>Idade</Label>
                <Input
                  type="number"
                  disabled={!isEditing}
                  value={editedData.age}
                  onChange={(e) =>
                    setEditedData({ ...editedData, age: e.target.value })
                  }
                />
              </FieldRow>

              <FieldRow>
                <Label>URL da imagem</Label>
                <Input
                  disabled={!isEditing}
                  value={editedData.image}
                  onChange={(e) =>
                    setEditedData({ ...editedData, image: e.target.value })
                  }
                />
              </FieldRow>

              <FieldRow>
                <Label>Sobre mim</Label>
                <Textarea
                  disabled={!isEditing}
                  value={editedData.about}
                  onChange={(e) =>
                    setEditedData({ ...editedData, about: e.target.value })
                  }
                />
              </FieldRow>
            </RightProfile>
          </ProfileBox>

          <FeedContainer>
            <FeedTitle>Meus posts</FeedTitle>

            {loadingFeed && <StatusText>Carregando posts...</StatusText>}
            {feedError && <StatusText>Erro ao carregar posts</StatusText>}
            {!loadingFeed && posts.length === 0 && (
              <StatusText>Nenhum post ainda.</StatusText>
            )}

            {posts.map((post) => (
              <PostBox key={post.id}>
                <PostAvatar
                  style={{ backgroundImage: `url(${post.user.image})` }}
                />
                <PostContent>
                  <PostUser>{post.user.username}</PostUser>
                  <PostDescription>{post.description}</PostDescription>
                  <PostURL onClick={() => window.open(post.link, "_blank")}>
                    {post.link}
                  </PostURL>
                </PostContent>
              </PostBox>
            ))}
          </FeedContainer>
        </ContentWrapper>
      </Body>
      <BottomBar>
        <BottomTitle>Linkr</BottomTitle>
        <BottomItem>＋</BottomItem>
        <BottomItem>🔍</BottomItem>
        <BottomItem>☰</BottomItem>
      </BottomBar>

    </Container>
  );
}

export default MyUserProfile;

const Container = styled.div`
  min-height: 100vh;
`;

const Top = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  height: 70px;
  background: #151515;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 20px;
  box-sizing: border-box;

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
    border: none;
    outline: none;
    font-size: 19px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 10px;
  font-size: 20px;
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
  color: #fff;
  font-size: 28px;
`;

const Avatar = styled.div`
  width: 53px;
  height: 53px;
  border-radius: 10%;
  background-size: cover;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 70px;
  right: 20px;
  background: #333;
  padding: 10px;
  border-radius: 8px;
`;

const DropdownItem = styled(Link)`
  color: #fff;
  text-decoration: none;
  display: block;
  margin-bottom: 10px;
`;

const Body = styled.div`
  background: #333;
  padding-top: 100px;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    padding-top: 0;
    padding-bottom: 120px;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 940px;
`;

const ProfileActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    position: absolute;
    top: 170px;
    right: 16px;
    gap: 8px;
  }
`;


const ActionButton = styled.button`
  width: 124px;
  height: 39px;
  background: #1877f2;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;

  @media (max-width: 768px) {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    font-size: 0; 

    &::before {
      content: "✏️";
      font-size: 20px;
    }
  }
`;



const SaveButton = styled(ActionButton)`
  background: #28a745;

  @media (max-width: 768px) {
    font-size: 0;

    &::before {
      content: "✓";
      font-size: 22px;
      font-weight: bold;
    }
  }
`;



const CancelButton = styled(ActionButton)`
  background: #dc3545;

  @media (max-width: 768px) {
    font-size: 0;

    &::before {
      content: "✕";
      font-size: 22px;
      font-weight: bold;
    }
  }
`;

const ProfileBox = styled.div`
  background: #171717;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  gap: 20px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0;
    border-radius: 0;
  }
`;

const LeftProfile = styled.div`
  width: 212px;
  text-align: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ProfileAvatar = styled.div`
  width: 212px;
  height: 212px;
  border-radius: 10px;
  background-size: cover;

  @media (max-width: 768px) {
    width: 100%;
    height: 220px;
    border-radius: 0;
  }
`;

const ProfileName = styled.div`
  color: #fff;
  font-size: 22px;
  margin-top: 10px;

  @media (max-width: 768px) {
    font-size: 24px;
    margin: 12px 0;
    text-align: center;
  }
`;

const RightProfile = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0 16px 16px;
  }
`;

const FieldRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
`;

const Label = styled.div`
  width: 160px;
  color: #fff;
  font-family: "Lato";

  @media (max-width: 768px) {
    width: 100%;
    font-size: 14px;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 8px;
  border-radius: 5px;
  border: none;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Textarea = styled.textarea`
  flex: 1;
  height: 80px;
  padding: 8px;
  border-radius: 5px;
  border: none;
  resize: none;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FeedTitle = styled.div`
  color: #fff;
  font-size: 43px;
  font-family: "Passion One";
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 32px;
    text-align: center;
  }
`;

const PostBox = styled.div`
  background: #171717;
  border-radius: 16px;
  padding: 18px;
  display: flex;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const PostAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-size: cover;
`;

const PostContent = styled.div`
  margin-left: 12px;
`;

const PostUser = styled.div`
  color: #fff;
  font-size: 19px;
`;

const PostDescription = styled.div`
  color: #b7b7b7;
  margin: 8px 0;
`;

const PostURL = styled.div`
  border: 1px solid #4c4c4c;
  padding: 10px;
  border-radius: 11px;
  cursor: pointer;
`;

const StatusText = styled.div`
  color: #fff;
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

const BottomItem = styled.div`
  color: #fff;
  font-size: 24px;
`;