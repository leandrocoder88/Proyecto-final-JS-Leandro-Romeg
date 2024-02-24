class generarTotal {
    constructor(personas, factorMenu, factorUbicacion, costoCubiertos) {
        this.personas = parseInt(personas) || 1
        this.factorMenu = parseFloat(factorMenu) || 1
        this.factorUbicacion = parseFloat(factorUbicacion) || 1
        this.costoCubiertos = parseFloat(costoCubiertos) || 1
    }
    total() {
        return (this.personas * (this.factorMenu + this.factorUbicacion + this.costoCubiertos)).toFixed(2)
    }
} 