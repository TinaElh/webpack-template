import './style/main.styl'
import dingAudio from './audio/ding.mp3'
import finishAudio from './audio/finish.mp3'

//window.localStorage.setItem('laclé', 'lavaleur')
//window.localStorage.getItem('laclé')

/**
 * Audio
 */

const ding = new Audio (dingAudio)
ding.volume = 0.5
const finish = new Audio(finishAudio)

/**
 * Elements
 */
const $container = document.querySelector('.aim-trainer')
const $score = $container.querySelector('.score')
const $timer = $container.querySelector('.timer')
const $play = $container.querySelector('.play')
const $bestScore = $container.querySelector('.best-score')
const $targets = $container.querySelector('.targets')
const $scoreValue = $score.querySelector('.value')
const $timerValue = $timer.querySelector('.value')
const $bestScoreValue = $bestScore.querySelector('.value')

/**
 * Start
 */
const start = () =>
{
    console.log('start')

    $play.classList.add('is-hidden')
    $timer.classList.remove('is-hidden')

    timeLeft = timeDuration

    tick()
    createTarget()
    updateScore(0)
}

/**
 * End
 */
const end = () =>
{
    $timer.classList.add('is-hidden')
    $play.classList.remove('is-hidden')
    $play.textContent = 'RESTART'

    while($targets.children.length)
    {
        $targets.children[0].remove()
    }

    finish.play()
}

/**
 * Tick
 */
const timeDuration = 3
let timeLeft = 0

const tick = () =>
{
    console.log('tick')

    $timerValue.textContent = timeLeft

    timeLeft--

    if(timeLeft < 0)
    {
        end()
    }
    else
    {
        window.setTimeout(tick, 1000)
    }
}

/**
 * Update score
 */
let score = 0
let bestScore = 0

if(window.localStorage.getItem('bestScore') !== null)
{
    bestScore = window.localStorage.getItem('bestScore')
    $bestScoreValue.textContent = bestScore
}

const updateScore = (_value = 0) =>
{
    score = _value 
    $scoreValue.textContent = score

    if(score > bestScore)
    {
        bestScore = score
        $bestScoreValue.textContent = bestScore
        window.localStorage.setItem('bestScore', bestScore)
    }
}

/**
 * Create target
 */
const createTarget = () =>
{
    const $target = document.createElement('div')
    $target.classList.add('target')
    $target.style.top = `calc(${Math.random() * 100}% - 5vmin)`
    $target.style.left = `calc(${Math.random() * 100}% - 5vmin)`
    $targets.appendChild($target)

    $target.addEventListener('mouseenter', () =>
    {
        $target.remove()
        createTarget()
        updateScore(score + 1)

        // play the audio when the mouse hover the target
        ding.play()
        ding.currentTime = 0
    })
}

/**
 * Init
 */
$play.addEventListener('click', start)