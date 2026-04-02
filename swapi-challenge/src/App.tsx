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
          {filteredCharacters.map((character) => {
            return <div key={character.id}>
              <ul>
                <h2>{character.name} ({character.height})
                  <span> de {character.mass} {character.gender != "n/a"? character.gender : "Indefinido"}</span>
                </h2>
              </ul>
            </div>
          })}
        </div>
        <div>
          <button onClick={handleBackPage}>Voltar</button>
          <div>
            {pages.map((n) => {
              return <button onClick={() => {handleChangePage(n)}}>{n}</button>
            })}
          </div>
          <button onClick={handleNextPage}>Proximo</button>
        </div>
      </div>
    </div>
  )
}

export default App
