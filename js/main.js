var dragged;
var pieceColor;
var colorTurn = "red";

const squares = document.querySelectorAll(".square");
const pieces = document.querySelectorAll(".piece");

for (const square of squares) {
  square.addEventListener("drop", dragDrop);
  square.addEventListener("dragover", dragOver);
}

for (const piece of pieces) {
  piece.addEventListener("dragstart", dragStart);
}

function dragStart(e) {
  dragged = e.target.parentNode;
  pieceColor = dragged.classList.contains("red") ? "red" : "black";
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop(e) {
  e.preventDefault();

  let draggedFrom = dragged.parentNode.classList[0].toLowerCase();

  let draggedTo = e.target.classList[0]
    ? e.target.classList[0].toLowerCase()
    : e.target.parentNode.parentNode.classList[0].toLowerCase();

  let validMove = isValidMove(draggedFrom, draggedTo, pieceColor);

  if (validMove) {
    e.target.appendChild(dragged);
    colorTurn = pieceColor === "red" ? "black" : "red";
  }
}

function isValidMove(squareFrom, squareTo, pieceColor) {
  let arraySquareFrom = squareFrom.split("");
  let arraySquareTo = squareTo.split("");
  let rankFrom = arraySquareFrom[0];
  let rankTo = arraySquareTo[0];
  let numFrom = Number(arraySquareFrom[1]);
  let numTo = Number(arraySquareTo[1]);
  let numDiff = Math.abs(numTo - numFrom);
  let rankDiff = Math.abs(rankTo.charCodeAt(0) - rankFrom.charCodeAt(0));

  if (pieceColor !== colorTurn) {
    return false;
  }

  if (pieceColor === "red" && numTo < numFrom) {
    return false;
  }

  if (pieceColor === "black" && numTo > numFrom) {
    return false;
  }

  if (rankDiff === 2 && numDiff === 2) {
    let parentOfSquareHeadedTo = document.getElementsByClassName(
      squareTo.toUpperCase()
    )[0];

    if (parentOfSquareHeadedTo.children.length > 0) {
      return false;
    }

    let higherRank = rankFrom > rankTo ? rankFrom : rankTo;
    let higherNum = numFrom > numTo ? numFrom : numTo;

    let squareBetween =
      String.fromCharCode(higherRank.charCodeAt(0) - 1) + (higherNum - 1);

    let parentOfSquareBetween = document.getElementsByClassName(
      squareBetween.toUpperCase()
    )[0];

    if (parentOfSquareBetween.children.length > 0) {
      if (parentOfSquareBetween.children[0].classList.contains(pieceColor)) {
        return false;
      } else {
        parentOfSquareBetween.children[0].remove();
        return true;
      }
    } else {
      return false;
    }
  }

  if (rankDiff === 1 && numDiff === 1) {
    let squareHeadedTo = rankTo + numTo;
    let parentOfSquareHeadedTo = document.getElementsByClassName(
      squareHeadedTo.toUpperCase()
    )[0];
    if (parentOfSquareHeadedTo.children.length) {
      return false;
    } else {
      return true;
    }
  }
  return false;
}
