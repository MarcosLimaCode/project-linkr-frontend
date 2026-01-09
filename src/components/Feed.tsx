import { useState } from "react";
import styled from "styled-components";

function Feed() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const isDisabled = !link || !description || loading;

  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }

  function handleLogout() {
    alert("Logout");
  }

  return (
    <Container>
      <Top>
        <Title>Linkr</Title>

        <MenuContainer onClick={toggleMenu}>
          <Avatar
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHgGhz9LGW0TnWtcPfh7Gc9RBDGu5Z8cazkg&s"
            alt="Foto do usuário"
          />

          <MenuButton >
            ☰
          </MenuButton>
          
          {menuOpen && (
            <Dropdown>
              <DropdownItem>Meu perfil</DropdownItem>
              <DropdownItem onClick={handleLogout}>
                Sair
              </DropdownItem>
            </Dropdown>
          )}
        </MenuContainer>
      </Top>
        <Body>
        <FeedContainer>
            <FeedTitle>Feed</FeedTitle>

            <NewPostBox>
            <AvatarPost
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHgGhz9LGW0TnWtcPfh7Gc9RBDGu5Z8cazkg&s"
                alt="AvatarPost"
            />

            <PostContent>
                <PromptText>
                O que você tem pra compartilhar hoje?
                </PromptText>

                <LinkInput
                type="text"
                placeholder="http://..."
                />

                <DescriptionInput
                type="text"
                placeholder="Descrição"
                />

                <ButtonWrapper>
                    <ShareButton disabled={isDisabled}>
                    Publicar
                    </ShareButton>
                </ButtonWrapper>
            </PostContent>
            </NewPostBox>
        </FeedContainer>
        </Body>
    </Container>
  );
}
export default Feed;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Top = styled.header`
  width: 100%;
  height: 70px;
  background-color: #151515;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 20px;
  box-sizing: border-box;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

  @media (max-width: 768px) {
    top: auto;
    bottom: 0;
  }
`;

const Title = styled.h1`
  font-family: 'Passion One';
  font-size: 49px;
  font-weight: 700;
  color: #ffffff;

    @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const MenuContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 5px 8px;
  background-color: #333333;
  border-radius: 10px;

  @media (max-width: 768px) {
  border-radius: 50px;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 28px;
  line-height: 1;
  color: #ffffff;
  cursor: pointer;
    @media (max-width: 768px) {
    display: none;
  }
`;

const Avatar = styled.img`
  width: 53px;
  height: 53px;
  border-radius: 10%;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    border-radius: 50px;
    padding: 2px;
    gap: 2px;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 65px;
  right: 0;
  width: 106px;

  background-color: #333333;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  gap: 3px;

  padding: 3px;

    @media (max-width: 768px) {
    top: auto;
    bottom: 65px;
  }
`;

const DropdownItem = styled.div`
  padding: 10px 0;
  font-family: 'Lato';
  font-size: 16px;
  color: #ffffff;
  background-color: #151515;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #555555;
  }
`;

const Body = styled.div`
  flex: 1;
  background-color: #333333;
`;

const FeedContainer = styled.div`
  width: 611px;
  margin: 100px auto 0 auto;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0 16px;
    margin-top: 40px;
  }
`;

const FeedTitle = styled.h1`
  font-family: 'Oswald';
  font-size: 43px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 20px;
`;

const NewPostBox = styled.div`
  width: 611px;
  background-color: #ffffff;
  border-radius: 16px;
  display: flex;
  padding: 18px; /* 🔥 isso resolve */
  box-sizing: border-box;
`;

const AvatarPost = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 26.5px;
  object-fit: cover;
`;

const PostContent = styled.div`
  flex: 1;
  position: relative;
  padding-bottom: 45px;
`;

const PromptText = styled.p`
  font-family: 'Lato';
  font-weight: 300;
  font-size: 20px;
  color: #707070;
  margin-bottom: 12px;
`;

const LinkInput = styled.input`
  width: 506px;
  height: 30px;
  margin-bottom: 8px;
  padding: 6px 10px;
  border-radius: 5px;
  border: none;
  background-color: #efefef;

  font-family: 'Lato';
  font-size: 15px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const DescriptionInput = styled.input`
  width: 505px;
  height: 30px;
  padding: 6px 10px;
  border-radius: 5px;
  border: none;
  background-color: #efefef;

  font-family: 'Lato';
  font-size: 15px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;


const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
`;

const ShareButton = styled.button<{ disabled: boolean }>`
  width: 113px;
  height: 31px;

  background-color: #1877f2;
  color: #ffffff;

  font-family: 'Lato';
  font-size: 14px;
  font-weight: 700;

  border: none;
  border-radius: 5px;

  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;
