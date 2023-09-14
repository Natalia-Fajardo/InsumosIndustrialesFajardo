document.addEventListener('DOMContentLoaded', () => {
    const productsList = [
        {
            id: 1,
            nombre: 'Tornillos',
            precio: 10000,
            imagen: 'https://torniexpress.com.co/wp-content/uploads/2020/08/tornillos-en-cabeza-de-estria.jpg'
        },
        {
            id: 2,
            nombre: 'Martillo',
            precio: 18000,
            imagen: 'https://www.ferreteriasamir.com/6290-large_default/martillo-metalico-8onzas-21mm-stanprof.jpg'
        },
        {
            id: 3,
            nombre: 'Alicate',
            precio: 34000,
            imagen: 'https://belltec.com.co/16931-large_default/alicates-de-electricista.jpg'
        },
        {
            id: 4,
            nombre: 'Llave inglesa',
            precio: 12000,
            imagen: 'https://www.catalogoespacial.com/16959-large_default/llave-inglesa.jpg'
        }

    ];

    let car = [];
    const foreign = '$';
    const DOMitems = document.querySelector('#items');
    const DOMcar = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbtnClean = document.querySelector('#boton-vaciar');
    const myLocalStorage = window.localStorage;

    function renderProducts() {
        productsList.forEach((info) => {
            const myNode = document.createElement('div');
            myNode.classList.add('col-sm-4');
            const myNodeProduct = document.createElement('div');
            myNodeProduct.classList.add('product');
            const myNodeTitle = document.createElement('h3');
            myNodeTitle.textContent = info.nombre;
            const miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');
            miNodoImagen.setAttribute('src', info.imagen);
            const myNodePrice = document.createElement('p');
            myNodePrice.textContent = `${info.precio}${foreign}`;
            const myNodeBtnAdd = document.createElement('button');
            myNodeBtnAdd.classList.add('btn-primary');
            myNodeBtnAdd.textContent = 'Agregar';
            myNodeBtnAdd.setAttribute('marcador', info.id);
            myNodeBtnAdd.addEventListener('click', addProduct);
            myNodeProduct.appendChild(miNodoImagen);
            myNodeProduct.appendChild(myNodeTitle);
            myNodeProduct.appendChild(myNodePrice);
            myNodeProduct.appendChild(myNodeBtnAdd);
            myNode.appendChild(myNodeProduct);
            DOMitems.appendChild(myNode);
        });
    }

    function addProduct(event) {
        car.push(event.target.getAttribute('marcador'))
        renderCar();
        saveCarLocalStorage();
    }

    function renderCar() {
        DOMcar.textContent = '';
        const carWithoutDuplicates = [...new Set(car)];
        carWithoutDuplicates.forEach((item) => {
            const myProduct = productsList.filter((itemBD) => {
                return itemBD.id === parseInt(item);
            });
            const itemsUnit = car.reduce((total, itemId) => {
                return itemId === item ? total += 1 : total;
            }, 0);
            const myNode = document.createElement('li');
            myNode.textContent = `${foreign}${itemsUnit} x ${myProduct[0].nombre} - ${myProduct[0].precio}`;
            const btnRemove = document.createElement('button');
            btnRemove.classList.add('btn-danger');
            btnRemove.textContent = 'X';
            btnRemove.style.marginLeft = '1rem';
            btnRemove.dataset.item = item;
            btnRemove.addEventListener('click', removeItemCar);
            myNode.appendChild(btnRemove);
            DOMcar.appendChild(myNode);
        });
        DOMtotal.textContent = calculateTotal();
    }

    function removeItemCar(event) {
        const id = event.target.dataset.item;
        car = car.filter((carId) => {
            return carId !== id;
        });
        renderCar();
        saveCarLocalStorage();
    }

    function calculateTotal() {
        return car.reduce((total, item) => {
            const myProduct = productsList.filter((itemBD) => {
                return itemBD.id === parseInt(item);
            });
            return total + myProduct[0].precio;
        }, 0);
    }

    function cleanCar() {
        car = [];
        renderCar();
        localStorage.clear();

    }

    function saveCarLocalStorage () {
        myLocalStorage.setItem('carrito', JSON.stringify(car));
    }

    function loadCarLocalStorage () {
        if (myLocalStorage.getItem('carrito') !== null) {
            car = JSON.parse(myLocalStorage.getItem('carrito'));
        }
    }

    DOMbtnClean.addEventListener('click', cleanCar);

    loadCarLocalStorage();
    renderProducts();
    renderCar();
});