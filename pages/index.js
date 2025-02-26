import ExerciseList from "@/components/ExerciseList/ExerciseList";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";

export default function HomePage() {
  return (<>
    <div>
      <h1>Exercises</h1>
      <ExerciseList />
    </div>
    <Footer/>
    </>
  );
}
