export const drawRect = (detections, ctx) => {
  detections.forEach((prediction) => {
    // obj malumotlari
    const [x, y, width, height] = prediction["bbox"] // objni X, Y joylashuv va width, height kengligi, balandlik malumotlari
    const text = prediction["class"] // obj noma misol odam, mushuk, telefon
    // styles
    const color = "#21FD6BFF" // obj ni belgilash uchun rang green
    const textColor = "#d00" // textning rangi red
    const textFont = "24px Arial red" // obj noma font styleli

    // objni malumotlarini joylash
    ctx.strokeStyle = color
    ctx.font = textFont
    ctx.beginPath()
    ctx.fillStyle = textColor
    ctx.fillText(text, x, y) // obj nomi va joylashuvi
    ctx.rect(x, y, width, height) // obj jolashuvi va kattaligi
    ctx.stroke()
  })
}
