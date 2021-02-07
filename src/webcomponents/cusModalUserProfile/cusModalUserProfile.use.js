import {
    useComponent
} from '../../js/useComponent/useComponent.js';
import cusModalUserProfile from './cusModalUserProfile.js';
(
    async () => {
        let firebaseConfig;
        await fetch('../../projectConfig/firebaseProj.config.json').then((response) => {
            return response.json();
        }).then((json) => {
            firebaseConfig = json;
        });

        await useComponent('cus-modal-user-profile', './cusModalUserProfile.htm', cusModalUserProfile)
            .then((htmlfile) => {
                console.log(htmlfile)
                let template = new htmlfile.ctor(htmlfile.templateContent);
                console.log("LOG: ~ user profile template", template)
                document.body.appendChild(template);
                template.isShowModal(true);

                // return template
            })
    }

)();