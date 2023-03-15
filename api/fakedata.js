const Product = require("./models/Product");
const User = require("./models/User");

User.truncate({ cascade: true, restartIdentity: true });
Product.truncate({ cascade: true, restartIdentity: true });

const fakeDataProducts = [
  {
    name: "Guitarra Criolla clásica Fonseca para diestros",
    description:
      "Está diseñada para aficionados y profesionales. Con este instrumento descubrirás nuevos acordes, entonarás tus canciones y disfrutarás de la vida musical. La tapa de abeto genera un tono brillante y claro, incluso en los registros más agudos.",
    price: 90503,
    image: [
      "https://http2.mlstatic.com/D_NQ_NP_938847-MLA46740504634_072021-O.webp",
      "https://http2.mlstatic.com/D_NQ_NP_679109-MLA46740426975_072021-O.webp",
      "https://http2.mlstatic.com/D_NQ_NP_631154-MLA46740504569_072021-O.webp",
    ],
    stock: 15,
    ranking: [3, 2, 5, 4, 4, 1, 5, 4, 3],
  },

  {
    name: "Guitarra Acústica para diestros",
    description:
      "Las cuerdas de metal se caracterizan por su bajo estiramiento y resistencia a la corrosión y abrasión. Son más duraderas, sólidas y generan un sonido brillante y claro.",
    price: 78657,
    image: [
      "https://http2.mlstatic.com/D_NQ_NP_938847-MLA46740504634_072021-O.webp",
      "https://http2.mlstatic.com/D_NQ_NP_679109-MLA46740426975_072021-O.webp",
      "https://http2.mlstatic.com/D_NQ_NP_631154-MLA46740504569_072021-O.webp",
    ],
    stock: 8,
    ranking: [5, 2, 5, 1, 2, 1, 3, 2, 4],
  },
  {
    name: "Guitarra eléctrica Cort",
    description:
      "Fabricada en meranti con acabado de poro abierto. El largo de escala es de 25.5  Incluye 2 micrófonos humbucker. Controles de selector de micrófonos, tono y volumen.",
    price: 95018,
    image: [
      "https://http2.mlstatic.com/D_NQ_NP_781807-MLA48678831566_122021-O.webp",
      "https://http2.mlstatic.com/D_NQ_NP_726394-MLA48678831565_122021-O.webp",
      "https://http2.mlstatic.com/D_NQ_NP_710008-MLA48678881087_122021-O.webp",
    ],
    stock: 11,
    ranking: [5, 5, 3, 3, 4, 2],
  },
  {
    name: "Guitarra Criolla clásica natural ébano brillante",
    description:
      "Está diseñada para aficionados y profesionales. Con este instrumento descubrirás nuevos acordes, entonarás tus canciones y disfrutarás de la vida musical.",
    price: 175366,
    image: [
      "https://http2.mlstatic.com/D_NQ_NP_835210-MLA53159813965_012023-O.webp",
      "https://http2.mlstatic.com/D_NQ_NP_736314-MLA53159875708_012023-O.webp",
      "https://http2.mlstatic.com/D_NQ_NP_727249-MLA53159813967_012023-O.webp",
    ],
    stock: 7,
    ranking: [1, 1, 5, 4, 4, 3, 3, 4],
  },
  {
    name: "Guitarra Criolla clásica infantil",
    description:
      "Con esta guitarra infantil Fonseca aprender a componer sonidos es fácil y divertido. Su diseño y estilo se adaptan para potenciar la capacidad creativa musical.",
    price: 45397,
    image: [
      "https://http2.mlstatic.com/D_NQ_NP_835210-MLA53159813965_012023-O.webp",
      "https://http2.mlstatic.com/D_NQ_NP_736314-MLA53159875708_012023-O.webp",
      "https://http2.mlstatic.com/D_NQ_NP_727249-MLA53159813967_012023-O.webp",
    ],
    stock: 7,
    ranking: [1, 1, 5, 4, 4, 3, 3, 4],
  },

  {
    name: "Violín 1/4 para estudiante",
    description: "Arco incluído. Estuche incluído. Ideal para estudio",
    price: 25397,
    image: [
      "https://http2.mlstatic.com/D_NQ_NP_990339-MLA31063591385_062019-O.webp",
    ],
    stock: 20,
    ranking: [4, 4, 4, 3, 5, 3, 5, 5, 5],
  },
  {
    name: "Resina para Violín",
    description:
      "Resina Premium de primera calidad. Baja generación de polvo, fabricada utilizando la fórmula original Kaplan.    ",
    price: 25397,
    image: [
      "https://http2.mlstatic.com/D_NQ_NP_681348-MLA44632292776_012021-O.webp",
      "https://http2.mlstatic.com/D_NQ_NP_760399-MLA44632309371_012021-O.webp",
    ],
    stock: 20,
    ranking: [4, 4, 4, 3, 5, 3, 5, 5, 5],
  },
  {
    name: "Violín 1/2 para estudiante",
    description: "Arco incluído. Estuche incluído. Ideal para estudio",
    price: 28397,
    image: [
      "https://http2.mlstatic.com/D_NQ_NP_784750-MLA31353310989_072019-O.webp",
    ],
    stock: 23,
    ranking: [4, 4, 4, 3, 5, 3, 5, 5, 5],
  },
  {
    name: "Violín 4/4 Cremona",
    description:
      "La serie 175 de Cremona permite ahora contar con un instrumento de alta calidad, tallado a mano y ajustado de fábrica, a un valor excepcional. Posee tapa sólida de pino curvada a mano y perfil incrustado. Además de microafinadores de alta calidad, arco octogonal de madera brasileña. Incluye estuche de calidad para mayor protección y confort al momento de su transporte.",
    price: 168458,
    image: [
      "https://http2.mlstatic.com/D_NQ_NP_846644-MLA31114055013_062019-O.webp",
      "https://http2.mlstatic.com/D_NQ_NP_716300-MLA31114033994_062019-O.webp",
      "https://http2.mlstatic.com/D_NQ_NP_841911-MLA31114053033_062019-O.webp",
    ],
    stock: 23,
    ranking: [4, 4, 4, 3, 5, 3, 5, 5, 5],
  },
  {
    name: "Violín 1/2 Stradella con resina",
    description:
      "La serie MV1411 de Stradella, es especial para comenzar a estudiar o para aquellos que buscan un instrumento fácil de tocar, bien construido, y de sencillo mantenimiento. Tapa de Pino macizo, fondo de Maple (Arce)",
    price: 168458,
    image: [
      "https://http2.mlstatic.com/D_NQ_NP_701415-MLA31833401741_082019-O.webp",
      "https://http2.mlstatic.com/D_NQ_NP_769096-MLA31833388867_082019-O.webp",
      "https://http2.mlstatic.com/D_NQ_NP_703413-MLA31833408136_082019-O.webp",
    ],
    stock: 17,
    ranking: [5, 4, 2, 3, 5, 3, 2, 5, 3],
  },

  {
    name: "Trompeta Knight Jbtr-300",
    description:
      "Tropeta Knight, hecho de latón amarillo. Afinado en Si bemol (Sib). Tiene un diametro de campana de 12,5 cm. Pistón de cuproniquel y plata.",
    price: 78458,
    image: [
      "https://http2.mlstatic.com/D_NQ_NP_743786-MLA49373710668_032022-O.webp",
      "https://http2.mlstatic.com/D_NQ_NP_920747-MLA44132107546_112020-O.webp",
      "https://http2.mlstatic.com/D_NQ_NP_685930-MLA49373567990_032022-O.webp",
    ],
    stock: 17,
    ranking: [5, 4, 5, 3, 1, 3, 2, 5, 5],
  },
  {
    name: "Trompeta Lincoln",
    description:
      "Tropeta Lincoln, terminación en laca dorada, cuerpo yellow brass, 3 pistones de acero inoxidable. Afinado en Si bemol (Sib). Tiene un diametro de campana de 12,5 cm. Incluye un estuche rígido forrado en cuero en su exterior y revestido de pana acolchada en su interior, boquilla C7, guantes y paño de limpieza.",
    price: 98551,
    image: [
      "https://http2.mlstatic.com/D_NQ_NP_735743-MLA44760311337_012021-O.webp",
      "https://http2.mlstatic.com/D_NQ_NP_737798-MLA51091263337_082022-O.webp",
      "https://http2.mlstatic.com/D_NQ_NP_732458-MLA48575444477_122021-O.webp",
    ],
    stock: 17,
    ranking: [5, 5, 5, 3, 5, 3, 5, 5, 5],
  },
  {
    name: "Trompeta Jupiter",
    description:
      "La trompeta Jupiter JTR-500Q pertenece a la gama más económico de la serie de estudio Jupiter. Esta serie es muy recomendada para estudiantes o amateurs, renovada y actualizada a las últimas demandas de los alumnos de viento metal. Este mismo modelo está disponible con acabado plateado.Ambos modelos, contienen tudel y bomba general de cobre.",
    price: 248579,
    image: [
      "https://http2.mlstatic.com/D_NQ_NP_714395-MLA50435892990_062022-O.webp",
      "https://http2.mlstatic.com/D_NQ_NP_784425-MLA50435892992_062022-O.webp",
      "https://http2.mlstatic.com/D_NQ_NP_896808-MLA50435892995_062022-O.webp",
    ],
    stock: 16,
    ranking: [5, 5, 5, 3, 5, 3, 5, 5, 5],
  },

  {
    name: "Ukelele Soprano",
    description: "Ukelele Tamaño Soprano con Funda Acolchada.",
    price: 14579,
    image: [
      "https://http2.mlstatic.com/D_NQ_NP_991627-MLA31047170242_062019-O.webp",
      "https://http2.mlstatic.com/D_NQ_NP_773688-MLA31047170251_062019-O.webp",
      "https://http2.mlstatic.com/D_NQ_NP_703751-MLA41744089220_052020-O.webp",
    ],
    stock: 36,
    ranking: [4, 4, 5, 2, 4, 2, 5, 5, 3],
  },
  {
    name: "Ukelele Water Proof",
    description:
      "Los Ukuleles Ukadelic de Kala son de plástico. Son los más durables y Water-resistant (Resistentes al Agua). Ideales para llevar a todos lados, para usar al aire libre y todo tipo de viajes, lo podes llevar a la piscina o mar sin afectar su funcionamiento ni sonoridad.",
    price: 24791,
    image: [
      "https://http2.mlstatic.com/D_NQ_NP_859313-MLA43476607467_092020-O.webp",
      "https://http2.mlstatic.com/D_NQ_NP_753312-MLA43476607468_092020-O.webp",
      "https://http2.mlstatic.com/D_NQ_NP_879117-MLA43476607470_092020-O.webp",
    ],
    stock: 32,
    ranking: [4, 4, 5, 2, 4, 2, 5, 5, 3],
  },
];

const fakeDataUsers = [
  {
    username: "Marquitos",
    name: "Marco",
    lastname: "Polo",
    password: "12345678",
    email: "marco@mail.com",
    celnumber: 38745,
    address: "Los patitos 520",
    isAdmin: true,
  },
  {
    username: "Anacleto",
    name: "Anacleto",
    lastname: "Perez",
    password: "12345678",
    email: "anacleto@mail.com",
    celnumber: 38745,
    address: "Los patitos 520",
  },
];

fakeDataProducts.map((product) => {
  Product.create(product);
});

fakeDataUsers.map((user) => {
  User.create(user);
});
