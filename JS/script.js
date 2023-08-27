let input=document.querySelector("input")
let textarea=document.querySelector("textarea")
let youname=document.getElementsByClassName("name")[0]
let othername=document.getElementsByClassName("name")[1]
let you=null
let other=null
let text;


input.addEventListener('change',()=>{
    youname.innerHTML=othername.innerHTML=null
    let files=input.files
    const fr=new FileReader();
    fr.readAsText(files[0]);
    fr.onload=()=>{
        text=fr.result.split('\n');
        let i=0
        for(;i<text.length && text[i].match(/-.*:/)==null;i++);
        if(i==text.length){
            input.files=null
            alert("choose appropriate file")
            return
        }
        let n=text[i].match(/-.*:/).toString()
        you=n.substring(1,n.length-1)
        youname.innerHTML=you.toUpperCase()
        for(;i<text.length-1 && (text[i].match(/-.*:/)==null || text[i].match(/-.*:/)==n);i++);
        n=text[i].match(/-.*:/).toString()
        other=n.substring(1,n.length-1)
        othername.innerHTML=other.toUpperCase()
    }
    fr.error=()=>{
        alert("Something went wrong!!!");
    }
});

let swap=document.getElementById("swap-btn")
swap.addEventListener("click",()=>{
    let t=you;
    you=other;
    other=t;
    youname.innerHTML=you.toUpperCase();
    othername.innerHTML=other.toUpperCase();
})

let generate=document.getElementById("generate-btn")
generate.addEventListener("click",()=>{
    let name=document.getElementById("other-img-name")
    name.innerHTML=othername.innerHTML
    let box=document.getElementsByClassName("chat-box")[0]
    let s=box.childNodes
    let arr = Array.from(s)
    let rundate=null
    for (x of arr) {
        x.remove()
    }
    for(let line of text){
        let currdate=line.match(/[0-9]{2}\/[0-9]{2}\/[0-9]{2}/)
        if(currdate==null){
            box.lastChild.childNodes[0].innerHTML+="\n"+line
        } 
        else{
            currdate=currdate.toString()
            if(rundate==null || currdate!=rundate){
                rundate=currdate
                let date=document.createElement("div")
                date.innerHTML=rundate
                date.classList.add("chat-date")
                box.insertAdjacentElement("beforeend",date)
            }
            let div=document.createElement("div")
            let msg=line.match(/: .*/);
            div.setAttribute('class','chat-msg')
            if(msg==null){
                div.innerHTML=line.match(/-.*/).toString().substring(2)
                div.classList.add("center")
            }
            else{
                let time=line.match(/[0-9]{2}\:[0-9]{2}/).toString()
                let message=msg.toString().substring(2);
                div.innerHTML=`<div>${message}</div>`
                if(!div.innerHTML)
                    div.innerHTML='media'
                let timediv=document.createElement("div")
                timediv.innerHTML=time
                timediv.classList.add("chat-time")
                div.insertAdjacentElement("beforeend",timediv)
                if(line.includes(`-${you}:`))
                    div.classList.add("right")
                else
                    div.classList.add("left")
            }
            box.insertAdjacentElement("beforeend",div)
        }
    }
})