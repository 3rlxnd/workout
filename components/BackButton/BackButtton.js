import { useRouter } from "next/router"

export default function BackButtton() {
    const router = useRouter()
    return (
        <button onClick={() => router.back()}>Back</button>
    )
}
