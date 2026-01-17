import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import { IoMdSearch } from "react-icons/io";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const image = localStorage.getItem("image");

  async function handleSearch(e?: React.FormEvent) {
    if (e) e.preventDefault();
  }

  return (
    <Top>
      <Title to={"/feed"}>Linkr</Title>
      <SearchBar as="form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Procurar linkrs"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchIcon onClick={() => handleSearch()}>
          <IoMdSearch size={24} color="#C6C6C6" />
        </SearchIcon>
      </SearchBar>
      <MenuContainer onClick={() => setMenuOpen(!menuOpen)}>
        <Avatar
          style={{
            backgroundImage: `url(${image})`,
          }}
        />
        <MenuButton>☰</MenuButton>

        {menuOpen && (
          <Dropdown>
            <DropdownItem to="/user/my-profile">Meu perfil</DropdownItem>
            <DropdownItem to="/">Sair</DropdownItem>
          </Dropdown>
        )}
      </MenuContainer>
    </Top>
  );
}

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
const Title = styled(Link)`
  font-family: "Passion One";
  font-size: 49px;
  color: #fff;
  text-decoration: none;
`;

const SearchBar = styled.div`
  position: relative;
  width: 563px;
  height: 45px;
  background: #fff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0 10px;

  input {
    width: 100%;
    height: 90%;
    border-radius: 8px;
    border: none;
    outline: none;
    font-family: "Lato";
    font-size: 19px;
    font-weight: 400;
    color: #c6c6c6;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 10px;
  font-size: 20px;
`;

const MenuContainer = styled.div`
  font-family: "Lato";
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

const DropdownItem = styled(Link)`
  background: #151515;
  color: #fff;
  text-align: center;
  text-decoration: none;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;

  &:hover {
    background: #555;
  }
`;
