document.addEventListener('DOMContentLoaded', function () {
    const selectMenu = document.querySelector("select#Menu")
    const selectUbicacion = document.querySelector("select#ubicacion")
    const inputPersonas = document.querySelector("input#personas")
    const valorVelada = document.querySelector("span#valorVelada")
    const btnPresupuesto = document.querySelector("button.button.button-outline")
    const inputTelefono = document.querySelector("#telefono")

    function cargarMenues() {
        const menuOptions = datosMenu.map(menu => {
            const option = document.createElement('option')
            option.textContent = menu.tipo;
            return option;
        })
        menuOptions.forEach(option => selectMenu.appendChild(option))
    }

    function cargarUbicaciones() {
        const ubicacionOptions = datosUbicacion.map(ubicacion => {
            const option = document.createElement('option')
            option.textContent = ubicacion.tipo
            return option
        })
        ubicacionOptions.forEach(option => selectUbicacion.appendChild(option))
    }

    cargarMenues()
    cargarUbicaciones()

    function retornarFactorMenu(tipoMenu) {
        const menu = datosMenu.find(menu => menu.tipo === tipoMenu)
        return menu ? menu.factor : 1
    }

    function retornarFactorUbicacion(tipoUbica) {
        const ubicacion = datosUbicacion.find(ubicacion => ubicacion.tipo === tipoUbica)
        return ubicacion ? ubicacion.factor : 1
    }

    function cotizarVelada() {
        const { value: menuValue } = selectMenu
        const { value: ubicacionValue } = selectUbicacion
        const { value: personasValue } = inputPersonas
        const nombre = document.querySelector("#nombre").value
        const apellido = document.querySelector("#apellido").value
        const telefono = inputTelefono.value

        if (!menuValue || menuValue === 'Seleccionar...') {
            Swal.fire({
                iconHtml: '<img src="img/cocinerollorando.jpg">',
                title: "Ups...que incomodo",
                text: "Contamos con un amplio menu, por favor...seleccione uno de nuestros platillos ",
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false
            });
            return 'Error'
        }

        if (!ubicacionValue || ubicacionValue === 'Seleccionar...') {
            Swal.fire({
                iconHtml: '<img src="img/cocinerollorando.jpg">',
                title: "Ups...que incomodo",
                text: "Por favor, seleccione una ubicacion en nuestras amplias instalaciones",
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false
            });
            return 'Error'
        }

        if (!personasValue || personasValue < 1 || personasValue > 20) {
            Swal.fire({
                iconHtml: '<img src="img/cocinerollorando.jpg">',
                title: "Ups...que incomodo",
                text: "Por favor, recuerda que recibimos hasta 20 personas como máximo por reserva",
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false
            });
            return 'Error'
        }

        if (!nombre || !apellido || !telefono) {
            Swal.fire({
                iconHtml: '<img src="img/cocinerollorando.jpg">',
                title: "Ups...que incomodo",
                text: "Por favor, verifique o complete los campos requeridos de Nombre, Apellido y Telefono",
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false
            });
            return 'Error'
        }

        if (!telefono.match(/^\d{10}$/)) {
            Swal.fire({
                iconHtml: '<img src="img/cocinerollorando.jpg">',
                title: "Ups...que incomodo",
                text: "Por favor, ingrese un número de teléfono válido de 10 dígitos",
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false
            });
            return 'Error'
        }

        let personas = personasValue
        let factorMenu = retornarFactorMenu(menuValue)
        let factorUbicacion = retornarFactorUbicacion(ubicacionValue)
        const generartotal = new generarTotal(personas, factorMenu, factorUbicacion, costoCubiertos)
        return generartotal.total()
    }

    btnPresupuesto.addEventListener("click", () => {
        let resultado = cotizarVelada()

        if (resultado !== 'Error') {
            valorVelada.textContent = resultado

            const reserva = {
                menu: selectMenu.value,
                ubicacion: selectUbicacion.value,
                personas: inputPersonas.value,
                nombre: document.querySelector("#nombre").value,
                apellido: document.querySelector("#apellido").value,
                telefono: inputTelefono.value,
                Velada: resultado
            }


            const reservaJSON = JSON.stringify(reserva)


            localStorage.setItem('reserva', reservaJSON)

            Swal.fire({
                title: 'Corrobora que los datos ingresados sean correctos',
                html: `
                    <p><strong>Nombre:</strong> ${document.querySelector("#nombre").value}</p>
                    <p><strong>Apellido:</strong> ${document.querySelector("#apellido").value}</p>
                    <p><strong>Teléfono:</strong> ${inputTelefono.value}</p>
                    <p><strong>Menú elegido:</strong> ${selectMenu.value}</p>
                    <p><strong>Ubicación elegida:</strong> ${selectUbicacion.value}</p>
                    <p><strong>Cantidad de personas:</strong> ${inputPersonas.value}</p>
                    <p><strong>Valor total de la cena: $ </strong> ${resultado}</p>
                    `,
                showCancelButton: true,
                confirmButtonText: 'Es correcto',
                cancelButtonText: 'Volver',
                allowOutsideClick: false

            }).then((result) => {
                if (result.isConfirmed) {
                    location.href = "confirmar-reserva.html"
                }
            })
        }
    })
})
