export default class extends HTMLElement{
    constructor(templateContent){
        super();
        if(!templateContent)
        throw new Error('Argument dose not exist.');
        this.appendChild(templateContent);
    }
    scrollToEle(targetEle){
        let ele = this.querySelector(targetEle);
        ele.scrollIntoView();
    }
}