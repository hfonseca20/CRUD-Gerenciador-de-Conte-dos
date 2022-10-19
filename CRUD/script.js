const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sConteudo = document.querySelector('#m-conteudo')
const sDisciplina = document.querySelector('#m-disciplina')
const sData = document.querySelector('#m-data')
const sDescricao = document.querySelector('#m-descricao')
const btnSalvar = document.querySelector('#btn-Salvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sConteudo.value = itens[index].conteudo
    sDisciplina.value = itens[index].disciplina
    sData.value = itens[index].data
    sDescricao.value = itens[index].descricao
    id = index
  } else {
    sConteudo.value = ''
    sDisciplina.value = ''
    sData.value = ''
    sDescricao.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td> ${item.conteudo}</td>
    <td> ${item.disciplina}</td>
    <td> ${item.data}</td>
    <td> ${item.descricao}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sConteudo.value == '' || sDisciplina.value == '' || sData.value == '' || sDescricao.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].conteudo = sConteudo.value
    itens[id].disciplina = sDisciplina.value
    itens[id].data = sData.value
    itens[id].descricao = sDescricao.value
  } else {
    itens.push({'conteudo': sConteudo.value, 'disciplina': sDisciplina.value, 'data': sData.value, 'descricao': sDescricao.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()