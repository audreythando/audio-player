import axios from "axios";
import { ApiResponse } from "../types/api-response";


  const getTimeline = () => {
    return axios.get('https://arthurfrost.qflo.co.za/php/getTimeline.php').then((response) => {
      if (response.data != null) {
        return response.data;
      }
    });
  };

  export default {
    getTimeline
  }
