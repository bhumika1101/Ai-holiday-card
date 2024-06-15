import axios from "axios";

const conversation = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        process.env.REACT_APP_BACKEND_URL + "/api/chat-gpt/conversation/v1",
        data
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default conversation;
