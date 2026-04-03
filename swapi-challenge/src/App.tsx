import { useState } from 'react'
import './App.css'
import useSwapiCharacters from './hooks/useSwapiCharacters'
import type { ISwapiCharaters } from './types/ISwapiCharacters'

function App() {
  const [page, setPage] = useState(1)
  const { characters, isLoading, error, count } = useSwapiCharacters({ page: page })
  const [filter, setFilter] = useState("")
  const totalPages = Math.ceil(count / 10)
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  const filteredCharacters: ISwapiCharaters[] = characters.filter(c =>
    c.name.toLowerCase().includes(filter.toLowerCase())
  )

  const handleRemoveFilter = () => {
    setFilter('')
  }

  const handleNextPage = () => {
    if (page == totalPages) return
    setPage(prev => prev + 1)
  }

  const handleBackPage = () => {
    if (page == 1) return
    setPage(prev => prev - 1)
  }

  const handleChangePage = (page: number) => {
    setPage(page)
  }


  return(
    <div className="container">
      <header className='header'>
        <h1>Lista de Personagens</h1>
      </header>
      <section className='body'>
        <section className='filter'>
          <input type="text" placeholder='Filtrar pelo nome' value={filter} onChange={(e) => {setFilter(e.target.value)}}/>
          {filter != "" && <button onClick={handleRemoveFilter}>Remover filtro</button>}
        </section>
        <section className='list'>
          {isLoading && <p>Carregando...</p>}
          {error && <p>Erro ao carregar os dados</p>}
          {filteredCharacters.length === 0 && !isLoading && (<p>Nenhum personagem encontrado nesta pagina</p>)}
          {filteredCharacters.length != 0 &&
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Altura</th>
                  <th>Massa</th>
                  <th>Gênero</th>
                </tr>
              </thead>
              <tbody>
                {filteredCharacters.map((character, index) => {
                  return <tr key={index}>
                    <td>{character.name}</td>
                    <td>{character.height == "unknown" || character.height == "none"? "Desconhecido": (parseInt(character.height)/100) + " metros"}</td>
                    <td>{character.mass == "unknown" || character.mass == "none"? "Desconhecido": character.mass + " kg"} </td>
                    <td>{character.gender == "n/a" || character.gender == "none"? "Indefinido": 
                    (character.gender == "male"? "Masculino" : "Feminino")}</td>
                  </tr>
                })}
              </tbody>
              
            </table>
          }
          
        </section>
        <section className='pagination'>
          <button className={page === 1 ? "hidden" : ""} onClick={handleBackPage}>Voltar</button>
          <section className='pages'>
            {pages.map((n) => {
              return <button className={page === n ? "active" : "deactivate"} key={n} onClick={() => {handleChangePage(n)}}>{n}</button>
            })}
          </section>
          <button className={page === totalPages ? "hidden" : ""} onClick={handleNextPage}>Proximo</button>
        </section>
      </section>
    </div>
  )
}

export default App
