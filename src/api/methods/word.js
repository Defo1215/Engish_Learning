const baseURL = "/word";

export default {
  addWords: (words) => {
    return axios.post({
      methods: "POST",
      url: `${baseURL}/save`,
      data: words,
    });
  },
};
