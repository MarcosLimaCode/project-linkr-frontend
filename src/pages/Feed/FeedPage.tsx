import styled from "styled-components";
import Header from "./components/Header";
import NewPostBox from "./components/NewPostBox";
import Timeline from "./components/Timeline";
import Suggestions from "./components/Suggestions";

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
          <Suggestions />
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
