//variables
const bxBlogs = document.querySelector('.bx-blogs-js')
const btnMenu = document.querySelector('.btnMenu-js')
const menu = document.querySelector('.menu-js')

//eventos
cargarEventListener()
function cargarEventListener () {
    document.addEventListener('DOMContentLoaded', cargarBlogs)
    btnMenu.addEventListener('click', toggleMenu)
}

//funciones
//cargar blogs
function cargarBlogs () {
    getBlogs ()
    .then(data => {
        if(!data){
            errorBlogs()
        }else{
            const blogs = data.recetas
            imprimirBlogs(blogs)
        }
    })
}

//consultar api
async function getBlogs () {
    const url = await fetch('http://45.33.19.37/test/recetas')
    const res = await url.json()
    return res
}

//crear html blogs
function crearBlogs (item) {
    const fechaSplit = item.create_at.split('-')
    const anioSplit = fechaSplit[0].split('0')

    const div = document.createElement('div')
    div.className = 'bx-body'
    div.innerHTML = (`
        <div class="row">
            <div class="col-12 col-md-4">
                <img class="blog-img" src="${item.img}" alt="">
            </div>
            <div class="col-12 col-md-8">
                <h2>${item.titulo}</h2>
                <b>Escrito el: <span>${fechaSplit[2]}/${fechaSplit[1]}/${anioSplit[1]}</span> por: <span>${item.editor}</span></b>
                <p>${item.description}</p>
                <a href="#" class="btn btn-blog">Ver entrada</a>
            </div>
        </div>
    `)
    bxBlogs.appendChild(div)
}

//crear html error blogs
function errorBlogs () {
    const div = document.createElement('div')
    div.className = 'alert alert-danger text-center'
    div.role = "alert"
    div.innerText = (`Error en la consulta`)
    bxBlogs.appendChild(div)
}

//imprimir blogs en el documento
function imprimirBlogs (item) {
    for (let i = 0; i < item.length; i++) {
        crearBlogs(item[i])
    }
}

//funcion que despliega y guarda el menu
function toggleMenu (e) {
    e.preventDefault()
    btnMenu.classList.toggle("active")
    menu.classList.toggle("active")
}
