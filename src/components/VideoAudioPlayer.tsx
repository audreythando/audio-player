import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import VideoAudioService from "../services/video-audio-service";
import { useQuery } from "react-query";
import ReactPlayer from "react-player";
import toast from "react-hot-toast";
import Hero from "./Hero";

interface Audio {
  Id: number;
  Episode: string;
  Title: string;
  Media: number;
  Description: string;
  Image: string;
  Icon: string;
  Audio: string;
  RemoteId: string;
  Status: number;
  isActive: number;
  inId: string;
  CreateDate: string;
  MediaName: string;
  Category: string;
  Epoch: number;
  AudioSize: number;
  ImageUrl: string;
}

const AudioPlayer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredAudioData, setFilteredAudioData] = useState<Audio[]>([]);

  const fetchAudioData = async (page: number) => {
    try {
      const response = await VideoAudioService.getTimeline(page);
      return response.Timeline;
    } catch (error) {
      toast.error("Error fetching audio data");
      return [];
    }
  };

  const {
    data: audioData,
    isLoading,
    isError,
  } = useQuery<Audio[]>(
    ["get-audio", currentPage],
    () => fetchAudioData(currentPage),
    {
      staleTime: 30000,
      keepPreviousData: true,
    }
  );

  const totalPages = audioData?.length ? Math.ceil(audioData.length / 20) : 0;

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    toast.error("Error fetching audio data");
    return null;
  }

  const handleSearch = (query: string) => {
    const filteredData = audioData?.filter((audio) =>
      audio.Title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredAudioData(filteredData || []);
  };

  return (
    <Box>
      <Hero onSearch={handleSearch} />
      <Grid container spacing={2}>
        {(filteredAudioData.length > 0 ? filteredAudioData : audioData)
          ?.slice((currentPage - 1) * 20, currentPage * 20)
          .map((audio: Audio) => (
            <Grid item key={audio.Id} xs={12} sm={6} md={3}>
              <Card
                variant="outlined"
                sx={{
                  margin: "16px",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "300px",
                  "@media (max-width:600px)": {
                    minHeight: "500px",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={`https://arthurfrost.qflo.co.za/${audio.Image}`}
                  alt={audio.Image}
                />

                <CardContent
                  sx={{
                    p: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <Typography variant="h6">{audio.Title}</Typography>
                  <ReactPlayer
                    url={`https://arthurfrost.qflo.co.za/${audio.Audio}`}
                    controls
                    width="100%"
                    height="40px"
                    style={{ marginTop: "auto" }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
      <Box
        style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}
      >
        <Button
          variant="contained"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          sx={{
            borderRadius: "50px",
            backgroundColor: "#66bfbf",
            margin: "0 8px",
            "&:hover": {
              backgroundColor: "#233142",
            },
          }}
        >
          Previous Page
        </Button>
        <Button
          variant="contained"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          sx={{
            borderRadius: "50px",
            backgroundColor: "#66bfbf",
            margin: "0 8px",
            "&:hover": {
              backgroundColor: "#233142",
            },
          }}
        >
          Next Page
        </Button>
      </Box>
    </Box>
  );
};

export default AudioPlayer;
