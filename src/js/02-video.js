import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
console.log(Player);

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

player.on('timeupdate', throttle(currentTime, 1000));

function currentTime(time) {
  localStorage.setItem(
    'videoplayer-current-time',
    JSON.stringify(time.seconds)
  );
}

player
  .setCurrentTime(localStorage.getItem('videoplayer-current-time'))
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        console.log('Wrong time!');
        break;
      default:
        console.log('Error!');
        break;
    }
  });
