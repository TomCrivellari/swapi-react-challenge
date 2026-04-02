import './App.css'
import useSwapiCharacters from './hooks/useSwapiCharacters'

function App() {
  const { characters, isLoading, error } = useSwapiCharacters({ page: 1 })


  return(
    <div>
      {isLoading && <p>Carregando...</p>}
      {error && <p>Erro ao carregar os dados</p>}
      {characters.map((character) => {
        return <div key={character.id}>
          <ul>
            <h2>{character.name} ({character.height})
              <span> de {character.mass} {character.gender != "n/a"? character.gender : "Indefinido"}</span>
            </h2>
          </ul>
        </div>
      })}
    </div>
  )
}

export default App
