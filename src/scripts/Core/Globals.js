import { EventDispatcher } from "./EventDispatcher";

export const Globals = {
    resources: {},
    initResponseReceived: false,
    spinResponseReceived: false,
    spinButtonClicked: false,
    gameIdleText : "PRESS SPIN TO PLAY",
    gameWaitText : "PLEASE WAIT FOR THE SERVER RESPONSE",
    gameTotalWinText : "TOTAL WIN: ",
    serverResponseWaitTimer: 1000,
    lineWinPresntationDelay: 1000,
    Cascade_win: true
};

export const dispatcher = new EventDispatcher();

export const ReelConfig = {
    x: 400,
    y: 120,
    row: 5,
    column:3,
    symbolWidth: 200,
    symbolHeight: 200,
    columnPadding: 5
}
export const symbolYPos = [0, 200, 400]
export const symbolDdownPos = [610, 810, 1010]


export const ButtonPanelConfig = {
    x: 1000,
    y: 270
}
export const WinTextPosition = {
    x: 670,
    y: -100
}
export const MessageTextPosition = {
    x: 670,
    y: 0
}
export const WinLinePanelConfig = {
    x: 320,
    y: 480
}
export const SymbolId = {
    0: "BONUS",
    1: "H1",
    2: "H2",
    3: "H3",
    4: "H4",
    5: "H5",
    6: "H6",
    7: "M1",
    8: "M2",
    9: "M3",
    10: "M4",
    11: "M5",
    12: "M6",
    13: "A",
    14: "K",
    15: "Q",
    16: "J",
    17: "10",
    18: "9",
}