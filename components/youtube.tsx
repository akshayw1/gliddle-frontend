import React from 'react';
import ReactPlayer from 'react-player';

const YouTubePlayer: React.FC = () => {
  const url = 'https://www.youtube.com/watch?v=b1meIQBhQKo';

  return (
    <div>
      <ReactPlayer
        url={url}
        width="70rem" // Set width as per your requirement
        height="30rem" // Set height as per your requirement
        playing // Autoplay
        controls={false} // Hide controls
        config={{
          youtube: {
            playerVars: {
              autoplay: 1,
              controls: 0,
              modestbranding: 1,
              showinfo: 0,
              loop: 1, // Optional: Loop the video
            },
          },
        }}
      />
    </div>
  );
};

export default YouTubePlayer;
