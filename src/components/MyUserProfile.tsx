import { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../services/api";
import { getFeed } from "../services/feed-service";
import Header from "../pages/Feed/components/Header";
import TimelineProfile from "../pages/UserProfile/components/TimelineProfile";

function MyUserProfile() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loadingFeed, setLoadingFeed] = useState(true);
  const [feedError, setFeedError] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState<{
    id: number | null;
    name: string;
    age: string;
    image: string;
    about: string;
    }>({
    id: null,
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

  async function loadProfile() {
  try {
    const { data } = await api.get("/user/my-profile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const formattedUser = {
      id: data.id,
      name: data.username ?? "",
      age: data.age?.toString() ?? "",
      image: data.image ?? "",
      about: data.about ?? "",
    };

    setUserData(formattedUser);
    setEditedData(formattedUser);
  } catch {
    alert("Erro ao carregar perfil");
  }
}



  async function loadMyPosts() {
  try {
    setLoadingFeed(true);
    const data = await getFeed();

    setPosts(
      data.filter(
        (post: any) => Number(post.userId) === Number(userData.id)
      )
    );
  } catch {
    setFeedError(true);
  } finally {
    setLoadingFeed(false);
  }
}


  useEffect(() => {
    loadProfile();
  }, []);

  useEffect(() => {
    if (userData.id) {
      loadMyPosts();
    }
  }, [userData.id]);

  function handleEdit() {
    setIsEditing(true);
  }

  function handleCancel() {
    setEditedData(userData);
    setIsEditing(false);
  }

  async function handleSave() {
  try {
    console.log("ENVIANDO:", {
  username: editedData.name,
  age: editedData.age,
  image: editedData.image,
  about: editedData.about,
});
    await api.put(
      "/user/my-profile",
      {
        username: editedData.name,
        age: editedData.age === "" ? null : Number(editedData.age),
        image: editedData.image,
        about: editedData.about,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setUserData({ ...editedData, id: userData.id });
    setIsEditing(false);
  } catch (error: any) {
  console.log("ERRO AO SALVAR PERFIL:", error.response?.data || error);
}
}


  return (
    <Container>
      <Header />
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

            <TimelineProfile
              userProfileId={userData.id?.toString()}
              onPostSuccess={() => {}}
            />


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

  background: #ffffff;
  color: #000000;

  font-family: "Lato", sans-serif;
  font-size: 16px;
  font-weight: 300;
  text-align: left;

  line-height: 20px;
  box-sizing: border-box;

  &:disabled {
    background: #2a2a2a;
    color: #ffffff;
    opacity: 1;
    cursor: default;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;


const Textarea = styled.textarea`
  flex: 1;
  width: 100%;
  height: 80px;

  padding: 30px 8px 0 8px;

  border-radius: 5px;
  border: none;
  resize: none;
  box-sizing: border-box;

  background: ${({ disabled }) => (disabled ? "#1e1e1e" : "#ffffff")};
  color: ${({ disabled }) => (disabled ? "#ffffff" : "#000000")};

  font-family: "Lato", sans-serif;
  font-size: 16px;
  font-weight: 300;
  text-align: left;

  line-height: 20px;
  opacity: 1;

  &:disabled {
    cursor: default;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FeedContainer = styled.div`
  width: 628px;
  max-width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 0 auto;

  @media (max-width: 768px) {
    width: 100%;
  }
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
