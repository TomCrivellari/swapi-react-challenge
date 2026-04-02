import { useEffect, useState } from 'react'
import type { ISwapiCharaters } from '../../types/ISwapiCharacters'

type Props = {
    page: number;
}

function useSwapiCharacters({ page }: Props) {
    const [characters, setCharacters] = useState<ISwapiCharaters[]>([])
    const [count, setCount] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<Error | null>(null)


    useEffect(() => {
    fetch(`https://swapi.py4e.com/api/people/?page=${page}`)
        .then((c) => c.json())
        .then((data) => {
            setCharacters(data.results)
            setCount(data.count)
        })
        .catch((err) => {
            setError(err)
        })
        .finally(() => {
            setIsLoading(false)
        })
    }, [page])

    return { characters, isLoading, error, count }
}

export default useSwapiCharacters