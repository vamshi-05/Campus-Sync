import axios from "axios";
import authToken from "../utils/authToken";
import jwt_decode from "jwt-decode";
import { SET_ADMIN, SET_ERRORS, GET_SUBJECTS } from "../actionTypes";

const setAdmin = (data) => {
  return {
    type: SET_ADMIN,
    payload: data,
  };
};

const adminAddFacultyFlag = (data) => {
  return {
    type: "ADMIN_ADD_FACULTY_FLAG",
    payload: data,
  };
};

const adminAddStudentFlag = (data) => {
  return {
    type: "ADMIN_ADD_STUDENT_FLAG",
    payload: data,
  };
};

const adminAddSubjectFlag = (data) => {
  return {
    type: "ADMIN_ADD_SUBJECT_FLAG",
    payload: data,
  };
};

const adminAddAdminFlag = (data) => {
  return {
    type: "ADMIN_ADD_ADMIN_FLAG",
    payload: data,
  };
};

const getSubjectsHelper = (data) => {
  return {
    type: GET_SUBJECTS,
    payload: data,
  };
};

const adminGetAllFacultyHelper = (data) => {
  return {
    type: "GET_ALL_FACULTY",
    payload: data,
  };
};

const adminGetAllStudentHelper = (data) => {
  return {
    type: "GET_ALL_STUDENT",
    payload: data,
  };
};

const adminGetAllSubjectHelper = (data) => {
  return {
    type: "GET_ALL_SUBJECT",
    payload: data,
  };
};

export const adminLogin = (credentials) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}api/admin/login`, credentials);
      const { token } = data;

      localStorage.setItem("adminToken", token);
      authToken(token);

      const decoded = jwt_decode(token);
      dispatch(setAdmin(decoded));
    } catch (err) {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    }
  };
};

export const adminGetAllSubjects = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}api/admin/getSubjects`);
      dispatch(getSubjectsHelper(data));
    } catch (err) {
      alert("Error in fetching subjects");
    }
  };
};

export const adminAddFaculty = (facultyCredential) => {
  return async (dispatch) => {
    try {
      console.log(facultyCredential)
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/admin/addFaculty`,
        facultyCredential
      );
      console.log(data)
      dispatch(adminAddFacultyFlag(true));
      return { success: true };
    } catch (err) {
      console.log(err.response.data)
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
      return { success: false };
    }
  };
};

export const adminAddStudent = (studentCredential) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/admin/addStudent`,
        studentCredential
      );
      dispatch(adminAddStudentFlag(true));
      return { success: true };
    } catch (err) {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
      return { success: false };
    }
  };
};

export const adminAddSubject = (subjectCredential) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/admin/addSubject`,
        subjectCredential
      );
      dispatch(adminAddSubjectFlag(true));
      alert("Subject Added Successfully");
    } catch (err) {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    }
  };
};

export const adminAddAdmin = (adminCredentails) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/admin/addStudent`,
        adminCredentails
      );
      dispatch(adminAddAdminFlag(true));
      alert("Admin Added Successfully");
    } catch (err) {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    }
  };
};

export const adminGetAllFaculty = (department) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}api/admin/getFaculties`, department);
      dispatch(adminGetAllFacultyHelper(data.result));
    } catch (err) {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    }
  };
};

export const adminGetAllStudent = (credentials) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}api/admin/getStudents`, credentials);
      dispatch(adminGetAllStudentHelper(data.result));
    } catch (err) {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    }
  };
};

export const adminGetAllSubject = (credentials) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}api/admin/getSubjects`, credentials);
      dispatch(adminGetAllSubjectHelper(data.result));
    } catch (err) {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    }
  };
};

export const setAdminUser = (data) => {
  return {
    type: SET_ADMIN,
    payload: data,
  };
};

export const adminLogout = () => (dispatch) => {
  // Remove token from localStorage
  localStorage.removeItem("adminToken");
  // Remove auth header for future requests
  authToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setAdmin({}));
};
