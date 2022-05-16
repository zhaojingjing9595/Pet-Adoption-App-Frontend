import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function ImageGallery() {
  return (
      <ImageList
          className="mx-auto"
      sx={{ width: 950, height: 625 }}
      variant="quilted"
      cols={4}
      rowHeight={121}
    >
      {itemData.map((item) => (
        <ImageListItem
          key={item.img}
          cols={item.cols || 1}
          rows={item.rows || 1}
        >
          <img
            {...srcset(item.img, 121, item.rows, item.cols)}
            alt={item.title}
            loading="lazy"
          />
          </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: "https://res.cloudinary.com/dbft8oafm/image/upload/v1651562089/e2oxlgbbkvdgfni4p4tu.jpg",
    title: "Cheeto",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://res.cloudinary.com/dbft8oafm/image/upload/v1651561702/hutwteiaj2euml0qxgfr.jpg",
    title: "Bella",
    cols: 2,
  },
  {
    img: "https://res.cloudinary.com/dbft8oafm/image/upload/v1651560547/os5omhl7xhpdrrnvadvx.jpg",
    title: "Snow H",
    rows: 1,
    cols: 1,
  },
  {
    img: "https://res.cloudinary.com/dbft8oafm/image/upload/v1651561936/ve6ovdxnsdfxylghgdue.jpg",
    title: "Oscar",
  },

  {
    img: "https://res.cloudinary.com/dbft8oafm/image/upload/v1652099534/nu4nhyfawnue6f49afk1.jpg",
    title: "Amuko",
    rows: 2,
    cols: 1,
  },
  {
    img: "https://res.cloudinary.com/dbft8oafm/image/upload/v1651560156/ax8jrolbqvmeudvhofix.jpg",
    title: "Brad",
  },
  {
    img: "https://res.cloudinary.com/dbft8oafm/image/upload/v1651561402/zxqbxobe18jmpebwvtds.jpg",
    title: "Lucky Charm",
  },
  {
    img: "https://res.cloudinary.com/dbft8oafm/image/upload/v1651561335/k1kxwxbr404ovlhdenxb.jpg",
    title: "Pebble",
    rows: 2,
    cols: 1,
  },
  {
    img: "https://res.cloudinary.com/dbft8oafm/image/upload/v1651560476/b9amq8umyrybj1zhmnlu.jpg",
    title: "Fig",
  },
  {
    img: "https://res.cloudinary.com/dbft8oafm/image/upload/v1651561659/aw9lury5jdstjlcgvrvu.webp",
    title: "Spotty",
  },
  {
    img: "https://res.cloudinary.com/dbft8oafm/image/upload/v1651605986/rns9qgu6m1wvw2cccq6z.jpg",
    title: "Rajah",
  },
  {
    img: "https://res.cloudinary.com/dbft8oafm/image/upload/v1651561727/fp1isw08qtuxzwqtr8vt.jpg",
    title: "Little Zebra",
    rows: 1,
    cols: 2,
  },
  {
    img: "https://res.cloudinary.com/dbft8oafm/image/upload/v1652191677/vwfai2fuhnlcwx6lbx6p.jpg",
    title: "Pipi",
  },
];
