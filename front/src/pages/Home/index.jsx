import Menu from "../../components/Menu";
import { Container, ImageListItem, Grid } from "@mui/material";
import GeneralUserData from "../../components/User/Profile/GeneralUserData";
import DashboardCompras from "../../components/Dashboard/Compras/DashboardCompras";

const Home = () =>{
  const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1589182337358-2cb63099350c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
      title: 'Breakfast',
    },
    {
      img: 'https://images.unsplash.com/photo-1557015735-a762a259d9af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGxhbmElMjBhbHBhY2F8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      title: 'Burger',
    },
    {
      img: 'https://images.unsplash.com/photo-1552474705-dd8183e00901?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YWxwYWNhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      title: 'Camera',
    },
    {
      img: 'https://images.unsplash.com/photo-1616252993439-7e1924e5c29b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGFscGFjYSUyMGxhbmF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      title: 'Coffee',
    },
    {
      img: 'https://images.unsplash.com/photo-1636371449439-e19a1b5a25b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      title: 'Honey',
    },
    {
      img: 'https://images.unsplash.com/photo-1474904200416-6b2b7926f26f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      title: 'Hats',
    }
]
  
  return(
    <Container class="container">
      <h1>Datos generales</h1>

      <GeneralUserData/>

      <Grid container spacing={1} sx={{ marginTop:'20px' }}>
        {itemData.map((item,i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
                <ImageListItem key={item.img}>
                <img
                    src={`${item.img}fit=crop&auto=format`}
                    alt={item.title}
                />
                </ImageListItem>
            </Grid>
        ))}
      </Grid>

    </Container>
  )
}

export default Home;
