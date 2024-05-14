var flowerGroups = new Array(8);
var scaleFlower = 0.15;
var groupSize = 140;
var colors = new Array(8);

var dataLabels = [
  'Engaged in religious/spiritual activities',
  'Improved healthy lifestyle behaviors',
  'Made a change to work situation',
  'Made a change to personal relationships',
  'Talked to friends or family',
  'Took prescribed meditation',
  'Spent time in nature/the outdoors',
  'Talked to mental health professional'
];

var dataPercentages = [37.18, 76.49, 54.57, 55.14, 85.10, 62.12, 84.98, 74.58];

function setup() {
  createCanvas(1280, 650, P2D);
  background(150);
  //colorMode(HSB, 360, 100, 100, 255);

  var groupFlowerCoordinates = [new Coord(width / 2, height / 4), // top central
  new Coord(width / 2.5, height / 2), // middle left
  new Coord(width * 1.5 / 2.5, height / 2), // middle right
  new Coord(width / 3.5, height / 3.5), // top left
  new Coord(width * 4.25 / 6, height / 3.5), //top right
  new Coord(width / 3.5, height * 2.5 / 3.5), //bottom left
  new Coord(width * 4.25 / 6, height * 2.5 / 3.5), //bottom right
  new Coord(width / 2, height * 3.5 / 5) //bottom central
  ];

  flowerGroups = computeFlowerGroups(dataPercentages); // [3, 7, 5, 5, 8, 6, 8, 7]

  setColors(colors, 210);

  var bouquet = computeBouquet(groupFlowerCoordinates);

  drawBouquet(bouquet);
}



function draw() {
}