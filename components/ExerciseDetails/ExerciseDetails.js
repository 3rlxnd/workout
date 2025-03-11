import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Loader from '../Loader/Loader'
import styled from 'styled-components'

export default function ExerciseDetails() {
    const router = useRouter()
    const { id } = router.query
    const { data, error, isLoading } = useSWR(`/api/exercises/${id}`)

    if (isLoading) return <Loader />
    if (error || !data) return <p>Error fetching Data</p>

    return (<Container>
        <h1>{data.name}</h1>
                <Tags>
                    {data.muscleGroups.map(muscle => <Tag key={muscle}>
                        <span>{muscle}</span>
                    </Tag>)}

                </Tags>
        <div>
            {data && <Card>
                <h2>Instructions</h2>
                <ol>
                    {data.instructions.map(instruction => <li key={instruction}>{instruction}</li>)}
                </ol>
            </Card>}
        </div>
    </Container>
    )
}

const Tags = styled.div`
display: flex;
width: 100%;
padding-top: 20px;
gap: 10px;
flex-wrap: wrap;
font-size: 14px;
margin-bottom: 20px;`

const Tag = styled.span`
background: linear-gradient(to top, #292830, #232227);
display: flex;
gap: 10px;
color: gray;
font-size: 14px;
align-items: center;
padding: 5px 10px;
border-radius: 50px;`

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