const generateUniqueId = require('../../src/ultils/GenerateUniqueId');


describe ('Generete Unique Id', () =>{
  it('Should generate an unique ID', () => {
    const id = generateUniqueId();

    expect(id).toHaveLength(8);
  });
});