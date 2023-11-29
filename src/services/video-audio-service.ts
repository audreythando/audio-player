import axios from "axios";


const getTimeline = (page: number) => {
    return axios.get(`https://arthurfrost.qflo.co.za/php/getTimeline.php?page=${page}`).then((response) => {
      if (response.data != null) {
        return response.data;
      }
    });
  };

  export default {
    getTimeline
  }
