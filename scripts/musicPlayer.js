import { addZero } from './supScripts.js';

export const musicPlayerInit = () => {
    
   const audio = document.querySelector('.audio');
   const audioImg = document.querySelector('.audio-img');
   const audioPlayer = document.querySelector('.audio-player');
   const audioHeader = document.querySelector('.audio-header');
   const audioNavigation = document.querySelector('.audio-navigation');
   const audioButtonPlay = document.querySelector('.audio-button__play');
   const audioTimePassed = document.querySelector('.audio-time__passed');
   const audioProgress = document.querySelector('.audio-progress');
   const audioProgressTiming = document.querySelector('.audio-progress__timing');
   const audioTimeTotal = document.querySelector('.audio-time__total');

   const playlist = ['hello', 'flow', 'speed'];

   let trackIndex = 0;

   const loadTrack = () => {
       const isPlayed = audioPlayer.paused;
       const track = playlist[trackIndex];

       audioPlayer.src = `./audio/${track}.mp3`;
       audioImg.src = `./audio/${track}.jpg`;
       audioHeader.textContent = track.toUpperCase();


       if (isPlayed) {
           audioPlayer.pause();
       } else {
           audioPlayer.play();
       };
   };

   const nextTrack = () => {
        if (trackIndex !== 0) {
            trackIndex--;
        } else {
            trackIndex = playlist.length - 1;
        };

        loadTrack();
   };

   const prevTrack = () => {
        if (trackIndex == playlist.length - 1) {
            trackIndex = 0;
        } else {
            trackIndex++;
        };

        loadTrack();
   };

   audioNavigation.addEventListener('click', event => {
        const target = event.target;

        if (target.classList.contains('audio-button__play')) {
            audio.classList.toggle('play');
            audioButtonPlay.classList.toggle('fa-play');
            audioButtonPlay.classList.toggle('fa-pause');

            if (audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            };

            const track = playlist[trackIndex];
            audioHeader.textContent = track.toUpperCase();
        };

        if (target.classList.contains('audio-button__next')) {
            nextTrack();
        };

        if (target.classList.contains('audio-button__prev')) {
            prevTrack();
        };
   });

   audioPlayer.addEventListener('ended', () => {
        nextTrack();
        audioPlayer.play();
   });

   audioPlayer.addEventListener('timeupdate', () => {
        const duration = audioPlayer.duration;
        const currentTime = audioPlayer.currentTime;
        const progress = (currentTime / duration) * 100;

        audioProgressTiming.style.width = progress + '%';

        let minutePassed = Math.floor( currentTime / 60 ) || '0';
        let secondsPassed = Math.floor( currentTime % 60 ) || '0';

        let minuteTotal = Math.floor( duration / 60 ) || '0';
        let secondsTotal = Math.floor( duration % 60 ) || '0';

        audioTimePassed.textContent = `${ addZero(minutePassed) }:${ addZero(secondsPassed) }`;
        audioTimeTotal.textContent = `${ addZero(minuteTotal) }:${addZero(secondsTotal || '00')}`;
   });

   audioProgress.addEventListener( 'click', event => {
        const x = event.offsetX;
        const allWidth = audioProgress.clientWidth;
        const duration = audioPlayer.duration;

        const progress = ( x / allWidth ) * duration;

        audioPlayer.currentTime = progress;

   });

   musicPlayerInit.pause = () => {
       if (!audioPlayer.paused) {
            audioPlayer.pause();
            audio.classList.remove('play');
            audioButtonPlay.remove('fa-pause');
            audioButtonPlay.add('fa-play');
       };
   };
};