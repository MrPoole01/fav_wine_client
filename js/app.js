// var url = 'http://localhost:8080/'
var url = 'https://fav-wine-server.herokuapp.com/';

const search = document.querySelector('.button_1')
const form = document.querySelector('.button_2')

$(document).ready(() => {
  $.get(url)
    .then(getAll)
    .then(addDeleteHandler)
    .then(addPutHandler)
})

function getAll(data) {

  var content = $('#content')
  content.empty().append(`
    <table style="width:100%">
      <tr>
        <th width="80px">Name</th>
        <th>Type</th>
        <th> Year</th>
        <th width="10px">Rating</th>
        <th width="20px"></th>
        <th width="20px"></th>
      </tr>
    </table>
      `)
for (var i = 0; i < data.length; i++) {
var wine = data[i]
if (wine) {
  // content.empty()
  content.append(`
    <table style="width:100%">
      <tr>
        <td width="80px">${wine.name}</td>
        <td>${wine.type}</td>
        <td>${wine.year}</td>
        <td  width="30px">${wine.rating}</td>
        <td width="20px"><button id="${wine.id}" class="button_4">✎</button></td>
        <td width="20px"><button id="${wine.name}" class="button_3">✖︎</button></td>
      </tr>
    </table>`)
    }
  }
}


// GET Function

search.addEventListener('click', searchField)

function searchField(event) {
  event.preventDefault()
  const searchInput = document.querySelector('#searchField')
  const searching = searchInput.value
  searchInput.value = ""
  searchForm(searching)
}

function searchForm(searching) {
  $.get(url + '?' + 'search=' + searching)
    .then((data) => {
      var content = $('#content')
      content.empty().append(`
        <table style="width:100%">
          <tr>
            <th width="80px">Name</th>
            <th>Type</th>
            <th> Year</th>
            <th width="30px">Rating</th>
            <th width="20px"></th>
            <th width="20px"></th>
          </tr>
        </table>
          `)
    for (var i = 0; i < data.length; i++) {
    var wine = data[i]
    if (wine) {
      // content.empty()
      content.append(`
        <table style="width:100%">
          <tr>
            <td width="80px">${wine.name}</td>
            <td>${wine.type}</td>
            <td>${wine.year}</td>
            <td  width="30px">${wine.rating}</td>
            <td width="20px"><button id="${wine.id}" class="button_4">✎</button></td>
            <td width="20px"><button id="${wine.name}" class="button_3">✖︎</button></td>
          </tr>
        </table>`)
        }
      }
      addDeleteHandler()
    })
}

// POST Function

form.addEventListener('click', submitForm)

function submitForm(event) {
  event.preventDefault()
  const nameInput = document.querySelector('#nameField')
  const typeInput = document.querySelector('#typeField')
  const yearInput = document.querySelector('#yearField')
  const ratingInput = document.querySelector('#ratingField')
  const name = nameInput.value
  const type = typeInput.value
  const year = yearInput.value
  const rating = ratingInput.value
  nameInput.value = ""
  typeInput.value = ""
  yearInput.value = ""
  ratingInput.value = ""
  createForm(name, type, year, rating)
}

 function createForm(name, type, year, rating) {
   let sending = {
     name: name,
     type: type,
     year: year,
     rating: rating
   }
   $.post(url, sending)
    .then((data) => {
      $.get(url).then(getAll)
    })
 }

 // DELETE FUNCTION

function addDeleteHandler() {
  $('.button_3').click(function(event) {
    event.preventDefault()
    let name = event.target.id;
    $.ajax({
      url: 'https://fav-wine-server.herokuapp.com/' + `${name}`,
      method: 'DELETE',
      success: function(result) {
        $.get(url).then(getAll)
      }
    })
  })
}

 // PUT Function

 function addPutHandler(name, type, year, rating) {
   $('.button_4').click(function(event) {
     event.preventDefault()
     let id = event.target.id
     let name = $('#nameField').val()
     let type = $('#typeField').val()
     let year = $('#yearField').val()
     let rating = $('#ratingField').val()

     let data = {
       name: name === "" ? undefined : name,
       type: type === "" ? undefined : type,
       year: year === "" ? undefined : year,
       rating: rating === "" ? undefined : rating
     }
     console.log(url + id);
         $.ajax({
          url: url + id,
          method: 'PUT',
          data: data,
          success: function(result) {
            $.get(url).then(getAll)
            .then(addDeleteHandler)
            .then(addPutHandler)
          },
        });
    })
 }
