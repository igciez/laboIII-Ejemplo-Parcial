// let personas = [
//     {
//         id: 1,
//         titulo: 'titulo',
//         transaccion: 'venta',
//         descripcion: 'Descripción',
//         precio: 'precio',
//         cantidadB: 2,
//         cantidadD: 1,
//     },
//     {
//         id: 2,
//         titulo: 'titulo',
//         transaccion: 'venta',
//         descripcion: 'Descripción',
//         precio: 'precio',
//         cantidadB: 4,
//         cantidadD: 2
//     },
//     {
//         id: 3,
//         titulo: 'titulo',
//         transaccion: 'alquiler',
//         descripcion: 'Descripción',
//         precio: 'precio',
//         cantidadB: 1,
//         cantidadD: 1
//     },
//     {
//         id: 4,
//         titulo: 'titulo',
//         transaccion: 'alquiler',
//         descripcion: 'Descripción',
//         precio: 'precio',
//         cantidadB: 3,
//         cantidadD: 1
//     },
//     {
//         id: 5,
//         titulo: 'titulo',
//         transaccion: 'venta',
//         descripcion: 'Descripción',
//         precio: 'precio',
//         cantidadB: 2,
//         cantidadD: 3
//     },
// ];
let personas;
let indiceRow;
let table = document.getElementById('table');
let boxButtons = document.getElementById('box-buttons');
let plantilla = document.getElementsByTagName('template')[0].content;
let fragmento = document.createDocumentFragment();
let gif = document.getElementById('gif');



/**
 * Ajax Traer
 */
const traerAjax = async () => {
    //xhr
    // let xhr = new XMLHttpRequest();
    // gif.style.visibility = 'visible';

    // xhr.onreadystatechange = () => {
    //     if (xhr.readyState === 4) {
    //         gif.style.visibility = 'hidden';
    //         if (xhr.status === 200) {
    //             personas = JSON.parse(xhr.responseText).data;
    //             console.dir(personas)
    //         } else {
    //             console.log(xhr.status + " " + xhr.statusText);
    //         }
    //     }
    // };
    // xhr.open('GET', 'http://localhost:3000/traer');
    // xhr.send();

    //fetch
    try {
        let datos = await fetch('http://localhost:3000/traer')
        let data = await datos.json();
        console.log(data.data);
        personas = data.data;
    } catch (error) {
        console.error(error);
    }
}

/***
 * Ajax Alta
 */
const altaAjax = async (item) => {
    //xhr
    // let xhr = new XMLHttpRequest();
    // gif.style.visibility = 'visible';

    // xhr.onreadystatechange = () => {
    //     if (xhr.readyState === 4) {
    //         gif.style.visibility = 'hidden';
    //         if (xhr.status === 200) {
    //             console.log(JSON.parse(xhr.responseText))
    //         } else {
    //             console.log(xhr.status + " " + xhr.statusText);
    //         }
    //     }
    // };
    // xhr.open('POST', 'http://localhost:3000/alta');
    // xhr.setRequestHeader("Content-Type", "application/json");
    // xhr.send(JSON.stringify(item));

    //fetch
    try {
        let datos = await fetch('http://localhost:3000/alta', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item)
        });
        let data = await datos.json();
        console.log(data.data);
    } catch (error) {
        console.error(error);
    }
}

/***
 * Ajax modificar
 */
const modificarAjax = async (item) => {
    //xhr
    // let xhr = new XMLHttpRequest();
    // gif.style.visibility = 'visible';

    // xhr.onreadystatechange = () => {
    //     if (xhr.readyState === 4) {
    //         gif.style.visibility = 'hidden';
    //         if (xhr.status === 200) {
    //             console.log(JSON.parse(xhr.responseText))
    //         } else {
    //             console.log(xhr.status + " " + xhr.statusText);
    //         }
    //     }
    // };
    // xhr.open('POST', 'http://localhost:3000/alta');
    // xhr.setRequestHeader("Content-Type", "application/json");
    // xhr.send(JSON.stringify(item));
    //console.dir(JSON.stringify(item))
    //fetch
    try {
        let datos = await fetch('http://localhost:3000/modificar', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item)
        });
        let data = await datos.json();
        console.log(data.data);
    } catch (error) {
        console.error(error);
    }
}


/***
 * Ajax baja
 */
