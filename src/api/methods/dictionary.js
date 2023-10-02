import request from "../index";

const baseURL = "/dictionary";

export default {
  findByWord: (word) => {
    return request({
      method: "GET",
      url: `${baseURL}/findByWord/${word}`,
    });
  },

  findByWords: (words) => {
    return request({
      method: "POST",
      url: `${baseURL}/findByWords`,
      data: words,
    });
  }
};
