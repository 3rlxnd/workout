import { faDumbbell, faRankingStar, faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function Footer() {
    const router = useRouter()
    console.log(router);
    
    return (
        <Container>
            <Navigation>
                <Link href={'/'}><FontAwesomeIcon icon={faDumbbell} fontSize={30} color={router.route === '/' ? 'black' : 'gray'}/></Link>
                <Link href={'/workouts'}><FontAwesomeIcon icon={faStopwatch} fontSize={30} color={router.route === '/workouts' ? 'black' : 'gray'}/></Link>
                <Link href={'/statistics'}><FontAwesomeIcon icon={faRankingStar} fontSize={30} color={router.route === '/statistics' ? 'black' : 'gray'}/></Link>
            </Navigation>
        </Container>
    )
}

const Container = styled.footer`
position: fixed;
width: 100%;
bottom: 0;
padding: 30px;
display: flex;
justify-content: center;
margin-top: 40px;
// background: linear-gradient(to top, 
//     rgba(255, 255, 255, 1) 0%,     /* Solid white at the bottom */
//     rgba(255, 255, 255, 0.9) 20%,  /* Very light white */
//     rgba(255, 255, 255, 0.7) 50%,  /* Slightly more transparent */
//     rgba(255, 255, 255, 0.4) 80%,  /* Even more transparent */
//     rgba(255, 255, 255, 0) 100%    /* Fully transparent at the top */
//   );
background-color: white
  `

const Navigation = styled.nav`
display: flex;
gap: 40px;`

