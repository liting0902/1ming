/**
 * @param {string} htmlPath
 * @param {string} newTagName
 */
export function useComponent(newTagName, htmlPath, compClass){
    return fetch(htmlPath).then((res) => {
        return res.text();
    }
    ).then((htmlText) => {
        let parser =new DOMParser();
        let doc = parser.parseFromString(htmlText,'text/html');
        const template = doc.querySelector('template');
        if(!template)
            throw new Error('!Error : wecomponent DOM element <template> not found.');
        
        const templateContent = template.content;
        customElements.define(newTagName, compClass);
        let ctor = customElements.get(newTagName);
        // let objEle = new ctor(templateContent);
        // return objEle;
        return {
            ctor: ctor,
            templateContent: templateContent
        }    

    }
    )
}