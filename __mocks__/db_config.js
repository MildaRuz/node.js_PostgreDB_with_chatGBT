const poolMock = {
  query: jest.fn().mockResolvedValue({
    rows: [
      { id: 1, amount: '100', userto: 2, userfrom: 1 },
      { id: 2, amount: '50', userto: 3, userfrom: 1 },
    ],
  }),
};

module.exports = poolMock;
