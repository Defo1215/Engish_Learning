export const useAudio = () => {
  const audio = new Audio();

  const playing = ref(false); // 是否正在播放
  const loading = ref(false); // 是否正在加载

  const set = (src) => {
    audio.src = src;
    audio.play();
  };

  audio.addEventListener("play", () => {
    playing.value = true;
  });
  audio.addEventListener("pause", () => {
    playing.value = false;
  });
  audio.addEventListener("waiting", () => {
    loading.value = true;
  });
  audio.addEventListener("canplay", () => {
    loading.value = false;
  });
  audio.addEventListener("error", () => {
    loading.value = false;
  });

  return {
    playing,
    loading,
    set,
  };
};
