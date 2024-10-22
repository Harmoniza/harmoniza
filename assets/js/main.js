document.addEventListener("DOMContentLoaded", function () {
  // Audio element reference
  const audioPlayer = document.getElementById("audioPlayer");
  const playButton = document.getElementById("playButton");
  const pauseButton = document.getElementById("pauseButton");
  const seekBar = document.getElementById("seekBar");

  // Play button functionality
  playButton.addEventListener("click", function () {
    audioPlayer.play();
  });

  // Pause button functionality
  pauseButton.addEventListener("click", function () {
    audioPlayer.pause();
  });

  // Update seek bar as audio plays
  audioPlayer.addEventListener("timeupdate", function () {
    const value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    seekBar.value = value;
  });

  // Allow user to seek the audio by changing seek bar value
  seekBar.addEventListener("input", function () {
    const seekTo = audioPlayer.duration * (seekBar.value / 100);
    audioPlayer.currentTime = seekTo;
  });
});
