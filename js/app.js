var url = 'https://fav-wine-server.herokuapp.com/';

const search = document.querySelector('.button_1')
const form = document.querySelector('.button_2')

$(document).ready(() => {
  console.log(url);
  $.get(url)
    .then(getAll)
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
        <td width="20px"><button class="edit">✎</button></td>
        <td width="20px"><button class="remove">✖︎</button></td>
      </tr>
    </table>`)
    }
  }
}

form.addEventListener('click', submitForm)

function submitForm(event) {
  event.preventDefault()
  const nameInput = document.querySelector('#nameField')
  const typeInput = document.querySelector('#typeField')
  const yearInput = document.querySelector('#yearField')
  const ratingInput = document.querySelector('.rating')
  const name = nameInput.value
  const type = typeInput.value
  const year = yearInput.value
  const rating = ratingInput.value
  nameInput.vaue = ""
  typeInput.vaue = ""
  yearInput.vaue = ""
  ratingInput.vaue = ""
  createForm(name, type, year, rating)
}

 function createForm(name, type, year, rating) {
   let sending = {
     name: name,
     type: type,
     year: year,
     rating: rating
   }
   console.log(url, sending);
   $.post(url, sending)
    .then((data) => {
      console.log(data)
      $.get(url).then(getAll)
    })
 }
