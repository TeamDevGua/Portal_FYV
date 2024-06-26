﻿let dataProductos = ''

function getProducts(producto, clave) {
    $.get(getProductSearch + producto + "&clave_sucursal=" + clave, function (data) {
        // La función de callback se ejecutará cuando la solicitud se complete exitosamente
        dataProductos = data;
        console.log("Productos recibidos:", data);

        // Aquí puedes realizar cualquier operación que necesites hacer con la respuesta.
        // Por ejemplo, podrías llamar a una función que procese los datos.
        imprimirEnTablaAgregar(dataProductos, "tablaProductos")
    }).fail(function (jqXHR, textStatus, errorThrown) {
        // Si la solicitud falla, puedes manejar el error aquí.
        dataProductos = '[{"cve_art":"46829","existencia":0.0000,"descripcion":"MANGO PICADO EN CHAROLA ","cant":0.0,"fec":"","CantidadVendida":0.0,"Cantidad_Real":0.0,"fecha_consulta":"06/03/2024 19:16:57"},{"cve_art":"124","existencia":0.0000,"descripcion":"MANGO MANILILLA KG ","cant":0.0,"fec":"","CantidadVendida":0.0,"Cantidad_Real":0.0,"fecha_consulta":"06/03/2024 19:16:57"},{"cve_art":"28942","existencia":0.0000,"descripcion":"MANGO AHOGADO GRANEL ","cant":0.0,"fec":"","CantidadVendida":0.0,"Cantidad_Real":0.0,"fecha_consulta":"06/03/2024 19:16:58"},{"cve_art":"47","existencia":0.0000,"descripcion":"MANGO ATAULFO KG ","cant":0.0,"fec":"","CantidadVendida":574.7400,"Cantidad_Real":0.0,"fecha_consulta":"06/03/2024 19:17:03"},{"cve_art":"48","existencia":0.0000,"descripcion":"MANGO HADEN ","cant":0.0,"fec":"","CantidadVendida":0.0,"Cantidad_Real":0.0,"fecha_consulta":"06/03/2024 19:17:03"},{"cve_art":"49","existencia":0.0000,"descripcion":"MANGO MANILA ","cant":0.0,"fec":"","CantidadVendida":0.0,"Cantidad_Real":0.0,"fecha_consulta":"06/03/2024 19:17:04"},{"cve_art":"50","existencia":0.0000,"descripcion":"MANGO ORO ","cant":0.0,"fec":"","CantidadVendida":0.0,"Cantidad_Real":0.0,"fecha_consulta":"06/03/2024 19:17:04"},{"cve_art":"51","existencia":78.0550,"descripcion":"MANGO TOMY KG ","cant":0.0,"fec":"","CantidadVendida":6.2600,"Cantidad_Real":0.0,"fecha_consulta":"06/03/2024 19:17:05"},{"cve_art":"55","existencia":0.0000,"descripcion":"MANGO KENT ","cant":0.0,"fec":"","CantidadVendida":0.0,"Cantidad_Real":0.0,"fecha_consulta":"06/03/2024 19:17:05"},{"cve_art":"669","existencia":0.0000,"descripcion":"FRUTA DESIDRATADA MANGO IMPORTADO ","cant":0.0,"fec":"","CantidadVendida":0.0,"Cantidad_Real":0.0,"fecha_consulta":"06/03/2024 19:17:06"},{"cve_art":"670","existencia":0.0000,"descripcion":"FRUTA MANGO C/CHILE ","cant":0.0,"fec":"","CantidadVendida":0.0,"Cantidad_Real":0.0,"fecha_consulta":"06/03/2024 19:17:06"},{"cve_art":"825","existencia":0.0000,"descripcion":"SNACK MANGO ENCHILADO ","cant":0.0,"fec":"","CantidadVendida":0.0,"Cantidad_Real":0.0,"fecha_consulta":"06/03/2024 19:17:07"}]';
        console.log("Productos recibidos:", JSON.parse(dataProductos));
        imprimirEnTablaAgregar(dataProductos, "tablaProductos")
    });
}


