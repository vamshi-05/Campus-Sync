import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from '@material-ui/core';


import {
  PersonAdd,
  LibraryAdd,
  HowToReg,
  Person,
  ExitToApp,
  Group,
  LibraryBooks,
} from "@material-ui/icons";
import styled from "styled-components";

import { adminLogout } from "../redux/actions/adminAction";

const Container = styled.div`
  width: 100vw;
  display: flex;
  border-bottom: 0.5px solid #0077b6;
  background-color: white;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

  > a {
    text-decoration: none;
  }

  @media (max-width: 768px) {
    justify-content: center;
    margin-bottom: 10px;
  }
`;

const Logo = styled.h1`
  font-weight: bold;
  color: #0077b6;
  cursor: pointer;
  font-size: 24px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
    gap: 10px;
  }
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    margin-left: 10px;
  }

  a {
    text-decoration: none;
    color: white;
  }
`;


const AdminNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const logoutHandler = () => {
    dispatch(adminLogout());
    alert.success("Logged Out");
    navigate("/admin/login");
  };

  const home = () => {
    navigate("/admin");
  };

  const AddStudent = () => {
    navigate("/admin/add/students");
  };

  const AddFaculty = () => {
    navigate("/admin/add/faculties");
  };

  const AddSubject = () => {
    navigate("/admin/add/subjects");
  };

  const GetStudent = () => {
    navigate("/admin/students");
  };

  const GetFaculty = () => {
    navigate("/admin/faculties");
  };

  const GetSubject = () => {
    navigate("/admin/subjects");
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to="/admin">
            <Logo>Campus Sync</Logo>
          </Link>
        </Left>
        <Right>
          <Tooltip title="Add Student" arrow>
            <MenuItem onClick={AddStudent}>
              <PersonAdd style={{ color: "#0077b6" }} />
            </MenuItem>
          </Tooltip>
          <Tooltip title="Add Faculty" arrow>
            <MenuItem onClick={AddFaculty}>
              <HowToReg style={{ color: "#0077b6" }} />
            </MenuItem>
          </Tooltip>
          <Tooltip title="Add Subject" arrow>
            <MenuItem onClick={AddSubject}>
              <LibraryAdd style={{ color: "#0077b6" }} />
            </MenuItem>
          </Tooltip>
          <Tooltip title="View Students" arrow>
            <MenuItem onClick={GetStudent}>
              <Person style={{ color: "#0077b6" }} />
            </MenuItem>
          </Tooltip>
          <Tooltip title="View Faculties" arrow>
            <MenuItem onClick={GetFaculty}>
              <Group style={{ color: "#0077b6" }} />
            </MenuItem>
          </Tooltip>
          <Tooltip title="View Subjects" arrow>
            <MenuItem onClick={GetSubject}>
              <LibraryBooks style={{ color: "#0077b6" }} />
            </MenuItem>
          </Tooltip>
          <Tooltip title="Logout" arrow>
            <MenuItem onClick={logoutHandler}>
              <ExitToApp style={{ color: "#0077b6" }} />
            </MenuItem>
          </Tooltip>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default AdminNavbar;
