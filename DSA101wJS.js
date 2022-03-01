let a = [7,12,9,4,5,6,8,9,45,23,91,12,37,55,72]

const binarySearch=(arr,l,r,x)=>{
  if(l>r){
    console.log(l,r)
    return -1;
  }
  let m = Math.floor((l+r)/2)
  console.log(l,r,m,arr[m],x)
  if(arr[m]===x) return m;
  if(arr[m]>x) return binarySearch(arr,l,m-1,x)
  else return binarySearch(arr,m+1,r,x)
  
}

a=a.sort((a,b)=>a>b)
console.log(a)

const x=9
console.log(binarySearch(a,0,a.length-1,x))
// -------------------------------------------
class Node {
  constructor(x) {
    this.val = x;
    this.next = null;
  }
}
function createPrependLinkedList(arr) {
  let head = null;
  arr.forEach((i) => {
    if (!head) {
      head = new Node(i);
      head.next = null;
    } else {
      let newNode = new Node(i);
      newNode.next = head;
      head = newNode;
    }
  });
  return head;
}
function createAppendLinkedList(arr) {
  let curr,
    head = null;
  arr.forEach((i) => {
    if (!head) {
      curr = new Node(i);
      curr.next = null;
      head = curr;
    } else {
      let newNode = new Node(i);
      newNode.next = null;
      curr.next = newNode;
      curr = curr.next;
    }
  });
  return head;
}

function printLinkedList(head) {
  let a = [];
  if (!head) {
    console.log('Empty!');
    return;
  }
  while (head) {
    a.push(head.val);
    console.log(head.val);
    head = head.next;
  }
  console.log(a.join('->'));
}

// h1 = createPrependLinkedList([1,2,3,4,5,6,7,8,9])
// printLinkedList(h1)

// h2 = createAppendLinkedList([1,2,3,4,5,6,7,8,9])
// printLinkedList(h2)
// --- OOP way -------
class LinkedList {
  constructor(arr) {
    this.head = null;
    this.tail = null;
    this.size = 0;
    if (arr) this.createLinkedList(arr);
  }
  createLinkedList(arr) {
    arr.forEach((i) => {
      this.appendLinkedList(i);
    });
  }
  appendLinkedList(i) {
    let curr = this.head;
    if (!this.head) {
      curr = new Node(i);
      curr.next = null;
      this.head = curr;
      this.tail = curr;
    } else {
      let newNode = new Node(i);
      newNode.next = null;
      this.tail.next = newNode;
      this.tail = this.tail.next;
    }
    this.size += 1;
  }

  removeElem(x) {
    let p = this.head;
    if (p.val === x) {
      let t = this.head;
      // delete t;
      this.head = this.head.next;
      // case where only 1 elem is present
      this.size -= 1;
      if (this.head === null) this.tail = null;
    } else {
      while (p.next && p.next.val !== x) {
        p = p.next;
      }
      if (p.next) {
        let t = p.next;
        p.next = p.next.next;
        // delete t
        // Updating tail
        this.size -= 1;
        if (p.next === null) this.tail = p;
      }
    }
  }

  printLinkedList() {
    let head = this.head;
    let a = [];
    if (!head) {
      // console.log('Empty!');
      return null;
    }
    while (head) {
      a.push(head.val);
      // console.log(head.val);
      head = head.next;
    }
    return a.join('->');
  }
}

l1 = new LinkedList([1, 2, 3, 4, 5, 6, 7, 8, 9]);
l1.printLinkedList();
// printLinkedList(h1)
// -----------------------------------------------------------------------------
// stack using arr in JS. pointer to last element is the top
// Queue using linkedlist or two pointer in array
// -------------------------------------------------------------------------------
class treeNode {
  constructor(x) {
    this.val = x;
    this.left = null;
    this.right = null;
  }
}
class BST {
  constructor(arr) {
    this.root = null;
    if (Array.isArray(arr)) this.createBST(arr);
  }
  createBST(arr) {
    arr.forEach((i) => {
      this.insertNode(i);
    });
  }
  insertNode(x) {
    const newNode = new treeNode(x);
    if (!this.root) {
      this.root = newNode;
    } else {
      let p = this.root;
      while (p) {
        if (p.val > x) {
          if (p.left === null) {
            p.left = newNode;
            break;
          }
          p = p.left;
        } else {
          if (p.right === null) {
            p.right = newNode;
            break;
          }
          p = p.right;
        }
      }
    }
  }
  getRoot() {
    return this.root;
  }
}
function inOrder(p) {
  // left,root,right
  if (!p) return;
  inOrder(p.left);
  console.log(p.val);
  inOrder(p.right);
}
function preOrder(p) {
  // root,left,right
  if (!p) return;
  console.log(p.val);
  preOrder(p.left);
  preOrder(p.right);
}
function postOrder(p) {
  // left,right,root
  if (!p) return;
  postOrder(p.left);
  postOrder(p.right);
  console.log(p.val);
}

