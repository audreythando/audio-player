import React, { useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Button, Grid, CircularProgress } from '@mui/material';
import VideoAudioService from "../services/video-audio-service";
import { useQuery } from "react-query";
import ReactPlayer from 'react-player';
import toast from 'react-hot-toast';

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

  const fetchAudioData = async (page: number) => {
    try {
      const response = await VideoAudioService.getTimeline(page);
      return response.Timeline;
    } catch (error) {
      toast.error("Error fetching audio data");
      return [];
    }
  };

  const { data: audioData, isLoading, isError } = useQuery<Audio[]>(
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

  return (
    <Box>
      <Grid container spacing={2}>
        {audioData?.slice((currentPage - 1) * 20, currentPage * 20).map((audio: Audio) => (
          <Grid item key={audio.Id} xs={12} sm={6} md={3}>
            <Card>
              <CardMedia component="img" height="140" image={audio.Image} alt={audio.Title} />
              <CardContent>
                <Typography variant="h6">{audio.Title}</Typography>
                <ReactPlayer url={audio.Audio} controls />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box mt={2}>
        <Button variant="contained" onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous Page
        </Button>
        <Button variant="contained" onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next Page
        </Button>
      </Box>
    </Box>
  );
};

export default AudioPlayer;
