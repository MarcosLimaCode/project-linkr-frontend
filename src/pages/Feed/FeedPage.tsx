import styled from "styled-components";
import Header from "./components/Header";
import NewPostBox from "./components/NewPostBox";
import Timeline from "./components/Timeline";
import Suggestions from "./components/Suggestions";
import { useState } from "react";
import { MobileBottomBar } from "./components/MobileBottomBar";
import { IoClose } from "react-icons/io5";

export default function FeedPage() {
  const [refreshCount, setRefreshCount] = useState(0);
  const [isSearching, setIsSearching] = useState(false);


  const handlePostSuccess = () => {
    setRefreshCount((prev) => prev + 1);
  };

return (
  <Container>
    {!isSearching && <Header />}

    {isSearching && (
      <MobileSearchBar>
        <SearchInput placeholder="Procurar linkrs" />
        <CancelSearchButton onClick={() => setIsSearching(false)}>
          <IoClose size={22} />
        </CancelSearchButton>
      </MobileSearchBar>
    )}

    <Body isSearching={isSearching}>
      <ContentWrapper>
        <FeedContainer>
          <FeedTitle>Feed</FeedTitle>
          <NewPostBox onPostSuccess={handlePostSuccess} />
          <Timeline onPostSuccess={handlePostSuccess} key={refreshCount} />
        </FeedContainer>

        <Suggestions />
      </ContentWrapper>
    </Body>

    <MobileBottomBar onSearchClick={() => setIsSearching(true)} />
  </Container>
);
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;


const Body = styled.div<{ isSearching: boolean }>`
  background: #333;
  flex: 1;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
  padding-top: ${props => (props.isSearching ? "43px" : "20px")};
}

`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 24px;
  width: 100%;
  max-width: 940px;
  padding-top: 100px;

  @media (max-width: 1024px) {
    justify-content: center;
  }

  @media (max-width: 768px) {
    padding-top: 0; 
  }
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

const MobileSearchBar = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    gap: 8px;

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 43px;

    background: var(--bg-header);
    padding: 0 12px;
    z-index: 50;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  height: 35px;

  border-radius: 18px;
  border: none;
  outline: none;

  font-family: "Lato", sans-serif;
  font-size: 16px;
  padding: 0 14px;

  background: #ffffff;
  color: #c6c6c6;

  ::placeholder {
    color: #c6c6c6;
  }
`;




const CancelSearchButton = styled.button`
  width: 35px;
  height: 35px;

  background: var(--danger);
  border: none;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--text-primary);
  cursor: pointer;
  flex-shrink: 0;
`;


