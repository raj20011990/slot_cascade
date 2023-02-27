import { Globals, dispatcher } from "../Core/Globals";
import { SlotMath } from "./SlotMath";

export class SlotResponse {
    constructor() {
        this._addEventListener();
        this._response = {};
        this.index = 0;
    }

    _addEventListener() {
        dispatcher.on("INIT_REQUEST", this._processInitRequest.bind(this), this);
        dispatcher.on("SPIN_REQUEST", this._processSpinRequest.bind(this), this);
    }

    _processInitRequest() {
        this.response = {};
        this.response.positions = [0, 0, 0, 0, 0];
        this.response.grid = this._processGrid(this.response.positions, SlotMath.reelSet, SlotMath.rowCount);
        this.response.type = "INIT";
        dispatcher.fireEvent("INIT_RESPONSE", this.response);
    }

    _processSpinRequest() {

        this.response = {};
      //  this.response.positions = [0, 0, 0, 5, 30];
        this.index = 0
         this.response.positions = this._processRNGposition(SlotMath.reelSet);
        this.response.grid = this._processGrid(this.response.positions, SlotMath.reelSet, SlotMath.rowCount);
        this.response.winnings = this._calculateWinning(this.response.grid)
        this.response.cascadeWinning = [];
        this.response.cascadeGrid = [];
        this.response.symbolsToRemove = [];
        // console.log("rrr  ", response.winnings[0].winSymbolPosition)
        if (Globals.Cascade_win && this.response.winnings.length > 0) {
            const symbolsToRemove = this._calculateSymbolsToRemove(this.response.grid, this.response.winnings);
            this.response.symbolsToRemove.push(symbolsToRemove)
            this.response.cascadeWinning.push(this.response.winnings)
            this.response.cascadeGrid.push(this.response.grid);
            this._calculateNewStopPosition(symbolsToRemove)
        } else {
            this.response.type = "SPIN";
            console.log("NORMAL_WAYS_WIN : ", this.response)
            dispatcher.fireEvent("SPIN_RESPONSE", this.response);
        }


    }
    _calculateSymbolsToRemove(grid, winnings) {
        const arr = []
        winnings.length && winnings.forEach((element) => {
            element.winSymbolPosition.length && element.winSymbolPosition.forEach((val) => {
                if (!arr.includes(val)) {
                    arr.push(val);
                }
            });
        });

        if (arr.length) {
            return this._emptyGridOfWinPosition(grid, arr);
        } else {
            return [];
        }
    }
    _calculateNewStopPosition(emptyNewGrid) {
        const filledNewGrid = this._createFilledGridPosition(emptyNewGrid);

        const winnings = this._calculateWinning(filledNewGrid);
        const symbolsToRemove = this._calculateSymbolsToRemove(filledNewGrid, winnings);
        this.response.cascadeWinning.push(winnings)
        this.response.cascadeGrid.push(filledNewGrid);
        this.response.symbolsToRemove.push(symbolsToRemove)
        if (winnings.length > 0) {
            this._calculateNewStopPosition(symbolsToRemove)
        } else {
            this.response.type = "SPIN";
            console.log("CASCADE_WAYS_WIN : ", this.response)
            dispatcher.fireEvent("SPIN_RESPONSE", this.response);
        }
    }

    _createFilledGridPosition(grid) {
        let counter = 14;
        const filledNewGrid = this._transpose(grid)
        for (var i = filledNewGrid.length - 1; i >= 0; i--) {
            for (var j = filledNewGrid[i].length - 1; j >= 0; j--) {
                if (filledNewGrid[i][j] == -1) {
                    if (i > 0 && filledNewGrid[i - 1][j] && filledNewGrid[i - 1][j] != -1) {
                        filledNewGrid[i][j] = filledNewGrid[i - 1][j];
                        filledNewGrid[i - 1][j] = -1;
                    } else if (i > 1 && filledNewGrid[i - 2][j] && filledNewGrid[i - 2][j] != -1) {
                        filledNewGrid[i][j] = filledNewGrid[i - 2][j];
                        filledNewGrid[i - 2][j] = -1;
                    } else {
                        filledNewGrid[i][j] = this._generateNewSymbols(j)
                    }
                }
                counter--
            }
        }
        return this._transpose(filledNewGrid);
    }

