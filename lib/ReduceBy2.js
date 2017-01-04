'use strict'

const defaults = require('lodash/defaults')
const Image = require('rawdevjs-image')

class ReduceBy2 {
  constructor () {
    this.label = 'reduce size by 2'
    this.inPlace = false
    this.dirty = true
  }

  process (image) {
    let output = new Image(defaults({
      width: Math.floor(image.width / 2),
      height: Math.floor(image.height / 2)
    }, image.type()))

    let outputPixel = new Array(output.components.length)

    for (let y = 0; y < output.height; y++) {
      for (let x = 0; x < output.width; x++) {
        let x2 = x * 2
        let y2 = y * 2

        let p0 = image.getPixel(x2, y2)
        let p1 = image.getPixel(x2 + 1, y2)
        let p2 = image.getPixel(x2, y2 + 1)
        let p3 = image.getPixel(x2 + 1, y2 + 1)

        for (let c = 0; c < outputPixel.length; c++) {
          outputPixel[c] = (p0[c] + p1[c] + p2[c] + p3[c]) / 4
        }

        output.setPixel(x, y, outputPixel)
      }
    }

    return Promise.resolve(output)
  }
}

module.exports = ReduceBy2
