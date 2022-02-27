class trieNode{
    constructor(){
        this.children = {}
        this.end = false;
    }
}
class Trie{
    constructor(){
        this.root = new trieNode();
    }
    insertWord(word){
        let t = this.root;
        let i=0;
        while(i<word.length){
            let c = word[i];
            if(t.children[c]) {
                t=t.children[c]
                i++;
            }
            else {
                t.children[c] = new trieNode();
                t = t.children[c];
                i++;
            }
        }
        t.end = true;
    }
    searchWord(w){
        let i=0;
        let t=this.root;
        if(t.end) {
            console.log("empty")
        }
        while(i<w.length) {
            let c = w[i];
            if(t.children[c]){
                t=t.children[c]
                i++;
            } else {
                break;
            }            
        }
        if(i===w.length) {
            if(t.end) return "Found"
            else return "Not Found"
        } else return "Not Found"
       
        
    }
    printWords(t,wordArr){
        if(!t){
            return;
        }
        if(t.end) {
            console.log(wordArr.join(""))   
        }
        Object.keys(t.children).forEach(c=>{
            if(t.children[c]) {
                wordArr.push(c)
                this.printWords(t.children[c],wordArr)
                wordArr.pop();
            }
        })
        
    }
    displayTrie(){
        let t=this.root;
        this.printWords(t,[])
    }
}
const t = new Trie();
    t.insertWord("apple")
    t.insertWord("apply")
    t.insertWord("app")
    console.log(t.searchWord("apple"))
    console.log(t.searchWord("app"))
    console.log(t.searchWord("appli"))
    t.displayTrie()