import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Loader from '../Loader/Loader'
import styled from 'styled-components'

export default function ExerciseDetails() {
    const router = useRouter()
    const { id } = router.query
    const { data, error, isLoading } = useSWR(`/api/exercises/${id}`)

    if(isLoading) return <Loader/> 
    if(error || !data) return <p>Error fetching Data</p>

    return (<Container>
        <h1>{data.name}</h1>
        <div>
            {data && <Card>
                <h2>Muscle Groups</h2>
                <ul>
                    {data.muscleGroups.map(muscle => <li key={muscle}>{muscle}</li>)}
                </ul>
                <h2>Instructions</h2>
                <ol>
                    {data.instructions.map(instruction => <li key={instruction}>{instruction}</li>)}
                </ol>
            </Card>}
        </div>
    </Container>
    )
}

const Card = styled.div`
display: flex;
color: white;
flex-direction: column;
text-decoration: none;
padding: 20px;
background: linear-gradient(to top, #292830, #232227);
border-radius: 25px;
padding-bottom: 20px;
border: 01px solid rgb(49, 49, 49)
`;

const Container = styled.div`
padding: 0px 20px`