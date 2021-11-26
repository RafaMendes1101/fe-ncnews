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

export const getComments = (article_id) => {
  return newsApi.get(`/articles/${article_id}/comments`).then((res) => {
    return res.data.comments;
  });
};

export const updateVotes = (comment_id, votes) => {
  return newsApi
    .patch(`/comments/${comment_id}`, { inc_votes: votes })
    .then((res) => {
      return res.data.updatedComment.votes;
    });
};

export const postComment = (article_id, commentObj) => {
  return newsApi
    .post(`articles/${article_id}/comments`, commentObj)
    .then((res) => {
      return res.data.newComment;
    })
    .catch((err) => {
      console.log(err);
    });
};
