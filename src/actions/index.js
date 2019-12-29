import actionTypes from '../const/actionTypes';
import axios from 'axios'
import moment from 'moment'
// post: tạo mới
// put: ghi đè(toàn bộ) hoặc tạo mới 1 resource
// patch: cập một 1 phần của resource

const base_link = 'http://localhost:3000/'
//action call Api
//action login
export const logIn = () => {
  const body = {
    email: 'test1@gmail.com',
    password: '1234561'
  }
  return (dispatch) => {
    axios.post(`${base_link}session`, body)
      .then(function (res) {
        dispatch(setStatusLogIn(res.status))
      })
      .catch(function (error) {
        dispatch(setStatusLogIn(error.response.status))
      });
  }
}
//action logout
export const logOut = () => {
  return (dispatch) => {
    axios.delete(`${base_link}session`)
      .then(function (res) {
        dispatch(setStatusLogOut(res.status))
      })
      .catch(function (error) {
        dispatch(setStatusLogOut(error.response.status))
      });
  }
}
//action getInfoCurrentUser
export const getInfoCurrentUser = () => {
  return (dispatch) => {
    axios.get(`${base_link}currentUser`)
      .then(function (res) {
        dispatch(setCurrentUser(res.data, res.status))
      })
      .catch(function (error) {
        dispatch(setStatusCurrentUser(error.response.status))
      })
  }
}
//action check in
export const checkIn = () => {
  const body = {
    timeCheckIn: moment().format('HH:mm:ss')
  }
  return (dispatch) => {
    axios.put(`${base_link}checkIn`, body)
      .then(function (res) {
        dispatch(setStatusCheckIn(res.status))
      })
      .catch(function (error) {
        console.log(error);
      })
  }
}
//action check out
export const checkOut = () => {
  const body = {
    timeCheckOut: moment().format('HH:mm:ss')
  }
  return (dispatch) => {
    axios.put(`${base_link}checkOut`, body)
      .then(function (res) {
        dispatch(setStatusCheckOut(res.status))
      })
      .catch(function (error) {
        console.log(error);
      })
  }
}
//action change password
export const changePassWord = (data) => {
  const body = {
    currentPassword: data.currentPassword,
    newPassword: data.newPassword,
    passwordConfirmation: data.passwordConfirmation
  }
  console.log(body)
  return (dispatch) => {
    // axios change password
  }
}
//action getStaffTimeSheet(gửi kèm date) (for only Staff)
export const getStaffTimeSheet = () => {
  const params = {
    date: '10-10-2020'
  }
  return (dispatch) => {
    axios.get(`${base_link}staffTimeSheet`, params)
      .then(function (res) {
        dispatch(setStaffTimeSheet(res.data))
      })
      .catch(function (error) {
        console.log(error);
      })
  }
}
//action call Api for only Admin
//action addNewStaff
export const addNewStaff = () => {
  return (dispatch) => {
    // axios add New Staff
  }
}
//action editStaff
export const editStaff = () => {
  return (dispatch) => {
    // axios edit Staff
  }
}
//action changeStatusStaff
export const changeStatusStaff = () => {
  return (dispatch) => {
    // axios change Status Staff
  }
}
//action getStaffList
export const getStaffList = () => {
  return (dispatch) => {
    axios.get(`${base_link}staffList`)
      .then(function (res) {
        dispatch(setStaffList(res.data))
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
//action searchOnTimeSheet
export const searchOnTimeSheet = () => {
  return (dispatch) => {
    // axios search On Time Sheet
  }
}
//action save on Redux
//save current User
export const setCurrentUser = (data, status) => { return { type: actionTypes.setCurrentUser, data: data, status: status } }
//save status Current User
export const setStatusCurrentUser = (data) => { return { type: actionTypes.setStatusCurrentUser, data: data } }
//save status Check In
export const setStatusCheckIn = (data) => { return { type: actionTypes.setStatusCheckIn, data: data } }
//save status Check Out
export const setStatusCheckOut = (data) => { return { type: actionTypes.setStatusCheckOut, data: data } }
//save status Log In
export const setStatusLogIn = (data) => { return { type: actionTypes.setStatusLogIn, data: data } }
//save status Log Out
export const setStatusLogOut = (data) => { return { type: actionTypes.setStatusLogOut, data: data } }
//save current User Time Sheet
export const setStaffTimeSheet = (data) => { return { type: actionTypes.setStaffTimeSheet, data: data } }
//save staff List
export const setStaffList = (data) => { return { type: actionTypes.setStaffList, data: data } }