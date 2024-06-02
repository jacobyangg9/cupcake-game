const playButton = document.querySelector('#playButton');
const container = document.querySelector('.container');
const countDownAudio = new Audio('bingAudioTest.mp3');
countDownAudio.load(); // Load the audio file
const countDownStartAudio = new Audio('bingStartAudio.mp3');

let initialCount = 3;
let audioInitialCount = 3;

// Initially disable the play button until audio is loaded
playButton.disabled = true;

// Listen for the 'canplaythrough' event to know when the audio is loaded
countDownAudio.addEventListener('canplaythrough', function() {
    // Once the audio is loaded, enable the play button
    playButton.disabled = false;
});

countDownStartAudio.addEventListener('canplaythrough', function() {
    // Once the audio is loaded, enable the play button
    playButton.disabled = false;
});

// Event listners
playButton.addEventListener('click', startGame);
playButton.addEventListener('click', function() { // Play countdown audio when clicked
    countDownAudio.play();;
});

// Function to start the game
function startGame() {
    // Append the new h1 element to the div
    container.appendChild(displayCount);
    document.body.appendChild(displayCount);

    // Activate functions
    startAllCountdowns();
    startCountdownAudio();
}


    
// Create a new element to display the countdown
let displayCount = document.createElement('h1');
displayCount.textContent = "3";
displayCount.id = "displayCount";
displayCount.classList.add('starredMessage');
// Style the countdown element
displayCount.style.fontSize = '200px';
displayCount.style.fontFamily = 'sans-serif';
displayCount.style.color = '#fc4264';
displayCount.style.textAlign = 'center';
displayCount.style.position = 'absolute';
displayCount.style.top = '50%';
displayCount.style.left = '50%';
displayCount.style.transform = 'translate(-50%, -150%)';

// Function to play the countdown audio
function startCountdownAudio() {
    let setAudioCountdown = setInterval(countDownAudioFunc, 1000); // Execute below function every 1000ms

    // Set an interval to countdown every second
    function countDownAudioFunc() {
        if (audioInitialCount > 0) {
            countDownAudio.play();
        }
        audioInitialCount--;

        if (audioInitialCount === 0) {
            countDownStartAudio.play();
        }
        
        if (audioInitialCount === -1) {
            countDownAudio.pause();
            clearInterval(setAudioCountdown);
            // Reset the audio countdown
            audioInitialCount = 3;
        }
    }

}

// Function to activate all countdowns
function startAllCountdowns() {
    let setCountdown = setInterval(countDown, 1000); // Execute below function every 1000ms

    // Set an interval to countdown every second
    function countDown() {
        initialCount--;
        displayCount.textContent = initialCount;

        if (initialCount === 0) {
            displayCount.textContent = "GO!";
        
        } else if (initialCount === -1) {
            displayCount.remove();
            clearInterval(setCountdown);

            window.location.href = "playGame.html";
        }
    }

}
