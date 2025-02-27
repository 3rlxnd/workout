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
        return filter === category ? setFilter(null) : setFilter(category)
    }

    return (<FilterContainer>
    <Filter style={!filter ? {backgroundColor: 'lightblue', color: 'black'} : null} onClick={() => handleFilter(null)}>All</Filter>
        {data.map(category => <Filter style={filter === category ? {backgroundColor: 'lightblue', color: 'black'} : null} onClick={() => handleFilter(category)} key={category._id}>{category.category}</Filter>)}
    </FilterContainer>)
}

const Filter = styled.button`
background-color:rgb(230, 230, 230);
border: none;
padding: 5px 10px;
font-weight: bold;
color: grey;
border-radius: 50px
`

const FilterContainer = styled.div`
padding: 20px;
display: flex;
gap: 20px`