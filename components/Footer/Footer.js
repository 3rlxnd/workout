import Link from "next/link";

export default function Footer() {
    return (
        <footer>
            <nav>
                <Link href={'/'}>Exercises</Link>
                <Link href={'/workouts'}>Workouts</Link>
            </nav>
        </footer>
    )
}
