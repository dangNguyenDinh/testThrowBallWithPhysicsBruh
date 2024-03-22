export default class peaShooter{
    src;
    x;
    y;
    width;
    height;
    pea = document.createElement("div");
    peaImg = document.createElement("img");
    constructor(src, x, y, width, height){
        this.x = x;
        this.y = y;
        this.src = src;
        this.width = width;
        this.height = height;
    }
    //getter setter
    setUp(){
        //khởi tạo thẻ chứa ảnh pea shooter
        this.peaImg.src = this.src;
        this.peaImg.alt = "peaShooter";
        this.peaImg.style.width = this.width + "vh";
        this.pea.appendChild(this.peaImg);
        //set thuộc tính cho nó
        this.pea.style.zIndex = 1;
        this.pea.style.width = this.width + "vh";
        this.pea.style.height = this.height + "vh";
        this.pea.style.position = "absolute";
        this.pea.style.top = this.y + "vh";
        this.pea.style.left = this.x + "vw";
        //setup toạ độ cho đường viền giới hạn
        let circle = document.getElementById("range");
        circle.style.top = (this.y - circle.offsetHeight / window.innerHeight * 100) + "vh";
        circle.style.left = (this.x) + "vw";
    }
    getPea(){
        return this.pea;
    }
    
    displayInCanvas(){
        var canvas = document.querySelector("#wrapper #mainFrame");
        canvas.appendChild(this.pea);
    }

    getXY(){
        return [this.x, this.y];
    }
}