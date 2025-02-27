import { execOnce } from 'next/dist/shared/lib/utils'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import useSWR from 'swr'

export default function CategoryFilter({filter, setFilter}) {
    const router = useRouter()
    const { id } = router.query
    const { data, error, isLoading } = useSWR(`/api/categories`)

    if (isLoading) return <p>Loading...</p>
    if (error || !data) return <p>Error fetching Data</p>

    function handleFilter(category) {
        filter === category ? setFilter(null) : setFilter(category)
    }

    return (<>
        {data.map(category => <button onClick={() => handleFilter(category)} key={category._id}>{category.category}</button>)}
    </>)
}
