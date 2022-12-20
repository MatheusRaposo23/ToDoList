const texto = document.querySelector('input')
const btnInsert = document.querySelector('.insert button')
const btnDeleteAll = document.querySelector('.header button')
const ul = document.querySelector('ul')

var itensDB = [] /* variavel de interacao com o BD */

texto.addEventListener('keypress', e => {
  if (e.key == 'Enter' && texto.value != '') {
    setItemDB()
  }
}) /* adiciona tarefa com o evento click Enter */

btnInsert.onclick = () => {
  if (texto.value != '') {
    setItemDB()
  }
} /* adiciona tarefa ao clicar no botao de MAIS */

function setItemDB() {
  if (itensDB.length >= 8) {
    alert('Limite máximo de 8 itens atingido!')
    return
  }

  itensDB.push({ 'item': texto.value, 'status': '' })
  updateDB()
} /* funcao para adicionar tarefa ao BD ou avisar ao usuario que o limite maximo foi atingido*/

function updateDB() {
  localStorage.setItem('todolist', JSON.stringify(itensDB))
  loadItens()
} /* funcao para setar dentro do local storage o item como todolist, usando stringify passando itensDB */

function loadItens() {
  ul.innerHTML = "";
  itensDB = JSON.parse(localStorage.getItem('todolist')) ?? []
  itensDB.forEach((item, i) => {
    insertItemTela(item.item, item.status, i)
  })
} /* recupera os itens no banco e insere-os na tela  */

function insertItemTela(text, status, i) {
  const li = document.createElement('li')
  
  li.innerHTML = `
    <div class="divLi">
      <input type="checkbox" ${status} data-i=${i} onchange="done(this, ${i});" />
      <span data-si=${i}>${text}</span>
      <button onclick="removeItem(${i})" data-i=${i}><i class='bx bx-trash'></i></button>
    </div>
    `
  ul.appendChild(li)

  if (status) {
    document.querySelector(`[data-si="${i}"]`).classList.toggle('line-through')
  }

  texto.value = ''
} /* funcao que cria a LI para exibir as tarefas na tela, checkbox da tarefa e removao da tarefa */

function done(chk, i) {

  if (chk.checked) {
    itensDB[i].status = 'checked' 
  } else {
    itensDB[i].status = '' 
  }

  updateDB()
} /* funcao que passa o status da tarefa como checado ou nao ao banco */

function removeItem(i) {
  itensDB.splice(i, 1)
  updateDB()
} /* funcao para remover a tarefa selecionada */

btnDeleteAll.onclick = () => {
    itensDB = []
    updateDB()
} /* botao principal que deleta todas as tarefas */

loadItens()