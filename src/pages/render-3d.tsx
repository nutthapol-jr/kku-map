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

const Render3D = () => {
  useEffect(() => {
    const initMap = new maplibreGl.Map({
      container: "map",
      style: `https://edu.vallarismaps.com/core/api/styles/1.0-beta/styles/${styleId}?api_key=${process.env.NEXT_PUBLIC_VALLARIS_APIKEY}`,
      center: [102.81454458117358, 16.442074321784993],
      zoom: 18,
      pitch: 60,
      bearing: 45,
    });

    initMap.once("style.load", (e) => {
      window.tb = new Threebox(
        e.target,
        e.target.getCanvas().getContext("webgl"),
        {
          defaultLights: true,
        }
      );
      e.target.addLayer({
        id: "custom_layer",
        type: "custom",
        renderingMode: "3d",
        onAdd: function (map: any, mbxContext: any) {
          const options = {
            obj: "./models/toon-bus.glb",
            type: "gltf",
            scale: 1,
            units: "meters",
            rotation: { x: 90, y: 0, z: 0 }, //default rotation
            anchor: "center",
          };

          window.tb.loadObj(options, function (model: any) {
            let soldier = model.setCoords([
              102.81454458117358, 16.442074321784993,
            ]);
            window.tb.add(soldier);
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

export default Render3D;
