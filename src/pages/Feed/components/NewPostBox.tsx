import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function NewPostBox() {
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const backendUrl = import.meta.env.VITE_API_URL;
  const image = localStorage.getItem("image");
  const isDisabled = !link;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  async function handlePost(e: React.FormEvent) {
    e.preventDefault();

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
      navigate(0);
    } catch (err) {
      console.log(err);
      alert("Erro inesperado. Tente novamente mais tarde.");
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

        <Input
          contentEditable
          onInput={(e) => setLink(e.currentTarget.textContent || "")}
          data-placeholder="http://..."
          suppressContentEditableWarning
        />

        <Input
          contentEditable
          onInput={(e) => setDescription(e.currentTarget.textContent || "")}
          data-placeholder="Descrição"
          suppressContentEditableWarning
        />

        <ButtonWrapper>
          <ShareButton type="submit" disabled={isDisabled}>
            Publicar
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

const Input = styled.div`
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