    _generateNewSymbols(reelId) {
        const random = Math.round(Math.random() * SlotMath.reelSet[reelId].length - 1)
        return SlotMath.reelSet[reelId][random];
        // testing purpose
        // this.index++;
        // if (this.index <= 4) {
        //     console.log("rrrrrrrrrrrrandomr  ", this.index)
        //     return "17";
        // } else {
        //     const random = Math.round(Math.random() * SlotMath.reelSet[reelId].length - 1)
        //     return SlotMath.reelSet[reelId][random];
        // }

    }
    _transpose(a) {
        return Object.keys(a[0]).map(function (c) {
            return a.map(function (r) { return r[c]; });
        });
    }
    _emptyGridOfWinPosition(grid, winSymbolPosition) {
        let counter = 14;
        const emptyNewGrid = this._transpose(grid)
        const winSymbolsArr = [];
        for (var i = emptyNewGrid.length - 1; i >= 0; i--) {
            const arr = []
            for (var j = emptyNewGrid[i].length - 1; j >= 0; j--) {
                if (winSymbolPosition.includes(counter)) {
                    emptyNewGrid[i][j] = -1;
                    arr.push(i)
                }
                counter--
            }
            arr.length && winSymbolsArr.push(arr);
        }
        return this._transpose(emptyNewGrid);
    }
    _calculateWinning(grid, multiplier = 1) {
        let symbolList = [];
        for (var i = 0; i < grid.length; i++) {
            for (var j in grid[i]) {
                const symbol = Number(grid[i][j]);
                symbolList.push(symbol);

            }
        }
        symbolList = symbolList.filter((v, i, a) => a.indexOf(v) === i);
        let winnings = [];
        for (var s in symbolList) {
            const symbol = symbolList[s];
            let winSymbolOffsets = [];
            let currentSymbolOffsets = [];
            let flag = false;
            for (var col = 0; col < grid.length; col++) {
                for (var row = 0; row < grid[col].length; row++) {
                    let currentSymbol = Number(grid[col][row]);
                    if (currentSymbol == symbol) {
                        if (col == 0) {
                            currentSymbolOffsets.push('n,' + ((row * grid.length) + col));

                        } else {
                            for (var o in winSymbolOffsets) {
                                let offset = winSymbolOffsets[o];
                                offset = offset + ',' + ((row * grid.length) + col);
                                currentSymbolOffsets.push(offset);
                            }
                        }
                        flag = true;
                    }
                }
                if (flag) {
                    winSymbolOffsets = [];
                    winSymbolOffsets = winSymbolOffsets.concat(currentSymbolOffsets);

                    currentSymbolOffsets = [];
                    flag = false;
                }
                else {
                    break;
                }
            }
            const symbolWinning = this._detectWaysWins(symbol, winSymbolOffsets, multiplier);
            //  console.log("rrrr 00  ", symbolWinning)
            if (symbolWinning.length > 0) {
                winnings = winnings.concat(symbolWinning);


            }
        }
        console.log("rrrr 11  ", winnings)
        return winnings;
    }

    _detectWaysWins(symbol, winSymbolOffsets = [], multiplier = 1) {
        let symbolWinnings = [];
        let symbolOffset = [];
        let symbolWin = 0;
        const winSymbolPosition = [];

        for (var o in winSymbolOffsets) {
            const offset = winSymbolOffsets[o];
            let offsetList = offset.split(",").splice(1, offset.split(",").length);
            const payout = SlotMath.payTable[symbol][offsetList.length - 1];

            if (payout > 0) {
                for (var i in offsetList) {
                    if (!winSymbolPosition.includes(Number(offsetList[i]))) {
                        winSymbolPosition.push(Number(offsetList[i]))
                    }
                }

                symbolOffset.push(offsetList);
                symbolWin += payout;
            }
        }
        winSymbolPosition.length && winSymbolPosition.sort(function (a, b) { return a - b })
        if (symbolWin > 0) {
            symbolWin = symbolWin * multiplier;
            symbolWinnings.push(
                {
                    'symbol': symbol,
                    'offsets': symbolOffset,
                    'payout': symbolWin,
                    'winSymbolPosition': winSymbolPosition
                });
        }

        return symbolWinnings;
    }

    _processGrid(stops, reelSet, rowCount) {
        let symbolGrid = [];
        for (let col = 0; col < rowCount.length; col++) {
            let index = stops[col];
            let reel = [];
            const len = rowCount[col];
            for (var row = 0; row < len; row++) {
                reel.push(reelSet[col][index]);
                index = index + 1;
                index = index % reelSet[col].length;
            }
            symbolGrid.push(reel);
        }
        return symbolGrid;
    }

    _processRNGposition(reelSet) {
        const position = Array.from(new Array(reelSet.length), (value, i) => Math.floor(Math.random() * reelSet[i].length));
        return position;
    }

    get response() {
        return this._response;
    }

    set response(response) {
        this._response = response;
    }

}