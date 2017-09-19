/* eslint-disable camelcase */
const CONSTANTS = {
  GRID_SIZE: 20,
  CANVAS_HEIGHT: 600,
  CANVAS_WIDTH: 600,
  GRID_LINES: 15
}
const shapes = []
const canvas = document.querySelector('#mycanvas')
const ctx = canvas.getContext('2d')

function getRandomColor () {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

const clearBoard = () => {
  console.log(CONSTANTS)
  ctx.clearRect(-CONSTANTS.CANVAS_WIDTH * 4, -CONSTANTS.CANVAS_HEIGHT * 4, CONSTANTS.CANVAS_WIDTH * 16, CONSTANTS.CANVAS_HEIGHT * 16  )
}
const drawRectangle = () => {
  const inputA = document.querySelector('#A')
  const inputB = document.querySelector('#B')
  shapes.push({A: inputA.value, B: inputB.value})
  console.log(shapes)
  shapes.forEach((shape) => {
    const {A,B} = shape
    let a = {
      x: parseInt(A.split(' ')[0]),
      y: parseInt(A.split(' ')[1])
    }
    let b = {
      x: parseInt(B.split(' ')[0]),
      y: parseInt(B.split(' ')[1])
    }
    if (Math.abs(b.x) >= CONSTANTS.GRID_LINES || Math.abs(b.y) >= CONSTANTS.GRID_LINES) {
      CONSTANTS.GRID_SIZE /= 1.25
      CONSTANTS.CANVAS_WIDTH *= 1.25
      CONSTANTS.CANVAS_HEIGHT *= 1.25
      clearBoard()
      drawBoard()
      drawRectangle()
      return
    }
    const length = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2)

    a = {
      x: parseInt(A.split(' ')[0]) * CONSTANTS.GRID_SIZE,
      y: parseInt(A.split(' ')[1] * -CONSTANTS.GRID_SIZE)
    }
    b = {
      x: parseInt(B.split(' ')[0]) * CONSTANTS.GRID_SIZE,
      y: parseInt(B.split(' ')[1] * -CONSTANTS.GRID_SIZE)
    }

    const color = document.querySelector('#color').value
    console.log(length)
    ctx.fillStyle = getRandomColor()
    ctx.beginPath()
    ctx.moveTo(a.x, a.y)
    ctx.lineTo(b.x, b.y)
    ctx.lineTo(b.x, b.y + (length * CONSTANTS.GRID_SIZE))
    ctx.lineTo(a.x, b.y + (length * CONSTANTS.GRID_SIZE))
    ctx.lineTo(a.x, a.y)
    ctx.fill()
    ctx.stroke()

    ctx.closePath()
    ctx.beginPath()
    ctx.moveTo((b.x + a.x) / 2, (b.y + a.y) / 2)
    ctx.lineTo(b.x, b.y + (length * CONSTANTS.GRID_SIZE) / 2)
    ctx.lineTo((b.x + a.x) / 2, b.y + (length * CONSTANTS.GRID_SIZE))
    ctx.lineTo(a.x, b.y + (length * CONSTANTS.GRID_SIZE) / 2)
    ctx.lineTo((b.x + a.x) / 2, (b.y + a.y) / 2)
    ctx.fillStyle = color
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
  })
  //     ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const drawBoard = () => {
  const x_axis_starting_point = {number: 1, suffix: ''}
  const y_axis_starting_point = {number: 1, suffix: ''}

  canvas.width = CONSTANTS.CANVAS_WIDTH
  canvas.height = CONSTANTS.CANVAS_HEIGHT
  CONSTANTS.GRID_LINES = Math.floor(CONSTANTS.CANVAS_WIDTH / CONSTANTS.GRID_SIZE / 2)

  // num of vertical grid lines
  const num_lines_x = Math.floor(canvas.height / CONSTANTS.GRID_SIZE) - 1

  // num of horizontal grid lines
  const num_lines_y = Math.floor(canvas.width / CONSTANTS.GRID_SIZE) - 1
  console.log(num_lines_x, CONSTANTS.GRID_SIZE, CONSTANTS.GRID_LINES)
  for (let i = 0; i <= num_lines_x; i++) {
    ctx.beginPath()
    ctx.lineWidth = 1
    // If line represents X-axis draw in different color
    if (i === CONSTANTS.GRID_LINES) {
      ctx.strokeStyle = '#000000'
      ctx.font = '14px Arial'
      ctx.textAlign = 'start'
      ctx.fillText('X', canvas.height - 25, CONSTANTS.GRID_SIZE * i + CONSTANTS.GRID_SIZE - 5)
      ctx.moveTo(canvas.height, CONSTANTS.GRID_SIZE * i)
      ctx.lineTo(canvas.height - CONSTANTS.GRID_SIZE / 2, CONSTANTS.GRID_SIZE * i - CONSTANTS.GRID_SIZE / 2)
      ctx.moveTo(canvas.height, CONSTANTS.GRID_SIZE * i)
      ctx.lineTo(canvas.height - CONSTANTS.GRID_SIZE / 2, CONSTANTS.GRID_SIZE * i + CONSTANTS.GRID_SIZE / 2)
    } else { ctx.strokeStyle = '#e9e9e9' }

    if (i === num_lines_x) {
      ctx.moveTo(0, CONSTANTS.GRID_SIZE * i)
      ctx.lineTo(canvas.width, CONSTANTS.GRID_SIZE * i)
    } else {
      ctx.moveTo(0, CONSTANTS.GRID_SIZE * i + 0.5)
      ctx.lineTo(canvas.width, CONSTANTS.GRID_SIZE * i + 0.5)
    }
    ctx.stroke()
  }
  for (let i = 0; i <= num_lines_y; i++) {
    ctx.beginPath()
    ctx.lineWidth = 1

    // If line represents Y-axis draw in different color
    if (i === CONSTANTS.GRID_LINES) {
      ctx.strokeStyle = '#000000'
      ctx.font = '14px Arial'
      ctx.textAlign = 'start'
      ctx.fillText('Y', CONSTANTS.GRID_SIZE * i + CONSTANTS.GRID_SIZE / 2, 15)
      ctx.moveTo(CONSTANTS.GRID_SIZE * i, 0)
      ctx.lineTo(CONSTANTS.GRID_SIZE * i - CONSTANTS.GRID_SIZE / 2, CONSTANTS.GRID_SIZE / 2)
      ctx.moveTo(CONSTANTS.GRID_SIZE * i, 0)
      ctx.lineTo(CONSTANTS.GRID_SIZE * i + CONSTANTS.GRID_SIZE / 2, CONSTANTS.GRID_SIZE / 2)
      ctx.font = '10px Arial'
    } else { ctx.strokeStyle = '#e9e9e9' }

    if (i === num_lines_y) {
      ctx.moveTo(CONSTANTS.GRID_SIZE * i, 0)
      ctx.lineTo(CONSTANTS.GRID_SIZE * i, canvas.height)
    } else {
      ctx.moveTo(CONSTANTS.GRID_SIZE * i + 0.5, 0)
      ctx.lineTo(CONSTANTS.GRID_SIZE * i + 0.5, canvas.height)
    }
    ctx.stroke()
  }
  ctx.translate(CONSTANTS.GRID_LINES * CONSTANTS.GRID_SIZE, CONSTANTS.GRID_LINES * CONSTANTS.GRID_SIZE)

  for (let i = 1; i < (num_lines_y - CONSTANTS.GRID_LINES); i++) {
    ctx.beginPath()
    ctx.lineWidth = 1
    ctx.strokeStyle = '#000000'

    // Draw a tick mark 6px long (-3 to 3)
    ctx.moveTo(CONSTANTS.GRID_SIZE * i + 0.5, -3)
    ctx.lineTo(CONSTANTS.GRID_SIZE * i + 0.5, 3)
    ctx.stroke()

    // Text value at that point
    ctx.textAlign = 'start'
    ctx.fillText(x_axis_starting_point.number * i + x_axis_starting_point.suffix, CONSTANTS.GRID_SIZE * i - 2, 15)
  }

  // Ticks marks along the negative X-axis
  for (let i = 1; i < CONSTANTS.GRID_LINES; i++) {
    ctx.beginPath()
    ctx.lineWidth = 1
    ctx.strokeStyle = '#000000'

    // Draw a tick mark 6px long (-3 to 3)
    ctx.moveTo(-CONSTANTS.GRID_SIZE * i + 0.5, -3)
    ctx.lineTo(-CONSTANTS.GRID_SIZE * i + 0.5, 3)
    ctx.stroke()

    // Text value at that point
    ctx.textAlign = 'end'
    ctx.fillText(-x_axis_starting_point.number * i + x_axis_starting_point.suffix, -CONSTANTS.GRID_SIZE * i + 3, 15)
  }
  for (let i = num_lines_x - CONSTANTS.GRID_LINES; i > 0; i--) {
    ctx.beginPath()
    ctx.lineWidth = 1
    ctx.strokeStyle = '#000000'

    // Draw a tick mark 6px long (-3 to 3)
    ctx.moveTo(-3, CONSTANTS.GRID_SIZE * i + 0.5)
    ctx.lineTo(3, CONSTANTS.GRID_SIZE * i + 0.5)
    ctx.stroke()

    // Text value at that point
    ctx.textAlign = 'start'
    ctx.fillText(-y_axis_starting_point.number * i + y_axis_starting_point.suffix, 8, CONSTANTS.GRID_SIZE * i + 3)
  }

  // Ticks marks along the negative Y-axis
  // Negative Y-axis of graph is positive Y-axis of the canvas
  for (let i = CONSTANTS.GRID_LINES - 2; i > 0; i--) {
    ctx.beginPath()
    ctx.lineWidth = 1
    ctx.strokeStyle = '#000000'

    // Draw a tick mark 6px long (-3 to 3)
    ctx.moveTo(-3, -CONSTANTS.GRID_SIZE * i + 0.5)
    ctx.lineTo(3, -CONSTANTS.GRID_SIZE * i + 0.5)
    ctx.stroke()

    // Text value at that point
    ctx.textAlign = 'start'
    ctx.fillText(y_axis_starting_point.number * i, 8, -CONSTANTS.GRID_SIZE * i + 3)
  }
}

drawBoard()
