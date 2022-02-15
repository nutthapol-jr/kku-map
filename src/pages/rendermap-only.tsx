import Head from "next/head";
import React, { Fragment, useEffect } from "react";
import maplibreGl from "maplibre-gl";
import style from "../styles/common.module.css";
import "maplibre-gl/dist/maplibre-gl.css";

const styleId = "620adce2d628441e8a84f94c";

const RenderMapOnly = () => {
  useEffect(() => {
    const initMap = new maplibreGl.Map({
      container: "map",
      style: `https://edu.vallarismaps.com/core/api/styles/1.0-beta/styles/${styleId}?api_key=${process.env.NEXT_PUBLIC_VALLARIS_APIKEY}`,
      center: [102.81780287062384, 16.46216988451211],
      zoom: 13,
    });
    return () => {
      initMap.remove();
    };
  }, []);

  return (
    <Fragment>
      <Head>
        <title>KKU-Map | Render map only</title>
        <meta
          name="description"
          content="Render map only from Vallaris style"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="map" className={style["map-full-view"]} />
    </Fragment>
  );
};

export default RenderMapOnly;
