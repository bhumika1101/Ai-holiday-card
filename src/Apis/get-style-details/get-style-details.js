import axios from "axios";

const getStyleDetails = (data) => {
  return new Promise((resolve, reject) => {

    axios
      .post(
        process.env.REACT_APP_BACKEND_URL + "/api/chat-gpt/fetch-image-style-details/v1",
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

export default getStyleDetails;
