import React from 'react';
import YoutubePlayer from 'react-native-youtube-iframe'

interface props {
  youtubeId: string;
}

const ShowYoutube = ({youtubeId}: props) => {
  return (
    <>
      <YoutubePlayer
        height={250}
        width={300}
        play={true}
        videoId={youtubeId}
        webViewStyle={{opacity: 0.99}}
      />
    </>
  );
};

export default ShowYoutube;
