import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Feed() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const isDisabled = !link || !description || loading;

  return (
    <Container>
      <Top>
        <Title>Linkr</Title>

        <MenuContainer onClick={() => setMenuOpen(!menuOpen)}>
          <Avatar
            style={{
              backgroundImage:
                "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHgGhz9LGW0TnWtcPfh7Gc9RBDGu5Z8cazkg&s)",
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
          <FeedContainer>
            <FeedTitle>Feed</FeedTitle>

            <NewPostBox>
              <AvatarPost
                style={{
                  backgroundImage:
                    "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHgGhz9LGW0TnWtcPfh7Gc9RBDGu5Z8cazkg&s)",
                }}
              />

              <PostContent>
                <PromptText>O que você tem pra compartilhar hoje?</PromptText>

                <FakeInput
                  contentEditable
                  onInput={(e) => setLink(e.currentTarget.textContent || "")}
                  data-placeholder="http://..."
                />

                <FakeInput
                  contentEditable
                  onInput={(e) =>
                    setDescription(e.currentTarget.textContent || "")
                  }
                  data-placeholder="Descrição"
                />

                <ButtonWrapper>
                  <ShareButton disabled={isDisabled}>Publicar</ShareButton>
                </ButtonWrapper>
              </PostContent>
            </NewPostBox>
          </FeedContainer>

          <SuggestionsContainer>
            <SuggestionsTitle>Sugestões para seguir</SuggestionsTitle>
            <Divider />

            {[
              "alice_dev",
              "bruno.code",
              "carla.js",
              "diego.react",
              "fernanda_ui",
            ].map((name) => (
              <SuggestionItem key={name}>
                <SuggestionAvatar />
                <SuggestionName>{name}</SuggestionName>
              </SuggestionItem>
            ))}
          </SuggestionsContainer>
        </ContentWrapper>
      </Body>
    </Container>
  );
}

export default Feed;

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
  background-color: #151515;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 20px;
  box-sizing: border-box;

  z-index: 10;

  @media (max-width: 768px) {
    top: auto;
    bottom: 0;
  }
`;

const Title = styled.div`
  font-family: "Passion One";
  font-size: 49px;
  color: #fff;
`;

const MenuContainer = styled.div`
  font-family: "Lato";
  display: flex;
  align-items: center;
  gap: 10px;
  background: #333;
  padding: 5px 8px;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
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
  gap: 4px;
`;

const DropdownItem = styled(Link)`
  background: #151515;
  color: #fff;
  text-align: center;
  text-decoration: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #555;
  }
`;

const Body = styled.div`
  flex: 1;
  background: #333;
  display: flex;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 24px;
  width: 100%;
  max-width: 940px;
  padding-top: 100px;
`;

const FeedContainer = styled.div`
  width: 615px;
`;

const FeedTitle = styled.div`
  font-family: "Passion One";
  font-size: 43px;
  color: #fff;
  margin-bottom: 20px;
`;

const NewPostBox = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 18px;
  display: flex;
`;

const AvatarPost = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 26.5px;
  background-size: cover;
  background-position: center;
  margin-right: 10px;
`;

const PostContent = styled.div`
  font-family: "Lato";
  font-weight: 300;
  flex: 1;
`;

const PromptText = styled.div`
  font-family: "Lato";
  font-size: 20px;
  font-weight: 300;
  color: #707070;
  margin-bottom: 12px;
`;

const FakeInput = styled.div`
  background: #efefef;
  border-radius: 5px;
  padding: 6px 10px;
  margin-bottom: 8px;
  min-height: 30px;
  outline: none;

  &:empty:before {
    content: attr(data-placeholder);
    color: #999;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ShareButton = styled.div<{ disabled: boolean }>`
  width: 113px;
  height: 31px;
  background: #1877f2;
  color: #fff;
  border-radius: 5px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

const SuggestionsContainer = styled.div`
  width: 328px;
  height: 377px;
  background: #171717;
  border-radius: 16px;
  padding: 16px;
  position: sticky;
  top: 165px;
  display: none;

  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
  }
`;

const SuggestionsTitle = styled.div`
  font-family: "Oswald";
  color: #fff;
  font-size: 27px;
  font-weight: 700;
  align-self: center;
`;

const Divider = styled.div`
  height: 1px;
  background: #484848;
  margin: 12px 0;
`;

const SuggestionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
  background-color: #333333;
  border-radius: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
  gap: 8px;
`;

const SuggestionAvatar = styled.div`
  width: 39px;
  height: 39px;
  border-radius: 304px;
  background: #555;
`;

const SuggestionName = styled.div`
  font-family: "Lato";
  font-size: 19px;
  color: #fff;
  font-weight: 400;
`;
