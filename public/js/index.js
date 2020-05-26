let personas = [
    {
        id: 1,
        titulo: 'titulo',
        transaccion: 'venta',
        descripcion: 'Descripción',
        precio: 'precio',
        cantidadB: 2,
        cantidadD: 1,
    },
    {
        id: 2,
        titulo: 'titulo',
        transaccion: 'venta',
        descripcion: 'Descripción',
        precio: 'precio',
        cantidadB: 4,
        cantidadD: 2
    },
    {
        id: 3,
        titulo: 'titulo',
        transaccion: 'alquiler',
        descripcion: 'Descripción',
        precio: 'precio',
        cantidadB: 1,
        cantidadD: 1
    },
    {
        id: 4,
        titulo: 'titulo',
        transaccion: 'alquiler',
        descripcion: 'Descripción',
        precio: 'precio',
        cantidadB: 3,
        cantidadD: 1
    },
    {
        id: 5,
        titulo: 'titulo',
        transaccion: 'venta',
        descripcion: 'Descripción',
        precio: 'precio',
        cantidadB: 2,
        cantidadD: 3
    },
];

let indiceRow;
let table = document.getElementById('table');
let boxButtons = document.getElementById('box-buttons');
let plantilla = document.getElementsByTagName('template')[0].content;
let fragmento = document.createDocumentFragment();

/**
 * agrega un renglon de la tabla
 * @param {renglon} element 
 */
const agregarRowTable = (element) => {
    let tr, td, copia;

    tr = plantilla.querySelector('tr');
    tr.setAttribute('onclick', "setIndex(this)");
    td = plantilla.querySelectorAll("td");
    td[0].textContent = element.id;
    td[1].textContent = element.titulo;
    td[2].textContent = element.transaccion;
    td[3].textContent = element.descripcion;
    td[4].textContent = element.precio;
    td[5].textContent = element.cantidadB;
    td[6].textContent = element.cantidadD;
    copia = document.importNode(plantilla, true);
    fragmento.appendChild(copia);
}

const cargarTabla = () => {
    personas.forEach(element => {
        agregarRowTable(element);
    });

    table.appendChild(fragmento);
};

//llamo a la funcion cargarTabla para que la carge la tabla
cargarTabla();

const guardar = (event) => {

    event.preventDefault();

    let titulo, transaccion, descripcion,
        precio, cantidadB, cantidadD, objToReturn,
        id, row, cell1, cell2, cell3, cell4, cell5, cell6, cell7;

    id = indiceRow ? indiceRow : personas.length + 1
    titulo = document.getElementById("titulo").value;
    transaccion = document.getElementById('venta').checked ? 'venta' : 'alquiler';
    descripcion = document.getElementById("descripcion").value;
    precio = document.getElementById("precio").value;
    cantidadB = parseInt(document.getElementById("banos").value);
    cantidadD = parseInt(document.getElementById("dormitorios").value);

    objToReturn = { id, titulo, transaccion, descripcion, precio, cantidadB, cantidadD }

    if (indiceRow) {
        borrar();
        indiceRow = '';
    }

    //Ingreso un nuevo renglon en una determinada posicion. 
    row = table.insertRow(id);
    row.setAttribute('onclick', "setIndex(this)");
    cell1 = row.insertCell(0);
    cell2 = row.insertCell(1);
    cell3 = row.insertCell(2);
    cell4 = row.insertCell(3);
    cell5 = row.insertCell(4);
    cell6 = row.insertCell(5);
    cell7 = row.insertCell(6);

    cell1.innerHTML = id;
    cell2.innerHTML = titulo;
    cell3.innerHTML = transaccion;
    cell4.innerHTML = descripcion;
    cell5.innerHTML = precio;
    cell6.innerHTML = cantidadB;
    cell7.innerHTML = cantidadD;
}


/**
 * Setea el indice "indiceRow" y 
 * da visibilidad a los botones editar, eliminar y cancelar
 * @param {evento que proviene del onclick(this)} e 
 */
const setIndex = (e) => {
    boxButtons.style.visibility = 'visible';
    indiceRow = e.rowIndex;
};

const borrar = () => {
    table.deleteRow(indiceRow);
    boxButtons.style.visibility = 'hidden';
    document.getElementById('form').reset();
};

const cancelar = () => {
    boxButtons.style.visibility = 'hidden';
    document.getElementById('form').reset();
};

const editar = () => {
    console.log(indiceRow)
    let auxIndice = indiceRow - 1;
    document.getElementById("titulo").value = personas[auxIndice].titulo;
    personas[auxIndice].transaccion === 'venta' ? document.getElementById('venta').checked = true : document.getElementById("alquiler").checked = true;
    document.getElementById("descripcion").value = personas[auxIndice].descripcion;
    document.getElementById("precio").value = personas[auxIndice].precio;
    document.getElementById("banos").value = personas[auxIndice].cantidadB;
    document.getElementById("dormitorios").value = personas[auxIndice].cantidadD;
    window.scroll(0, 0);
};