import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
// import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment } from "react";
// <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />

interface IExample {
  id: string;
  title: string;
  description: string;
  path: string;
  img?: string;
}

const exampleList: IExample[] = [
  {
    id: "rendermap-only",
    title: "Render Map only",
    description: "Render map by style from Vallaris style",
    path: "/rendermap-only",
  },
  {
    id: "render-3d",
    title: "Render 3D Map",
    description: "Render 3D map by Threebox-plugin",
    path: "/render-3d",
  },
  {
    id: "vallaris-3d",
    title: "vallaris 3D Map",
    description: "Render 3D map by vallaris",
    path: "/vallaris-3d",
  },
];

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <Fragment>
      <Head>
        <title>KKU-Map</title>
        <meta name="description" content="Prototype for render KKU-Map" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="md" sx={{ paddingTop: 2 }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h5">Example for KKU Map</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          {exampleList.map((ex) => (
            <Grid id={`grid-${ex.id}`} key={ex.id} item xs={4}>
              <Card>
                <CardActionArea onClick={() => router.push(ex.path)}>
                  <CardMedia
                    component={"img"}
                    height={150}
                    alt={`temp-${ex.id}`}
                    src={ex.img ? ex.img : ""}
                  />
                  <CardContent>
                    <Typography variant="h6">{ex.title}</Typography>
                    <Typography variant="body2">{ex.description}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Home;
