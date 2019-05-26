import React from "react"
import styled, { keyframes } from "styled-components"
import Layout from "../components/layout"
import noInternetLogo from "../images/icons/nointernet.png"
import { navigate } from "gatsby"

const NoInternet = () => (
<Layout>

<FlexContainer>

<Col>
<h1>No Internet Connection!</h1>
<h2>Your Internet Connection Appears to be Offline.</h2>
<RefreshButton onClick={()=>{navigate("/")}} >Refresh</RefreshButton>
</Col>
<Col>
<CenteredImage
src={noInternetLogo}
width={230}
height={230}
alt='no internet logo'
/>

</Col>
</FlexContainer>
      
    
    </Layout>

)

const FlexContainer = styled.div`
    display: flex;
    align-items: center;
    height:100%;
    width:100%;
    flex-direction: row;
    justify-content: center;
    

`
const RefreshButton = styled.button`
border-radius:1.8rem;
font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
background-color:white;
font-size:24px;
color:black;
border-color:black;
padding:0.6rem;
font-weight:bold;
min-width:200px;
border-width:2px;

    :hover{
        color:white;
        background-color:black;
    }
    transition: 0.2s;
`
const CenteredImage = styled.img`
max-width:100%;
@media (max-width: 1200px) {
   visibility:hidden;
}
`
const Col = styled.div`
margin: 0 0 10px 0;
flex: 1 1 auto; 
@media (max-width: 768px) {
    .flex-grid {
      display: block;
    }
}
`
export default NoInternet
