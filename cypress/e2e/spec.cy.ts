describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:4200/')
  })
})

describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true)
  })
})

// describe('My First Test', () => {
//   it('Does not do much!', () => {
//     expect(true).to.equal(false)
//   })
// })
