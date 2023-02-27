export class Model {
  constructor() {
    this._grid = [];
    this._position = [];
    this._winning = [];
    this._totalWin = 0;
    this._cascadeGridsArr = [];
    this._cascaseWinningArr = []
    this._totalCascadeWin = 0;
    this._totalNumberOfCascadeWin = 0;
    this._symbolsToRemoveArr = [];

  }
  set reelGrid(grid) {
    this._grid = grid;
  }
  get reelGrid() {
    return this._grid;
  }
  set symbolsToRemoveArr(grid) {
    this._symbolsToRemoveArr = grid;
  }
  get symbolsToRemoveArr() {
    return this._symbolsToRemoveArr;
  }
  set cascadeGridsArr(grid) {
    this._cascadeGridsArr = grid;
  }
  get cascadeGridsArr() {
    return this._cascadeGridsArr;
  }

  set cascaseWinningArr(value) {
    this._cascaseWinningArr = value;
  }
  get cascaseWinningArr() {
    return this._cascaseWinningArr;
  }

  set stopPosition(position) {
    this._position = position;
  }
  get stopPosition() {
    return this._position;
  }

  set winningPaylines(winning) {
    this._winning = winning;
  }

  get winningPaylines() {
    return this._winning;
  }

  set totalWin(win) {
    this._totalWin = win;
  }
  get totalWin() {
    return this._totalWin;
  }

  set totalCascadeWin(win) {
    this._totalCascadeWin = win;
  }
  get totalCascadeWin() {
    return this._totalCascadeWin;
  }

  get totalNumberOfCascadeWin() {
    return this.cascadeGridsArr.length;
  }

  resetData() {
    this._grid = [];
    this._position = [];
    this._winning = [];
    this._totalWin = 0;
    this._cascadeGridsArr = [];
    this._cascaseWinningArr = [];
    this._totalCascadeWin = 0;
    this._totalNumberOfCascadeWin = 0;
    this._symbolsToRemoveArr = [];

  }
}
