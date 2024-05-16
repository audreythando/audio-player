import React, { useEffect, useState } from "react";
import "./Hero.css";
import WelcomeAppThumb from "../assets/WelcomeAppThumb.jpg";
import { Button, Input } from "@mui/material";

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [backgroundImage, setBackgroundImage] = useState<string>("");

  useEffect(() => {
    setBackgroundImage(`url(${WelcomeAppThumb})`);
  }, []);

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const delayedSearch = (() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        handleSearch();
      }, 500);
    };
  })();

  return (
    <div className="hero" style={{ backgroundImage: backgroundImage }}>
      <div className="hero-text">
        <Input
          type="text"
          placeholder="Search for audio..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            delayedSearch();
          }}
          sx={{
            marginBottom: "10px",
            borderRadius: "20px",
            backgroundColor: "white",
            width: "100%",
            maxWidth: "500px",
          }}
        />
        <div className="btn-group">
          <Button
            variant="contained"
            style={{
              borderRadius: "20px",
              backgroundColor: "#66bfbf",
              color: "white",
              padding: "10px 20px",
            }}
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