const bajaAjax = async (id) => {
    //xhr
    // let xhr = new XMLHttpRequest();
    // gif.style.visibility = 'visible';

    // xhr.onreadystatechange = () => {
    //     if (xhr.readyState === 4) {
    //         gif.style.visibility = 'hidden';
    //         if (xhr.status === 200) {
    //             console.log(JSON.parse(xhr.responseText))
    //         } else {
    //             console.log(xhr.status + " " + xhr.statusText);
    //         }
    //     }
    // };
    // xhr.open('POST', 'http://localhost:3000/bajaAnuncio');
    // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    // xhr.send(id);

    //fecth
    try {
        let datos = await fetch('http://localhost:3000/baja', {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `id=${id}`
        });
        let data = await datos.json();
        console.log(data.data);
    } catch (error) {
        console.error(error);
    }
}


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
    td[5].textContent = element.num_estacionamiento;
    td[6].textContent = element.num_dormitorio;
    copia = document.importNode(plantilla, true);
    fragmento.appendChild(copia);
}

const cargarTabla = async () => {
    await traerAjax();
    console.dir(personas)

    personas.forEach(element => {
        agregarRowTable(element);
    });

    table.appendChild(fragmento);
};

//llamo a la funcion cargarTabla para que la carge la tabla
cargarTabla();

/**
 * Setea el indice "indiceRow" y 
 * da visibilidad a los botones editar, eliminar y cancelar
 * @param {evento que proviene del onclick(this)} e 
 */
const setIndex = (e) => {
    boxButtons.style.visibility = 'visible';
    indiceRow = e.rowIndex;
};

/**
 * Guardar en Base de datos
 * @param {*} event 
 */
const guardar = async (event) => {

    event.preventDefault();

    let titulo, transaccion, descripcion,
        precio, cantidadB, cantidadD, objToReturn,
        id, row, cell1, cell2, cell3, cell4, cell5, cell6, cell7;

    titulo = document.getElementById("titulo").value;
    transaccion = document.getElementById('venta').checked ? 'venta' : 'alquiler';
    descripcion = document.getElementById("descripcion").value;
    precio = document.getElementById("precio").value;
    num_estacionamiento = parseInt(document.getElementById("banos").value);
    num_dormitorio = parseInt(document.getElementById("dormitorios").value);

    if (indiceRow) {
        id=(personas[indiceRow-1].id).toString();
        console.dir({ id, titulo, transaccion, descripcion, precio, num_estacionamiento, num_dormitorio })
        await modificarAjax({ id, titulo, transaccion, descripcion, precio, num_estacionamiento, num_dormitorio })
    } else {
        console.log('entra alta')
        id=(personas.length + 1).toString();
        console.dir({ id, titulo, transaccion, descripcion, precio, num_estacionamiento, num_dormitorio })
        await altaAjax({ id, titulo, transaccion, descripcion, precio, num_estacionamiento, num_dormitorio })
    };

    //objToReturn = { id, titulo, transaccion, descripcion, precio, cantidadB, cantidadD }

    // if (indiceRow) {
    //     id= indiceRow
    //     borrar();
    //     indiceRow = '';
    // }
    // else{
    //     id=?
    // }

    //Ingreso un nuevo renglon en una determinada posicion. 
    // row = table.insertRow(id);
    // row.setAttribute('onclick', "setIndex(this)");
    // cell1 = row.insertCell(0);
    // cell2 = row.insertCell(1);
    // cell3 = row.insertCell(2);
    // cell4 = row.insertCell(3);
    // cell5 = row.insertCell(4);
    // cell6 = row.insertCell(5);
    // cell7 = row.insertCell(6);

    // cell1.innerHTML = id;
    // cell2.innerHTML = titulo;
    // cell3.innerHTML = transaccion;
    // cell4.innerHTML = descripcion;
    // cell5.innerHTML = precio;
    // cell6.innerHTML = num_estacionamiento;
    // cell7.innerHTML = num_dormitorio;
}




const borrar = async () => {
    //table.deleteRow(indiceRow);
    boxButtons.style.visibility = 'hidden';
    //document.getElementById('form').reset();
    await bajaAjax(personas[indiceRow-1].id);
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
    document.getElementById("banos").value = personas[auxIndice].num_estacionamiento;
    document.getElementById("dormitorios").value = personas[auxIndice].num_dormitorio;
    window.scroll(0, 0);
};