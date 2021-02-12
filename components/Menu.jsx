import { Typography } from '@material-ui/core';
import React, { useState } from 'react'
import "react-image-gallery/styles/css/image-gallery.css";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import Image from "next/image";
import useSWR from "swr";

export default function MenuNew(props) {
  const [currentImg, setCurrentImg] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  let brandid = props.brandid
  let type = props.type

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const url = `/api/readfiles?brandid=${brandid}&type=${type}`
  const { data } = useSWR(url, fetcher)

  const renderPic = (imgs) => {
    return (
      <div style={{
        textAlign: '-webkit-center',
        maxWidth: '100%', height: 'auto', cursor: "pointer",
      }}>
        {imgs ?
          data.map((img, idx) =>
            <Image
              key={idx}
              src={img}
              alt={idx}
              layout="responsive"
              width={0}
              height={0}
              onClick={() => {
                setIsOpen(true)
                setCurrentImg(img)
              }}
            />)
          :
          <Typography variant="h4">Now loading...</Typography>
        }
      </div>
    )
  }

  return (
    <>
      {isOpen && (
        <Lightbox
          mainSrc={currentImg}
          onCloseRequest={() => setIsOpen(false)}
        />
      )}
      {renderPic(data)}
    </>
  );
}
