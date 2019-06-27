const rickandmorty = require('../src/data/rickandmorty/rickandmorty.json');
require('../src/data.js');

describe('dataLover Object', () => {

  it('Debería ser un objeto', () => {
    expect(typeof dataLover).toBe('object');
  });

  describe('filter', () => {
    it('Debería ser función', () => {
      expect(typeof dataLover.filter).toBe('function');
    });

    it('returns array of object ', () => {
      expect(dataLover.filter(rickandmorty.results, 'Male') instanceof Array).toBe(true);
		});
		
  });

  describe('Sort', () => {
    it('Debería ser función', () => {
      expect(typeof dataLover.sortData).toBe('function');
		});
		
		it('returns array of object ', () => {
      expect(dataLover.sortData(rickandmorty.results, 'gender', 'DESC') instanceof Array).toBe(true);
		});

  });
});
// "pretest": "npm run eslint && npm run htmlhint",
