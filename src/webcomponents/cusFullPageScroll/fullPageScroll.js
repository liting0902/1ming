export default class extends HTMLElement{
    constructor(templateContent){
        super(templateContent);
        if(!templateContent)
        throw new Error('Argument dose not exist.');
        this.appendChild(templateContent);
    }
    c(targetEle){
        let ele = this.querySelector(targetEle);
        ele.scrollIntoView();
    }
}