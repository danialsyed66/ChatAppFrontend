// import Swal from 'sweetalert2';
const Swal = require('sweetalert2');

const fire = (message: string, status = 'error') =>
  Swal.fire({
    position: 'top-end',
    icon: status,
    title: message,
    showConfirmButton: true,
    timer: 2000,
  });

export default fire;
