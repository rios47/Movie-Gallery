let cl = console.log;


const showModal = document.getElementById('showModal');
const backdropDiv = document.getElementById('backdrop');
const myModal = document.getElementById('myModal');
const myClose = Array.from(document.querySelectorAll('.myClose'))
// const cancelBtn = document.getElementById('cancelBtn')
const movieContainer = document.getElementById('movieContainer');
const movieForm = document.getElementById('movieForm')
const titleCtrl = document.getElementById('titleCtrl')
const urlCtrl = document.getElementById('urlCtrl')
const ratingCtrl = document.getElementById('ratingCtrl');
const updateMovie = document.getElementById('updateMovie');
const addMovie = document.getElementById('addMovie');
const delBtn = document.getElementById('delBtn');


// const movieApiUrl = `http://localhost:3000/posts`
const movieApiUrl = `https://sheetdb.io/api/v1/o4r71hqrj35u7`
// const makeApicall = (methodName, apiUrl, body) => {
//     return new Promise((resolve, reject) => {

//         let xhr = new XMLHttpRequest();

//         xhr.open(methodName, apiUrl, true)

//         xhr.setRequestHeader('content-type', 'application/json')

//         xhr.onload = () => {

//             if ((xhr.status === 200 || xhr.status === 201) && (xhr.readyState === 4)) {
//                 resolve(xhr.response)
//             } else {
//                 reject('Error: Api is failed')
//             }
//         }

//         xhr.send(body)
//     })

// }


// makeApicall('GET', postUrl)
//     .then(res => {
//         let data = JSON.parse(res);
//         cl(data)
//         templating(data)
//     })
//     .catch(cl)

let ratingValue = ele => {
    if (ele >= 8) {
        return "text-success";
    } else if (ele >= 4) {
        return "text-warning";
    } else {
        return "text-danger";
    }
}

let username = `18uhai62`
let password = `zt9h19p5ivu1tflsrmei`

const fetchApi = (methodName, apiUrl, body) => {
    return fetch(apiUrl, {
        method: methodName,
        body: body,
        headers: {
            'content-type': 'application/json',
            // 'Authorization': 'Basic ' + btoa(username + ":" + password)
            'Authorization': 'Basic ' + btoa("18uhai62:zt9h19p5ivu1tflsrmei")

        }

    })
        .then(res => res.json())
}





const onShowModal = e => {

    backdropDiv.classList.remove('d-none');
    myModal.classList.remove('d-none');

    updateMovie.classList.add('d-none');
    addMovie.classList.remove('d-none');
    delBtn.classList.add('d-none');
}


const onCancelBtn = e => {

    backdropDiv.classList.add('d-none');
    myModal.classList.add('d-none');
}

const onHideModal = e => {
    backdropDiv.classList.add('d-none');
    myModal.classList.add('d-none');
    movieForm.reset()

}


const createCard = (obj) => {

    let div = document.createElement('div');
    div.classList.add('col-sm-3');


    div.innerHTML = `
    <div class="card w-100 mt-4" id="${obj.id}">
    <figure>
      <div class="card-body" >
              <button class="btn btn-outline-warning editBtn" type="button" onclick="onEdit(this)"><i class="fa-regular fa-pen-to-square"></i></button>
              <img class="card-img-top" src="${obj.url}" alt="${obj.title}">
        <figcaption >
            <h5 class="card-title text-center m-2">${obj.title}</h5>
            <div class="text-right">
            <span class="card-text  text-center pr-2 pl-2 pt-1 pb-1 font-weight-bold text-right rounded bg-secondary ${ratingValue(obj.rating)}">${obj.rating}</span>
            </div>
        </figcaption>
      </div>
    </figure>
  </div>
  `

    movieContainer.append(div)

}

const onEdit = e => {
    // cl(e.type)

    // let editId = e.clo
    // cl(editId)

    // localStorage.setItem('id', editId);


    // let editUrl = `${movieApiUrl}sda/`

    // cl(editUrl)

    // fetchApi('GET', editUrl)
    //     .then(res => {
    //         onShowModal()
    //         titleCtrl.value = res.title;
    //         urlCtrl.value = res.url;
    //         ratingCtrl.value = res.rating;

    //         updateMovie.classList.remove('d-none');
    //         addMovie.classList.add('d-none');
    //         delBtn.classList.remove('d-none')
    //     })
    //     .catch(cl)
}



const onUpdateMovie = e => {
    cl(e.type)

    let upId = localStorage.getItem('id');
    cl(upId)

    let upUrl = `${movieApiUrl}/${upId}`;

    cl(upUrl)

    let obj = {
        title: titleCtrl.value,
        url: urlCtrl.value,
        rating: ratingCtrl.value
    }
    cl(obj)

    fetchApi('PATCH', upUrl, JSON.stringify(obj))
        .then(cl)
        .catch(cl)

}


let templating = arr => {
    arr.forEach(e => {
        createCard(e)
    });

}



const onSubmitfrom = e => {
    // cl(e.type)

    e.preventDefault();


    let obj = {
        title: titleCtrl.value,
        url: urlCtrl.value,
        rating: ratingCtrl.value
    }
    // cl(obj)

    // makeApicall('POST', postUrl, JSON.stringify(obj))
    //     .then(res => {
    //         cl(res)
    //         onHideModal()
    //     })
    //     .catch(cl)




    fetchApi('POST', movieApiUrl, JSON.stringify(obj))
        .then(res => {
            cl(res)
            onHideModal()
            location.reload()
        })
        .catch(cl)



    e.target.reset();
}


const onDeleteMovie = e => {
    cl(e.type)

    let delId = localStorage.getItem('id')
    cl(delId)

    let delUrl = `${movieApiUrl}/${delId}`

    cl(delUrl)

    fetchApi('DELETE', delUrl)
        .then(cl)
        .catch(cl)


}




fetchApi('GET', movieApiUrl)
    .then(res => {
        // cl(res)
        templating(res)
    })






showModal.addEventListener('click', onShowModal);
// cancelBtn.addEventListener('click', onCancelBtn)
// backdropDiv.addEventListener('clikc'.onbackdropClick);
myClose.forEach(e => {
    e.addEventListener('click', onHideModal)
});
movieForm.addEventListener('submit', onSubmitfrom)
delBtn.addEventListener('click', onDeleteMovie)
updateMovie.addEventListener('click', onUpdateMovie)





