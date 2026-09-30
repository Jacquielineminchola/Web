*{
  box-sizing:border-box;
  margin:0;
  padding:0;
}


:root{
  --blue:#0758a9;
  --blue2:#168be0;
  --navy:#0c2f5c;
  --ink:#102f59;
  --soft:#f2f8fd;
  --line:#d9e7f4;
  --header-h:82px;
}


html{
  scroll-behavior:smooth;
  scroll-padding-top:calc(var(--header-h) + 8px);
}


body{
  font-family:"Montserrat",Arial,sans-serif;
  color:var(--ink);
  background:#fff;
  line-height:1.55;
}


a{
  text-decoration:none;
  color:inherit;
}


img{
  max-width:100%;
  height:auto;
  display:block;
}


.container{
  width:min(1180px,92%);
  margin:auto;
}


/* Enlace "Saltar al contenido" */

.skip-link{
  position:absolute;
  left:-9999px;
  top:0;
  z-index:2000;

  padding:10px 16px;

  background:#fff;
  color:var(--blue);

  font-weight:700;

  border-radius:0 0 8px 0;
}

.skip-link:focus{
  left:0;
}


/* Foco visible para teclado */

a:focus-visible,
button:focus-visible{
  outline:3px solid var(--blue2);
  outline-offset:3px;
  border-radius:4px;
}

.hero a:focus-visible,
.site-footer a:focus-visible{
  outline-color:#fff;
}


/* =========================================
   HEADER
