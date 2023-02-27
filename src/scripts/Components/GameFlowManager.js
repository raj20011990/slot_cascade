import { dispatcher, Globals } from "../Core/Globals";

export class GameFlowManager {
  constructor(model) {
    this.model = model;
    this.currentCascadeIndex = 0;
    this._addEventListner();
  }

  _addEventListner() {
    dispatcher.on("SPIN_BUTTON_CLICKED", this._spinButtonClicked.bind(this));
    dispatcher.on(
      "REEL_STOPPED",
      this._onReelStopped.bind(this)
    );
    dispatcher.on("SHOW_NEXT_CASCADE_WIN", this._showCascaseWinPresentation.bind(this))
  }

  _spinButtonClicked() {
    if (!Globals.spinButtonClicked) {
      this.currentCascadeIndex = 0;
      Globals.spinButtonClicked = true;
      dispatcher.fireEvent("UPDATE_SPIN_BUTTON_STATE", false);
      dispatcher.fireEvent("RESET_WIN_LINE_PRESENTATION");
      this.model.resetData();
      dispatcher.fireEvent("SPIN_REQUEST");
    }
  }
  _onReelStopped() {
    if (Globals.Cascade_win) {
      if (this.model.totalNumberOfCascadeWin > 0) {
        this._showCascaseWinPresentation();
      } else {
        Globals.spinButtonClicked = false;
        dispatcher.fireEvent("UPDATE_SPIN_BUTTON_STATE", true);
        dispatcher.fireEvent("UPDATE_SYMBOL_GRID");
        dispatcher.fireEvent("SHOW_IDLE_PRESENTATION");

      }
    } else {
      Globals.spinButtonClicked = false;
      dispatcher.fireEvent("UPDATE_SPIN_BUTTON_STATE", true);
      dispatcher.fireEvent("UPDATE_SYMBOL_GRID");
      if (this.model.totalWin) {
        const winningObj = {
          winnings: this.model.winningPaylines,
          totalWin: this.model.totalWin
        }
        dispatcher.fireEvent("SHOW_WIN_LINE_PRESENTATION", winningObj);
      } else {
        dispatcher.fireEvent("SHOW_IDLE_PRESENTATION");
      }
    }
  }

  _showCascaseWinPresentation() {
    if ((this.currentCascadeIndex < this.model.cascaseWinningArr.length) && this.model.cascaseWinningArr[this.currentCascadeIndex].length) {
      const winningObj = {
        winnings: this.model.cascaseWinningArr[this.currentCascadeIndex],
        totalWin: this.model.totalCascadeWin,
        symbolsToRemove: this.model.symbolsToRemoveArr[this.currentCascadeIndex],
        updateGrid: this.model.cascadeGridsArr[this.currentCascadeIndex + 1]

      }
      this.model.reelGrid = this.model.cascadeGridsArr[this.currentCascadeIndex]
      dispatcher.fireEvent("UPDATE_SYMBOL_GRID");
      this.currentCascadeIndex++
      dispatcher.fireEvent("SHOW_WIN_LINE_PRESENTATION", winningObj);

    } else {
      Globals.spinButtonClicked = false;
      dispatcher.fireEvent("UPDATE_SPIN_BUTTON_STATE", true);
      this.model.reelGrid = this.model.cascadeGridsArr[this.currentCascadeIndex]
      dispatcher.fireEvent("UPDATE_SYMBOL_GRID");
    }

  }
}
