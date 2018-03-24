// Huffman Encoding

////////////////////////////////////////////////////////////////////////////////
// Some classes
////////////////////////////////////////////////////////////////////////////////
class Node {
  constructor(leftChildNode, rightChildNode, value, freq) {
    this.leftChildNode = leftChildNode;
    this.rightChildNode = rightChildNode;
    this.value = value;
    this.freq = freq;
  }
}

class PathBuilder{
    constructor(node, path){
        this.node = node;
        this.path = path;
    }
}
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
// Example frequency input
////////////////////////////////////////////////////////////////////////////////
let frequencyString = "aaaaaaaaaaaabbbccddddddeeeeeeefffgggggggghhhiiiiiiiiiiijjkkklllmmmnnnnnoooooooopppqqrssstttttuvwxyz    AAABBCCDDEEFFGGHIIJKLMNOPQRSSSTTUVVWXXYZZZ";
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
// Get the frequency of each character
////////////////////////////////////////////////////////////////////////////////
let chars = frequencyString.split("");
let freqObj = chars.reduce((accumulator, currentValue) => {
    if(!accumulator[currentValue]) accumulator[currentValue] = 0;
    accumulator[currentValue]++;
    return accumulator;
}, {});

var nodes = [];
for(letter in freqObj){
    nodes.push(new Node(null, null, letter, freqObj[letter]));
}
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
// Sort list of chars/frequencies
////////////////////////////////////////////////////////////////////////////////
function compare(a, b) {
  if (a.freq < b.freq) {
    return -1;
  }
  if (a.freq > b.freq) {
    return 1;
  }
  return 0;
}

nodes.sort(compare);
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
// Build a tree using that list
////////////////////////////////////////////////////////////////////////////////
while(nodes.length > 1){
    let left = nodes.shift(); // Get the lowest frequency node
    let right = nodes.shift(); // Get the next lowest frequency node
    let newNode = new Node(left, right, null, left.freq + right.freq); // Create a new node that is the sum of those two nodes
    nodes.push(newNode); // Add to end of list
    nodes.sort(compare); // Since you are using a priority queue, you shouldn't need this
}

let root = nodes[0];
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
// If you want to encode using a map/dictionary, it is actually faster
////////////////////////////////////////////////////////////////////////////////
let encodingMap = {};

let encodingList = [new PathBuilder(root, "")];
let encodingPath = "";
while(encodingList.length > 0){
    let current = encodingList.shift();
    if(current.node.leftChildNode)
        encodingList.push(new PathBuilder(current.node.leftChildNode, current.path + "0"));

    if(current.node.rightChildNode)
        encodingList.push(new PathBuilder(current.node.rightChildNode, current.path + "1"));

    if(!current.node.value)
        continue;

    encodingMap[current.node.value] = current.path;
}

function encodeCharacterUsingMap(char){
    return encodingMap[char];
}
function encodeUsingMap(message){
    let chars = message.split("");
    let encoded = chars.map(encodeCharacterUsingMap).join("");
    console.log(`Bits used for Huffman Coding: ${encoded.length}`);
    console.log(`Bits used for Ascii Encoding: ${chars.length * 8}`);
    return encoded;
}
////////////////////////////////////////////////////////////////////////////////
// Unless you want to be lame and encode using the way he probably wants you to
////////////////////////////////////////////////////////////////////////////////
function encodeCharacter(char){
    let current = new PathBuilder(root, "")
    let nodesToSearch = [];
    while(current.node.value !== char){
        if(current.node.leftChildNode)
            nodesToSearch.push(new PathBuilder(current.node.leftChildNode, current.path + "0"));

        if(current.node.rightChildNode)
            nodesToSearch.push(new PathBuilder(current.node.rightChildNode, current.path + "1"));

        if(nodesToSearch.length === 0)
            throw new Exception("Cannot encode this character");

        current = nodesToSearch.shift();
    }
    return currentPath
}

function encode(message){
    let chars = message.split("");
    let encoded = chars.map(encodeCharacter).join("");
    console.log(`Bits used for Huffman Coding: ${encoded.length}`);
    console.log(`Bits used for Ascii Encoding: ${chars.length * 8}`);
    return encoded;
}
////////////////////////////////////////////////////////////////////////////////
// Decode will be the same either way though
////////////////////////////////////////////////////////////////////////////////
function decode(message){
    let bits = message.split("");
    let string = "";
    let currentNode = root;
    for(bit of bits){
        if(bit === "0"){
            currentNode = currentNode.leftChildNode;
        } else {
            currentNode = currentNode.rightChildNode;
        }
        if(currentNode.value){
            string = string + currentNode.value;
            currentNode = root;
        }
    }
    return string;
}
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
var myMessage = "Encode this message fool"
var encodedMessage = encode(myMessage);
var encodedMessageMap = encodeUsingMap(myMessage);
var decodedMessage = decode(encodedMessage);
var decodedMessageMap = decode(encodedMessageMap);

console.log(`Message encoded to ${encodedMessage}`);
console.log(`Message encoded to map ${encodedMessageMap}`);
console.log(`Message decoded to ${decodedMessage}`);
console.log(`Message decoded to map ${decodedMessageMap}`);
////////////////////////////////////////////////////////////////////////////////