t = new BST([100, 20, 200, 10, 30, 150, 300]);
inOrder(t.getRoot());
preOrder(t.getRoot());
postOrder(t.getRoot());

/*
https://en.wikipedia.org/wiki/Tree_traversal#Applications
Pre-order traversal can be used to make a prefix expression (Polish notation) from expression trees: traverse the expression tree pre-orderly. For example, traversing the depicted arithmetic expression in pre-order yields "+ * A − B C + D E".

Post-order traversal can generate a postfix representation (Reverse Polish notation) of a binary tree. Traversing the depicted arithmetic expression in post-order yields "A B C − * D E + +"; the latter can easily be transformed into machine code to evaluate the expression by a stack machine.

In-order traversal is very commonly used on binary search trees because it returns values from the underlying set in order, according to the comparator that set up the binary search tree.

Post-order traversal while deleting or freeing nodes and values can delete or free an entire binary tree. Thereby the node is freed after freeing its children.

Also the duplication of a binary tree yields a post-order sequence of actions, because the pointer copy to the copy of a node is assigned to the corresponding child field N.child within the copy of the parent N immediately after returncopy in the recursive procedure. This means that the parent cannot be finished before all children are finished. 
 */
//------------------------------------------------------------------------------------------------------




class Graph {
  // ASSUMPTIONS
  // undirected
  // vertices are numbered 0 to V-1 , V - number of vertices
  constructor(vertices) {
    this.vertices = vertices;
    this.edges = [];
    this.adjListObj = {};
    this.adjList = [];
    this.adjMatrix = [];
    if (Array.isArray(vertices)) {
      this.initAdjList(vertices);
      this.initAdjListObj(vertices);
      this.initAdjMatrix(vertices);
    }
  }
  initAdjListObj(vertices) {
    vertices.forEach((vertex) => {
      this.adjListObj[vertex] = [];
    });
  }
  initAdjList(vertices) {
    vertices.forEach((vertex) => {
      this.adjList[vertex] = new LinkedList();
    });
  }
  initAdjMatrix(vertices) {
    this.adjMatrix = new Array(vertices.length);
    vertices.forEach((vertex) => {
      this.adjMatrix[vertex] = new Array(vertices.length).fill(0);
    });
  }
  addEdge(s, d) {
    this.adjListObj[s].push(d);
    this.adjListObj[d].push(s);
    this.adjList[s].appendLinkedList(d);
    this.adjList[d].appendLinkedList(s);
    this.adjMatrix[s][d] = 1;
    this.adjMatrix[d][s] = 1;
  }
  printAdjList() {
    console.log('Adj list');
    this.adjList.forEach((vertex, index) => {
      console.log(index, '->', vertex.printLinkedList());
    });
  }
  printAdjListObj() {
    console.log('Adj List obj');
    Object.keys(this.adjListObj).forEach((i) => {
      console.log(i, '->', this.adjListObj[i]);
    });
  }
  printAdjMatrix() {
    console.log('Adj Matrix');
    // console.log('   ', new Array(this.vertices.length));
    this.adjMatrix.forEach((row, index) => {
      console.log(index, ' ', row.join('|'));
    });
  }
  printGraph() {
    this.printAdjList();
    this.printAdjListObj();
    this.printAdjMatrix();
  }
  // BFS, DFS pending
}

let G = new Graph([0, 1, 2, 3, 4, 5, 6, 7]);
G.addEdge(4, 5);
G.addEdge(4, 1);
G.addEdge(4, 3);
G.addEdge(4, 7);

G.printGraph();
