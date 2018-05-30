/*****************************************************
  Outputs an array of hands to have a vanilla hands poker range

  Done in a functional way. No object here.
/*****************************************************/

const cards = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2' ];

/* Returns the value of the card
   Example: K => 13
   Tests:
      console.log(cardValue('K'));
      console.log(cardValue('Q'));
      console.log(cardValue('2'));
      console.log(cardValue('A'));
*/
const cardValue = (c) => {
  let copy = Array.from(cards);
  copy.reverse();
  return copy.indexOf(c) + 2
}

/* Compares 2 cards >=
   Example: K, K => 0 - ===
            A, T => 2 - >
            T, J => 1 - <
   Tests:
        console.log(cardCompare('K', 'K'));
        console.log(cardCompare('A', 'K'));
        console.log(cardCompare('T', 'J'));
*/
const cardCompare = (c1, c2) => {
  if (cardValue(c1) === cardValue(c2)) {
    return 0
  }
  if (cardValue(c1) > cardValue(c2)) {
    return 2
  }
  if (cardValue(c1) < cardValue(c2)) {
    return 1
  }
}

export const vanillaRange = () => {
  // takes 2 cards and display them nicely
  let iter2 = (c1) => {
    return (c2) => {
      return(handDisp(c1, c2));
    }
  }

  // takes one card & iterates against all cards
  let iter1 = (c1) => {
    let line = cards.map(iter2(c1));
    return(line);
  }

  return cards.map(iter1);
}

/* Display hand for the range board
   Example:
      'A', 'A' => 'AA'  - pair
      'A', '3' => 'A3s' - suited
      '3', 'A' => 'A3o' - off suit
   Tests:
      console.log(handDisp('K', 'K'));
      console.log(handDisp('K', '3'));
      console.log(handDisp('3', 'K'));
*/
export const handDisp = (c1, c2) => {
  switch (cardCompare(c1, c2)) {
    case 0:
      return(handNew(c1 + c2));
    case 2:
      return(handNew(c1 + c2 + 's'));
    case 1:
      return(handNew(c2 + c1 + 'o'));
  }
}

/* Builds a simple hand object with:
    - hand: 'AA'
    - color: 'fca'

    Example:
       'QJs' => {hand: 'QJs', color: 'fff'}
*/
const handNew = (hand, color = '#fff') => {
  return({
          hand: hand,
          color: color,
          position: handPosition(hand)
        });
}

/* Returns the position of the hand in the Range board.
   Example:
      'AA' => [0, 0]
      'KTs' => [4, 1]
      'QTo' => [2, 4]
   Tests:
      console.log(handPosition('AA'));
      console.log(handPosition('KKo'));
*/
export const handPosition = (hand) => {
  const obj = handHand(hand);

  const c1Val = cardValue(obj[0]);
  const c2Val = cardValue(obj[1]);
  let x = 0;
  let y = 0;
  if (obj[2] === 'suited') {
    x = 14 - c1Val;
    y = 14 - c2Val;
  } else {
    x = 14 - c2Val;
    y = 14 - c1Val;
  }
  return([x, y]);
}

/* Split a String hand 'AQo' to ['A', 'Q', 'offsuit']
    Example:
      'AQo' => ['A', 'Q', 'offsuit']
      'AA'  => ['A', 'A', 'pair']
*/
const handHand = (hand) => {
  const elems = hand.split('');

  let type;
  if(elems.length === 2) {
    type = 'pair';
  } else if (elems[2] == 'o') {
    type = 'offsuit';
  } else if (elems[2] == 's') {
    type = 'suited'
  }

  elems[2] = type;
  return(elems);
}

/* Takes a list of String hands and genrerate a list of Hands object with good color.
    Example:
    ['AA', 'AKs'] => [{ color : "#aaa", hand : "AA" }, { color : "#aaa", hand : "AKs" }]
*/
export const convertToHands = (handList, color = '#b9deba') => {
  const list = handList.map(hand => {
    return handNew(hand, color);
  })
  return list;
}


/* Returns a new Range with the updated hands (mostly colors)
*/
export const updateRange = (range, newHands) => {
  console.log('the new hand list is ');
  console.log(newHands);

  newHands.forEach(hand => {
    const x = hand.position[0];
    const y = hand.position[1];
    range[x][y] = hand;
  });

  return range;
}


