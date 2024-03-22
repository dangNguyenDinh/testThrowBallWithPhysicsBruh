export default class bullet{
    src;
    x;
    y;
    width = 3;
    height=  5;
    time = 0;
    bul = document.createElement("div");
    bulImg = document.createElement("img");
    shotStatus = false;
    setUpStatus = true;
    mouseX;
    mouseY;
    tempTime = 0;
    //sự kiện canvas nhận được click
    clickHandler = (event)=>{
        this.shotStatus = true;
        this.setUpStatus = true;
        this.mouseX = event.clientX / window.innerWidth * 100;
        this.mouseY = event.clientY / window.innerHeight * 100;
    }
    constructor(src, x, y){
        this.x = x;
        this.y = y;
        this.src = src;
    }
    //getter setter
    setUp(x0, y0){
        //khởi tạo thẻ chứa ảnh bul shooter
        this.bulImg.src = this.src;
        this.bulImg.alt = "bulShooter";
        this.bulImg.style.width = this.width + "vh";
        this.bul.appendChild(this.bulImg);
        //set thuộc tính cho nó
        this.bul.style.zIndex = 0;
        this.bul.style.width = this.width + "vh";
        this.bul.style.height = this.height + "vh";
        this.bul.style.position = "absolute";
        //phải cập nhật lại toạ độ của this.x và this.y và time về lại vị trí bắt đầu bắn mỗi lần setUp
        this.x = x0;
        this.y = y0;
        this.bul.style.top = this.x + "vh";
        this.bul.style.left = this.y + "vw";
        this.time = 0;
        this.tempTime = 0;
    }
    getX(){
        return this.x;
    }
    getBul(){
        return this.bulImg;
    }
    displayInCanvas(){
        var canvas = document.querySelector("#wrapper #mainFrame");
        canvas.appendChild(this.bul);
    }
    //hàm di chuyển đạn theo hướng
    //cần toạ độ điểm ném, toạ độ chuột để tính góc ném, lực ném (hiện tại cho là speed cố định)
    shoot(x0, y0, x1, y1){
        //đk dừng khi đạn chạm đất
        if(this.y > 70){
            this.bul.remove();
            this.shotStatus = false;
            return;
        }
        //cập nhật toạ độ
        //speed ở đây là v tổng hợp, phải chia ra vx, vy
        let AB = this.distance(x0, y0, x1, y1);
        let CA = (Math.abs(y0 - y1));
        let BC = Math.sqrt(Math.pow(AB, 2) - Math.pow(CA, 2));
        //tính speed dựa vào khoảng cách chuột và peaShooter
        let speed =  AB / 15;
        //tính được toạ độ x = x0 + v0 * cosAlpha * t
        this.x = x0 + speed * this.time * BC / AB;
        //tính toạ độ y = y0 + v0 * sinAlpha * t + 1/2*a*t^2
        this.y = y0 - speed * this.time * CA / AB + 0.02 * this.time * this.time; 
        this.time++;
        this.bul.style.top = this.y + "vh";
        this.bul.style.left = this.x + "vw";
        //đổi hình ảnh thành nổ nếu như đúng đk
        if(this.x > x0 + BC && this.y > 62){
            this.bulImg.src = "./assetForPeaShooter/explode.png";
            this.bulImg.style.width = "15vh";
            this.bul.style.width = "15vh";
            this.bul.style.height = "15vh";
            //cập nhật lại toạ độ thành toạ độ của time liền trước đó
            this.bul.style.top = (y0 - speed * (this.time-this.tempTime) * CA / AB + 0.02 * (this.time-this.tempTime) * (this.time-this.tempTime)-5) + "vh";
            this.bul.style.left = (x0 + speed * (this.time-this.tempTime) * BC / AB) + "vw";
            this.tempTime++;
        }
    }
    //hàm nhận sự kiện bắn, nhận được lệnh thì mới gọi shoot
    receiveClick(){
        if(!this.shotStatus){
            var canvas = document.querySelector("#wrapper #mainFrame");
            canvas.addEventListener("click", this.clickHandler);
        }
    }
    born(x0, y0){
        //console.log(x0+", "+y0+" : "+this.mouseX+", "+this.mouseY);
        //nếu chuột nằm trong vòng tròn giới hạn thì mới đc bắn
        var dis = this.distance(x0, y0, this.mouseX, this.mouseY);
        console.log("x0: " + x0 + ", y0: " )
        console.log(dis + " " + window.innerHeight  * 0.04)
        if(dis / window.innerHeight < 0.04){
            //nếu đc phép bắn
            if(this.shotStatus){
                //nếu setUp mà chưa bắn xong thì ko setUp nữa
                if(this.setUpStatus){
                    this.setUp(x0, y0);
                    this.displayInCanvas();
                    this.setUpStatus = false;
                    var canvas = document.querySelector("#wrapper #mainFrame");
                    canvas.removeEventListener("click", this.clickHandler);
                }
                this.shoot(x0, y0, this.mouseX, this.mouseY);
            }
        }
        
    }
    distance(x0, y0, x1, y1){
        var a = Math.pow(x0-x1, 2) + Math.pow(y0-y1, 2);
        return Math.sqrt(a);
    }

}

