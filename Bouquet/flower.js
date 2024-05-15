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
}
