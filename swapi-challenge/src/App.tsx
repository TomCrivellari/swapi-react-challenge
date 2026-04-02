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
    <div>
      <h1>Lista de Personagens</h1>
      <div>
        <div>
          <input type="text" placeholder='Filtrar pelo nome' value={filter} onChange={(e) => {setFilter(e.target.value)}}/>
          <button onClick={handleRemoveFilter}>Remover filtro</button>
        </div>
        <div>
          {isLoading && <p>Carregando...</p>}
          {error && <p>Erro ao carregar os dados</p>}
          {filteredCharacters.length === 0 && (<p>Nenhum personagem encontrado nesta pagina</p>)}
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
                  <td>{character.height == "unknown" || character.height == "none"? "Desconhecido": character.height}</td>
                  <td>{character.mass == "unknown" || character.mass == "none"? "Desconhecido": character.mass}</td>
                  <td>{character.gender == "n/a"? "Indefinido": character.gender}</td>
                </tr>
              })}
            </tbody>
            
          </table>
          
        </div>
        <div>
          <button onClick={handleBackPage}>Voltar</button>
          <div>
            {pages.map((n) => {
              return <button key={n} onClick={() => {handleChangePage(n)}}>{n}</button>
            })}
          </div>
          <button onClick={handleNextPage}>Proximo</button>
        </div>
      </div>
    </div>
  )
}

export default App
