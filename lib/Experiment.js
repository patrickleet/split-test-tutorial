import { EventEmitter } from 'events'
import crc32 from 'fbjs/lib/crc32'

export default class Experiment extends EventEmitter {
  constructor ({
    name,
    variants,
    userId
  }) {
    super()
    this.name = name
    this.variants = variants
    this.userId = userId
  }

  selectVariant (userId) {
    /*
    Choosing a weighted variant:
      For C, A, B with weights 2, 4, 8
      variants = A, B, C
      weights = 4, 8, 2
      weightSum = 14
      weightedIndex = 9
      AAAABBBBBBBBCC
      ========^
      Select B
    */

    // Sorted array of the variant names, example: ["A", "B", "C"]
    const variants = Object.keys(this.variants).sort()

    // Array of the variant weights, also sorted by variant name. For example, if
    // variant C had weight 2, variant A had weight 4, and variant B had weight 8
    // return [4, 8, 2] to correspond with ["A", "B", "C"]
    const weights = variants.reduce((weights, variant) => {
      weights.push(this.variants[variant].weight)
      return weights
    }, [])

    // Sum the weights
    const weightSum = weights.reduce((a, b) => {
      return a + b
    }, 0)

    // A random number between 0 and weightSum
    let weightedIndex = typeof userId === 'string' ? Math.abs(crc32(userId) % weightSum) : Math.floor(Math.random() * weightSum)

    // Iterate through the sorted weights, and deduct each from the weightedIndex.
    // If weightedIndex drops < 0, select the variant. If weightedIndex does not
    // drop < 0, default to the last variant in the array that is initially assigned.
    let selectedVariant = variants[variants.length - 1]
    for (let index = 0; index < weights.length; index++) {
      weightedIndex -= weights[index]
      if (weightedIndex < 0) {
        selectedVariant = variants[index]
        break
      }
    }

    return selectedVariant
  }

  start ({ userId }) {
    userId = userId || this.userId
    let variant = this.selectVariant(userId)
    this.emit('variant.selected', { name: this.name, variant })
  }
}
