import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import db from "../firebase"

export const Details = (props) => {
    const { id } = useParams();
    const [detailData, setDetailData] = useState({});

    useEffect(() => {
        db.collection("movies")
            .doc(id)
            .get()
            .then((doc) => {
            if (doc.exists) {
                setDetailData(doc.data()); 
            } else {
                console.log("no such document in firebase")
            }
        }).catch((error) => {
            console.log("Error getting the document:", error)
        });
}, [id]);
    return (
        <Container>
            <Background>
                <img src={detailData.backgroundImg} alt={detailData.title} />
            </Background>

            <ImageTitle>
                <img src={detailData.titleImg} alt={detailData.title} />
            </ImageTitle>

            <ContentMeta>
                <Controls>
                    <Player>
                        <img src="/images/play-icon-black.png" alt="" />
                        <span>Play</span>
                    </Player>

                    <Trailer>
                        <img src="/images/play-icon-white.png" alt="" />
                        <span>Trailer</span>
                    </Trailer>

                    <AddList>
                        <span />
                        <span />
                    </AddList>

                    <GroupMatch>
                        <div>
                            < img src="/images/group-icon.png" alt="" />
                        </div>
                    </GroupMatch>
                </Controls>

                <SubTitle>
                    {detailData.subTitle}
                </SubTitle>

                <Description>
                    {detailData.description}
                </Description>
            </ContentMeta>
        </Container>
    )
}

const Container = styled.div`
 position:relative;
 min-height: calc(100vh-250px);
 overflow-x: hidden;
 display: block;
 top: 72px;
 padding: 0 calc(3.5vw +5px);
`;

const Background = styled.div`
left: 0px;
opacity: 0.8;
position: fixed;
right: 0px;
top: 0px;
z-index: -1;

img {
    width: 100vw;
    height: 100vh;

    @media (max-width: 768px) {
        width: initial;
    }
}
`;

const ImageTitle = styled.div`
align-items: flex-end;
display: flex;
-webkit-box-pack: start;
justify-content: flex-start;
margin: 0 auto;
height: 30vw;
min-height: 170px;
padding-bottom: 24px;
width: 100%;

img {
    max-width: 600px;
    min-width: 200px;
    width: 35vw;
}
`;

const ContentMeta = styled.div`
max-width: 874px; 

`;

const Controls = styled.div`
align-items: center;
display: flex;
flex-flow: row nowrap;;
margin: 24px 0px;
min-height: 56px;
`;

const Player = styled.button`
font-style: 15px;
margin-left: 65px;
padding: 0px 24px;
height: 56px;
border-radius: 4px;
align-items: center;
cursor: pointer;
display: flex;
justify-content: center;
letter-spacing: 1.8px;
text-align: center;
text-transform: uppercase;
background: rgb(249, 249, 249);
border: none;
color: rgb(0, 0,0);

img {
    width: 32px;
}

&:hover {
    background: rgb(198, 198, 198); 
}

@media (max-width: 768px) {
    height: 45px;
    padding: 0 12px;
    font-size: 12px;
    margin-left: 40px;


    img{
        width: 25px;
    }
}
`;

const Trailer = styled(Player)`
background: rgb(0, 0, 0, 0.3);
border: 1px solid rgb(249, 249, 249);
color: rgb(249, 249, 249);
margin-left: 30px; 
`;

const AddList = styled.div`
 margin-left: 16px;
 height: 44px;
 width: 44px;
 display: flex;
 justify-content: center;
 align-items: center;
 background: rgba(0, 0, 0, 0.6);
 border-radius: 50%;
 border: 2px solid white;
 cursor: pointer;

 span {
     display: inline-block;
     background-color: rgb(249, 249, 249);

     &:first-child {
         height: 2px;
         transform: translate(1px, 0px) rotate(0deg);
         width: 16px;   
     }

     &:nth-child(2) {
         height: 16px;
         transform: translate(-8px) rotate(0deg);
         width: 2px;
     }
 } 
`;

const GroupMatch = styled.div`
height: 44px;
width: 44px;
border-radius: 50%;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
background: white;
margin-left: 10px;


div {
    height: 40px;
    width: 40px;
    background: rgb(0, 0, 0);
    border-radius: 50px;

    img {
        width: 100%;
    }
}
`;

const SubTitle = styled.div`
 color: rgb(249, 249, 249);
 font-size: 15px;
 min-height: 26px;
 margin-left: 60px;

 @media (max-width: 768px) {
     font-size: 12px;
     margin-left: 40px;
 }
 `;

const Description = styled.div`
line-height: 1.4;
font-size: 20px;
padding: 16px 0px;
color: (249, 249, 249);
margin-left: 60px;

@media (max-width: 768px) {
    font-size: 12px;
    margin-left: 40px;

}
`;