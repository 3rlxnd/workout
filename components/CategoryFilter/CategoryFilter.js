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
    <Filter style={!filter ? {background: 'linear-gradient(to top, lightblue,rgb(154, 209, 225))', color: 'black'} : null} onClick={() => handleFilter(null)}>All</Filter>
        {data.map(category => <Filter style={filter === category ? {background: 'linear-gradient(to top, lightblue,rgb(154, 209, 225))', color: 'black'} : null} onClick={() => handleFilter(category)} key={category._id}>{category.category}</Filter>)}
    </FilterContainer>)
}

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  overflow-y: hidden;
  max-width: 100%;
  margin-left: 20px;
  padding: 20px 20px 0 0;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  
  &::-webkit-scrollbar {
    display: none;
  }
`

const Filter = styled.button`
  // background-color:#292830;
background: linear-gradient(to top, #292830, #232227);
border: 01px solid rgb(49, 49, 49);
  border: none;
  font-size: 1rem;
  padding: 6px 12px;
  font-weight: bold;
  color:rgb(217, 217, 217);
  border-radius: 50px;
  flex-shrink: 0;
  scroll-snap-align: start;
`