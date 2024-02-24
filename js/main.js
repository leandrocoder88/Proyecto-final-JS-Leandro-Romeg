const selectMenu = document.querySelector("select#Menu")
const selectUbicacion = document.querySelector("select#ubicacion")
const inputPersonas = document.querySelector("input#personas")
const valorVelada = document.querySelector("span#valorVelada")
const btnPresupuesto = document.querySelector("button.button.button-outline")
const btnGuardar = document.querySelector("span.guardar")
const arrayHistorial = []

function cargarMenues() {
    const menuOptions = datosMenu.map(menu => {
        const option = document.createElement('option')
        option.textContent = menu.tipo
        return option
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
    const { value: menuValue } = selectMenu;
    const { value: ubicacionValue } = selectUbicacion;
    const { value: personasValue } = inputPersonas;
    if (!menuValue || menuValue === 'Seleccionar...') {
        Swal.fire({
            iconHtml: '<img src="img/cocinerollorando.jpg">',
            title: "Ups...que incomodo",
            text: "Contamos con un amplio menu, por favor...seleccione uno de nuestros platillos ",
            showCancelButton: false, // Ocultar el botón de cancelar
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false // Evitar que se cierre al hacer clic fuera de la alerta
        })
        return 'Error'
    }
    if (!ubicacionValue || ubicacionValue === 'Seleccionar...') {
        Swal.fire({
            iconHtml: '<img src="img/cocinerollorando.jpg">',
            title: "Ups...que incomodo",
            text: "Por favor, seleccione una ubicacion en nuestras amplias instalaciones",
            showCancelButton: false, // Ocultar el botón de cancelar
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false // Evitar que se cierre al hacer clic fuera de la alerta
        })
        return 'Error'
    }
    if (!personasValue || personasValue < 1 || personasValue > 20) {
        Swal.fire({
            iconHtml: '<img src="img/cocinerollorando.jpg">',
            title: "Ups...que incomodo",
            text: "Por favor, recuerda que recibimos hasta 20 personas como máximo por reserva",
            showCancelButton: false, // Ocultar el botón de cancelar
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false // Evitar que se cierre al hacer clic fuera de la alerta
        })
        return 'Error'
    }
    let personas = personasValue;
    let factorMenu = retornarFactorMenu(menuValue);
    let factorUbicacion = retornarFactorUbicacion(ubicacionValue);
    const generartotal = new generarTotal(personas, factorMenu, factorUbicacion, costoCubiertos);
    return generartotal.total();
}



btnPresupuesto.addEventListener("click", ()=> {
    let resultado = cotizarVelada()

    if (resultado !== 'Error') {
        valorVelada.textContent = resultado
    }
});

btnGuardar.addEventListener("click", ()=> {
    const historialGenerarTotal = {
        fecha: Date(),
        menu: selectMenu.value,
        ubicacion: selectUbicacion.value,
        personas: inputPersonas.value,
        Velada: valorVelada.textContent
    }

    localStorage.setItem("HistorialGenerarTotal", JSON.stringify(historialGenerarTotal));
})
