interface Player {
  stop(): void;
  play(url: string): void;
  addToPlaylist(url: string): void;
  playList(): void;
}

const HAVE_ENOUGH_DATA_STATE = 4;

export default function createPlayer(): Player {
  let live: HTMLAudioElement | undefined;
  const stack: HTMLAudioElement[] = [];

  function stop() {
    stack.length = 0;
    if (live) {
      live.pause();
      live = undefined;
    }
  }

  function playList() {
    if (stack.length === 0) return;

    // eslint-disable-next-line xss/no-mixed-html
    const audio = stack.pop() as HTMLAudioElement;
    live = audio;

    audio.addEventListener('ended', playList);
    if (audio.readyState === HAVE_ENOUGH_DATA_STATE) {
      audio.play();
    } else {
      audio.addEventListener('canplaythrough', () => {
        if (live !== audio) return;
        audio.play();
      });
    }
  }

  return {
    playList,
    addToPlaylist(url: string): void {
      if (live) stop();
      stack.push(new Audio(url));
    },
    stop,
    play(url: string) {
      stop();
      stack.push(new Audio(url));
      playList();
    },
  };
}
