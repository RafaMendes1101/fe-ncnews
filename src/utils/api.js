import axios from "axios";
const newsApi = axios.create({
  baseURL: "https://northcoders-rafael-news-api.herokuapp.com/api",
});

export const getUsers = () => {
  return newsApi.get("/users").then((res) => {
    return res.data.users;
  });
};

export const getArticles = (query) => {
  return newsApi.get("/articles", { params: query }).then((res) => {
    return res.data.articles;
  });
};

export const getTopics = () => {
  return newsApi.get("/topics").then((res) => {
    return res.data.topics;
  });
};
