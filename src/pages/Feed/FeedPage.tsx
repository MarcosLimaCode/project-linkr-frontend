import styled from "styled-components";
import Header from "./components/Header";
import NewPostBox from "./components/NewPostBox";
import Timeline from "./components/Timeline";

export default function FeedPage() {
  return (
    <Container>
      <Header />

      <Body>
        <ContentWrapper>
          <FeedContainer>
            <FeedTitle>Feed</FeedTitle>
            <NewPostBox />
            <Timeline />
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

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
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
  padding: 5px 10px;
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
  font-weight: 400;
`;
