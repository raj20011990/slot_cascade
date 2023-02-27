import * as PIXI from "pixi.js";
import { ButtonPanelConfig, dispatcher, Globals } from "../Core/Globals";

export class ButtonPanel {
  constructor() {
    this.container = new PIXI.Container();
    this.container.x = ButtonPanelConfig.x;
    this.container.y = ButtonPanelConfig.y;
    this.container.sortableChildren = true;
    this._addEventListner();
    this._addButtonPanel();
  }

  _addEventListner() {
    dispatcher.on(
      "UPDATE_SPIN_BUTTON_STATE",
      this._updateSpinButtonState.bind(this),
      this
    );
  }

  _addButtonPanel() {
    this.lineWinText = new PIXI.Text("", {
      font: "200 8pt Open Sans",
      fill: "black",
      align: "center"
    });
    this.cascadeMessage = new PIXI.Text("", {
      font: "200 8pt Open Sans",
      fill: "black",
      align: "center"
    });
    this.cascadeMessage.text = "Press Button to Enable/Disable Cascade feature."

    this.cascadeMessage.anchor.set(0, 0.5);
    this.cascadeMessage.position.set(80, 200);
    this.container.addChild(this.cascadeMessage);
    this.lineWinText.anchor.set(0.5, 0.5);
    this.lineWinText.position.set(0, 250);
    this.container.addChild(this.lineWinText);
    this.lineWinText.text = "Cascade Enabled"
    this.spinButton = new PIXI.Sprite(Globals.resources[`spin_Button`].texture);
    this.spinButton.anchor.set(0.5);
    this.spinButton.interactive = true;
    this.spinButton.buttonMode = true;
    this.container.addChild(this.spinButton);
    this.spinButton.on("pointerdown", this._onSpinButtonClick, this);

    this.indicatorButton = new PIXI.Sprite(Globals.resources[`indicator`].texture);
    this.indicatorButton.anchor.set(0.5);
    this.indicatorButton.scale.set(0.5)
    this.indicatorButton.interactive = true;
    this.indicatorButton.buttonMode = true;
    this.indicatorButton.y = 200;
    this.container.addChild(this.indicatorButton);
    this.indicatorButton.on("pointerdown", this._onIndicatorButtonclicked, this);
  }
  _onIndicatorButtonclicked(){
    Globals.Cascade_win = !Globals.Cascade_win;
    this.lineWinText.text = Globals.Cascade_win ? "Cascade Enabled" : "Cascade Disabled";
    this.container.removeChild(this.cascadeMessage);
    console.log("CASCADE WINS ENABLED :: ", Globals.Cascade_win)
  }
  _updateSpinButtonState(event) {
    this.spinButton && (this.spinButton.interactive = event.data);
    this.indicatorButton && (this.indicatorButton.interactive = event.data);

  }
  _onSpinButtonClick() {
    dispatcher.fireEvent("SPIN_BUTTON_CLICKED");
  }
}
