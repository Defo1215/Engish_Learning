import request from "../index";

const baseURL = "/word";

export default {
  addWord: (words) => {
    return request({
      method: "POST",
      url: `${baseURL}/save`,
      data: words,
    });
  },

  findByWordBookId: (wordBookId) => {
    return request({
      method: "GET",
      url: `${baseURL}/findByWordBookId/${wordBookId}`,
    });
  },

};
