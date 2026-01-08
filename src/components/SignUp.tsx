import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

function SignUp() {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_API_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password || !username || !image) {
      alert("Preencha todos os campos!");
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${backendUrl}/sign-up`, {
        email,
        password,
        username,
        image,
      });

      navigate("/");
    } catch (error: any) {
      const status = error.response?.status;
      const message = error.response?.data?.message;

      if (status === 400) {
        alert(message || "Dados inválidos");
        return;
      }

      if (status === 409) {
        alert(message || "Email ou username já cadastrado");
        return;
      }

      alert("Erro inesperado. Tente novamente mais tarde.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <LeftSide>
        <LeftText>
          <Title>
            Linkr
            <br />
          </Title>
          compartilhe e descubra
          <br />
          os melhores links da internet!
        </LeftText>
      </LeftSide>

      <RightSide>
        <Form onSubmit={handleSignUp}>
          <Input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />

          <Input
            type="password"
            placeholder="senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />

          <Input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />

          <Input
            type="text"
            placeholder="imagem do perfil (url)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            disabled={loading}
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </Button>

          <SignInLink to="/">Voltar para login!</SignInLink>
        </Form>
      </RightSide>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftSide = styled.div`
  flex: 2;
  background-color: #151515;
  color: #ffffff;
  padding: 40px;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    flex: none;
    height: 33vh;
    justify-content: center;
    padding: 20px;
    text-align: center;
  }
`;

const Title = styled.h1`
  font-family: "Passion One";
  font-size: 106px;
  font-weight: 700;
  margin-bottom: 20px;
  letter-spacing: 0.05em;

  @media (max-width: 768px) {
    font-size: 72px;
  }
`;

const LeftText = styled.div`
  font-family: "Oswald";
  font-size: 43px;
  font-weight: 700;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const RightSide = styled.div`
  flex: 1;
  background-color: #333333;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    flex: none;
    height: 67vh;
    padding: 20px;
  }
`;

const Form = styled.form`
  width: 100%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Input = styled.input`
  padding: 12px;
  font-family: "Oswald";
  font-weight: 700;
  font-size: 27px;
  border-radius: 6px;
  color: #9f9f9f;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Button = styled.button<{ disabled: boolean }>`
  padding: 12px;
  font-family: "Oswald";
  font-weight: 700;
  font-size: 27px;
  background-color: ${({ disabled }) => (disabled ? "#aaa" : "#1877F2")};
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const SignInLink = styled(Link)`
  margin-top: 12px;
  font-family: "Lato";
  font-weight: 400;
  text-align: center;
  text-decoration: underline;
  color: #ffffff;
  font-size: 20px;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export default SignUp;
