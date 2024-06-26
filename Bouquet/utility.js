function computeFlowerGroups(data) {
    var result = new Array(data.length);

    for (var i = 0; i < data.length; i++) {
        result[i] = convertPercentageInteger(data[i]);
    }

    return result;
}

function convertPercentageInteger(p) {
    return map(p, 0, 100, 0, 10);
}

function computeBouquet(groupFlowersPos) {
    var bouquet = new Array();
    var group = new Array();
    var overlapping = false;
    var f = new Flower();

    for (var i = 0; i < flowerGroups.length; i++) {
        while (group.length < flowerGroups[i]) {
            overlapping = false;
            f = computeFlowerPos(groupSize / 2, groupFlowersPos[i]);
            for (var j = 0; j < group.length; j++) {
                var d = dist(f.pos.x, f.pos.y, group[j].pos.x, group[j].pos.y);
                //println("d=" + d + ".<." + f.r * 2 * scaleFlower);
                if (d < f.r * 2 * scaleFlower) {
                    overlapping = true;
                    break;
                }
            }

            if (!overlapping & isPointInsideCircle(f.pos, groupFlowersPos[i], groupSize / 2)) {
                group.push(f);
            }
        }

        for (let g = 0; g < group.length; g++) {
            group[g].s = scaleFlower;
            group[g].posGroup = groupFlowersPos[i];
            group[g].colors = colors[i];
            group[g].sizeGroup = groupSize;
            bouquet.push(group[g]);
        }

        group = [];
    }
    return bouquet;
}

function computeFlowerPos(groupSizeRay, posGroup) {
    var pos = new Coord(random(posGroup.getX() - groupSizeRay, posGroup.getX() + groupSizeRay), random(posGroup.getY() - groupSizeRay, posGroup.getY() + groupSizeRay));
    return new Flower(pos, scaleFlower);
}

function isPointInsideCircle(posPoint, posCircle, r) {
    var d = dist(posPoint.x, posPoint.y, posCircle.x, posCircle.y);
    return d < r;
}

function drawBouquet(flowers) {
    drawStems(flowers);

    //flowers
    for (let f in flowers) {
        flowers[f].drawFlower();
    }

}

function setColors(colors, transparency) {
    //first color: petal, second color: flower center
    colors[0] = [color(228, 26, 28, transparency), color(252, 141, 98)];
    colors[1] = [color(55, 126, 184, transparency), color(102, 194, 165)];
    colors[2] = [color(77, 175, 74, transparency), color(166, 216, 84)];
    colors[3] = [color(152, 78, 163, transparency), color(141, 160, 203)];
    colors[4] = [color(255, 127, 0, transparency), color(253, 205, 172)];
    colors[5] = [color(255, 255, 51, transparency), color(253, 191, 111)];
    colors[6] = [color(166, 86, 40, transparency), color(230, 171, 2)];
    colors[7] = [color(247, 129, 191, transparency), color(244, 204, 204)];
}

function drawStems(flowers) {
    const stemColors = [color(0, 69, 41), color(0, 104, 55), color(35, 132, 67)];
    randomSeed(1);
    for (let f of flowers) {
        stroke(random(stemColors));
        strokeWeight(random(2, 3));
        noFill();
        bezier(f.pos.x, f.pos.y, f.pos.x + random(-50, 50), f.pos.y + 50, width / 2, height, width / 2, height + 50);
    }
}

function showCircle(offset) {
    fill(255, 225, 0, 50);
    noStroke();

    for (let i in groupFlowerCoordinates) {
        if (isInsideFlowerGroup(groupFlowerCoordinates[i])) {
            circle(groupFlowerCoordinates[i].getX(), groupFlowerCoordinates[i].getY(), groupSize + offset);
            selectedGroupIndex = i;
            labelText = dataLabels[selectedGroupIndex] + " - " + dataPercentages[selectedGroupIndex] + "%";
            textRef = "Wellcome Global Monitor (2021) – processed by Our World in Data";
            break;
        } else {
            labelText = "";
            textRef = "";
        }
    }
}

function isInsideFlowerGroup(center) {
    if (mouseX > center.getX() - groupSize / 2 &&
        mouseX < center.getX() + groupSize / 2 &&
        mouseY > center.getY() - groupSize / 2 &&
        mouseY < center.getY() + groupSize / 2) {
        return true;
    }
    return false;
}

function drawTitleFrame() {
    fill(255);
    rectMode(CENTER);
    stroke(14, 38, 63);
    strokeWeight(3);
    rect(width / 2, 35, 525, 40, 10);

    noStroke();
    fill(14, 38, 63);
    textFont(font);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Dealing with anxiety or depression", width / 2, 30);
}

function drawLabel() {
    rectMode(CORNER);

    fill(255);
    textAlign(LEFT, TOP);
    textSize(14);
    text(labelText, 85, height - 160, 150);

    fill(255);
    textSize(9);
    text(textRef, 85, height - 100, 150);
}
