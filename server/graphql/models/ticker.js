const tickers = {
  1: {
    title: 'ticker title 1',
    message: 'Ticker message one',
    id: 1
  },
  2: {
    title: 'ticker title 2',
    message: 'Ticker message two',
    id: 2
  },
  3: {
    title: 'ticker title 3',
    message: 'Ticker message three',
    id: 3
  },
  4: {
    title: 'ticker title 4',
    message: 'Ticker message four',
    id: 4
  }
}

function getTicker (id) {
  return tickers[id]
}

module.exports = getTicker
