import axios from "axios";
const newsApi = axios.create({
  baseURL: "https://northcoders-rafael-news-api.herokuapp.com/api",
});

export const getUsers = () => {
  return newsApi.get("/users").then((res) => {
    return res.data.users;
  });
};
