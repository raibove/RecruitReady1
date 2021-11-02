

var answer = "linked list is a linear data structure consisting of nodes and each node is connected to next node "
var arr = ["linked", "list", "link" ,"next", "data", "nodes", "node", "memory", "fields", "two", "address", "pointer", "null", "head", 
"linear",
"structure"
,"reference"
,"field"
,"doubly"
, "circular"
, "singly"
]

var keywords = new Set(arr);

answer = answer.split(" ");
let count = 0;
for(let i =0;i<answer.length;i++){
    if(ar.has(answer[i])){
        count++;
    }
}

console.log(count);

