// estilos en el shadow DOM.

const template = document.createElement('template');
template.innerHTML = `
<style>
 :host{
 
    text-align: center;
 }

html, body{
    font-size: 20px;
    font-family: open sans,sans-serif;
    text-align: center;
}
table,th,td {
    border: 2px solid black;
    margin: 0 auto;
}
</style>

   <h3>Web component</h3>
       
   <h1 id="s-titol"></h1>
   <div id="s-taula"></div>
   <p>Total param.:</p>
   <p id="totalizador"></p>

`;


class ObjectViewer extends HTMLElement{

    constructor() {
        // AQUI PODEMOS DEFINIR TODAS LAS VARIABLES QUE ENTRAN COMO ATRIBUTOS DE LA ETIQUETA.

        super();
        this.titol;
        this.columnes;
        this.array;
        this.propietatsV;
        this.taula;

    }

    static get observedAttributes(){
        // Aqui definimos los atributos manipulables.
        return ['titol','columnes','array','propietatsV','taula'];
    }

    attributeChangedCallback(nameAtrb,oldValue,newValue){
        // Aqui podemos definir el comportamiento del componente segun los atributos que mandemos.
        switch (nameAtrb) {
            case "titol":
                this.titol = newValue;
                    break;
            case "columnes":
                    this.columnes = newValue;
                    break;
            case "array":
                this.array = newValue;
                break;
            case "propietatsV":
                this.propietatsV = newValue;
                break;
            case "taula":
                this.taula = newValue;
                break;
        }
    }

    connectedCallback(){
            // este metodo salta cuando el componente esta renderizado en el DOM.
            // aqui podemos definir la sintaxis html del componente.y su comportamiento
            //  , podemos usar los atributos de la clase.

         this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        /*   this._shadowRoot.innerHTML= `
            <div> 
              <h1 id = "titol">${this.titol}</h1>
            </div>`;*/
        this._shadowRoot.appendChild(template.content.cloneNode(true));

    }
    // FUNCIONES PERSONALIZADAS DEL WEB COMPONENT.

    render() {

        let htmlElement = this._shadowRoot.getElementById('s-taula');
        htmlElement.innerHTML= this.taula.outerHTML;

    }


      mostrar() {
        // mostramos tabla HTML del array de objetos con el header que es un array.
        let table = document.createElement('table');
        let headerRow = document.createElement('tr');

        this.columnes.forEach(headerText => {
            let header = document.createElement('th');
            let textNode = document.createTextNode(headerText);
            header.appendChild(textNode);
            headerRow.appendChild(header);
        });
        table.appendChild(headerRow);

        this.array.forEach(emp => {
            let row = document.createElement('tr');
            Object.values(emp).forEach(text => {
                let cell = document.createElement('td');
                let textNode = document.createTextNode(text);
                cell.appendChild(textNode);
                row.appendChild(cell);
            })
            table.appendChild(row);
        })

          this.taula = table;
          this.render();

        return table;
    }

     // Ocultamos las columnas.
     columnesVisibles(propietats) {

        this.array.forEach(objecte => {
            for (let key in objecte) {
                for (let iterator in propietats){
                    if (key!==propietats[iterator]){
                        objecte[key]='';
                    }
                }
                console.log(`${key}: ${objecte[key]}`);
            }
        });

        this.mostrar();
    }

      defineixTitol(valor) {
        this.titol = valor;
        let titol = this._shadowRoot.getElementById('s-titol');
        titol.innerHTML = this.titol;
    }

    defineixArray(valor){
        this.array=valor;
    }

    defineixHeader(valor){
        this.columnes=valor;
    }

    defineixPropietatsVisibles(propietats){
        this.propietatsV = propietats;
    }

    afegeixObjecte(obj){

        this.array.push(obj);
        this.mostrar();

    }

    afegeixArray(obj){
        Array.prototype.push.apply(this.array, obj);
        this.mostrar();
    }



    ordenar(funcio){
        // si es null la funcion lo muestrra en el orden original.
        if (funcio!= null){
            this.array.sort(funcio);
            this.mostrar();
        }

    }

    filtrar(funcio){
        if (funcio!=null){
            this.array =  this.array.filter(funcio);
            this.mostrar();
        }
    }


    sumar(key){

        let sum;
        console.log(key);
        console.log(this.array[key]);

        sum = this.array.reduce((a, b) => a + parseInt(b[key]), 0);

        let htmlElement = this._shadowRoot.getElementById('totalizador');
        htmlElement.innerHTML= sum;

    }



}
window.customElements.define('object-viewer',ObjectViewer);