function imprimirEnTablaAgregar(data, tablaId) {
    data = JSON.parse(data)
    let tabla = document.getElementById(tablaId).querySelector('tbody');

    // Limpiar la tabla antes de agregar nuevos datos
    tabla.innerHTML = '';

    // Crear una fila para cada producto y agregarla a la tabla
    data.forEach(producto => {
        let fila = '<tr id="obtenido-' + producto.cve_art + '">'
                        + '<td>' + producto.cve_art + '</td>'
                        + '<td>' + producto.descripcion + '</td>'
                        + '<td>' + producto.existencia + '</td>'
                        + '<td>'
            + '<button class="btn btn-primary d-flex w-100 justify-content-evenly" onclick="getTablaProductosItem(this)" data-cveart="' + producto.cve_art + '" data-description="' + producto.descripcion + '" data-existencia="' + producto.Cantidad_Real + '" data-fechaUltimaCompra="' + producto.fec + '" data-fechaExistencia="' + producto.fecha_consulta + '" data-bs-target="#productoElegido" data-bs-toggle="modal"><i class="bi bi-check2-circle me-2"></i>Elegir</button>'
                        + '</td>'
                    + '</tr>'
        // Agregar la fila a la tabla
        tabla.innerHTML += fila;
    });

    tabla.closest('div.modal-content').querySelector('.modal-footer').innerHTML = data.length > 0 ? '<div class="alert alert-warning my-2 w-100" role="alert">Se ha encontrado más de 1 artículo. Elija uno para continuar.</div>' : '<div class="alert alert-warning my-2 w-100" role="alert">Producto no encontrado</div>';
}

function imprimirEnTabla(tablaId) {
    let tabla = document.getElementById(tablaId).querySelector('tbody');
    let mdl_item_selected = document.querySelector('#productoElegido');

    // Limpiar la tabla antes de agregar nuevos datos
    //tabla.innerHTML = '';

    // Crear una fila para cada producto y agregarla a la tabla
    let fila = '<tr class="alert alert-dismissible fade show" id="agregar-' + mdl_item_selected.querySelector('#Clave_articulo').value + '">'
        + '<td>' + mdl_item_selected.querySelector('#Clave_articulo').value + '</td>'
        + '<td>' + mdl_item_selected.querySelector('#Descripcion').value + '</td>'
        + '<td>' + mdl_item_selected.querySelector('#Cantidad_solicitada').value + '</td>'
        + '<td>' + mdl_item_selected.querySelector('#Cantidad_ultima_compra').value + '</td>'
        + '<td>' + mdl_item_selected.querySelector('#Existencia').value + '</td>'
        + '<td data-embalaje="' + mdl_item_selected.querySelector('#Id_Embalaje').value + '">' + mdl_item_selected.querySelector('#Id_Embalaje').children[mdl_item_selected.querySelector('#Id_Embalaje').selectedIndex].innerText + '</td>'
        + '<td><button type="button" class="btn btn-danger" data-bs-dismiss="alert" aria-label="Close"><i class="bi bi-trash"></i></button></td>'
        + '</tr>'

    // Agregar la fila a la tabla
    tabla.innerHTML += fila;
}

function getTablaProductosItem(element) {

    let mdl_item_selected = document.querySelector('#productoElegido');
    
    mdl_item_selected.querySelector('#Clave_articulo').value = element.dataset.cveart.trim();
    mdl_item_selected.querySelector('#Descripcion').value = element.dataset.description.trim();
    mdl_item_selected.querySelector('#Existencia').value = parseInt(element.dataset.existencia);
    mdl_item_selected.querySelector('#Fecha_existencia').value = element.dataset.fechaexistencia.split(' ')[0].split('/').reverse().join('-');

    console.log(element)
}


// Declarar un arreglo vacío para almacenar objetos
var arrayDeREQDETs = [];


function saveREQDETS() {
    let table = document.querySelector('#productosSeleccionados tbody');

    arrayDeREQDETs = [];

    table.childNodes.forEach(tr => {
        // Crear un objeto y añadirlo al arreglo
        let reqdet = {
            "Clave_articulo": tr.id.split('-')[1],
            "Descripcion": tr.children[1].innerText,
            "Cantidad_solicitada": tr.children[2].innerText,
            "Cantidad_ultima_compra": tr.children[3].innerText,
            "Existencia": tr.children[4].innerText,
            "Id_Embalaje": tr.children[5].dataset.embalaje
        };

        arrayDeREQDETs.push(reqdet);
    });

    // Enviar el arreglo de objetos al controlador utilizando AJAX
    $.ajax({
        url: '/REQDETs/CreateREQDETS',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(arrayDeREQDETs),
        success: function (response) {
            // Manejar la respuesta del servidor si es necesario
            console.log('Datos enviados correctamente');
            console.log(response);
        },
        error: function (xhr, status, error) {
            // Manejar errores si ocurrieron durante la solicitud AJAX
            console.error('Error al enviar datos:', error);
        }
    });
}