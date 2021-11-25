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

export const getArticleById = (id) => {
  return newsApi.get(`/articles/${id}`).then((res) => {
    return res.data.articles[0];
  });
};

export const getTopics = () => {
  return newsApi.get("/topics").then((res) => {
    return res.data.topics;
  });
};

export const getAuthorName = (username) => {
  return newsApi.get(`/users/${username}`).then((res) => {
    return res.data.user[0].name;
  });
};
