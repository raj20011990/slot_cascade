export const SlotMath =
{
  rowCount: [3, 3, 3, 3, 3],

  payTable:
  {
    "0": [0, 0, 80, 100, 150],
    "1": [0, 0, 50, 80, 100],
    "2": [0, 0, 50, 80, 100],
    "3": [0, 0, 50, 80, 100],
    "4": [0, 0, 50, 80, 100],
    "5": [0, 0, 50, 80, 100],
    "6": [0, 0, 50, 80, 100],
    "7": [0, 0, 30, 50, 80],
    "8": [0, 0, 30, 50, 80],
    "9": [0, 0, 30, 50, 80],
    "10": [0, 0, 30, 50, 80],
    "11": [0, 0, 30, 50, 80],
    "12": [0, 0, 30, 50, 80],
    "13": [0, 0, 10, 20, 30],
    "14": [0, 0, 10, 20, 30],
    "15": [0, 0, 10, 20, 30],
    "16": [0, 0, 10, 20, 30],
    "17": [0, 0, 5, 10, 20],
    "18": [0, 0, 5, 10, 20],
  },

  
  reelSet: [
    ["1", "16", "2", "16", "18", "18", "18","1", "8", "8", "10", "9", "10","17", "17", "17", "18", "18", "18","11", "12", "12", "13", "11", "0", "4", "6", "1", "8", "8", "10", "9", "10", "11", "12", "12", "13", "11", "0", "4", "3", "4", "10", "9", "10", "11", "12", "12", "13", "11", "14", "17", "17", "17","15", "14", "18", "18", "18","16", "17", "17", "2", "1", "2", "7", "3", "4", "1", "7", "4", "6", "1", "8", "8", "10", "9", "10", "11", "12", "12", "13", "11", "14", "15", "14", "16", "17", "17", "18", "18", "3", "4", "2", "1", "2", "7", "3", "4", "1", "7", "4", "6", "1"],
    ["1", "16", "17", "16", "1", "8", "8", "10", "9", "16", "16", "16","10", "11", "12", "12", "13","17", "17", "17","11", "0", "4", "1", "8", "10", "9","18", "18", "18", "10", "11", "12", "12", "13", "11", "0", "4", "3", "4", "10", "9", "10", "11", "12", "12", "13", "11", "14", "15","18", "18", "18", "14","17", "17", "17", "16", "17", "17", "2", "1", "2","18", "18", "18", "7", "3", "4", "1", "7", "4", "6", "1", "8", "8", "10", "9", "10", "11", "12", "12", "13", "11", "14", "15", "14", "16", "17", "17", "18", "18", "3", "4", "2", "1", "2", "7", "3", "4", "1", "6", "6", "6", "1", "8", "8", "10", "9", "10", "11", "12","18", "18", "18", "12", "13", "11", "14", "15","18", "18", "18", "14", "16", "17", "17", "10", "9", "10", "11", "12", "12", "13", "11", "0", "4",  "3", "4", "10", "9", "10", "11", "12", "12", "13", "11", "14", "15", "14", "16", "17", "17", "2", "1", "2", "7", "3", "4", "1", "7", "4", "6", "1", "8", "8", "10", "9", "10", "11", "12", "12", "13", "11", "14", "15", "14", "16", "17", "17", "18", "18", "3", "4", "2", "1", "2", "7", "3", "4", "1", "7", "4", "6", "1"],
    ["1", "16", "17", "16","10", "9", "10", "11", "16", "16", "16","12", "12", "13", "17", "17", "17","11", "0", "4", "17", "17", "17","3", "4", "10", "9", "18", "18", "18","10", "11", "12", "12", "13", "11", "14", "15","18", "18", "18", "14", "16", "17", "17", "2", "1", "2", "7", "3", "4", "1", "7", "4", "6", "1","17", "17", "17", "8", "8", "10", "9", "10", "11", "12", "12", "13", "11", "14","18", "18", "18", "15", "14", "16", "17", "17", "18", "18", "3", "4", "2", "1", "2", "7", "3", "4", "1","1", "6", "6", "6", "1", "6", "1", "8", "8", "10", "9", "10", "11", "12", "12", "13", "11", "0", "4", "8", "8", "10", "9", "10", "11", "12", "12", "13", "11", "0", "4", "10", "9", "10", "11", "12", "12", "13", "11", "14", "15", "14", "16", "17", "17", "3", "4", "2", "1", "2", "7", "3", "4", "1", "7", "4", "6", "1", "8", "8", "10", "9", "10", "11", "12", "12", "13", "11", "14", "15", "14", "16", "17", "17", "18", "18", "3", "4", "2", "1", "2", "7", "3", "4", "1", "7", "4", "6", "1"],
    ["1", "16", "16", "16","6", "6", "6", "6", "1","16", "16", "16","8", "8", "10", "9","17", "17", "17", "10", "11", "12", "12", "13", "11", "0", "4", "1", "8", "8", "10", "9", "10", "11", "12", "12", "13", "11", "14", "15", "14", "16", "17", "17", "10", "9", "10","17", "17", "17", "11", "12", "12", "13", "11", "0", "4", "3", "4", "2", "1", "2", "7", "3", "10", "9", "10", "11", "12", "12", "13", "11", "14", "15", "14", "16", "17", "17", "4", "1", "7", "4", "6", "1", "8", "8", "10", "9", "10", "11", "12", "12", "13", "11", "14", "15", "14", "16", "17", "17", "18", "18", "3", "4", "2", "1", "2", "7", "3", "4", "1","8","18", "18", "18", "10", "9", "10", "11", "12", "18", "18", "18","12", "13", "11", "0", "4", "3", "4", "10", "9", "10", "11", "12", "12", "13", "11", "14", "15", "14", "16", "17", "17", "2", "1", "2", "7", "3", "4", "1", "7", "4", "6", "1", "8", "8", "10", "9", "10", "11", "12", "12", "13", "11", "14", "15", "14", "16", "17", "17", "18", "18", "3", "4", "2", "1", "2", "7", "3", "4", "1", "7", "4", "6", "1"],
    ["1", "16", "16", "16","6", "6", "1", "8","16", "16", "16", "8", "10", "9", "10", "11", "12", "17", "17", "17","12", "13", "11", "0", "4", "6", "6", "1", "10", "9", "10", "11", "12", "12", "13", "11", "14", "15", "14", "16", "17", "17", "8", "8", "17", "17", "17","10", "9", "10", "11", "12", "12", "13", "11", "0", "4", "3", "4", "8", "10", "9", "10", "11", "12", "12", "13", "11", "0", "4", "3", "4", "10", "9", "10", "11", "12", "12", "13", "11", "14", "15", "14", "16", "17", "17", "2", "1", "2", "7", "3", "4", "1", "7", "4", "6", "1", "8", "8", "10", "9", "10", "11", "12", "12", "13", "11", "14", "15", "14", "16", "17", "17", "18", "18", "3", "4", "2", "1", "2", "7", "3", "4", "1","2", "1", "2", "7", "3", "4", "10", "9", "10", "11", "12", "12", "13", "11", "14", "15", "14", "16", "17", "17", "1", "7", "4", "6", "1", "8", "8", "10", "9", "10", "11", "12", "12", "13", "11", "14", "15", "14", "16", "17", "17", "18", "18", "3", "4", "2", "1", "2", "7", "3", "4", "1", "7", "4", "6", "1"]
  ]
};
