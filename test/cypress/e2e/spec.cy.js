describe('Page Load', () => {
  it('successfully loads', () => {
    cy.visit('/')
  })
})

describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true)
  })
})