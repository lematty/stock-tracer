import { stockReducer, initialState } from '../reducers/stock.reducer';

describe('Stock Reducer', () => {
  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = stockReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
