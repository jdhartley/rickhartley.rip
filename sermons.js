let player;
function setupPlayer() {
    if (player) return;

    const playerElem = document.createElement('audio');
    playerElem.controls = true;

    document.querySelector('.audio-container').appendChild(playerElem);

    const controls = ['play', 'progress', 'current-time'];

    const players = plyr.setup(playerElem, { controls });
    player = players[0];
}

const playSermon = (sermonElem) => {
    const titleElem = sermonElem.querySelector('cite');
    const dateElem = sermonElem.querySelector('time:first-of-type');
    const linkElem = sermonElem.querySelector('a');

    const title = (titleElem || dateElem || {}).innerText;
    const mp3 = (linkElem || {}).href;

    setupPlayer();

    player.source({ type: 'audio', title, sources: [{ src: mp3, type: 'audio/mp3' }] });

    player.play();
};

const sermonList = document.querySelector('.sermon-list');
sermonList.addEventListener('click', (event) => {
    const sermon = event.target.closest('.sermon-list > li');
    if (!sermon || !sermonList.contains(sermon)) {
        return;
    }

    const wasPlaying = sermonList.querySelector('.is-active');
    if (wasPlaying) {
        wasPlaying.classList.remove('is-active');
    }

    sermon.classList.add('is-active');
    playSermon(sermon);
});