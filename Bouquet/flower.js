class Flower {

    constructor(pos = new Coord(0, 0), s = 1, colors = ['black', 'black'], h = 100, r = ((2 * h) + 30) / 2) {
        this.pos = new Coord(pos.x, pos.y);
        this.s = s;
        this.colors = colors;
        this.h = h;
        this.r = r;
    }

    drawFlower() {
        noStroke();

        push();
        translate(this.pos.x, this.pos.y);
        scale(this.s);

        //central petal
        this.definePetal();

        //top right petal
        push();
        rotate(HALF_PI / 1.5);
        this.definePetal();
        pop();

        //top left petal
        push();
        rotate(-HALF_PI / 1.5);
        this.definePetal();
        pop();

        //bottom right petal
        push();
        rotate(PI / 2 + HALF_PI / 2);
        this.definePetal();
        pop();

        //bottom left petal
        push();
        rotate(PI + HALF_PI / 2);
        this.definePetal();
        pop();

        fill(this.colors[1]);
        circle(0, 0, this.h / 3);
        pop();


    }

    definePetal() {
        fill(this.colors[0]);

        beginShape();
        vertex(-30, 0);
        vertex(-50, -this.h);
        vertex(-40, -this.h - 10);
        vertex(-25, -this.h - 15);
        vertex(-10, -this.h - 10);
        vertex(0, -this.h - 5);
        vertex(10, -this.h - 10);
        vertex(25, -this.h - 15);
        vertex(40, -this.h - 10);
        vertex(50, -this.h);
        vertex(30, 0);
        endShape(CLOSE);
    }

    drawStem(finalPoint) {
        const noiseFrequency = 0.01; //the bigger the value of noiseFrequency, the more erretically the offset will change from point to point
        const noiseSpeed = 0.05; //the bigger the value of noiseSpeed, the more quickly the curve fluxuations will change over time.
        const noiseScale = 30;
        const stemColors = [color(0, 69, 41), color(0, 104, 55), color(35, 132, 67)];
        const pixelsPerSegment = 10;

        var startPoint = createVector(this.pos.x, this.pos.y);
        var endPoint = createVector(random(finalPoint.getX() - 30, finalPoint.getX() + 30), finalPoint.getY());

        var lineLength = startPoint.dist(endPoint);
        var segments = max(1, round(lineLength / pixelsPerSegment));
        var points = 1 + segments;

        var angle = atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x);

        var xInterval = pixelsPerSegment * cos(angle);
        var yInterval = pixelsPerSegment * sin(angle);

        noFill();
        strokeWeight(4);
        stroke(random(stemColors));

        beginShape();
        vertex(startPoint.x, startPoint.y); //flower position

        for (var i = 1; i < points - 1; i++) {
            var x = startPoint.x + xInterval * i;
            var y = startPoint.y + yInterval * i;

            var offset = noiseScale * (noise(i * pixelsPerSegment * noiseFrequency, (millis() / 1000) * noiseSpeed) - 0.5);

            var xOffset = offset * cos(angle - PI / 2);
            var yOffset = offset * sin(angle - PI / 2);

            vertex(x + xOffset, y + yOffset);
        }

        vertex(endPoint.x, endPoint.y);
        endShape();
    }
}
