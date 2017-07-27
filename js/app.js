var url = 'https://fav-wine-server.herokuapp.com/';

const search = document.querySelector('.button_1')
const form = document.querySelector('.button_2')

$(document).ready(() => {
  $.get(url)
    .then(getAll)
    .then(addDeleteHandler)
})

function getAll(data) {
  var content = $('#content')
  content.empty().append(`
    <table style="width:100%">
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Year</th>
        <th>Rating</th>
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
        <td>${wine.name}</td>
        <td>${wine.type}</td>
        <td>${wine.year}</td>
        <td>${wine.rating}</td>
        <td width="20px"><button class="button_4">✎</button></td>
        <td width="20px"><button id="${wine.name}" class="button_3">✖︎</button></td>
      </tr>
    </table>`)
    }
  }
}

// GET Function

search.addEventListener('click touchstart', searchField)

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
        <table id="headerNames" style="width:100%">
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Year</th>
            <th>Rating</th>
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
            <td id="name_td">${wine.name}</td>
            <td id="type_td">${wine.type}</td>
            <td id="year_td">${wine.year}</td>
            <td id="rating_td">${wine.rating}</td>
            <td width="20px"><button id="${wine.id} "class="button_4">✎</button></td>
            <td width="20px"><button id="${wine.name} "class="button_3">✖︎</button></td>
          </tr>
        </table>`)
        }
      }
      addDeleteHandler()
    })
}

// POST Function

form.addEventListener('click touchstart', submitForm)

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
  $('.button_3').on('click touchstart', function(event) {
    event.preventDefault()
    let name = event.target.id;
    $.ajax({
      url: 'https://fav-wine-server.herokuapp.com/' + `${name}`,
      type: 'DELETE',
      success: function(result) {
        $.get(url).then(getAll)
      }
    })
  })
}



 // PUT Function

 // function addPutHandler() {
 //   $('.button_4').on('click touchstart', function(event) {
 //     event.preventDefault()
 //     $.get(url + '?' + 'search=' + `${id}`)
 //      .then((data) => {
 //        data.id = {
 //          name: $('#name_td').val() === " " ? undefined : $('#name_td').val(),
 //          type: $('#type_td').val() === " " ? undefined : $('#type_td').val(),
 //          year: $('#year_td').val() === " " ? undefined : $('#year_td').val(),
 //          rating: $('#rating_td').val() === " " ? undefined : $('#rating_td').val()
 //        }
 //      })
 //     $.ajax({
 //       url: 'https://fav-wine-server.herokuapp.com/' + `${id}`,
 //       type: 'PUT',
 //       data: data
 //       success: function(result) {
 //         $.get(url).then(getAll)
 //       }
 //     })
 //   })
 // }
