const buttonColours = ["red", "blue", "green", "yellow"]

let gamePattern = []
let userClickedPattern = []

let started = false
let level = 0


// Функция отслеживания нажата ли клавиша А, после нажатия старт игры
$(document).keydown(function (ev) {
    if (!started) {
        // Изменение заголовка на текущий уровень игры
        $('#level-title').text(`Level ${level}`)
        nextSequence()
        level = true
    }
})

// Функция отслеживания нажатия на цветной блок
$('.btn').click(function () {  
    // Получаем id нажатого блока и добавляем его массив пользователя
    let userChosenColour = $(this).attr('id')
    userClickedPattern.push(userChosenColour)
    
    // Вызываем анимацию нажатия и звуковое сопровождение
    playSound(`sounds/${userChosenColour}.mp3`)
    animatePress(userChosenColour)
   
    // Передаем последний нажатый ответ
    checkAnswer(userClickedPattern.length-1)
})

// Функция проверки ответа пользователя с игрой
function checkAnswer(currentLevel) {
    // Сравниваем текущий ответ пользователя с ответом в массиве игры
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){

        // Сравниваем длины массивов пользователя и игры чтобы проверить вся ли последовательность повторилась
        if (userClickedPattern.length === gamePattern.length)

        //  Запускаем следующий уровень
        setTimeout(() => {
            nextSequence()
        }, 1000)

    }else {
        // Если пользователь ответил неверно вызываем звуковое и стилизованное оповещение об этом и меняем заголовок
        playSound('sounds/wrong.mp3')
        $('body').addClass('game-over')
        setTimeout(() => {
            $('body').removeClass('game-over')
        }, 200);
        $('#level-title').text('Game Over, Press Any Key to Restart')
        // Перезапускаем игру
        startOver()
    }
}

// Функция обнуления данных игры для ее перезапуска
function startOver() {
    level = 0
    gamePattern = []
    started = false
}


// Функция мигания следующего блока
function nextSequence() {

    // Обнуляем массив нажатия пользователя при старте следующего уровня
    userClickedPattern = []
    
    // Переходим на следующий уровень игры и обновляем заголовок
    level++
    $('#level-title').text(`Level ${level}`)

    // Получаем рандомное число и берем на его основе случайный цветной блок и добавляем его в массив игровой последовательности
    const randomNumber = Math.floor(Math.random() * 4)
    const randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)

    // Анимация следующего блока и звуковое сопровождение
    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(`sounds/${buttonColours[randomNumber]}.mp3`)
    
    
}

// Функция проигрывания звука блока
function playSound(name) {
    const audio = new Audio(name)
    audio.play()
}

// Функция анимации при нажатии на кнопку
function animatePress(currentColour) {
    $(`.${currentColour}`).addClass('pressed')
    setTimeout(() => {
        $(`.${currentColour}`).removeClass('pressed')
    }, 100);
}
