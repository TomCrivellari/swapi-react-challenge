import { useEffect, useState } from 'react'
import './App.css'

interface ICharaters {
  id: number;
  name: string;
  homeworld: string;
  species: string;
}

function App() {
  const [characters, setCharacters] = useState<ICharaters[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetch("https://swapi.py4e.com/api/people/")
      .then((c) => c.json())
      .then((data) => {
        setCharacters(data.results)
        console.log(data.results.length)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return(
    <div>
      {isLoading && <p>Carregano...</p>}
      {error && <p>Erro ao carregar os dados</p>}
      {characters.map((character) => {
        return <div key={character.id}>
          <ul>
            <h2>{character.name} ({character.species})
              <span> de {character.homeworld}</span>
            </h2>
          </ul>
        </div>
      })}
    </div>
  )
}

export default App
