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
  const visiblePages = pages.filter((p) => p >= page - 2 && p <= page + 2)

  const filteredCharacters: ISwapiCharaters[] = characters.filter(c =>
    c.name.toLowerCase().includes(filter.toLowerCase())
  )

  const handleRemoveFilter = () => {
    setFilter('')
  }

  const handleNextPage = () => {
    if (page === totalPages) return
    setPage(prev => prev + 1)
  }

  const handleBackPage = () => {
    if (page === 1) return
    setPage(prev => prev - 1)
  }

  const handleChangePage = (page: number) => {
    setPage(page)
  }

  const formatHeight = (height: string) => {
    if (height === "unknown" || height === "none") return "Desconhecido"
    return `${parseInt(height) / 100} metros`
  }

  const formatMass = (mass: string) => {
    if (mass === "unknown" || mass === "none") return "Desconhecido"
    return `${mass} kg`
  }
  const formatGender = (gender: string) => {
    if (gender === "n/a" || gender === "none") return "Indefinido"
    if (gender === "male") return "Masculino"
    else return "Feminino"
    
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
          {filteredCharacters.length != 0 && !isLoading &&
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
                    <td>{formatHeight(character.height)}</td>
                    <td>{formatMass(character.mass)} </td>
                    <td>{formatGender(character.gender)}</td>
                  </tr>
                })}
              </tbody>
              <p className="page-info">Página {page} de {totalPages}</p>
            </table>
          }
          
          
        </section>
        
        <section className='pagination'>
          <button className={page === 1 ? "hidden" : ""} onClick={handleBackPage}>Voltar</button>
          <section className='pages'>
            {visiblePages.map((n) => {
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
