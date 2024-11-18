


let carrito = JSON.parse(localStorage.getItem("carrito")) || [];  

// Función para mostrar productos









function mostrarProductos() {
    const productosContainer = document.getElementById("card-container");
    productosContainer.innerHTML = "";  

    
    fetch("https://dragonball-api.com/api/characters?limit=10")
        .then(response => response.json())
        .then(data => {
            // Recorremos todos los productos que devuelve la API
            data.items.forEach(el => {
                const productoHijoo = document.createElement("div");
                productoHijoo.classList.add("card");

                
                productoHijoo.innerHTML = `
                    <img src="${el.image}" alt="${el.name}">
                    <ul>
                        <li><h3>${el.name}</h3></li>
                        <li><p>Precio: $${parseInt(el.ki)}</p></li>
                        <li><p>${el.description}</p></li>
                    </ul>
                    <button id="agregar-bton" onclick="agregarAlCarrito(${el.id})">Agregar al carrito</button>
                    `
                    ;




                    


                    

                
                productosContainer.appendChild(productoHijoo);

                
                

                

                
                    

            });
        })
        .catch(err => console.log(err));
}


function crearSeccionDeCarrito() {
    const SeccionDeCarritoYaSecreo = document.getElementById("carrito-seccion");
    if (SeccionDeCarritoYaSecreo) {
        return SeccionDeCarritoYaSecreo;
    }

    const seccionCarrito = document.createElement("div");
    seccionCarrito.id = "carrito-seccion";
    seccionCarrito.classList.add("carrito-oculto");
    seccionCarrito.innerHTML = `
        <h2><img src="images/icon/icons8-carrito-de-compras-24.png"></h2>
        <ul id="carrito-lista"></ul>
        <button id="comprar-btn">Comprar Carrito</button>

    `;
    
    document.body.appendChild(seccionCarrito);


    const comprar = document.getElementById("comprar-btn");
    comprar.onclick = ()=> {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success",
              cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
          });
          swalWithBootstrapButtons.fire({
            title: "Desea Comprar?",
            text: "finalizar Compra!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si, Comprar!",
            cancelButtonText: "No, Cancelar!",
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                carrito = [];
                localStorage.removeItem("carrito");
                actualizarCarrito();
              swalWithBootstrapButtons.fire({
                title: "Compra Confirmada!",
                text: "Felicidades compraste Correctamente.",
                icon: "success"
                
              }

            
            );
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire({
                title: "Compra cancelada",
                text: "Haz Cancelado La Compra :(",
                icon: "error"
              });
            }
          });

    }

    return seccionCarrito;
}


function agregarAlCarrito(id) {
    fetch("https://dragonball-api.com/api/characters?limit=10")  
        .then(response => response.json())
        .then(data => {
            
            const productoSeleccionado = data.items.find(el => el.id === id);

            
            const productoEnCarrito = carrito.find(producto => producto.id === productoSeleccionado.id);

            if (productoEnCarrito) {
                
                productoEnCarrito.cantidad++;

                 

                Toastify({

                    text: "Agregado Correctamente. ",
                    
                    duration: 3000,
                    gravity: "bottom",
                    backgroundColor: "linear-gradient(90deg, rgba(191,24,22,1) 0%, rgba(196,143,66,1) 49%)"
                    
                    }).showToast();
    
            } else {
                
                carrito.push({ ...productoSeleccionado, cantidad: 1 });
                Toastify({

                    text: "Agregado Correctamente. ",
                    
                    duration: 3000,
                    gravity: "bottom",

                    backgroundColor: "linear-gradient(90deg, rgba(191,24,22,1) 0%, rgba(196,143,66,1) 49%)",

                    

                    
                    
                    }).showToast();

            }

            
            actualizarCarrito();
        })
        .catch(err => console.log("Error al agregar producto al carrito:", err));
}


function actualizarCarrito() {
    const carritoContador = document.getElementById("carrito-count");
    const total = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    carritoContador.textContent = total;

    const carritoSeccion = crearSeccionDeCarrito();
    const carritoLista = document.getElementById("carrito-lista");
    carritoLista.innerHTML = ""; 

    
    carrito.forEach(producto => {
        const item = document.createElement("li");
        
        item.innerHTML = `${producto.name}: $${parseInt(producto.ki)} x ${producto.cantidad} = $${parseInt(producto.ki) * producto.cantidad}`;
        
        
        carritoLista.appendChild(item);
        
        
    });

   
    localStorage.setItem("carrito", JSON.stringify(carrito));
}





mostrarProductos();
actualizarCarrito();


