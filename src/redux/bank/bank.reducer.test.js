import bankReducer from './bank.reducer';

const initialState = {
  bells: 0,
  bellsRequested: 0,
  errorMessage: ''
}
describe('bankReducer', () => {
  it('returns initial state', () => {
    expect(bankReducer(undefined, {})).toEqual(initialState);
  });
});