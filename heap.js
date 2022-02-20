/*
Heap (binary heap) is a priority queue (used to access elements based on prority in constant time) - min/max heap
Tree like data structure, implemented with an ARRAY with pointers, elements at depth i < depth i+1 (if a min heap)
Can be used a sorting algo also

Uses / applications
Operating systems - process jobs by priority
Graph algorithms - subroutine in a Dijkstra’s shortest path algorithm
Event simulation - find next event to happen
Compression - Huffman encoding

• HEAP-MINIMUM(A)
• HEAP-EXTRACT-MIN(A)
• MIN-HEAP-INSERT(A,key)
• HEAP-DECREASE-KEY(A, i, key)
• BUILD-MIN-HEAP(A) // build a heap from an unsorted array
• MIN-HEAPIFY(A,i) 
*/

// Intuition - for index i => left child is (2*i), right child is (2*i + 1), parent is i/2
class Heap {
  constructor(arr) {
    // always first elem is null. because cant calculate left and right child for 0 index
    // Here 1 to n indexing instead of 0 to n-1
    this.heap = [null];
    this.heapSize = 0;
    if (arr) {
      this.heap = this.heap.concat(arr);
      this.buildMinHeap();
      this.heapSize = arr.length;
    }
  }
  getHeapMin() {
    return this.heap[1];
  }
  getLeftChildIndex(i) {
    return 2 * i;
  }
  getRightChildIndex(i) {
    return 2 * i + 1;
  }
  getParentIndex(i) {
    return Math.floor(i / 2);
  }
  swap(s, d) {
    let t = this.heap[s];
    this.heap[s] = this.heap[d];
    this.heap[d] = t;
  }
  minHeapify(i) {
    let l = this.getLeftChildIndex(i);
    let r = this.getRightChildIndex(i);
    let smallestIndex = i;
    if (l <= this.heap.length && this.heap[l] < this.heap[smallestIndex]) {
      smallestIndex = l;
    }
    if (r <= this.heap.length && this.heap[r] < this.heap[smallestIndex]) {
      smallestIndex = r;
    }

    console.log();
    console.log();
    if (smallestIndex !== i) {
      // one of the children is smaller
      this.swap(i, smallestIndex);
      this.minHeapify(i);
    }
    // elem at index i is smaller than children. End of block
  }
  // HOW TO MAKE THIS METHOD PRIVATE IN JS
  buildMinHeap() {
    // trick is index len/2 to len will be leaf nodes
    // we apply minheapify from len/2 to root ( non - leaf nodes )
    for (let i = Math.floor(this.heapSize) / 2; i > 0; i -= 1) {
      this.minHeapify(i);
    }
  }
  percolateUp(x) {
    let i = x;
    // check with parent and moveup
    while (i > 1 && this.heap[i] < this.heap[this.getParentIndex(i)]) {
      this.swap(i, this.getParentIndex(i));
      i = this.getParentIndex(i);
    }
  }
  insert(x) {
    this.heapSize += 1;
    this.heap.push(x);
    this.percolateUp(this.heap.length - 1);
  }
  decreaseValue(i, val) {
    if (this.heap[i] < val) {
      console.log('new value cant be larger');
      return;
    }
    this.heap[i] = val;
    this.percolateUp(i);
  }
  extractMin() {
    if (this.heapSize < 1) console.log('heap underflow');
    let min = this.getHeapMin();
    this.heap[1] = this.heap[this.heapSize];
    delete this.heap[this.heapSize];
    this.heapSize -= 1;
    this.minHeapify(1);
    return min;
  }
  printHeap() {
    console.log('this.heap', this.heap);
    // this.heapSize + 1 is to include last elem
    console.log(this.heap.slice(1, this.heapSize + 1));
  }
}
let arr = [-17, -10, -8, -4, -3, -2, -7, -13, -6, -12, -5, -11, -16, -21];
let h = new Heap(arr);
console.log(arr);
h.printHeap();
h.insert(-50);
h.printHeap();
console.log(h.extractMin());
h.printHeap();
