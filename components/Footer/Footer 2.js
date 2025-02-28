import { faDumbbell, faLayerGroup, faRankingStar, faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function Footer() {
    const router = useRouter()
    
    return (
        <Container>
            <Navigation>
                <Link href={'/'}><FontAwesomeIcon icon={faLayerGroup} fontSize={25} color={router.route === '/' ? 'lightblue' : '#5B5A60'}/></Link>
                <Link href={'/workouts'}><FontAwesomeIcon icon={faDumbbell} fontSize={25} color={router.route === '/workouts' ? 'lightblue' : '#5B5A60'}/></Link>
                {/* <Link href={'/statistics'}><FontAwesomeIcon icon={faRankingStar} fontSize={30} color={router.route === '/statistics' ? 'black' : 'gray'}/></Link> */}
            </Navigation>
        </Container>
    )
}

const Container = styled.footer`
position: fixed;
width: 100%;
bottom: 0;
padding: 20px;
display: flex;
justify-content: center;
margin-top: 40px;
background-color: #0C0B10;
border-top: 0.5px solid rgb(25, 25, 25);
`

const Navigation = styled.nav`
display: flex;
gap: 40px;`
