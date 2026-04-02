import { useEffect, useState } from 'react'
import type { ICharaters } from '../../types/ISwapiCharacters'

type Props = {
    page: number;
}

function useSwapiCharacters({ page }: Props) {
    const [characters, setCharacters] = useState<ICharaters[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)


    useEffect(() => {
    fetch(`https://swapi.py4e.com/api/people/?page=${page}`)
        .then((c) => c.json())
        .then((data) => {
            setCharacters(data.results)
        })
        .catch((err) => {
            setError(err)
        })
        .finally(() => {
            setIsLoading(false)
        })
    }, [])

    return { characters, isLoading, error }
}

export default useSwapiCharacters