import { Typography } from '@material-ui/core';
import React, { useState } from 'react'
import "react-image-gallery/styles/css/image-gallery.css";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import Image from "next/image";
import useSWR from "swr";
import Error from 'next/error';

export default function Menu({ brandid, brandType }) {
  const [currentImg, setCurrentImg] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // const fetcher = (url) => fetch(url).then((res) => res.json());
  const url = `/api/readfiles?brandid=${brandid}&type=${brandType}`

  const fetcher = url => fetch(url).then(r => r.json())

  const { data, error } = useSWR(url, fetcher)
  if (data?.statusCode || error) return <Error statusCode={data.statusCode} />
  if (!data) return <div>Loading...</div>
  const renderPic = (imgs) => {
    return (
      <div style={{
        textAlign: '-webkit-center',
        maxWidth: '100%', height: 'auto', cursor: "pointer",
      }}>
        {imgs &&
          imgs.map((img, idx) =>
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
