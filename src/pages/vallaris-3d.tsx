import Head from "next/head";
import React, { Fragment, useEffect, useMemo } from "react";
import maplibreGl from "maplibre-gl";
import { Threebox } from "threebox-plugin";
import style from "../styles/common.module.css";
import "maplibre-gl/dist/maplibre-gl.css";

declare global {
  interface Window {
    tb: any;
  }
}

const styleId = "620adce2d628441e8a84f94c";

const Vallaris3D = () => {
  useEffect(() => {
    const initMap = new maplibreGl.Map({
      container: "map",
      style: `https://edu.vallarismaps.com/core/api/styles/1.0-beta/styles/${styleId}?api_key=${process.env.NEXT_PUBLIC_VALLARIS_APIKEY}`,
      center: [102.81454458117358, 16.442074321784993],
      zoom: 18,
      pitch: 60,
      bearing: 45,
    });
    window.tb = new Threebox(initMap, initMap.getCanvas().getContext("webgl"), {
      defaultLights: true,
    });

    initMap.once("style.load", async (e) => {
      const featureData: any = await fetch(
        "https://edu.vallarismaps.com/core/api/features/1.0/collections/620af325d628441e8a84f94e/items?api_key=8KNsgtA4euxsga8qoH1hUdm9dTL7kKgaaE1tECKS7NuAqrtrZf3dhliI0TyNPzaF"
      )
        .then((rs) => rs.json())
        .then((rs) => rs);
      console.log(featureData);
      e.target.addLayer({
        id: "custom_layer",
        type: "custom",
        renderingMode: "3d",
        onAdd: function (map: any, mbxContext: any) {
          featureData.features.map((f: any) => {
            const options = {
              obj: f.properties["model-link"],
              type: "gltf",
              scale: 1,
              units: "meters",
              rotation: { x: 90, y: 0, z: 0 }, //default rotation
              anchor: "center",
            };
            window.tb.loadObj(options, function (model: any) {
              let model3d = model.setCoords(f.geometry.coordinates);
              window.tb.add(model3d);
            });
          });
        },
        render: function (gl: any, matrix: any) {
          window.tb.update();
        },
      });
    });
    return () => {
      initMap.remove();
    };
  }, []);
  return (
    <Fragment>
      <Head>
        <title>KKU-Map | Render 3D Map</title>
        <meta name="description" content="Render 3D map by Threebox-plugin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="map" className={style["map-full-view"]} />
    </Fragment>
  );
};

export default Vallaris3D;
