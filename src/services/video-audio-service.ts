import axios from "axios";
import { ApiResponse } from "../types/api-response";

 const getTimeline = async () => {
    try {
      const response = await axios.get('https://arthurfrost.qflo.co.za/php/getTimeline.php');
      return response.data;
    } catch (error) {
      console.error('Error fetching timeline:', error);
      throw error;
    }
  };

  export default {
    getTimeline
  }
