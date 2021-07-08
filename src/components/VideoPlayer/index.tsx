import ReactPlayer from 'react-player';
import { usePlayer } from '../../hooks/usePlayer';

import { Container } from './styles';

interface VideoPlayerProps {
  url: string;
}

export function VideoPlayer({ url }: VideoPlayerProps) {
  const { hidePlayer } = usePlayer();

  return(
    <Container onClick={hidePlayer}>
      <ReactPlayer
        controls
        url={url}
      />
    </Container>
  );
}