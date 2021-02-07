import Swal from "sweetalert2";

export default () => {
    firebase.auth().signOut().then(() => {
        Swal.fire({
            text: "登出成功",
            icon: "success"
        })
        
        // window.location.reload();
    });
    setTimeout(window.location.reload(), 8000)
}