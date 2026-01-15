import styled from "styled-components";
import { getSuggestions } from "../../../services/feed-service";
import { useEffect, useState } from "react";

export default function Suggestions() {
  const [suggestions, setSuggestions] = useState<any[]>([]);

  useEffect(() => {
    async function loadSuggestions() {
      try {
        const data = await getSuggestions();
        setSuggestions(data);
      } catch (error) {
        console.log(error);
      } finally {
      }
    }
    loadSuggestions();
  }, []);

  return (
    <SuggestionsContainer>
      <SuggestionsTitle>Sugestões para seguir</SuggestionsTitle>
      <Divider />

      {suggestions
        .sort(() => Math.random() - 0.5)
        .slice(0, 5)
        .map((user) => (
          <SuggestionItem key={user.id}>
            <SuggestionAvatar
              style={{
                backgroundImage: `url("${user.image}")`,
              }}
            />
            <SuggestionName>{user.username}</SuggestionName>
          </SuggestionItem>
        ))}
    </SuggestionsContainer>
  );
}

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
  background-size: cover;
  background-position: center;
  border: 1px solid #242424;
`;

const SuggestionName = styled.div`
  font-family: "Lato";
  font-size: 19px;
  color: #fff;
  font-weight: 400;
`;
