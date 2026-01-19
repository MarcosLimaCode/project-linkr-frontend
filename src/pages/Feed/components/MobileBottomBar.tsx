import { IoSearch, IoPencil } from "react-icons/io5";
import styled from "styled-components";

interface MobileBottomBarProps {
  onSearchClick: () => void;
}

export const MobileBottomBar = ({ onSearchClick }: MobileBottomBarProps) => {
  return (
    <BottomBar>
      <Logo>linkr</Logo>

      <IconButton onClick={onSearchClick}>
        <IoSearch size={22} />
      </IconButton>

      <IconButton>
        <IoPencil size={26} />
      </IconButton>

      <Avatar />
    </BottomBar>
  );
};


const BottomBar = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    position: fixed;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);

    width: calc(100% - 20px);
    height: 55px;

    background: #171717;
    border-radius: 30px;

    align-items: center;
    justify-content: space-around;

    z-index: 100;
  }
`;

const Logo = styled.div`
  font-family: "Passion One";
  font-size: 22px;
  color: #fff;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #555;
`;
