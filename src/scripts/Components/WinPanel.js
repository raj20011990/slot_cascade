import * as PIXI from "pixi.js";
import gsap from "gsap";

import {
  dispatcher,
  Globals,
  MessageTextPosition,
  SymbolId,
  WinLinePanelConfig,
  WinTextPosition,
} from "../Core/Globals";

export class WinPanel {
  constructor() {
    this.container = new PIXI.Container();
    this.container.x = WinLinePanelConfig.x;
    this.container.y = WinLinePanelConfig.y;
    this._addEventListner();
    this._winLineText();
  }

  _addEventListner() {
    dispatcher.on(
      "SHOW_WIN_LINE_PRESENTATION",
      this._onShowWinLinePresentation.bind(this),
      this
    );
    dispatcher.on(
      "RESET_WIN_LINE_PRESENTATION",
      this._resetWinLinePresenatation.bind(this),
      this
    );
    dispatcher.on(
      "SHOW_IDLE_PRESENTATION",
      this._onIdlePresentation.bind(this),
      this
    );
  }

  _winLineText() {
    this.lineWinText = new PIXI.Text("", {
      font: "400 10pt Open Sans",
      fill: "black",
      align: "center"
    });
    this.totalWinText = new PIXI.Text(Globals.gameIdleText, {
      font: "400 10pt Open Sans",
      fill: "black",
      align: "center"
    });
    this.totalWinText.position.set(MessageTextPosition.x, MessageTextPosition.y);
    this.lineWinText.position.set(WinTextPosition.x, WinTextPosition.y);
    this.totalWinText.anchor.set(0.5, 0.5)
    this.lineWinText.anchor.set(0.5, 0.5)
    this.container.addChild(this.lineWinText);
    this.container.addChild(this.totalWinText);
  }
  _onShowWinLinePresentation(event) {
    const winningsObj = event.data;
    this.currentLineIndex = 0;
    this.totalWinText.text = Globals.gameTotalWinText + winningsObj.totalWin;
    this._playLineWin(winningsObj);
  }

  _playLineWin(winningsObj) {

    this.timer && clearTimeout(this.timer);
    this.lineWinText.text =
      "Symbol " +
      SymbolId[winningsObj.winnings[this.currentLineIndex].symbol] +
      " Pays: " +
      winningsObj.winnings[this.currentLineIndex].payout +
      " in " +
      winningsObj.winnings[this.currentLineIndex].offsets.length +
      " ways"
    this.currentLineIndex++;
    if (this.currentLineIndex > winningsObj.winnings.length - 1) {
      gsap.delayedCall(2, this._showNextCascadeWinPresetation.bind(this), [winningsObj])

    } else {
      this.timer = setTimeout(
        this._playLineWin.bind(this, winningsObj),
        Globals.lineWinPresntationDelay
      );
    }

  }
  _showNextCascadeWinPresetation(winningsObj) {
    gsap.killTweensOf(this._showNextCascadeWinPresetation.bind(this))
    this.lineWinText.text = "";
    Globals.Cascade_win && dispatcher.fireEvent("START_SYMBOLS_MOVEMENT", winningsObj);
  }

  _resetWinLinePresenatation() {
    this.timer && clearTimeout(this.timer);
    this.lineWinText.text = "";
    this.totalWinText.text = Globals.gameWaitText;
  }

  _onIdlePresentation() {
    this.totalWinText.text = Globals.gameIdleText;
  }
}
