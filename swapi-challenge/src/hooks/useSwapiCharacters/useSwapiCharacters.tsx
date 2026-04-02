import { useEffect, useState } from 'react'
import type { ISwapiCharaters } from '../../types/ISwapiCharacters'

type Props = {
    page: number;
}

function useSwapiCharacters({ page }: Props) {
    const [characters, setCharacters] = useState<ISwapiCharaters[]>([])
    const [nextPage, setNextPage] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)


    useEffect(() => {
    fetch(`https://swapi.py4e.com/api/people/?page=${page}`)
        .then((c) => c.json())
        .then((data) => {
            setCharacters(data.results)
            setNextPage(data.next)
        })
        .catch((err) => {
            setError(err)
        })
        .finally(() => {
            setIsLoading(false)
        })
    }, [page])

    return { characters, isLoading, error, nextPage }
}

export default useSwapiCharacters