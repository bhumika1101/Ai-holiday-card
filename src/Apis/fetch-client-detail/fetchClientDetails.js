import axios from "axios";

const fetchClientDetails = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        process.env.REACT_APP_BACKEND_URL + "/api/chat-gpt/fetch-client-details/v1",
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

export default fetchClientDetails;
