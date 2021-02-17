import { Typography } from '@material-ui/core';
import React, { useState } from 'react'
import "react-image-gallery/styles/css/image-gallery.css";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import Image from "next/image";
import useSWR from "swr";
import Error from 'next/error';

const Menu: React.FC<MenuProps> = ({ brandid, brandType }) => {
  const [currentImg, setCurrentImg] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const url = `/api/readfiles?brandid=${brandid}&type=${brandType}`
  const fetcher = (url: RequestInfo) => fetch(url).then(r => r.json())

  const { data, error } = useSWR(url, fetcher)
  if (data?.statusCode || error) return <Error statusCode={data.statusCode} />
  if (!data) return <div>Loading...</div>

  function renderPic(imgs: Array<string>) {
    return (
      <div style={{
        textAlign: 'center',
        maxWidth: '100%', height: 'auto', cursor: "pointer",
      }}>
        {imgs &&
          imgs.map((img, idx) => <Image
            key={idx}
            src={img}
            alt={String(idx)}
            layout="responsive"
            width={0}
            height={0}
            onClick={() => {
              setIsOpen(true);
              setCurrentImg(img);
            }} />)}
      </div>
    );
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

export default Menu