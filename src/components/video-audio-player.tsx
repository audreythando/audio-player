import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import VideoAudioService from "../services/video-audio-service";
import { useQuery, useMutation } from "react-query";
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
  

  const  AudioPlayer = () => {

  async function getUsers() {
    try {
      const response = await VideoAudioService.getTimeline();
      return response.data;
    } catch (error) {
      toast.error("");
      return [];
    }
  }

  return (
    <Box>
      {audioData?.map((audio) => (
        <Card key={audio.Id}>
          <CardMedia component="img" height="140" image={audio.Image} alt={audio.Title} />
          <CardContent>
            <Typography variant="h6">{audio.Title}</Typography>
            <ReactPlayer url={`https://arthurfrost.qflo.co.za/${audio.Audio}`} controls />
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default AudioPlayer;

