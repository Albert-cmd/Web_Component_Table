// Aqui interactuamos con el webcomponent.

// referenciamos al webcomponent.
var webComponent = document.getElementById( 'wc');

// cambiamos el titulo.
webComponent.defineixTitol("Taula d'empleats.");

// mostramos tabla y header.
headers = ['Name', 'Age', 'Country'];

employees = [{ name: 'James', age: 21, country: 'United States' },
    { name: 'Rony', age: 0, country: 'United Kingdom' },
    { name: 'Peter', age: 58, country: 'Canada' },
    { name: 'Marks', age: 20, country: 'Spain' }];

webComponent.defineixArray(employees);
webComponent.defineixHeader(headers);
webComponent.mostrar();

// añadimos un elemento al array
newEmployee = { name: 'Nuevo', age: 0, country: 'catalunya' }
webComponent.afegeixObjecte(newEmployee);

// añadimos otro array
class  employee {
    constructor(name, age ,country){
        this.name = name;
        this.age = age;
        this.country = country;
    }

}
class manager extends employee{
    constructor(name, age, country,sucursal,sueldo) {
        super(name, age, country);
        this.sucursal = sucursal;
        this.sueldo = sueldo;
    }

}
employees2 = [
    { name: 'nuevo', age: 21, country: 'United States' },
    { name: 'nuevo 2', age: 31, country: 'United Kingdom' },
    { name: 'nuevo 3', age: 58, country: 'Canada' },
    { name: 'nuevo 4', age: 20, country: 'Spain' }
];

webComponent.afegeixArray(employees2);
webComponent.sumar("age");

// mostramos solo columnas deseadas.
 //headers = ['Age'];
 //webComponent.defineixHeader(headers);
// sort
function ordenacion(a,b) {
    return a - b;
}
webComponent.ordenar(ordenacion);
// filter
function filter(obj) {
    return obj.age >= 0;
}
webComponent.filtrar(filter);
// extendemos la clase y mostramos.
var j1 = new manager('albert',22,'spain','vallbona',540023);

headers = ['Name', 'Age', 'Country','sucursal', 'sueldo'];

webComponent.defineixHeader(headers);
webComponent.afegeixObjecte(j1);
webComponent.mostrar();

webComponent.ordenar(null);
webComponent.filtrar(null);