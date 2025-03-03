import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Loader from '../Loader/Loader'

export default function ExerciseDetails() {
    const router = useRouter()
    const { id } = router.query
    const { data, error, isLoading } = useSWR(`/api/exercises/${id}`)

    if(isLoading) return <Loader/> 
    if(error || !data) return <p>Error fetching Data</p>

    return (<>
        <h1>{data.name}</h1>
        <div>
            {data && <div>
                <ul>
                    {data.muscleGroups.map(muscle => <li key={muscle}>{muscle}</li>)}
                </ul>
                <ol>
                    {data.instructions.map(instruction => <li key={instruction}>{instruction}</li>)}
                </ol>
            </div>}
        </div>
    </>
    )
}
