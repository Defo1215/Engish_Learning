import request from "../index";

const baseURL = "/wordBook";

export default {
  findAll: () => {
    return request({
      method: "GET",
      url: `${baseURL}/findAll`,
    });
  },
};
