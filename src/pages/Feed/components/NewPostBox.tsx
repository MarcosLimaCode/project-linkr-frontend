import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

interface NewPostProps {
  onPostSuccess: () => void;
}

export default function NewPostBox({ onPostSuccess }: NewPostProps) {
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const backendUrl = import.meta.env.VITE_API_URL;
  const image = localStorage.getItem("image");
  const isDisabled = !link;
  const token = localStorage.getItem("token");

  async function handlePost(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        `${backendUrl}/feed`,
        {
          link,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      setLink("");
      setDescription("");
      onPostSuccess();
    } catch (err) {
      console.log(err);
      alert("Erro inesperado. Tente novamente mais tarde.");
      setLoading(false);
    }
  }

  return (
    <Container>
      <AvatarPost
        style={{
          backgroundImage: `url(${image})`,
        }}
      />

      <PostContent onSubmit={handlePost}>
        <PromptText>O que você tem pra compartilhar hoje?</PromptText>

        <InputContainer>
          <Input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="http://..."
            suppressContentEditableWarning
          />

          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrição"
            suppressContentEditableWarning
          />
        </InputContainer>

        <ButtonWrapper>
          <ShareButton type="submit" disabled={isDisabled}>
            {!loading ? (
              "Publicar"
            ) : (
              <CircularProgress color="inherit" size="20px" />
            )}
          </ShareButton>
        </ButtonWrapper>
      </PostContent>
    </Container>
  );
}

const Container = styled.div`
  background: #fff;
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

const PromptText = styled.div`
  font-family: "Lato";
  font-size: 20px;
  color: #707070;
  margin-bottom: 12px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
`;

const Input = styled.input`
  font-family: "Lato";
  font-size: 16px;
  background: #efefef;
  border-radius: 5px;
  padding: 6px 10px;
  margin-bottom: 8px;
  min-height: 30px;
  border: none;
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

const ShareButton = styled.button<{ disabled: boolean }>`
  width: 113px;
  height: 31px;
  background: #1877f2;
  color: #fff;
  border-radius: 5px;
  border: none;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

const PostContent = styled.form`
  font-family: "Lato";
  font-weight: 300;
  flex: 1;
`;
