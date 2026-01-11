import { useEffect, useState } from "react";
import styled from "styled-components";

function Feed() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [loadingPost, setLoadingPost] = useState(false);

  const [posts, setPosts] = useState<any[]>([]);
  const [loadingFeed, setLoadingFeed] = useState(true);
  const [feedError, setFeedError] = useState(false);

  const isDisabled = !link || !description || loadingPost;

  useEffect(() => {
    setLoadingFeed(true);

    setTimeout(() => {
      try {
        const mockPosts = Array.from({ length: 5 }).map((_, index) => ({
          id: index,
          user: {
            name: `user_${index + 1}`,
            avatar: "https://via.placeholder.com/50",
          },
          description: "Esse é um post de exemplo.",
          link: "https://www.google.com",
        }));

        setPosts(mockPosts.slice(0, 20));
      } catch {
        setFeedError(true);
      } finally {
        setLoadingFeed(false);
      }
    }, 1500);
  }, []);

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
              <DropdownItem>Meu perfil</DropdownItem>
              <DropdownItem>Sair</DropdownItem>
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
                <PromptText>
                  O que você tem pra compartilhar hoje?
                </PromptText>

                <FakeInput
                  contentEditable
                  onInput={(e) =>
                    setLink(e.currentTarget.textContent || "")
                  }
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
                  <ShareButton disabled={isDisabled}>
                    Publicar
                  </ShareButton>
                </ButtonWrapper>
              </PostContent>
            </NewPostBox>

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
                  style={{ backgroundImage: `url(${post.user.avatar})` }}
                />

                <PostContent>
                  <PostHeader>
                    <UserPost>{post.user.name}</UserPost>
                  </PostHeader>

                  <PostBody>
                    <PostDescription>{post.description}</PostDescription>

                    <PostURL
                      onClick={() =>
                        window.open(post.link, "_blank")
                      }
                    >
                      {post.link}
                    </PostURL>
                  </PostBody>
                </PostContent>
              </AllPostBox>
            ))}
          </FeedContainer>

          <SuggestionsContainer>
            <SuggestionsTitle>Sugestões para seguir</SuggestionsTitle>
            <Divider />

            {["alice_dev", "bruno.code", "carla.js", "diego.react", "fernanda_ui"].map(
              (name) => (
                <SuggestionItem key={name}>
                  <SuggestionAvatar />
                  <SuggestionName>{name}</SuggestionName>
                </SuggestionItem>
              )
            )}
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
  background: #151515;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  z-index: 10;
`;

const Title = styled.div`
  font-family: "Passion One";
  font-size: 49px;
  color: #fff;
`;

const MenuContainer = styled.div`
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

const DropdownItem = styled.div`
  background: #151515;
  color: #fff;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;

  &:hover {
    background: #555;
  }
`;

const Body = styled.div`
  background: #333;
  flex: 1;
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
  margin-bottom: 20px;
`;

const AllPostBox = styled.div`
  background: #171717;
  border-radius: 16px;
  padding: 18px;
  display: flex;
  margin-bottom: 20px;
`;

const AvatarPost = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 26.5px;
  background-size: cover;
  background-position: center;
  margin-right: 10px;
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

const PostContent = styled.div`
  flex: 1;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
`;

const PostBody = styled.div`
  margin-top: 8px;
`;

const PostDescription = styled.div`
  min-height: 40px;
  padding: 8px 0;

  display: flex;
  align-items: center;

  font-family: "Lato";
  font-weight: 400;
  font-size: 17px;
  color: #B7B7B7;

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

const PromptText = styled.div`
  font-family: "Lato";
  font-size: 20px;
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
  cursor: ${({ disabled }) =>
    disabled ? "not-allowed" : "pointer"};
`;

const SuggestionsContainer = styled.div`
  width: 328px;
  height: 377px;
  max-height: 377px;
  background: #171717;
  border-radius: 16px;
  padding: 16px;

  position: sticky;
  top: 165px;

  overflow-y: auto;

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
  padding: 5px 10px 5px 10px;
`;

const SuggestionAvatar = styled.div`
  width: 39px;
  height: 39px;
  border-radius: 50%;
  background: #555;
`;

const SuggestionName = styled.div`
  font-family: "Lato";
  font-size: 19px;
  color: #fff;
  font-weight: 700;
`;

const StatusText = styled.div`
  color: #fff;
  font-family: "Lato";
  margin: 20px 0;
`;
