import '../App.css';

import { CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Slide, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import Image from '../assets/background.png';
import cerada from '../assets/cerada.png';
import majica from '../assets/majica.png';
import maskaZaMobitel from '../assets/maska-za-mobitel.png';
import pleksiglas from '../assets/pleksiglas.png';
import poster from '../assets/poster.png';
import promoMaterijal from '../assets/promo-materijal.png';
import slikaNaPlatnu from '../assets/slika-na-platnu.png';
import solja from '../assets/solja.png';
import tapeta from '../assets/tapeta.png';
import zidneNaljepnice from '../assets/zidne-naljepnice.png';

axios.defaults.withCredentials = true;
let firstRender = true;

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage: `url(${Image})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
}));

function Welcome() {
  const classes = useStyles();
  const [user, setUser] = useState();

  const refreshToken = async () => {
    const res = await axios
      .get("http://localhost:5000/api/refresh", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };
  const sednRequest = async () => {
    const res = await axios
      .get("http://localhost:5000/api/user", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    if (firstRender) {
      firstRender = false;
      sednRequest().then((data) => setUser(data.user));
    }
    let interval = setInterval(() => {
      refreshToken().then((data) => setUser(data.user));
    }, 1000 * 29);
    return () => clearInterval(interval);
  }, []);
  function HideOnScroll() {
    const trigger = useScrollTrigger();
    return (
      <Slide in={!trigger}>
        <div>Hello</div>
      </Slide>
    );
  } HideOnScroll();
  const itemData = [
    {
      img: tapeta,
      title: 'Tapeta',
    },
    {
      img: majica,
      title: 'Majica',
    },
    {
      img: solja,
      title: 'Šolja',
    },
    {
      img: pleksiglas,
      title: 'Pleksiglas',
    },
    {
      img: zidneNaljepnice,
      title: 'Zidne naljepnice',
    },
    {
      img: poster,
      title: 'Poster',
    },
    {
      img: slikaNaPlatnu,
      title: 'Slika na platnu',
    },
    {
      img: cerada,
      title: 'Cerada i mesh platno',
    }, {
      img: promoMaterijal,
      title: 'Promo materijal',
    },
    {
      img: maskaZaMobitel,
      title: 'Maska za mobitel',
    },
  ];
  return (
    <div>{user && <div className={classes.root}>
      <CssBaseline />
      <div><Box sx={{ px: 8, pt: 4 }}>
        <div>
          <h2 align="right">Korisnik: {user.name}</h2><br /></div></Box>
        <div id="wrapper" class="clearfix">
          <div id="first">
            <Box sx={{ pl: 8, pr: 4, pt: 4, height: 450, overflowY: 'scroll' }}>
              <ImageList variant="masonry" cols={3} gap={8}>
                {itemData.map((item) => (
                  <ImageListItem key={item.img}>
                    <img
                      src={`${item.img}?w=248&fit=crop&auto=format`}
                      srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      alt={item.title}
                      loading="lazy"
                    />
                    <ImageListItemBar
                      title={item.title}
                      actionIcon={
                        <IconButton
                          sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                          aria-label={`info about ${item.title}`}
                        />
                      }
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Box></div></div>
        <div id="second">
          <Box sx={{ height: '450' }}>
            <Typography><br />
              <ul><b>Nudimo usluge grafičkog dizajna i štampe svih vrsta materijala poput:</b><br />
                <li>Letaka, cjenovnika, kataloga, vizit  kartica;</li>
                <li>Citylight plakata i billboarda;</li>
                <li>Prozorska grafika;</li>
                <li>Brendiranje automobila;</li>
                <li>Majica (sito štampa i DTG);</li>
                <li>Cerada, roll-up bannera, mesh platna;</li>
                <li>Štampa na pleksiglasu;</li>
                <li>Štampa na šoljama, puzzlama, kamenu;</li>
                <li>Štampa tapeta (papir i folija);</li>
                <li>Štampa zidnih naljepnica;</li>
                <li>Štampa promo materijala.</li>
              </ul>
            </Typography>
          </Box></div></div>
    </div>
    }</div>
  );

}
export default Welcome;
