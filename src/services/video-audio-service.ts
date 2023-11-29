import axios from "axios";

const getTimeline = (page: number) => {
  return axios.get(`https://arthurfrost.qflo.co.za/php/getTimeline.php?page=${page}`).then((response) => {
    if (response.data != null) {
      return response.data;
    }
  });
};

const videoAudioService = {
  getTimeline
};

export default videoAudioService;
