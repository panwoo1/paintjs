const canvas = document.getElementById("jsCanvas")
const ctx = canvas.getContext("2d")
const colors = document.getElementsByClassName("jsColor")
const range = document.getElementById("jsRange")
const mode = document.getElementById("jsMode")
const saveBtn = document.getElementById("jsSave")

const INITAL_COLOR = "#2c2c2c"

canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight

ctx.fillStyle = "white"
ctx.fillRect(0, 0, canvas.weight, canvas.height)
ctx.strokeStyle = INITAL_COLOR
ctx.fillStyle = INITAL_COLOR
ctx.lineWidth = 2.5
//ctx.fillStyle = "green"
//ctx.fillRect(50, 20, 100, 49)

let painting = false
let filling = false

function stopPainting() {
  painting = false
}

function startPainting() {
  painting = true
}

function onMouseMove(event) {
  //console.log(event)
  const x = event.offsetX
  const y = event.offsetY
  if (!painting) {
    ctx.beginPath()
    ctx.moveTo(x, y)
  } else {
    ctx.lineTo(x, y)
    ctx.stroke()
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor
  //console.log(color)
  ctx.strokeStyle = color
  ctx.fillStyle = color
}

function handleRangeChange(event) {
  const size = event.target.value
  ctx.lineWidth = size
  //console.log(event.target.value)
}

function handleModeClick() {
  if (filling === true) {
    filling = false
    mode.innerText = "Fill"
  } else {
    filling = true
    mode.innerText = "Paint"
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }
}

function handleCM(event) {
  event.preventDefault()
}

function handleSaveClick(event) {
  const image = canvas.toDataURL()
  const link = document.createElement("a")
  link.href = image
  link.download = "PaintJS[EXPORT]"
  link.click()
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove)
  canvas.addEventListener("mousedown", startPainting)
  canvas.addEventListener("mouseup", stopPainting)
  canvas.addEventListener("mouseleave", stopPainting)
  canvas.addEventListener("click", handleCanvasClick)
  canvas.addEventListener("contextmenu", handleCM)
}

//console.log(Array.from(colors))
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick))

if (range) {
  range.addEventListener("input", handleRangeChange)
}

if (mode) {
  mode.addEventListener("click", handleModeClick)
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick)
}
