import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthContext from "../contexts/AuthContext";

function SignIn() {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_API_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setToken } = useContext(AuthContext);

  async function handleLogin(e: React.FormEvent) {
    setLoading(true);
    e.preventDefault();

    if (!email || !password) {
      alert("Preencha todos os campos!");
      setLoading(false);
      return;
    }

    const body = { email, password };

    axios
      .post(backendUrl, body)
      .then((res) => {
        setToken(res.data.token);
        localStorage.setItem("token", res.data);
        setLoading(false);
        navigate("/feed");
      })
      .catch((error: any) => {
        alert("Usuário e/ou senha inválidos!");
        console.log(error);
        setLoading(false);
      });
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
        <Form onSubmit={handleLogin}>
          <Input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>

          <SignUpLink to="/sign-up">Primeira vez? crie uma conta!</SignUpLink>
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
    height: 50vh;
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
    height: 50vh;
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

const SignUpLink = styled(Link)`
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

export default SignIn;
