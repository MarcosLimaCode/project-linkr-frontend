import { useEffect, useState } from "react";
import styled from "styled-components";
import { FaUserMinus, FaUserPlus } from "react-icons/fa";
import Header from "../Feed/components/Header";
import TimelineProfile from "./components/TimelineProfile";
import { useParams } from "react-router-dom";
import { getProfileId } from "../../services/feed-service";

export type Profile = {
  id: number;
  username: string;
  image: string;
  email: string;
  password: string;
  age: number;
  about: string;
};

function UsersProfile() {
  const followsYou = true;

  const [refreshCount, setRefreshCount] = useState(0);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const { id } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    async function getProfile() {
      try {
        const data = await getProfileId(Number(id));
        setUserProfile(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    getProfile();
  }, []);

  function handleFollowToggle() {
    setIsFollowing((prev) => !prev);
  }

  const handlePostSuccess = () => {
    setRefreshCount((prev) => prev + 1);
  };

  return (
    <Container>
      <Header />

      <Body>
        <ContentWrapper>
          <UserContainer>
            <UserProfileCard>
              <UserCover
                style={{ backgroundImage: `url(${userProfile?.image})` }}
              />

              <UserNameCard>{userProfile?.username}</UserNameCard>

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
                  <p>{userProfile?.about}</p>
                </UserInfoItem>

                <UserInfoItem>
                  <strong>Idade</strong>
                  <p>{userProfile?.age} anos</p>
                </UserInfoItem>

                <UserInfoItem>
                  <strong>Usuário desde</strong>
                  <p>2023</p>
                </UserInfoItem>
              </UserInfoSection>
            </UserProfileCard>
          </UserContainer>

          <FeedContainer>
            <TimelineProfile
              onPostSuccess={handlePostSuccess}
              key={refreshCount}
              userProfileId={id}
            />
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

        <BottomAvatar
          style={{ backgroundImage: `url(${userProfile?.image})` }}
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
  background: ${({ isFollowing }) => (isFollowing ? "#949494" : "#1877f2")};
  border: none;
  border-radius: 5px;
  color: ${({ isFollowing }) => (isFollowing ? "#0B0B0B" : "#ffffff")};
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

  background: ${({ isFollowing }) => (isFollowing ? "#949494" : "#1877f2")};

  color: ${({ isFollowing }) => (isFollowing ? "#0B0B0B" : "#ffffff")};

  font-size: 24px;
  font-weight: bold;

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
