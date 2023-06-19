document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.querySelector('.start')
    const scoreDisplay = document.querySelector('span')
    const squares = document.querySelectorAll('.snakeContainer section')
    
    const width = 10
    let currentIndex = 0
    let circleIndex = 0 
    let currentSnake = [2,1,0] 
    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0


    // ARROW KEY CODE
    function arrowKey(e) {
        squares[currentIndex].classList.remove('snake')
        
        if (e.keyCode === 39) {
            direction = 1 
        } else if (e.keyCode === 38) {
          direction = -width 
        } else if (e.keyCode === 37) {
          direction = -1
        } else if (e.keyCode === 40) {
          direction = +width
        }
    }

    // NEW CIRCLE AFTER GETTING OLD CIRCLE
    function randomCircle() {
        do {
          circleIndex = Math.floor(Math.random() * squares.length)
        } while (squares[circleIndex].classList.contains('snake')) // PREVENTS CIRCLE TO APPEAR WITHIN SNAKE
            squares[circleIndex].classList.add('circle')
    }
  
    // START SNAKE CODE
    function startSnake() {
      currentSnake.forEach(index => squares[index].classList.remove('snake'))
      squares[circleIndex].classList.remove('circle')
      clearInterval(interval)
      score = 0
      randomCircle()
      direction = 1
      scoreDisplay.innerText = score
      intervalTime = 250
      currentSnake = [2,1,0]
      currentIndex = 0
      currentSnake.forEach(index => squares[index].classList.add('snake'))
      interval = setInterval(result, intervalTime)
    }
  
    // TAIL AND BORDER HIT CODE
    function result() {
        if (
        (currentSnake[0] + width >= (width * width) && direction === width ) || // HIT BOTTOM BORDER
        (currentSnake[0] % width === width -1 && direction === 1) || // HIT RIGHT BORDER
        (currentSnake[0] % width === 0 && direction === -1) || // HIT RIGHT BORDER
        (currentSnake[0] - width < 0 && direction === -width) ||  // HIT TOP BORDER
        squares[currentSnake[0] + direction].classList.contains('snake') // HIT ITSELF
      ) {
        return clearInterval(interval) // CLEARS INTERVAL WHEN TAIL/BORDER IS HIT
      }
  
      const tail = currentSnake.pop() //removes last ite of the array and shows it
      squares[tail].classList.remove('snake')  //removes class of snake from the TAIL
      currentSnake.unshift(currentSnake[0] + direction) //gives direction to the head of the array
  
      // OBTAINING CIRCLE CODE
      if (squares[currentSnake[0]].classList.contains('circle')) {
        squares[currentSnake[0]].classList.remove('circle')
        squares[tail].classList.add('snake')
        currentSnake.push(tail)
        randomCircle()
        score++
        scoreDisplay.textContent = score
        clearInterval(interval)
        intervalTime = intervalTime * speed
        interval = setInterval(result, intervalTime)
      }
      squares[currentSnake[0]].classList.add('snake')
    }
  
    document.addEventListener('keyup', arrowKey)
    startBtn.addEventListener('click', startSnake)
  })