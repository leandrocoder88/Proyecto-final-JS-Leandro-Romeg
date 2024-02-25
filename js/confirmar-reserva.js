document.addEventListener('DOMContentLoaded', function () {

    const reserva = JSON.parse(localStorage.getItem('reserva'))


    document.getElementById('menuSeleccionado').textContent = reserva.menu
    document.getElementById('ubicacionSeleccionada').textContent = reserva.ubicacion
    document.getElementById('personasSeleccionadas').textContent = reserva.personas
    document.getElementById('nombre').textContent = reserva.nombre
    document.getElementById('apellido').textContent = reserva.apellido
    document.getElementById('telefono').textContent = reserva.telefono
    document.getElementById('valorVelada').textContent = reserva.Velada.toLocaleString("es-AR")


    function confirmarReserva() {

        Swal.fire({
            iconHtml: '<img src="img/cocinerofeliz.png">',
            title: '¡Reserva confirmada!',
            text: '¡Gracias por reservar con nosotros!, en breve nuestro equipo de atencion al cliente se contactara,para coordinar medios de pago y los dias disponibles',
            showCancelButton: false,
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false

        }).then((result) => {
            if (result.isConfirmed) {
                location.href = 'index.html'
            }
        })
    }



    document.getElementById('btnConfirmarReserva').addEventListener('click', confirmarReserva)
})
